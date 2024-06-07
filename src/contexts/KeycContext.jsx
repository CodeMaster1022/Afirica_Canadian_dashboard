import keycloak from 'pages/auth/keycloak';
import { createContext } from 'react';

const KeycloakContext = createContext(keycloak);
export default KeycloakContext;
