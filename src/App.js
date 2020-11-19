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
import ClientDetails from './components/Client/ClientDetails';
import UpdateInvoice from './components/Invoice/UpdateInvoice';
import UpdateClient from './components/Client/UpdateClient';

/* Material UI */
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends React.Component {
  state = {
    currentUser: null,
    clients: [],
    invoices: []
  };

  componentDidMount = () => {
    Promise.all([CLIENT_SERVICE.getClients(), AUTH_SERVICE.getAuthenticatedUser()])
      .then(responseFromServer => {
        const { clients } = responseFromServer[0].data;
        const { user } = responseFromServer[1].data;

        this.setState({ clients, currentUser: user });
      })
      .catch(err => console.log(err));
  };

  updateUser = user => {
    this.setState({ currentUser: user });
    this.onClientsChange();
  };

  // updateClients = client => {
  //   const updatedClients = [...this.state.clients, client];
  //   this.setState({ clients: updatedClients });
  // }; 

  onClientsChange = () => {
    CLIENT_SERVICE.getClients()
      .then(clientsFromDb => {
        this.setState({ clients: clientsFromDb.data.clients })
      })
      .catch(err => { console.log(err) })
  }

  updateInvoices = invoice => {
    const updatedInvoices = [...this.state.invoices, invoice];
    this.setState({ invoices: updatedInvoices });
  };

  updateAfterDelete = (id, propToChange) => {
    const updatedProperty = [...this.state[propToChange]];
    updatedProperty.splice(
      updatedProperty.findIndex(property => property._id === id),
      1
    );
    this.setState({ [propToChange]: updatedProperty });
  };


  render() {
    return (
      <>
        <BrowserRouter>

          <NavBar currentUser={this.state.currentUser} onUserChange={this.updateUser} />

          <Container component="main" maxWidth="md">
            <CssBaseline />

            {console.log(">>>>>>>> App.js", this.state.clients)}
            <Switch>
              <Route exact path='/' render={props => <Home {...props} currentUser={this.state.currentUser} updateAfterDelete={this.updateAfterDelete} clients={this.state.clients} invoices={this.state.invoices} />} />
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
                render={props => <CreateClient {...props} onClientsChange={this.onClientsChange} />}
              />

              <ProtectedRoute
                path='/invoices/create'
                authorized={this.state.currentUser}
                redirect={'/login-page'}
                render={props => <CreateInvoice {...props} clients={this.state.clients} onInvoicesChange={this.updateInvoices} />}
              />

              <ProtectedRoute
                path='/invoices/:id'
                authorized={this.state.currentUser}
                redirect={'/login-page'}
                render={props => <UpdateInvoice {...props} clients={this.state.clients} />}
              />

              <ProtectedRoute
                path='/clients/:id/details'
                authorized={this.state.currentUser}
                redirect={'/login-page'}
                render={props => <ClientDetails {...props} clients={this.state.clients} onClientsChange={this.onClientsChange} />}
              />

              <ProtectedRoute
                path='/clients/:id/edit'
                authorized={this.state.currentUser}
                redirect={'/login-page'}
                render={props => <UpdateClient {...props} clients={this.state.clients} onClientsChange={this.onClientsChange} />}
              />

            </Switch>

            <footer style={{ clear: 'both', marginTop: '100px', fontSize: '10px' }}>Copyright 2020. All Right Reserved</footer>
          </Container>
        </BrowserRouter>
      </>

    );
  }
}
