import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react';
import { Link } from "react-router-dom";
import localforage from 'localforage'

@observer
export default class Login extends Component {

    logout(){
        window.sessionStorage.signedIn = 0
        this.signedIn = false
        localforage.removeItem('all').then(()=> window.href = '/')
    }

    content() {
       if(this.props.store.loginPage == 1){
           return ''
       } 
       if(this.props.store.userPage == 1) {
           return (<a onClick={e => this.logout()}> <svg xmlns="http://www.w3.org/2000/svg" style={{ paddingTop: '7px' }} width="22" height="22" fill='white' viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" /></svg> </a>)
       }
        if (!(this.props.store.signedIn)) {
            return (<Link  to='/login'>LOGIN</Link>) 
        } else {
            return (<Link  to='/profile'><svg xmlns="http://www.w3.org/2000/svg"  style= {{paddingTop: '7px'}}  width="22" height="22" fill='white' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg></Link>)
        }

    }

    render() {
        return (<div id='signin' href='login.html' >{this.content()}</div>)
    }
    
}
 