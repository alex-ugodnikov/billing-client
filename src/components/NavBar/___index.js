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
    <div class="nav-wrapper">
    <Link to='/' class="brand-logo">Home</Link>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
       {(props.currentUser && (
         <>
         <li>Welcome, <span>{props.currentUser.username}</span></li>
         <li><Link to='/profile'>Edit Profile</Link></li>
         <li><Link to='/clients/create'>Create Client</Link></li>
         <li><Link to='/invoices/create'>Create Invoice</Link></li>
         <li><button onClick={logoutAndLiftUserState}>Logout</button></li>
         </>
       )) || (
         <>
           <li><Link to='/signup-page'>Signup</Link></li>
           <li><Link to='/login-page'>Login</Link></li>
         </>
       )}
       </ul>
    </div>
  </nav>
        

    // <nav>
    //   <Link to='/'>
    //     <h1>Billing Portal</h1>
    //   </Link>


    //   {(props.currentUser && (
    //     <>
    //     <p>Welcome, <span>{props.currentUser.username}</span></p>
    //       <p><Link to='/profile'>Edit Profile</Link></p>
    //       <p><Link to='/clients/create'>Create Client</Link></p>
    //       <p><Link to='/invoices/create'>Create Invoice</Link></p>
    //       <button onClick={logoutAndLiftUserState}>Logout</button>
    //     </>
    //   )) || (
    //     <>
    //       <Link to='/signup-page'>Signup</Link>
    //       <Link to='/login-page'>Login</Link>
    //     </>
    //   )}
    // </nav>
  );
};

export default NavBar;
