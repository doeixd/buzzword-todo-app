import React, { Component } from 'react'
import './style.css'
import {observer} from 'mobx-react'
import { Link } from 'react-router-dom'
import localforage from 'localforage'

export default @observer class Profile extends Component {
  constructor(props){
    super(props)
    this.props.store.listName = `${localStorage.user}'s Profile`
    this.getLists('e')
      window.title = `${localStorage.user}'s Profile`
    this.props.store.userPage = 1
  }

  newList(e){
    let listName = document.getElementById('new').value
    document.getElementById('new').value = ''
    fetch('/newlist',{
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      method: 'POST',
      body: JSON.stringify({'added': [{name:listName,todos:[{name:'buy milk',done:'false'}]}],'username':localStorage.user} )
    }).then((res)  => res.json())
      .then((res)=> {
        if (res.message != 'ERROR') { 
          this.props.store.lists = res.lists
          localforage.clear()
          localforage.setItem('all',res.lists)
          res.lists.forEach(el => {
            localforage.setItem(el.name,el.todos)
          })

        }else{
          this.props.store.listName = 'AUTH FAILED' 
        }
      })

  }



  
  getLists(e){
    fetch('/todos',{
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      method: 'POST',
    }).then((res)  => res.json())
      .then((res)=> {
        if (res.message != 'ERROR') { 
          this.props.store.lists = res.lists
          res.lists.forEach(el => {
            localforage.setItem(el.name,el.todos)
          })
          localforage.setItem('all',res.lists)
          // this.hydrate()

        }else{
          this.props.store.listName = 'AUTH FAILED' 
        }
      })
    
  }

  

  render() {
    return(
      <div id='cont'>
        <div id='opts'>
          <input placeholder='LIST NAME' id='new' onKeyPress={(e) => e.key == 'Enter' ? this.newList() : null}></input>
          <button id='button' onClick={() => this.newList()}>✚</button>
        </div>
        <h2>Todo Lists :</h2>

        { this.props.store.lists.map( (itm,inx) => {
          let desc = (itm.todos.length >= 3) ? [itm.todos[0].name, itm.todos[1].name, itm.todos[2].name] : (itm.todos.length == 2) ? [itm.todos[itm.todos.length - 2].name, itm.todos[itm.todos.length - 1].name] : (itm.todos.length == 1) ? [itm.todos[itm.todos.length-1].name] : [] 
          return <Lists store={this.props.store} key={inx} inx={inx} name={itm.name} desc={desc} />
        })

        }

        <div id='list'></div>


        <style jsx>{`
                    #cont{
                        display:flex;
                        flex-direction:column;
                    }
                    #opts{
                      display:inline;
                    }
                    h2{
                      color:#333333;
                      font-family:'Libre Franklin';
                      font-size:30px;
                    }
                    #search, #add {
                      color: #333333;
                      font-family: 'Libre Franklin';
                      font-size: 30px;
                      padding: 7px;
                      text-align: center;
                      background-color: #eaeaea;
                      /* width: min-content; */
                      width: 57px;
                      height: 48px;
                      margin: 5px;
                      line-height: 48px;
                      display:inline-block;
                      border-radius:50px;
                    }
                    h3{
                      color:#333333;
                      font-family:'Libre Franklin';
                      font-size:25px;
                      margin-bottom:25px;

                    }
                    #listI{
                      color:#333333;
                      font-family:'Libre Franklin';
                      font-size:15px;
                      padding-left:30px;
                      margin-top:-20px;
                      border-bottom:1px solid #eaeaea;
                      padding-bottom:5px;
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
                      margin-left:20px;
                    }

                    button:hover{

                    }
                    
                `}</style>
      </div>
    )
  }
}




class Lists extends Component {

  delete(e){
    let list = e.target.id
    fetch('/delete',{
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      method: 'POST',
      body: JSON.stringify({'list': list ,'username':localStorage.user} )
    }).then((res)  => res.json())
      .then((res)=> {
        if (res.message != 'ERROR') { 
          if (res.lists != [] ){
            this.props.store.lists = res.lists
          } else {
            this.props.store.lists = [{name:'TODO APP',todos:[{name:'buy milk',done:'false'}]}]
          }
          localforage.clear()
          localforage.setItem('all',res.lists)
          res.lists.forEach(el => {
            localforage.setItem(el.name,el.todos)
          })


        }else{
          this.props.store.listName = 'AUTH FAILED' 
        }
      })

  }

  render(){
    return <div className="listcont">
        <Link to={`${localStorage.user}/${this.props.inx}/`}>
          <h3>{this.props.name}</h3>
          {this.props.desc.map((itm, ndx, arr) => {
            if (arr.length == 0) {
              return <div key={ndx} id="listI" className="i">
                  'No Items Presant'
                </div>;
            }
            return <div key={ndx} id="listI">
                {itm}
              </div>;
          })}
        </Link>
        <div id={this.props.inx} className="dekete" onClick={e => this.delete(e)}>
          <svg width="20" height="20" id={this.props.inx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fillRule="evenodd" clipRule="evenodd">
            <path id={this.props.inx} d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
          </svg>
        </div>

        <style jsx>{`
          h3 {
            font-size: 22px;
          }
          .i {
            font-style: italic;
          }
          .dekete:hover {
            stroke: #e70707;
            transform: scale(1.08);
            cursor: pointer;
          }
          .dekete {
            transition: 0.2s;
          }
          #listI {
            display: inline;
            padding-right: 10px;
          }
          .listcont {
            display: grid;
            grid-template-columns: 5fr 1fr;
            align-items: center;
            font-family: "Montserrat";
            border-bottom: 2px solid #eaeaea;
            padding-bottom: 10px;
            margin-top: 10px;
            transition: 0.2s;
            word-break: break-all;
          }
          .listcont:hover {
            border-bottom: 2px solid #0063ff;
          }`}</style>
      </div>;
  }

}