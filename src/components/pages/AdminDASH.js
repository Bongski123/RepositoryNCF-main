// AdminPage.js
import React, { useState } from 'react';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PendingResearches from '../PendingApproval';
import withAuthorization from '../../auth/WithAuth';
import './CSS/AdminPage.css'; // Import custom CSS for styling
import ResearchesTable from './Researches';
import UsersTable from './UserData';
const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // State to track selected menu item

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsSidebarOpen(false); // Close the sidebar when a menu item is clicked
  };
  
  return (
    <div className="admin-page-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
          </button>
        </div>
        <div className="sidebar-content">
          {/* Sidebar content */}
          <ul className="sidebar-menu">
            <li onClick={() => handleMenuItemClick('dashboard')} className="menu-item">
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </li>
            <li onClick={() => handleMenuItemClick('pending_researches')} className="menu-item">
              <FontAwesomeIcon icon={faUser} />
              <span>Pending Researches</span>
            </li>
            <li onClick={() => handleMenuItemClick('researches_management')} className="menu-item">
              <FontAwesomeIcon icon={faCog} />
              <span>Researches Management</span>
            </li>
            <li onClick={() => handleMenuItemClick('user_management')} className="menu-item">
              <FontAwesomeIcon icon={faCog} />
              <span>Users Management</span>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      </div>
      
      {/* Main content */}
      <div className="main-content">
   
        {/* Conditionally render the pending researches table */}
        {selectedMenuItem === 'pending_researches' && <PendingResearches />}
        {selectedMenuItem === 'researches_management' && <ResearchesTable />}
        {selectedMenuItem === 'user_management' && <UsersTable />}
      </div>
    </div>
  );
};

export default withAuthorization(AdminPage);
