import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { CurrentColorProvider } from './components/CurrentColorContext';

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Auth0Provider
        domain='dev-l-vojqde.us.auth0.com'
        clientId='W3STxk8RtFkZgG99nNhqyvXLvXIHG3ti'
        redirectUri='http://localhost:3000/'
        >
    <CurrentColorProvider>
            <App />
    </CurrentColorProvider>
        </Auth0Provider>
);
