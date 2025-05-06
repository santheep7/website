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
import UseNavbar from './components/user/navbar';
import AdminBar from './components/admin/adminnavbar';
import Addproducts from './components/admin/addproducts';
import AdminViewProduct from './components/admin/adminviewproducts';
import Admineditproduct from './components/admin/admineditproduct';
import UserViewProducts from './components/user/userviewproducts';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UseNavbar />} />
        <Route path="/adminnavbar" element={<AdminBar />} />
        <Route path='/addproducts' element={<Addproducts/>}/>
        <Route path="/login" element={<LoginUser />} />
        <Route path="/viewUser" element={<ViewUserDetails/>}/>
        <Route path="/reg" element={<RegisterPage />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<Adminhome />} />
        <Route path="/adminviewproducts" element={<AdminViewProduct />} />
        <Route path="/admineditproduct/:id" element={<Admineditproduct />} />
        <Route path='/userviewproducts' element={<UserViewProducts/>}/>
        <Route path='/usercart' element={<UserViewProducts/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
