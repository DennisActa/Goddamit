import React, { useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../contexts/loginContext';

export default function SignUp() {
    const history = useHistory();

    const { setIsAuth } = useContext(LoginContext);

    useEffect(() => {
        axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        setIsAuth(false);
        history.push('/login');
    });
    return <div>Logout</div>;
}