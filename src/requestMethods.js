import axios from 'axios';
import { store } from './redux/store';

const BASE_URL= "https://imart-api.onrender.com"
// const token=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
    // const TOKEN=token===null?null:token.acessToken;
    

// const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDg5ZjgzYzk4M2I5YTkzNjY4ZDkzNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NjYwOTAxNSwiZXhwIjoxNjk2ODY4MjE1fQ.-_SiIpOmw_5qFkwSTaivWqWQNa1SONHd39fd2SJDGA0"

export const publicRequest =axios.create({

    baseURL:BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Add an Axios interceptor to update the headers for every request
userRequest.interceptors.request.use(
  (config) => {
    const TOKEN = store.getState().user.currentUser.acessToken;
    config.headers['token'] = `Bearer ${TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const userRequest =axios.create({
//     baseURL:BASE_URL,
//     headers:{token:`Bearer ${TOKEN}`}
// });

