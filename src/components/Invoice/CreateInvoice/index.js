import React from 'react';

import INVOICE_SERVICE from '../../../services/InvoiceService';

export default class CreateInvoice extends React.Component {
  state = {
    title: '',
    description: '',
    client: '',
    amount: 0,
    paymentLink: '',
    dateAdded: '',
    message: null
    // authors: [] // in case you want to have a call to server in componentDidMount, you need authors array in the state
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { title, description, client, amount, paymentLink, dateAdded } = this.state;

    INVOICE_SERVICE.createInvoice({ title, description, client, amount, paymentLink, dateAdded })
      .then(responseFromServer => {
        const { invoice } = responseFromServer.data;
        this.props.onInvoicesChange(invoice);
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {

    const { title, description, client, amount, paymentLink, dateAdded, message } = this.state;

    return (
      <section>
        <h2> Create new Invoice </h2>

        <form onSubmit={this.handleFormSubmission}>
          <label>
            Title
            <input
              name='title'
              type='text'
              placeholder='InvoiceTitle'
              value={title}
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            Description
            <textarea
              name='description'
              type='text'
              placeholder='Put some description here...'
              value={description}
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            Client
            <select value={this.state.client} name='client' onChange={this.handleInputChange}>
              <option>Choose Client</option>

              {this.props.clients.map(client => (
                <option value={client._id} key={client._id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Amount
            <input
              name='amount'
              type='number'
              placeholder=''
              value={amount}
              onChange={this.handleInputChange}
            />
          </label> 

          <label>
            paymentLink
            <input
              name='paymentLink'
              type='text'
              placeholder=''
              value={paymentLink}
              onChange={this.handleInputChange}
            />
          </label>                 

          <button>Create Invoice</button>
        </form>

        {message && <div>{message}</div>}
      </section>
    );
  }
}
