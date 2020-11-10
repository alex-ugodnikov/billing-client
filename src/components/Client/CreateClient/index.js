import React from 'react';

import CLIENT_SERVICE from '../../../services/ClientService';

export default class CreateClient extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    nationality: '',
    birthday: '',
    pictureUrl: '',
    message: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // ES6 way - the same as above:
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };

  handleFormSubmission = event => {
    event.preventDefault();

    const { firstName, lastName, nationality, birthday, pictureUrl } = this.state;

    CLIENT_SERVICE.createClient({ firstName, lastName, nationality, birthday, pictureUrl })
      .then(responseFromServer => {
        const { client } = responseFromServer.data;

        this.props.onClientsChange(client);
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    const { firstName, lastName, nationality, birthday, pictureUrl, message } = this.state;
    return (
      <>
        <section>
          <h2> Create new Client </h2>

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
              Nationality
              <input
                name='nationality'
                type='text'
                placeholder='English'
                value={nationality}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Birthday
              <input
                name='birthday'
                type='date'
                placeholder='10/28/1900'
                value={birthday}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Picture Url
              <input
                name='pictureUrl'
                type='text'
                placeholder='www.cool-image.com'
                value={pictureUrl}
                onChange={this.handleInputChange}
              />
            </label>

            <button> Create Client </button>
          </form>

          {message && <div>{message}</div>}
        </section>
      </>
    );
  }
}
