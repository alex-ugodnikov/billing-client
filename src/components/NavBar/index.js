import React from 'react';

import { Link } from 'react-router-dom';

import AUTH_SERVICE from '../../services/AuthService';

const NavBar = props => {
  const logoutAndLiftUserState = () => {
    AUTH_SERVICE.logout()
      .then(() => props.onUserChange(null))
      .catch(err => console.log(err));
  };

  return (
    <nav>
      <Link to='/'>
        <h1>Billing Portal</h1>
      </Link>

      {(props.currentUser && (
        <>
        <p>Welcome, <span>{props.currentUser.username}</span></p>
          <p><Link to='/profile'>Edit Profile</Link></p>
          <p><Link to='/clients/create'>Create Client</Link></p>
          <p><Link to='/invoices/create'>Create Invoice</Link></p>
          <button onClick={logoutAndLiftUserState}>Logout</button>
        </>
      )) || (
        <>
          <Link to='/signup-page'>Signup</Link>
          <Link to='/login-page'>Login</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
