import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { LoginContext } from '../contexts/loginContext';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbarTitle: {
        flexGrow: 1,
    }
}));

function Header() {
    const classes = useStyles(); 

    const { isAuth } = useContext(LoginContext);
    const { username } = useContext(LoginContext);

    return (
        <React.Fragment>            
            <CssBaseline />
            <AppBar 
                position="static" 
                color="default" 
                elevation={0} 
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography 
                        variant="h6" 
                        color="inherit" 
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        <Link 
                            component={NavLink}
                            to="/"
                            underline="none"
                            color="textPrimary"
                        >
                            BlogmeUp
                        </Link>
                    </Typography>
                    {!isAuth ?
                    <>
                    <nav>
                        <Link 
                            color="textPrimary"
                            className={classes.link}
                            component={NavLink}
                            to="/register"
                        >
                            Register
                        </Link>
                    </nav>                    
                        <Button 
                            href="#"
                            color="primary"
                            variant="outlined"
                            className={classes.link}
                            component={NavLink}
                            to="/login"
                        >
                            Login
                        </Button>
                    </>
                        :
                    <>
                        <p>Welcome, user</p>
                        <Button 
                            href="#"
                            color="primary"
                            variant="outlined"
                            className={classes.link}
                            component={NavLink}
                            to="/logout"
                        >
                            Logout
                        </Button>
                    </>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );  
}

export default Header;
