import React from 'react';
import { Link } from 'react-router-dom';

const Listinvoices = props => {
  return (
    <section>
      <ul>
        <ul>
          {props.invoices.map(invoice => (
            <Link to={`invoices/${invoice._id}`} key={invoice._id}>
              <li>{invoice.title}</li>
            </Link>
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default Listinvoices;
