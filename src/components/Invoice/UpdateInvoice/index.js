import React from 'react';

import INVOICE_SERVICE from '../../../services/InvoiceService';

export default class UpdateInvoice extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //     title: this.props.location.invoice.title ,
    //     description: this.props.location.invoice.description,
    //     author: this.props.location.invoice.author,
    //     rating: this.props.location.invoice.rating
    //   };

    const { _id, title, description, client, rating } = this.props.location.invoice;

    this.state = {
      _id,
      title,
      description,
      client,
      rating
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { _id, title, description, client, rating } = this.state;

    INVOICE_SERVICE.updateInvoice(_id, { title, description, client, rating })
      .then(responseFromServer => {
        const { invoice } = responseFromServer.data;
        this.props.history.push(`/invoices/${invoice._id}`);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { title, description, client, rating } = this.state;

    return (
      <section>
        <h2>Edit Invoice</h2>

        <form onSubmit={this.handleFormSubmission}>
          <label>
            Title
            <input name='title' type='text' value={title} onChange={this.handleInputChange} />
          </label>

          <label>
            Description
            <textarea name='description' type='text' value={description} onChange={this.handleInputChange} />
          </label>

          <label>
            Client
            <select value={client._id} name='client' onChange={this.handleInputChange}>
              <option></option>
              {this.props.authors.map(client => (
                <option value={client._id} key={client._id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </label>

          {/* <label>
            Rating
            <input
              name='rating'
              type='number'
              placeholder='5'
              value={rating}
              min='1'
              max='10'
              onChange={this.handleInputChange}
            />
          </label> */}

          <button>Save changes</button>
        </form>
      </section>
    );
  }
}
