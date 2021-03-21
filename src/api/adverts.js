import client from './client';

const { REACT_APP_API_HOST: host, REACT_APP_IMAGE_BASE_URL } = process.env;

export const getAdverts = (filters) => {
  return client.get(`/adverts`, { params: filters });
};

export const getAdvert = (id) =>
  client.get(`/adverts/${id}`).then((response) => {
    if (response.data.result) {
      console.log(
        response.data.result.image,
        `${REACT_APP_IMAGE_BASE_URL}/${response.data.result.image}`,
      );
      response.data.result.image = `${REACT_APP_IMAGE_BASE_URL}/${response.data.result.image}`;
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

export const getAdvertsUser = (id) => {
    return client.get(`/adverts-user/${id}`).then(res => {
        console.log(res.data);
        return res.data;
    })
}

export const reserved = (id) => {
    return client.put(`/advert-reserved/${id}`).then(res => {
        console.log(id);
        console.log(res.data.reserved);
        return res.data;
    })
}

export const sold = (id) => {
    return client.put(`/advert-sold/${id}`).then(res => {
        console.log(res.data.sold);
        return res.data;
    })
}

