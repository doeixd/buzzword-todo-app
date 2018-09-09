import React, { Component } from 'react'
import './style.css'
import {observer} from 'mobx-react'



export default @observer class Signin extends Component {
    constructor(){
        super()
        document.querySelector('header').textContent = 'Sign In'
    }
    render() {
        return(
            <div>
                <input placeholder='username'></input>
                <input placeholder='password'></input>
                <button>Submit</button>

                <style jsx>{`
                    input {
                        height: 40px;
                        margin-right: 25px;
                        border-radius: 5px;
                        border: 0px solid #cecece;
                        /* border-bottom: 2px solid #b1b1b1; */
                        width: 265px;
                        /* border-top: 1px solid #cccccc; */
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
                        font-size: 17px;
                        line-height: 27px;
                        background-image: linear-gradient(to left, #03A9F4 , #0063ff);
                        color: white;
                        padding: 0 20px;
                        border-radius: 27px;
                        font-family: 'Libre Franklin';
                        font-weight:600;
                        transition:.25s;
                        border:none;
                    }

                    button:hover{
                        cursor:pointer;
                        box-shadow:4px 5px 11px #bbbbbb, 0 0 63px -10px #666666;
                        transform: scale(1.02)
                    }
                    
                `}</style>
            </div>
        )
    }
}




