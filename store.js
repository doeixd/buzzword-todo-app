import { observable, toJS, autorun } from 'mobx'
import localforage from 'localforage'

var store = observable({
  todos: [

    {
      name: 'buy milk',
      done: "false",
    }
  ],

  loginPage: 0,

  n: 0,

  listName: 'TODO APP',

  signedIn: window.sessionStorage.getItem('signedIn') ? true : false,

  lists: [{ name: 'LOADING...', todos: [{ name: '.' }, { name: '.' }, { name: '.' }] }],

  filter: false,

  filterd: [],

  hydrate(user, list) {
    this.n = list
    localforage.getItem('all', (err, val) => {
      this.todos = val[list].todos

      this.listName = val[list].name
      console.log(this.listName)
      return
    })
  },

  updateStorage() {

    localforage.getItem('all').then(all => {
      all[this.n].todos = toJS(this.todos)
      console.log(`THIS IS ${JSON.stringify(toJS(this.todos))}`)
      localforage.setItem(all[this.n].name, toJS(this.todos), () => { return })
      localforage.setItem('all', all).then(su => {
        this.lists = all
        console.log(`BATARANG ${JSON.stringify(this.lists)}`)
        fetch('/update', {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          method: 'POST',
          body: JSON.stringify({ 'lists': this.lists })
        }).then((res) => res.json())
          .then((res) => {
            if (res.message != 'ERROR') {
              this.lists = res.lists
              localforage.clear()
              localforage.setItem('all', res.lists)
              res.lists.forEach(el => {
                localforage.setItem(el.name, el.todos)
              })


            } else {
              document.querySelector('header').textContent = 'AUTH FAILED'
            }

      })
    })
    
      })


  },

  get Fodos() {
    if (this.filter == true) {
      return this.filterd
    }
    else {
      return this.todos
    }
  },

  sortTodos() {
    function compare(a, b) {
      if (a.name < b.name)
        return -1
      if (a.name > b.name)
        return 1
      return 0
    }
    this.todos.replace(this.todos.slice().sort(compare))
    this.updateStorage()
  },

  addTodo(todo) {
    this.todos.push(todo)
    this.updateStorage()
  },

  minusTodo(index) {
    this.todos.splice(index, 1)
    window.navigator.vibrate(100)
    this.updateStorage()
  },

  filterDone() {
    this.todos = this.todos.filter(item => item.done == false)
    this.updateStorage()
  },

  filterTodos(e) {
    this.filter = true
    this.filterd = []
    for (let item of this.todos) {
      if (item.name.match(RegExp(e.target.value, 'g'))) {
        this.filterd.push(item)
        console.log(item)
      }

    }
  },

  move(mover, ref) {
    console.log(`'mover': ${mover}`)
    console.log(`ref: ${ref}`)
    this.todos.splice(ref, 0, this.todos.splice(mover, 1)[0])
    console.log()
    this.updateStorage()
  },
  reverse(item) {
    console.log(this.todos[item].done)
    this.todos[item].done = this.todos[item].done == 'false' ? 'true' : 'false'
    this.updateStorage()
  }




})



export default store