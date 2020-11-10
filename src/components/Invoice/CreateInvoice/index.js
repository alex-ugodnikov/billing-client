import React from 'react';

import INVOICE_SERVICE from '../../../services/InvoiceService';

export default class CreateInvoice extends React.Component {
  state = {
    title: '',
    description: '',
    client: '',
    rating: '',
    message: null
    // authors: [] // in case you want to have a call to server in componentDidMount, you need authors array in the state
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { title, description, client, rating } = this.state;

    INVOICE_SERVICE.createInvoice({ title, description, client, rating })
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

  //   in case you don't care for one more call tp your server, you can make it in componentDidMount as follows:
  //   componentDidMount = () => {
  //     CLIENT_SERVICE.getAuthors()
  //       .then(responseFromServer => {
  //         const { authors } = responseFromServer.data;
  //         this.setState({ authors });
  //       })
  //       .catch(err => console.log(err));
  //   };

  render() {
    console.log('clients: ', this.props.clients);
    const { title, description, client, rating, message } = this.state;

    return (
      <section>
        <h2> Create new Invoice </h2>

        <form onSubmit={this.handleFormSubmission}>
          <label>
            Title
            <input
              name='title'
              type='text'
              placeholder='InvoiceDescription'
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

              {/* {this.state.authors.map(author => ()} -> in case you would go for additional call in componentDidMount*/}

              {this.props.clients.map(client => (
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

          <button>Create Invoice</button>
        </form>

        {message && <div>{message}</div>}
      </section>
    );
  }
}
