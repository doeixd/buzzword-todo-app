import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import {observer} from 'mobx-react'
import registerServiceWorker from './sw'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import store from './store'
import Home from './Home'
import Signin from './Signin'
import Profile from './Profile'

const ProtectedRoute = ({ component: Component, store, ...rest }) => (
  <Route exact path='/profile' 
    {...rest}
    render={props =>
      localStorage.signedIn ? (
        <Component store={store} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

@observer
class App extends Component {
  constructor(props){
    super(props)
    localStorage.list ? this.props.store.todos = JSON.parse(localStorage.list) : null
  }

  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" render={()=> <Home store={this.props.store} /> } />
          <Route exact path="/login" render={()=> <Signin store={this.props.store} /> } />
          <ProtectedRoute exact path='/profile' store={this.props.store} component={Profile} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App store={store}/>
  , document.getElementById('root'))
registerServiceWorker()

