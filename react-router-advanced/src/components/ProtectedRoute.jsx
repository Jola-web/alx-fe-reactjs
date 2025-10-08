import { Navigate } from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: true }; 
  return user && user.loggedIn;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
