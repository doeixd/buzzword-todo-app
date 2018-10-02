import React, { Component } from 'react'
import './style.css'
import {observer} from 'mobx-react'
import localforage from 'localforage'


export default @observer class Signin extends Component {
  constructor(props){
    super(props)
    this.props.store.listName = 'Sign In'
    this.props.store.loginPage = 1
    window.title = 'Sign In'
  }

  error() {
    alert('ERROR, Did you enter a username and password?')
  }

  login(e){
    let password = document.getElementById('password').value
    let username = document.getElementById('username').value.toLowerCase()
        
    if (username && password) {
      fetch('/login',{
        headers:{
          'Content-Type':'application/json; charset=UTF-8'
        },
        method: 'POST',
        body: JSON.stringify({'username':username,'password':password})
      })
        .then((res)  => res.json())
        .then((res)=> {
          if (res.message != 'Auth Failed') { 
            document.cookie = `jwt=${res.token}`
            this.props.store.signedIn = true
            window.sessionStorage.setItem('signedIn', 'true')
            localStorage.user = res.username
            window.location.href = `/${res.username}/0  ` 
          }else{
            this.props.store.listName = 'AUTH FAILED' 
          }
        })

                
    
    } else{ 
      this.error()
    }
  }

  register(e){
    let password = document.getElementById('password').value
    let username = document.getElementById('username').value.toLowerCase()
        
    if (username && password) {
      fetch('/register',{
        headers:{
          'Content-Type':'application/json; charset=UTF-8'
        },
        method: 'POST',
        body: JSON.stringify({'username':username,'password':password})
      })
        .then((res)  => res.json())
        .then((res)=> {
          if (res.message != 'TAKEN') { 
            document.cookie = `jwt=${res.token}`
            this.props.store.signedIn = true
            window.sessionStorage.setItem('signedIn', 'true')
            localStorage.user = res.username
            localforage.getItem('alist').then(list => localforage.setItem('all', list)).then(() => window.location.href = '/')
             
            
          }else{
            this.props.store.listName = 'USERNAME TAKEN' 
          }
        })
  
    } else{ 
      this.props.store.listName = 'Register'
      this.props.store.reg = true
    }
  }

  render() {
    return(
      <div>
        <input placeholder='username' id='username'></input>
        <input placeholder='password' type='password' id='password'></input>
        { this.props.store.reg ? '' : <button onClick={e => this.login(e)}>Submit</button> }
        <button id='register' onClick={e => this.register(e)}>Register</button>

        <style jsx>{`
                    div{
                        display:flex;
                        flex-direction:column;
                    }
                    #register{
                        background-image: linear-gradient(to right,#5a5a5a ,#020202);
                        margin-top:15px;
                    }
                    input {
                        height: 40px;
                        border-radius: 5px;
                        border: 0px solid #cecece;
                        width: 265px;
                        box-shadow: 0px 2px 4px 1px #cacaca, 0 1px 3px 0 rgba(0, 0, 0, 0.3);
                        transition: .25s;
                        margin-bottom:5px;
                        padding-left: 10px;
                        display: inline-flex;
                        text-align:center;
                        margin-top:10px;
                    }
                    
                    input:hover{
                        transform: scale(1.04);
                        box-shadow:4px 6px 9px #bbbbbb, 0 0 25px -9px #8c8c8c;
                    }

                    button {
                        font-size: 22px;
                        line-height: 34px;
                        background-image: linear-gradient(to left,#3bbffb ,#0063ff);
                        color: white;
                        /* padding: 0 20px; */
                        border-radius: 27px;
                        font-family: 'Libre Franklin';
                        font-weight: 600;
                        -webkit-transition: .25s;
                        transition: .25s;
                        border: none;
                        margin-top: 26px;
                    }

                    button:hover{
                        cursor:pointer;
                        box-shadow:4px 5px 11px #bbbbbb, 0 0 53px -10px #666666;
                        transform: scale(1.02)
                    }
                    
                `}</style>
      </div>
    )
  }
}




