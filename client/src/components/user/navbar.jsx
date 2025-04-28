import { NavDropdown } from 'react-bootstrap';  // Import the NavDropdown
import './navbar.css';

export default function UseNavbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🚀 MySite
      </div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">View Items</a></li>
        <li><a href="/viewUser">View USERs</a></li>
        <li><a href="#">Contact</a></li>

        {/* Dropdown Menu without hover underline */}
        <li className="no-hover">
          <NavDropdown title="Links" id="basic-nav-dropdown">
            <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
            <NavDropdown.Item href="/reg">Sign Up</NavDropdown.Item>
            <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
          </NavDropdown>
        </li>
      </ul>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    </nav>
  );
}
