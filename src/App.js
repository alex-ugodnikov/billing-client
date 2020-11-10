import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AUTH_SERVICE from './services/AuthService';
import CLIENT_SERVICE from './services/ClientService';
import INVOICE_SERVICE from './services/InvoiceService';

import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';

import Home from './components/Home';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import CreateClient from './components/Client/CreateClient';
import CreateInvoice from './components/Invoice/CreateInvoice';
import InvoiceDetails from './components/Invoice/InvoiceDetails';
import UpdateInvoice from './components/Invoice/UpdateInvoice';

export default class App extends React.Component {
  state = {
    currentUser: null,
    clients: [],
    invoices: []
  };

  componentDidMount = () => {
    Promise.all([CLIENT_SERVICE.getClients(), INVOICE_SERVICE.getInvoices(), AUTH_SERVICE.getAuthenticatedUser()])
      .then(responseFromServer => {
        const { clients } = responseFromServer[0].data;
        const { invoices } = responseFromServer[1].data;
        const { user } = responseFromServer[2].data;

        this.setState({ clients, invoices, currentUser: user });
      })
      .catch(err => console.log(err));
  };

  updateUser = user => {
    this.setState({ currentUser: user });
  };

  updateClients = client => {
    const updatedClients = [...this.state.clients, client];
    this.setState({ clients: updatedClients });
  };

  updateInvoices = invoice => {
    const updatedInvoices = [...this.state.invoices, invoice];
    this.setState({ invoices: updatedInvoices });
  };

  updateInvoicesAfterDelete = id => {

    const updatedInvoices = [...this.state.invoices];

    updatedInvoices.splice(
      updatedInvoices.findIndex(invoice => invoice._id === id),
      1
    );

    this.setState({ invoices: updatedInvoices });
  };

  render() {
    console.log('user in client: ', this.state.currentUser);
    return (
      <div className='App'>
        <BrowserRouter>
          <nav>
            <NavBar currentUser={this.state.currentUser} onUserChange={this.updateUser} />
          </nav>
          <Switch>
            {/* <Route path='/somePage' component={someComponent} /> */}
            <Route exact path='/' render={props => <Home clients={this.state.clients} invoices={this.state.invoices} />} />
            <Route path='/signup-page' render={props => <Signup {...props} onUserChange={this.updateUser} />} />
            <Route path='/login-page' render={props => <Login {...props} onUserChange={this.updateUser} />} />

            <ProtectedRoute
              path='/profile'
              authorized={this.state.currentUser}
              redirect={'/signup-page'}
              render={props => <Profile {...props} currentUser={this.state.currentUser} />}
            />

            <ProtectedRoute
              path='/clients/create'
              authorized={this.state.currentUser}
              redirect={'/login-page'}
              render={props => <CreateClient {...props} onClientsChange={this.updateClients} />}
            />

            <ProtectedRoute
              path='/invoices/create'
              authorized={this.state.currentUser}
              redirect={'/login-page'}
              render={props => <CreateInvoice {...props} clients={this.state.clients} onInvoicesChange={this.updateInvoices} />}
            />

            <ProtectedRoute
              path='/invoices/:id/edit'
              authorized={this.state.currentUser}
              redirect={'/login-page'}
              render={props => <UpdateInvoice {...props} clients={this.state.clients} />}
            />

            <Route
              path='/invoices/:id'
              render={props => (
                <InvoiceDetails
                  {...props}
                  currentUser={this.state.currentUser}
                  onInvoicesChangeAfterDelete={this.updateInvoicesAfterDelete}
                />
              )}
            />
          </Switch>

          <footer style={{ clear: 'both' }}>Copyright 2020. All Right Reserved</footer>
        </BrowserRouter>
      </div>
    );
  }
}
