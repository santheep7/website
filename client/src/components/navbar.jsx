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
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>

        {/* Dropdown Menu without hover underline */}
        <li className="no-hover">
          <NavDropdown title="More" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action1">Action 1</NavDropdown.Item>
            <NavDropdown.Item href="#action2">Action 2</NavDropdown.Item>
            <NavDropdown.Item href="#action3">Action 3</NavDropdown.Item>
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
