import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import { useState, useEffect } from 'react';
import Locales from 'components/Locales';
// import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';
import Keycloak from 'keycloak-js';
import React from 'react';
import KeycloakContext from 'contexts/KeycContext';
import { Box } from '@mui/material';

// auth-provider
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import Waiting from 'components/waiting/waiting';
// ==============================|| APP - THEME, ROUTER, LOCAL ||===============              =============== //

const App = () => {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const keycloak = new Keycloak({
      realm: 'african-community-realm',
      url: 'https://api.accalberta.ca/keycloak-auth/',
      // clientId: 'frontend-client'
      clientId: 'test2'
    });
    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      setKeycloak(keycloak);
      setAuthenticated(authenticated);
    });
    console.log(keycloak);
  }, []);
  useEffect(() => {
    const initialize = keycloak?.didInitialize;
    console.log(initialize, 'initialize');
    if (keycloak && initialize) {
      localStorage.setItem('token', keycloak?.token);
      // localStorage.setItem('user', keycloak?.subject);
      keycloak.onTokenExpired = () => keycloak.updateToken(600);
    }
    return () => {
      if (keycloak) keycloak.onTokenExpired = () => {};
    };
  }, [keycloak]);
  return (
    <>
      <KeycloakContext.Provider value={keycloak}>
        {keycloak ? (
          <>
            {authenticated ? (
              <>
                <ThemeCustomization>
                  <Locales>
                    <ScrollTop>
                      <Notistack>
                        <RouterProvider router={router} />
                        <Snackbar />
                      </Notistack>
                    </ScrollTop>
                  </Locales>
                </ThemeCustomization>
              </>
            ) : (
              <>
                <div>Unable to authenticate!</div>
              </>
            )}
          </>
        ) : (
          <>
            <Box
              sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#212121'
              }}
            >
              <Waiting />
            </Box>
          </>
        )}
      </KeycloakContext.Provider>
    </>
  );
};

export default App;
