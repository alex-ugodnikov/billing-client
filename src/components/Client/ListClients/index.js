import React from 'react';
import { Link } from 'react-router-dom';
import CLIENT_SERVICE from '../../../services/ClientService';

const ListClients = props => {

  function showClients() {

    function deleteClient (clientId) {
      CLIENT_SERVICE.deleteClient(clientId)
        .then(() => {
          props.updateAfterDelete(clientId, 'clients');
        })
        .catch(err => console.log(err));
    };  

    return props.clients.map(client => {
      return (
        <div key={client._id} style={{ "display": "flex" }}>
          <p>
            <Link to={{ pathname: `clients/${client._id}/details`, client }} >{client.firstName} {client.lastName}</Link>
            &nbsp;/ {client.company}</p>&nbsp;
          <Link to={{ pathname: `clients/${client._id}/edit`, client }} key={client._id}>
            <p>Edit</p>
          </Link>&nbsp;
          <p><button onClick={() => deleteClient(client._id)}>Delete</button></p>
        </div>
      )
    })
  }


  return (
    <div>
      {showClients()}
    </div>
  );
};

export default ListClients;
