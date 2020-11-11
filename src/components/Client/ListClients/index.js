import React from 'react';

const ListClients = props => {
  return (
    <section>
      <ul>
        <ul>
          {props.clients.map(client => (
            <li key={client._id}>
              {client.firstName} {client.lastName}
            </li>
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default ListClients;
