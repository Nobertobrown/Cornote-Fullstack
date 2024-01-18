import React from 'react'
import ReactDOM from 'react-dom/client'
import './sass/index.scss'
import { RouterProvider } from "react-router-dom";
import { router } from './utilities/browser-router.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { getConfig } from "./config";

const onRedirectCallback = (appState) => {
  // Use appState.returnTo to redirect to the desired route
  window.location.replace(appState?.returnTo || window.location.pathname);
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    scope:config.scope,
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
