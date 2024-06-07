import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  realm: 'african-community-realm',
  url: 'https://api.accalberta.ca/keycloak-auth/',
  clientId: 'frontend-client'
});

export default keycloak;
