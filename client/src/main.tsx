import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AuthProvider } from 'react-auth-kit';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* set to true when doing https */}

    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}> 
      <App/>
    </AuthProvider>



    {/* <App/> */}
  </React.StrictMode>,
)
