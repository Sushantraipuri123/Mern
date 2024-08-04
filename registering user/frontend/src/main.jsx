import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import App from './App.jsx'
import './index.css'
import Layout from './Layout';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login.jsx';
import { AuthProvider } from './store/Auth.jsx';
import Logout from './components/Logout.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
     <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='register' element={<Register/>} />
          <Route path='login' element={<Login/>} />
          <Route path='logout' element={<Logout/>} />
        </Route>
      </Routes>
    </Router>
     </AuthProvider>
  </React.StrictMode>,
)
