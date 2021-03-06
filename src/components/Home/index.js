import React from 'react';
import ListClients from '../Client/ListClients';
// import Listinvoices from '../Book/Listinvoices';

const Home = props => {
  return (
    <>
      <h2>This is a home page of Billing Portal</h2>

      {props.currentUser &&   
      <div style={{ 'display': 'flex', 'flexFlow': 'column', 'alignItems': 'center' }}>
        <h3>Clients</h3>
        {/* {console.log(">>>>>", props)} */}
        <ListClients clients={props.clients} updateAfterDelete={props.updateAfterDelete}/>
      </div>
      }
    </>
  );
};

export default Home;

