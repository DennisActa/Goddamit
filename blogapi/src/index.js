import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import { LoginContext } from './contexts/loginContext';

export default function Routing() {

    const [isAuth, setIsAuth] = useState(false);

    return (
        <Router>
            <React.StrictMode>  
                <LoginContext.Provider value={ isAuth, setIsAuth }>            
                    <Header />                    
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route exact path="/register" component={Register} />                    
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />                    
                    </Switch>
                    <Footer />      
                </LoginContext.Provider>      
            </React.StrictMode>
        </Router>
    );

}   


ReactDOM.render(<Routing></Routing>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();