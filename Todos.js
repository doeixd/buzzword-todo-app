import React, { Component, Fragment as F} from 'react';
import TodoItem from './Todo'
import {observer} from 'mobx-react';
import localforage from 'localforage'
import { toJS, autorun } from 'mobx'

@observer
export default class TodoList extends Component { 
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

