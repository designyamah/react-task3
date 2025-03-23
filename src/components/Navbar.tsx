import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">User Management System</div>
      <ul className="navbar-links">
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/add-user">Add User</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
