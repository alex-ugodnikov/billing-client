import React from 'react';
import {Link} from 'react-router-dom'

const ListClients = props => {
  return (
    <div>
          {props.clients.map(client => (
            <div key={client._id} style={{"display":"flex"}}>            
            <p>{client.firstName} {client.lastName} / {client.company}</p>&nbsp;
              <Link to={{pathname:`clients/${client._id}`, client}} key={client._id}>
              <p>Edit</p>
              </Link>&nbsp;
              <p><button onClick={() => this.deleteClient(client._id)}>Delete</button></p>            
            </div>
          ))}
    </div>
  );
};

export default ListClients;
