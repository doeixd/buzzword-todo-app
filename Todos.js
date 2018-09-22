import React, { Component, Fragment as F} from 'react';
import TodoItem from './Todo'
import {observer} from 'mobx-react';
import localforage from 'localforage'
import { toJS, autorun } from 'mobx'

@observer
export default class TodoList extends Component { 
    constructor(props) {
        super(props)
        // this.arryoTodos = this.props.store.toggle ? this.props.store.filterd : this.props.store.todos
        // console.log(this.props.store.todos)
        // localforage.getItem('all').then(all =>{
        //   all[this.props.store.n].todos = toJS(this.props.store.todos) 
        //   console.log(all)
        //   localforage.setItem(all[this.props.store.n].name,toJS(this.props.store.todos),()=>{return})
        //   localforage.setItem('all',all,()=>{return})
        //   this.lists = all
        // })

        // autorun(()=> {
        //   localforage.getItem('all').then(all =>{
        //     all[this.props.store.n].todos = toJS(this.props.store.todos) 
        //     console.log(all)
        //     localforage.setItem(all[this.props.store.n].name,toJS(this.props.store.todos),()=>{return})
        //     localforage.setItem('all',all,()=>{return})
        //     this.lists = all
        //   })
        //   fetch('/update',{
        //     headers:{
        //       'Content-Type':'application/json; charset=UTF-8'
        //     },
        //     method: 'POST',
        //     body: JSON.stringify({'lists': this.lists } )
        //   }).then((res)  => res.json())
        //     .then((res)=> {
        //       if (res.message != 'ERROR') { 
        //         this.lists = res.lists
        //         localforage.clear()
        //         localforage.setItem('all',res.lists)
        //         res.lists.forEach(el => {
        //           localforage.setItem(el.name,el)
        //         })
    
    
        //       }else{
        //         document.querySelector('header').textContent = 'AUTH FAILED' 
        //       }
        //     })
    
        // })
        // this.props.store.updateStorage()
    }


    
    
    render() {
        return(
        <div id='thelist'>
            { this.props.store.Fodos.map((item, index) => <F key={index}> 
            <TodoItem key={index} draggable="true" store={this.props.store} item={item} index={index}  children={<div id='x' onClick={() => this.props.store.minusTodo(index)}> ✕ </div>}/>  
            </F>)}
        </div>
        )
    }
    
}

