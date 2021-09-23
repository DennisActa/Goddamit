import React, { useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../contexts/loginContext';

export default function SignUp() {
    const history = useHistory();

    const { user, setUser, isAuth } = useContext(LoginContext);

    useEffect(() => {
        axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        axiosInstance.defaults.headers['Authorization'] = null;
        setUser('');
        history.push('/login');
    });
    return <div>Logout</div>;
}