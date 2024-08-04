import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
         
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
