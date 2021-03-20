import client, {setAuthorizationHeader} from './client';
import {useSelector} from 'react-redux';
import {getLoggedUser} from '../store/selectors';
import {logout} from './auth';


export const getUser = (id) => {
  return client.get(`/user/${id}`).then((res) => {
    return res.data.result;
  });
};

export const editUser = (id, data, token) => {
    return client.put(`/user/${id}`, data, client(setAuthorizationHeader(token))).then(res => {
        return res;
    })
};


export const deleteUser = (id, token) => {
    return client.delete(`/user/${id}`, client(setAuthorizationHeader(token))).then(res => {
        return res;
    })
};
