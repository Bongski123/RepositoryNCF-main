import React, { useState, useEffect } from 'react';
import { faHome, faUser, faCog, faSquare } from '@fortawesome/free-solid-svg-icons';
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
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');

  const [totalResearches, setTotalResearches] = useState(null); // State to store total researches
  const [totalAuthors, setTotalAuthors] = useState(null); // State to store total researches
  const [totalPendingResearches, setTotalPendingResearches] = useState(null); // State to store total pending researches

  useEffect(() => {
    fetchTotalResearches();
    fetchTotalAuthors();
    fetchTotalPendingResearches();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setIsSidebarOpen(false); // Close the sidebar when a menu item is clicked
  
    // Redirect to the selected menu item
    if (menuItem === 'total_researches') {
      setSelectedMenuItem('researches_management');
    } else if (menuItem === 'total_authors') {
      setSelectedMenuItem('user_management');
    } else if (menuItem === 'total_pending') {
      setSelectedMenuItem('pending_researches');
    } else {
      setSelectedMenuItem(menuItem);
    }
  };
  
  const fetchTotalResearches = async () => {
    try {
      const response = await fetch('http://localhost:9001/api/total_researches');
      const data = await response.json();
      setTotalResearches(data.total_researches);
    } catch (error) {
      console.error('Error fetching total researches:', error);
    }
  };

  const fetchTotalAuthors = async () => {
    try {
      const response = await fetch('http://localhost:9001/total_authors');
      const data = await response.json();
      setTotalAuthors(data.total_authors);
    } catch (error) {
      console.error('Error fetching total authors:', error);
    }
  };

  const fetchTotalPendingResearches = async () => {
    try {
      const response = await fetch('http://localhost:9001/api/total_pending_researches');
      const data = await response.json();
      setTotalPendingResearches(data.total_pending_researches);
    } catch (error) {
      console.error('Error fetching total pending researches:', error);
    }
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
            <li onClick={() => handleMenuItemClick('dashboard')} className={`menu-item ${selectedMenuItem === 'dashboard' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </li>
            <li onClick={() => handleMenuItemClick('pending_researches')} className={`menu-item ${selectedMenuItem === 'pending_researches' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUser} />
              <span>Pending Researches</span>
            </li>
            <li onClick={() => handleMenuItemClick('researches_management')} className={`menu-item ${selectedMenuItem === 'researches_management' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faCog} />
              <span>Researches Management</span>
            </li>
            <li onClick={() => handleMenuItemClick('user_management')} className={`menu-item ${selectedMenuItem === 'user_management' ? 'active' : ''}`}>
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

        {/* Display the total researches */}
        {selectedMenuItem === 'dashboard' && (
          <div className="total-researches-container">
            <button className="total-researches-button" onClick={() => handleMenuItemClick('total_researches')}>
              <FontAwesomeIcon icon={faSquare} />
              <span className="total-number">Total Researches: {totalResearches}</span>
            </button>

            <button className="total-authors-button" onClick={() => handleMenuItemClick('total_authors')}>
              <FontAwesomeIcon icon={faSquare} />
              <span className="total-number">Total Authors: {totalAuthors}</span>
            </button>
        
            <button className="total-pending-button" onClick={() => handleMenuItemClick('total_pending')}>
              <FontAwesomeIcon icon={faSquare} />
              <span className="total-number">Pending Researches: {totalPendingResearches}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuthorization(AdminPage);
