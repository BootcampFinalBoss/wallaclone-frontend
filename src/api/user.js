import client from './client';

export const getUser = (id) => {
  return client.get(`/user/${id}`).then((res) => {
    return res.data.result;
  });
};
