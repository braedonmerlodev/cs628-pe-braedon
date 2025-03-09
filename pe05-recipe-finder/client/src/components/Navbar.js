import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Recipe Finder
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Recipes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-links">
              Add Recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 