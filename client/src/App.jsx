import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Correct imports
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your components
import LoginUser from './components/user/login';
import RegisterPage from './components/user/reg';
import UserHome from './components/user/userhome';
import AdminLogin from './components/admin/loginAdmin';
import Adminhome from './components/admin/adminhome';
import ViewUserDetails from './components/admin/viewUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/viewUser" element={<ViewUserDetails/>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<Adminhome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
