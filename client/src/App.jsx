import LoginUser from './components/admin/loginAdmin'
import { Route,Routes } from 'react-router-dom'
import RegisterPage from './components/reg'
import UserHome from './components/user/userhome'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import AdminLogin from './components/admin/loginAdmin';
import Adminhome from './components/admin/adminhome';
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LoginUser/>}/>
      <Route path="/reg" element={<RegisterPage/>}/>
      <Route path="/userhome" element={<UserHome/>}/>
      <Route path="/loginAdmin" element={<AdminLogin/>}/>
      <Route path="/adminHome" element={<Adminhome/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
