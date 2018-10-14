import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';

// Views
import SignIn from './views/signin/SignIn';
import Home from './views/home/Home';

class App extends Component {
  render() {

    let sesion = true;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact strict path='/signin' render={(props) => ( <SignIn /> )} />
            <Route exact strict path='/home' render={(props) => ( <Home /> )} />

            <Route exact strict path='/' 
                render={(props) => ( 
                    sesion ? (
                        <Redirect to="/home"/>
                    ) : (
                        <Redirect to="/signin"/> )
                )} />
            <Route exact strict path=''
                render={(props) => ( 
                    sesion ? (
                        <Redirect to="/home"/>
                    ) : (
                        <Redirect to="/signin"/> )
                )} />
            
            {/* <Route component={Page404} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
