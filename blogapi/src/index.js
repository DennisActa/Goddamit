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

    //const [isAuth, setIsAuth] = useLocalStorage('access_token', false);
    const [initialized, setInitialized] = useState(false);
    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        isAuth: false,
    });

    useEffect(() => {
        (async() =>{
            try {
                const [userInfo] = await axiosInstance.get('user/info/').then(resp => resp.data);
                setUser({...userInfo, isAuth: true});
            } catch (ex) {
                // user not logged in
            } finally {
                setInitialized(true);
            }
        })();
    }, [setUser]);

    // // Hook
    // function useLocalStorage(key, initialValue) {
    //   // State to store our value
    //   // Pass initial state function to useState so logic is only executed once
    //   const [storedValue, setStoredValue] = useState(() => {
    //     try {
    //       // Get from local storage by key
    //       const item = localStorage.getItem(key);
    //       // Parse stored json or if none return initialValue          
    //       return item ? JSON.parse(item) : initialValue;          
    //     } catch (error) {
    //       // If error also return initialValue
    //       console.log(error);
    //       return initialValue;
    //     }
    //   });
    //   // Return a wrapped version of useState's setter function that ...
    //   // ... persists the new value to localStorage.
    //   const setValue = (value) => {
    //     try {
    //       // Allow value to be a function so we have same API as useState
    //       const valueToStore =
    //         value instanceof Function ? value(storedValue) : value;
    //       // Save state
    //       setStoredValue(valueToStore);
    //       // Save to local storage
    //       localStorage.setItem(key, JSON.stringify(valueToStore));
    //     } catch (error) {
    //       // A more advanced implementation would handle the error case
    //       console.log(error);
    //     }
    //   };

    //   return [storedValue, setValue];
    // }

    return (
        <Router>
            <React.StrictMode>  
                <LoginContext.Provider value={{ user, setUser }}>            
                    <Header />                    
                    <Switch>
                        <Route exact path="/" component={App} />
                        {initialized && <Route exact path="/admin" component={user.isAuth ? () => <Admin /> : () => <Redirect to="/login" />} /> }
                        {initialized && <Route exact path="/admin/create" component={user.isAuth ? () => <Create /> : () => <Redirect to="/login" />} /> }
                        {initialized && <Route exact path="/admin/edit/:slug" component={user.isAuth ? () => <Edit /> : () => <Redirect to="/login" />} /> }
                        {initialized && <Route exact path="/admin/delete/:slug" component={user.isAuth ? () => <Delete /> : () => <Redirect to="/login" />} /> }
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