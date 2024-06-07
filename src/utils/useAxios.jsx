import axios from 'axios';
// import KeycloakContext from 'contexts/KeycContext';
// import { useContext } from 'react';

const useAxios = () => {
  // const keycloak = useContext(KeycloakContext);
  // const access_token = keycloak.token;
  const access_token = localStorage.getItem('token');
  // console.log(access_token, 'access_token============>');
  // localStorage.setItem('token', access_token);
  // const updateToken = async () => {
  //   try {
  //     await keycloak.updateToken(300);
  //     keycloak.login();
  //   } catch (error) {
  //     console.log('Athentication Error');
  //   }
  // };

  const axiosInstance = axios.create({
    baseURL: 'https://api.accalberta.ca/api/v1/'
  });

  axiosInstance.interceptors.request.use(async (config) => {
    if (!access_token) {
      // await updateToken();
      window.alert('accesstoken error');
    }
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  });

  return axiosInstance;
};

export default useAxios;
