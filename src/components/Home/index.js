import React from 'react';
import ListClients from '../Client/ListClients';
// import Listinvoices from '../Book/Listinvoices';

const Home = props => {
  return (
    <>
      <h2>This is a home page of Billing Portal</h2>

      {/* <div style={{ width: '50%', float: 'left' }}>
        <h3>invoices</h3>
        <Listinvoices invoices={props.invoices} />
      </div>*/}

      <div>
        <h3>Clients</h3>
        <ListClients clients={props.clients} />
      </div> 
    </>
  );
};

export default Home;

