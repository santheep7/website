import { NavDropdown } from 'react-bootstrap';  // Import the NavDropdown
import './adminnavbar.css';
import { useNavigate } from 'react-router-dom';
export default function AdminBar({ setSearchQuery }) {
  const searchChange = (e) => {
    setSearchQuery(e.target.value); // Set the search query when the input changes
  };
const handleLogout = () => {
    localStorage.removeItem("token");
  }
  return (
    <nav className="navbar">
      <div className="logo">
        🚀 MySite
      </div>

      <ul className="nav-links">
        <li><a href="/adminHome">Home</a></li>
        <li><a href="/addproducts">Add Items</a></li>
        <li><a href="/adminviewproducts">View Products</a></li>
        <li><a href="/vieworders">View Orders</a></li>
        <li><a href="/viewUser">View USERS</a></li>
        <li><a href="#">Contact</a></li>

        {/* Dropdown Menu without hover underline */}
    
<li className="no-hover">
  <NavDropdown title="Links" id="basic-nav-dropdown">
    <NavDropdown.Item href="/loginAdmin">Sign In</NavDropdown.Item>
    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
  </NavDropdown>
</li>

  
      </ul>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." onChange={searchChange} />
      </div>
    </nav>
  );
}
