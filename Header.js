import axios from 'axios';
import React, { Component, Fragment as F} from 'react';
import {observer} from 'mobx-react';
import { decorate, observable } from "mobx"


@observer
export default class Header extends Component{ 

    on = true

    toggle(e){
        let target = e.target.id
        if(e.target.data == 'hidden'){ 
            document.querySelector(`.${target}_controls`).style.maxHeight = '0';
            e.target.data = '';  
        } else {
            document.querySelector(`.${target}_controls`).style.maxHeight = '70px';
            e.target.data = 'hidden' 
          }
    }

    otn(e) {
        
        if(this.on) document.querySelector('.filter').style.display = 'inline-block';
        if(this.on) document.querySelector('#lab').style.display = 'none'

        this.on = false
    }

    off(){
        if(!this.on) document.querySelector('#lab').style.display = 'inline-block';
        if(!this.on) document.querySelector('.filter').style.display = 'none'
        this.on = true
        this.props.store.filter = false
    }

    error() {
        alert('')
    }

    loadList(e) {
        let list = document.getElementById('listName').value
        console.log(list)
        
        if (list) {
        fetch("/saves",{
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            },
            method: 'POST',
            body: JSON.stringify({val: list})
          }).then((response)  => {
            if (response == 'error') {
                this.error()
                return           
            }
            return response.json();
          })
          .then((myJson) => {
            this.props.store.todos = myJson[0].todos
            this.props.store.updateStorage()
            console.log(myJson[0].todos)
          });
        } else {
            this.error()
        }
    }

    saveList(e){
        let list = document.getElementById('listName').value
        
        if (list) {
        fetch("/load",{
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            },
            method: 'POST',
            body: JSON.stringify({name: list, todos: [...this.props.store.todos] })
          }).then((response)  => {
            if (response == 'error') {
                this.error()
                return           
            } 
            return response;
          }).then((res)=> console.log(res))
        } else{ 
            this.error()
        }
    }

    render(){
        return(
        <F>
            <div id='options' data='' onClick={(e) => this.toggle(e) }> OPTIONS <i className="im im-care-down"></i></div>
            <div className='options_controls'>
            <div onClick={() => this.props.store.filterDone() } > DELETE Checked </div>
            <div onClick={() => this.props.store.sortTodos() } > SORT </div>
            <div onClick={(e) => this.otn(e) } > <span id='lab'> Filter </span> <input className='filter' onChange={(e) => this.props.store.filterTodos(e)} onBlur={(e) => this.off(e)}></input> </div>
            </div>
        </F>
        ) }
}