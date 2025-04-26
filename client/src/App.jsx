import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your components
import LoginUser from './components/user/login';
import RegisterPage from './components/reg';
import UserHome from './components/user/userhome';
import AdminLogin from './components/admin/loginAdmin';
import Adminhome from './components/admin/adminhome';
// import Navbar from './components/Navbar'; // Import Navbar component
import UseNavbar from './components/navbar';


function App() {
  return (
    <>
      <BrowserRouter>
         {/* This will be on all pages */}
        <Routes>
        <Route path="/" element={<UseNavbar />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/reg" element={<RegisterPage />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/loginAdmin" element={<AdminLogin />} />
          <Route path="/adminHome" element={<Adminhome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
