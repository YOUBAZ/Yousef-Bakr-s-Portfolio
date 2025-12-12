import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../utils/blogUtils';
import PropTypes from 'prop-types';

/**
 * Protected route component for admin routes
 */
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = isAdminAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;
