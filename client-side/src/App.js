import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LoginComponent from './components/LoginComponent.js';
import HomeComponent from './components/HomeComponent.js';
import RoleComponent from './components/RoleComponent.js';
import UserComponent from './components/UserComponent.js';
import UserlistComponent from './components/UserlistComponent.js';
import PersoninfoComponent from './components/PersoninfoComponent.js';
import PersoninfolistComponent from './components/PersoninfolistComponent.js';
import MyPersonalInfoComponent from './components/MyPersonalInfoComponent.js';
import LogoutComponent from './components/LogoutComponent.js';

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>

          <Switch>
            <Route exact path='/' component={LoginComponent}/>
            <Route path='/login' component={LoginComponent}/>
            <Route path='/home' component={HomeComponent}/>
            <Route path='/role' component={RoleComponent}/>
            <Route path='/users' component={UserComponent}/>
            <Route path='/userslist' component={UserlistComponent}/>
            <Route path='/personinfo/:userid' component={PersoninfoComponent}/>
            <Route path='/personinfolist/:status' component={PersoninfolistComponent}/>
            <Route path='/mypersonalinfo' component={MyPersonalInfoComponent}/>
            <Route path='/logout' component={LogoutComponent}/>
          </Switch>

        </Router>
      </div>
    );
  }
}

export default App;
