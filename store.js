import {observer} from 'mobx-react';
import { decorate, observable, action, computed } from "mobx"

var store = observable({
    todos:[
        {name: 'buy milk',
         done: 'false',
        }
    ],

    filter: false,

    filterd: [],

    updateStorage() {
        localStorage.list = JSON.stringify(this.todos)
        console.log(JSON.stringify(this.todos))
    },

    get Fodos() {
        if (this.filter == true) {
            return this.filterd
        }else{
            return this.todos
        }
    },

    sortTodos(){
        function compare(a,b) {
            if (a.name < b.name)
            return -1;
            if (a.name > b.name)
            return 1;
            return 0;
        }
        this.todos.replace(this.todos.slice().sort(compare))
        this.updateStorage()
    },

    addTodo(todo) {
        this.todos.push(todo)
        this.updateStorage()
    },

    minusTodo(index){
        this.todos.splice(index,1)
        this.updateStorage()
    },

    filterDone() {
        this.todos = this.todos.filter(item => item.done == false)
        this.updateStorage()
    },

    filterTodos(e) {
        this.filter = true
        this.filterd =[]
        for ( let item of this.todos){
            if (item.name.match(RegExp(e.target.value,'g'))) {
                this.filterd.push(item)
                console.log(item)
            }

        }
    },

    move(mover, ref) {
        console.log(`mover: ${mover}`)
        console.log(`ref: ${ref}`)
        // console.log(this.todo[ref].name)
        // this.todos.splice(mover, 1)
        // this.todos.splice(++ref, 0, this.todos[mover])
        this.todos.splice(ref,0,this.todos.splice(mover,1)[0])
        // console.log(this.todos.slice())
        console.log()
        this.updateStorage()
    },
    reverse(item){
        this.todos[item].done = this.todos[item].done 
        this.updateStorage()
    }




})



export default store