import client, {setAuthorizationHeader} from './client';
import {useSelector} from 'react-redux';
import {getLoggedUser} from '../store/selectors';

const { REACT_APP_API_HOST: host } = process.env;


export const getUser = (id, token) => {
        return client.get(`/user/${id}`, client(setAuthorizationHeader(token))).then(res => {
        return res.data
    })
};

export const editUser = (id, data, token) => {
    return client.put(`/user/${id}`, data, client(setAuthorizationHeader(token))).then(res => {
        return res.data;
    })
};


export const deleteUser = (id, token) => {
    return client.delete(`/user/${id}`, client(setAuthorizationHeader(token))).then(res => {
        return res;
    })
};
