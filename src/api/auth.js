import client from "./client";
import storage from "../utils/storage";

export const login = (credentials) =>
  client.login(credentials).then((auth) => {
    if (credentials.remember) {
      storage.set("auth", auth);
    }
    return auth;
  });

export const register = (data) =>
  client.register(data).then((res) => {
    return res;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove("auth");
  });

/*
export const forgot = (data) =>
  client
    .forgot(data)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
*/
