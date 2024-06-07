import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import KeycloakContext from 'contexts/KeycContext';
const Logout = () => {
  localStorage.removeItem('token');
  const keycloak = React.useContext(KeycloakContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
    keycloak.logout();
  }, [keycloak, navigate]);

  // const logout = () => {
  //   console.log(keycloak);
  //   navigate('/');
  //   keycloak.logout();
  // };

  // return <button onClick={logout}>Logout</button>;
};
export default Logout;
