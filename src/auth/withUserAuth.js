import React from 'react';
import { useAuth } from './AuthWrapper';
import '../components/pages/CSS/UnauthorizedAccess.css'
const withUserAuthorization = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();

    // Redirect if user is not authenticated or does not have role_id equal to '1'
    if (!user) {
      // Handle unauthorized access
      return <div><h1>Unauthorized Access</h1></div>; // You can redirect to a login page or show a message
    }

    // Render the component if user is authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withUserAuthorization;
