import React from 'react';

import INVOICE_SERVICE from '../../../services/InvoiceService';

import { Link } from 'react-router-dom';

export default class InvoiceDetails extends React.Component {
  state = {
    invoice: {}
  };

  loadBookDetails = () => {
    INVOICE_SERVICE.getInvoiceDetails(this.props.match.params.id)
      .then(responseFromServer => {
        const { invoice } = responseFromServer.data;
        this.setState({ invoice });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadInvoiceDetails();
  }

  deleteInvoice = invoiceId => {
    INVOICE_SERVICE.deleteInvoice(invoiceId)
      .then(() => {
        this.props.onInvoicesChangeAfterDelete(invoiceId);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  render() {
    const { _id, title, description, client, rating } = this.state.invoice;
    return (
      <section>
        <h3>
          {title} by {client?.firstName} {client?.lastName}
        </h3>
        <b> {rating} </b>
        <p> {description} </p>
        {this.props.currentUser && (
          <>
            <Link
              to={{
                pathname: `/invoices/${_id}/edit`,
                invoice: this.state.invoice
              }}
            >
              Edit
            </Link>
            <br />
            <button onClick={() => this.deleteInvoice(_id)}>Delete</button>
          </>
        )}
      </section>
    );
  }
}
