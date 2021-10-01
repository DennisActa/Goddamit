import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import './index.css';
import axiosInstance from './axios';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Single from './components/posts/single';
import Search from './components/posts/search';
import Admin from './Admin';
import Create from './components/admin/create';
import Edit from './components/admin/edit';
import Delete from './components/admin/delete';
import { LoginContext } from './contexts/loginContext';

export default function Routing() {

    const [user, setUser] = useState(localStorage.getItem('user'));
    const isAuth = !!user;

    const [userInfo, setUserInfo] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    useEffect(() => {
        if(isAuth) {
            axiosInstance.get('user/info/').then((res) => {
                const userInfo = res.data[0];
                setUserInfo({ ...userInfo });
            });
        }       
    }, [setUserInfo]);

    return (
        <Router>
            <React.StrictMode>  
                <LoginContext.Provider value={{ user, setUser, isAuth, userInfo, setUserInfo }}>            
                    <Header />                    
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route exact path="/admin" component={isAuth ? () => <Admin /> : () => <Redirect to="/login" />} /> 
                        <Route exact path="/admin/create" component={isAuth ? () => <Create /> : () => <Redirect to="/login" />} /> 
                        <Route exact path="/admin/edit/:slug" component={isAuth ? () => <Edit /> : () => <Redirect to="/login" />} /> 
                        <Route exact path="/admin/delete/:slug" component={isAuth ? () => <Delete /> : () => <Redirect to="/login" />} /> 
                        <Route exact path="/register" component={Register} />                    
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/post/:slug" component={Single} />                  
                        <Route exact path="/search/" component={Search} />                                         
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