import { NavDropdown } from 'react-bootstrap';  // Import the NavDropdown
import './adminnavbar.css';

export default function AdminBar({ setSearchQuery }) {
  const searchChange = (e) => {
    setSearchQuery(e.target.value); // Set the search query when the input changes
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🚀 MySite
      </div>

      <ul className="nav-links">
        <li><a href="/adminHome">Home</a></li>
        <li><a href="/addproducts">Add Items</a></li>
        <li><a href="/adminviewproducts">View Products</a></li>
        <li><a href="/viewUser">View USERS</a></li>
        <li><a href="#">Contact</a></li>

        {/* Dropdown Menu without hover underline */}
        <li className="no-hover">
          <NavDropdown title="Links" id="basic-nav-dropdown">
            <NavDropdown.Item href="/loginAdmin">Sign In</NavDropdown.Item>
            <NavDropdown.Item href="/adminHome">Logout</NavDropdown.Item>
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
