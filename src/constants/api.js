import axios from 'axios';
// import https from 'https';
// import { ENDPOINT } from '../helper/constant';

export const todoList = axios.create({
  baseURL: 'https://notes-app-back-end-inky.vercel.app/',
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: true,
  // }),
});

// Add a request interceptor
todoList.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const auth = AuthData();
    // if (auth?.authorization) {
    //   config.headers.Authorization = 'Basic ' + auth.authorization;
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
todoList.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data ? response?.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response);
  }
);
