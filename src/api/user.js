import client from "./client";

export const getUser = (id) =>
  client.get(`/user/${id}`).then((response) => {
    return response.data;
  });
