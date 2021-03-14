import client from './client';

const { REACT_APP_API_HOST: host } = process.env;



export const getUser = (id, token) => {
    const header =
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return client.get(`/user/${id}`, header).then(res => {
        return res.data
    })
};
