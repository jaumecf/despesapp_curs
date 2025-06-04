import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authProvider';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
    const { currentUser, loading} = useAuth();


  console.log("🔐 [ProtectedRoute] loading:", loading);
  console.log("🔐 [ProtectedRoute] currentUser:", currentUser);
    if (loading) return <div>Carregant...</div>; // o spinner, etc.
    return currentUser ? children : <Navigate to="/login" replace />;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};