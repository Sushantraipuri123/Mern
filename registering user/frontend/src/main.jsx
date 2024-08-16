import React from 'react'
import ReactDOM from 'react-dom';

import './index.css'

import { AuthProvider } from './store/Auth.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
     <AuthProvider>
     <App/>
     </AuthProvider>
  </React.StrictMode>,
)
