import React from 'react';

import AUTH_SERVICE from '../../../services/AuthService';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  
  state = {
    email: '',
    password: '',
    message: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { email, password } = this.state;

    AUTH_SERVICE.login({ email, password })
      .then(responseFromServer => {
        const { user } = responseFromServer.data;

        // Lift the user object to the App.js
        this.props.onUserChange(user);

        // Redirect user to home page after successful sign up
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {

    const { classes } = this.props;

    return (
      <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <section>

          <form onSubmit={this.handleFormSubmission} className={classes.form}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleInputChange}
          />

{/* 
            <label>
              Email:
              <input
                name='email'
                type='email'
                placeholder='ana@ironhack.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Password:
              <input
                name='password'
                type='password'
                placeholder='**********'
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label> */}

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          </form>

          {/* if the message is not NULL then show the message */}
          {this.state.message && <div> {this.state.message} </div>}
        </section>
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(Login)

