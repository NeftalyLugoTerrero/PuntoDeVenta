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
import InvoiceHistory from './views/invoice_history/InvoiceHistory';

class App extends Component {
  render() {

    let sesion = true;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact strict path='/views/signin' render={(props) => ( <SignIn /> )} />
            {/* <Route exact strict path='/views/home' render={(props) => ( <Home /> )} /> */}
            <Route exact strict path='/views/invoice' render={(props) => ( <Invoice /> )} />
            <Route exact strict path='/views/inventory' render={(props) => ( <Inventory /> )} />
            <Route exact strict path='/views/client' render={(props) => ( <Client /> )} />
            <Route exact strict path='/views/provider' render={(props) => ( <Provider /> )} />
            <Route exact strict path='/views/push_product' render={(props) => ( <PushProduct /> )} />
            <Route exact strict path='/views/push_client' render={(props) => ( <PushClient /> )} />
            <Route exact strict path='/views/invoice_history' render={(props) => ( <InvoiceHistory /> )} />

            <Route exact strict path='/' 
                render={(props) => ( 
                    sesion ? (
                        <Redirect to="/views/Invoice"/>
                    ) : (
                        <Redirect to="/views/signin"/> )
                )} />
            <Route exact strict path=''
                render={(props) => ( 
                    sesion ? (
                        <Redirect to="/views/Invoice"/>
                    ) : (
                        <Redirect to="/views/signin"/> )
                )} />
            
            {/* <Route component={Page404} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
