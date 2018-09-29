import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react'
import Login from './Login'

@observer
export default class Top extends Component {
  render() {
    return(
      ReactDOM.createPortal(<header> {this.props.content ? this.props.content : this.props.store.listName} <Login store={this.props.store} /> </header>,document.getElementById('topcontainer'))
      
    )
  }
}

