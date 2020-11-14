import React from 'react';

import CLIENT_SERVICE from '../../../services/ClientService';

export default class CreateClient extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    message: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { firstName, lastName, email, company, password } = this.state;

    CLIENT_SERVICE.createClient({ firstName, lastName, email, company, password })
      .then(responseFromServer => {
        this.props.onClientsChange();
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    const { firstName, lastName, email, company, password, message } = this.state;
    return (
      <>
        <section>
          <h2> Create New Client </h2>

          <form onSubmit={this.handleFormSubmission}>
            <label>
              First Name
              <input
                name='firstName'
                type='text'
                placeholder='Alex'
                value={firstName}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Last Name
              <input
                name='lastName'
                type='text'
                placeholder='Smith'
                value={lastName}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Company
              <input
                name='company'
                type='text'
                placeholder='Apple'
                value={company}
                onChange={this.handleInputChange}
              />
            </label>            

            <label>
              Email:
              <input
                name='email'
                type='email'
                placeholder='ana@ironhack.com'
                value={email}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Password:
              <input
                name='password'
                type='password'
                placeholder='**********'
                value={password}
                onChange={this.handleInputChange}
              />
            </label>

            <button>Create Client</button>
          </form>

          {message && <div>{message}</div>}
        </section>
      </>
    );
  }
}
