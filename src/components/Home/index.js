import React from 'react';
// import ListAuthors from '../Author/ListAuthors';
// import Listinvoices from '../Book/Listinvoices';

const Home = props => {
  return (
    <>
      <h2>This is a home page of Billing Portal</h2>
      <p> Welcome  </p>

      {/* <div style={{ width: '50%', float: 'left' }}>
        <h3>invoices</h3>
        <Listinvoices invoices={props.invoices} />
      </div>

      <div style={{ width: '50%', float: 'right' }}>
        <h3>Authors</h3>
        <ListAuthors authors={props.authors} />
      </div> */}
    </>
  );
};

export default Home;

// Maybe it makes more sense to have this component as functional.
// Find below how we did it on the class:

// export default class Home extends React.Component {
//   render() {
//     console.log('do i have authors: ', this.props);
//     return (
//       <>
//         <h2> This is a home page of BookClub! 📚</h2>
//         <p> Welcome to Server-Client demo app! This is your favorite app forever! 🚀 </p>

//         <div style={{ width: '50%', float: 'left' }}>
//           <h3>invoices</h3>
//           <Listinvoices invoices={this.props.invoices} />
//         </div>

//         <div style={{ width: '50%', float: 'right' }}>
//           <h3>Authors</h3>
//           <ListAuthors authors={this.props.authors} />
//         </div>
//       </>
//     );
//   }
// }
