import React, { Component } from 'react'
import './style.css'
import {observer} from 'mobx-react'



export default @observer class Profile extends Component {
  constructor(props){
    super(props)
    document.querySelector('header').textContent = `${localStorage.user}'s Profile`
  }

  hydrate(list){
  }
  

  
  getLists(e){
    fetch('/todos',{
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      method: 'POST',
    })
      .then((res)  => res.json())
      .then((res)=> {
        if (res.message != 'ERROR') { 
          this.props.store.lists = res.lists
          console.log(res.lists)

        }else{
          document.querySelector('header').textContent = 'AUTH FAILED' 
        }
      })
    
  }

  render() {
    return(
      <div>
        <h2>Todo Lists :</h2>
        <input placeholder='search' id='username'></input>
        <button onClick={e => this.login(e)}>Submit</button>
        {this.getLists('f')}
        {/* {console.log(this.props.store)} */}
        <Lists list={this.props.store.lists}></Lists>


        <style jsx>{`
                    div{
                        display:flex;
                        flex-direction:column;
                    }
                    h2{
                      color:#333333;
                      font-family:'Libre Franklin';
                      font-size:30px;
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




class Lists extends Component= (tom) => {
  return (tom.list.map(itm => {
    <h3>{itm}</h3>
  }))

}