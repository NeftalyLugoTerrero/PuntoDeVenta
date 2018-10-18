import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';

// Views
import SignIn from './views/signin/SignIn';
import Home from './views/home/Home';
import Invoice from './views/invoice/Invoice';
import Inventory from './views/inventory/Inventory';
import Client from './views/client/Client';
import Provider from './views/provider/Provider';
import PushProduct from './views/push_product/PushProduct';
import PushClient from './views/push_client/PushClient';

class App extends Component {
  render() {

    let sesion = true;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact strict path='/signin' render={(props) => ( <SignIn /> )} />
            <Route exact strict path='/home' render={(props) => ( <Home /> )} />
            <Route exact strict path='/invoice' render={(props) => ( <Invoice /> )} />
            <Route exact strict path='/inventory' render={(props) => ( <Inventory /> )} />
            <Route exact strict path='/client' render={(props) => ( <Client /> )} />
            <Route exact strict path='/provider' render={(props) => ( <Provider /> )} />
            <Route exact strict path='/push_product' render={(props) => ( <PushProduct /> )} />
            <Route exact strict path='/push_client' render={(props) => ( <PushClient /> )} />

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
