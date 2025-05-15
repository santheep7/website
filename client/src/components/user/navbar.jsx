import { NavDropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

export default function UseNavbar({ searchquery }) {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const searchChange = (e) => {
    searchquery?.(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">USER</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="/viewuserorders">Orders</a></li>

        <li className="no-hover">
          <NavDropdown title={username ? `Hi, ${username}` : "Links"} id="basic-nav-dropdown">
            {!username && (
              <>
                <NavDropdown.Item as={Link} to="/login">Sign In</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/reg">Sign Up</NavDropdown.Item>
              </>
            )}
            {username && (
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </li>
      </ul>

      <div className="search-cart-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/usercart">
          <FaShoppingCart size={32} color="#ffff" title="View Cart" />
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search..." onChange={searchChange} />
        </div>
      </div>
    </nav>
  );
}
