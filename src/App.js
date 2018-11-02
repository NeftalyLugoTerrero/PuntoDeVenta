import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Views
import SignIn from './views/signin/SignIn';
// import Home from './views/home/Home';
import Invoice from './views/invoice/Invoice';
import Inventory from './views/inventory/Inventory';
import Client from './views/client/Client';
import Provider from './views/provider/Provider';
import InvoiceHistory from './views/invoice_history/InvoiceHistory';
// import PushProduct from './views/push_product/PushProduct';
// import PushClient from './views/push_client/PushClient';
// import PurchaseHistory from './views/purchase_history/PurchaseHistory';
// import AccountsReceivable from './views/accounts_receivable/AccountsReceivable';


class App extends Component {
  render() {

    let sesion = true;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/views/signin?react=true' render={(props) => ( <SignIn /> )} />
            {/* <Route path='/views/home?react=true' render={(props) => ( <Home /> )} /> */}
            <Route path='/views/invoice?react=true' render={(props) => ( <Invoice /> )} />
            <Route path='/views/inventory?react=true' render={(props) => ( <Inventory /> )} />
            <Route path='/views/client?react=true' render={(props) => ( <Client /> )} />
            <Route path='/views/provider?react=true' render={(props) => ( <Provider /> )} />
            <Route path='/views/invoice_history?react=true' render={(props) => ( <InvoiceHistory /> )} />
            {/* <Route path='/views/push_product?react=true' render={(props) => ( <PushProduct /> )} /> */}
            {/* <Route path='/views/push_client?react=true' render={(props) => ( <PushClient /> )} /> */}
            {/* <Route path='/views/purchase_history?react=true' render={(props) => ( <PurchaseHistory /> )} /> */}
            {/* <Route path='/views/accounts_receivable?react=true' render={(props) => ( <AccountsReceivable /> )} /> */}

            <Route exact strict path='/' 
                render={(props) => ( 
                    sesion ? (
                        <Redirect to="/views/invoice?react=true"/>
                    ) : (
                        <Redirect to="/views/signin?react=true"/> )
                )} />
            <Route exact strict path=''
                render={(props) => ( 
                    sesion ? (
                        <Redirect to="/views/invoice?react=true"/>
                    ) : (
                        <Redirect to="/views/signin?react=true"/> )
                )} />
            
            {/* <Route component={Page404} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

// echo "# PuntoDeVenta" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/NeftalyLugoTerrero/PuntoDeVenta.git
// git push -u origin master
