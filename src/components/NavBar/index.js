import * as React from "react"
import { AppBar, Toolbar, Button, List, ListItem, ListItemText } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import { Container } from "@material-ui/core"
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../../services/AuthService';

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    }
});


const NavBar = props => {

    const logoutAndLiftUserState = () => {
        AUTH_SERVICE.logout()
            .then(() => props.onUserChange(null))
            .catch(err => console.log(err));
    };

    const classes = useStyles(); // Add this

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                    <div><IconButton edge="start" color="inherit" aria-label="home">
                        <Link to='/' className={classes.linkText}><Home fontSize="large" /></Link>
                    </IconButton></div>
  

                    {(props.currentUser && (
        <div style={{display:'flex',alignItems:'center'}}>
        {/* <p>Welcome, <span>{props.currentUser.username}</span></p> */}
          <Link to='/profile'><Button className={classes.linkText}>View Profile</Button></Link>
          <Link to='/clients/create'><Button className={classes.linkText}>Create Client</Button></Link>
          <Link to='/invoices/create'><Button className={classes.linkText}>Create Invoice</Button></Link>
          <Button onClick={logoutAndLiftUserState} className={classes.linkText}>Logout</Button>
        </div>
      )) || (
        <div style={{display:'flex'}}>
          <Button><Link to='/signup-page' className={classes.linkText}>Signup</Link></Button>
          <Button><Link to='/login-page' className={classes.linkText}>Login</Link></Button>
        </div>
      )}
                </Container>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar