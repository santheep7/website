import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy-loaded components
const LoginUser = lazy(() => import('./components/user/login'));
const RegisterPage = lazy(() => import('./components/user/reg'));
const AdminLogin = lazy(() => import('./components/admin/loginAdmin'));
const Adminhome = lazy(() => import('./components/admin/adminHome'));
const ViewUserDetails = lazy(() => import('./components/admin/viewUser'));
const AdminBar = lazy(() => import('./components/admin/adminnavbar'));
const Addproducts = lazy(() => import('./components/admin/addproducts'));
const AdminViewProduct = lazy(() => import('./components/admin/adminviewproducts'));
const Admineditproduct = lazy(() => import('./components/admin/admineditproduct'));
const UserViewProducts = lazy(() => import('./components/user/userviewproducts'));
const UserCart = lazy(() => import('./components/user/usercart'));
const ViewOrdersAdmin = lazy(() => import('./components/admin/vieworders'));
const UserOrders = lazy(() => import('./components/user/vieworders'));
const Homepage1=lazy(()=>import('./components/user/homepage1'))
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage1/>}/>
          {/* Homepage */}
          <Route path="/userviewproduct" element={<UserViewProducts />} />

          {/* User pages */}
          <Route path="/login" element={<LoginUser />} />
          <Route path="/reg" element={<RegisterPage />} />
          <Route path="/usercart" element={<UserCart />} />
          <Route path="/viewuserorders" element={<UserOrders />} />

          {/* Admin pages */}
          <Route path="/adminnavbar" element={<AdminBar />} />
          <Route path="/viewUser" element={<ViewUserDetails />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/adminviewproducts" element={<AdminViewProduct />} />
          <Route path="/admineditproduct/:id" element={<Admineditproduct />} />
          <Route path="/vieworders" element={<ViewOrdersAdmin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
