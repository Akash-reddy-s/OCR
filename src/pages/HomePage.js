import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/HomePage.css';

const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="homepage-layout">
      <aside className="sidebar">
        <nav>
          <h1>OCR Tool</h1>
          <ul>
            <li>
              <NavLink to="/upload">Upload PDF</NavLink>
            </li>
            <li>
              <NavLink to="/review">Review Text</NavLink>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </aside>
      <main className="content">
        <Outlet /> {/* This will render the nested route (UploadPage or ReviewPage) */}
      </main>
    </div>
  );
};

export default HomePage;