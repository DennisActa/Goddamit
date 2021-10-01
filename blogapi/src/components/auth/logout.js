import React, { useEffect, useContext } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../contexts/loginContext';

export default function Logout() {
    const history = useHistory();

    const { user, setUser, setUserInfo } = useContext(LoginContext);

    useEffect(() => {
        axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        axiosInstance.defaults.headers['Authorization'] = null;
        setUser(false);
        setUserInfo({
            id: '',
            first_name: '',
            last_name: '',
            email: '',
        });
        history.push('/login');
    });
    return <div>Logout</div>;
}