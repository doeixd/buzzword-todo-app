import React, { Component, Fragment } from 'react';
import {observer} from 'mobx-react';

@observer
export default class Input extends Component {
    submit() {
        document.querySelector('#ibox').value ? this.props.store.addTodo({name:document.querySelector('#ibox').value,done:'false'}) : null
        document.querySelector('#ibox').value = ''
    }


    render() {
        return (
        <div id='iholder'>

            <input id="ibox" onKeyPress={(e) => e.key == 'Enter' ? this.submit() : null}></input>
            <button id='button' onClick={() => this.submit()}>✚</button>
        </div>
        )
    }

}

