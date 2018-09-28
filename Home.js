import React, { Component } from 'react';

import './style.css';
// import App from './App';
import {observer} from 'mobx-react';

import Header from './Header'
import TodoList from './Todos'
import Input from './Input'
import Login from './Login'
import localforage from 'localforage'



@observer
export default class Home extends Component {
    constructor(props){
        super(props)
      
         if(this.props.match.params.user && this.props.match.params.list){
           this.props.store.hydrate(this.props.match.params.user,this.props.match.params.list)
           console.log('JUST HYDRATED')
         }else if (this.props.store.signedIn) {
             localforage.getItem('all', (err,all) => {this.props.store.todos = all[0].todos})
             console.log('SIGNED iN')
         }else {
            localStorage.list ? this.props.store.todos = JSON.parse(localStorage.list) : null
            console.log(`THIS BIUT: ${this.props.signedIn}`)
         }
        
        // document.querySelector('header').textContent = this.props.store.listName
        // console.log(this.props.store.localSignedIn)
        console.log(this.props)
        }
       

    render() {
        return(
            <div>
              
                <Login store={this.props.store} />
                <Input store={this.props.store} />
                <Header store={this.props.store}/>
                <TodoList store={this.props.store} />
            </div>
        )
    }
}
