import React from 'react';
import CLIENT_SERVICE from '../../../services/ClientService';
import {Link} from 'react-router-dom'

export default class UpdateClient extends React.Component {
  constructor(props) {
    super(props);
    const { _id, firstName, lastName, email, company } = this.props.location.client;
    this.state = {
      _id,
      firstName,
      lastName,
      email,
      company
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { _id, firstName, lastName, email, company } = this.state;

    CLIENT_SERVICE.updateClient(_id, { firstName, lastName, email, company })
      .then(responseFromServer => {
        const { client } = responseFromServer.data;
        this.props.onClientsChange(client);
        this.props.history.push('/');
        //this.props.history.push(`/clients/${client._id}`);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { firstName, lastName, email, company } = this.state;

    return (
      <section>

        <h2> <Link to='/'>Home</Link> / Edit Client </h2>

        <form onSubmit={this.handleFormSubmission}>
          <label>
            First Name
            <input name='firstName' type='text' value={firstName} onChange={this.handleInputChange} />
          </label>

          <label>
            Last Name
            <input name='lastName' type='text' value={lastName} onChange={this.handleInputChange} />
          </label>          

          <label>
            Email
            <textarea name='email' type='text' value={email} onChange={this.handleInputChange} />
          </label>

          <label>
            Company
            <textarea name='company' type='text' value={company} onChange={this.handleInputChange} />
          </label>          

          <button>Save Changes</button>
        </form>
      </section>
    );
  }
}
