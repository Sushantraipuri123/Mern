import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import { AuthProvider } from './store/Auth.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
 <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
         <Route path='register' element={<Register/>}/>
         <Route path='login' element={<Login/>}/>
         <Route path='Logout' element={<Logout/>}/>
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  </React.StrictMode>,
)
