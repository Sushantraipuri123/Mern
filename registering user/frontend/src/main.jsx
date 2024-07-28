import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import App from './App.jsx'
import './index.css'
import Layout from './Layout';
import Home from './components/Home';
import Register from './components/Register';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='register' element={<Register/>} />
         
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
