import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react';


@observer
export default class Top extends Component {
  render() {
    return(
      ReactDOM.createPortal(<header contentEditable="true"> {this.props.content ? this.props.content : this.props.store.listName}</header>,document.getElementById('topcontainer'))
      
    )
  }
}

