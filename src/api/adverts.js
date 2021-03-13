import client from './client';

const { REACT_APP_API_HOST: host } = process.env;

export const getAdverts = (filters) => {
  return client.get(`/adverts`, { params: filters });
};

export const getAdvert = (id) =>
  client.get(`/adverts/${id}`).then((response) => {
    if (response.data.result) {
      response.data.result.image = `${host}/${response.data.result.image}`;
    }
    return response;
  });

export const getTags = () => client.get('/tags');

export const createAdvert = (advert) => {
  const formData = new FormData();
  Object.entries(advert).forEach(([key, value]) => formData.append(key, value));
  return client.post(`/adverts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editAdvert = (advert) =>
  client.put(`/adverts/${advert._id}`, advert);

export const deleteAdvert = (id) => client.delete(`/adverts/${id}`);
