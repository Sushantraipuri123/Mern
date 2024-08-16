import Logout from './components/Logout.jsx';
import About from './components/About.jsx';
import Admin from './components/Admin.jsx';
import { useAuth } from './store/Auth.jsx';
import Layout from './Layout';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyProducts from './components/MyProducts.jsx';
function App() {

  const { isLoggedin } = useAuth();

  return(
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='register' element={<Register/>} />
          <Route path='login' element={<Login/>} />
          <Route path='logout' element={<Logout/>} />
          <Route path='about' element={<About/>} />
          <Route path='myProducts' element={<MyProducts/>} />
          <Route path="admin" element={isLoggedin ? <Admin /> : <Login />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
  }

export default App
