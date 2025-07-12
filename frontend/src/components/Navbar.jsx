import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Users, Home } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            <span className="logo-text">SkillBridge</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <Link to="/browse" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors">
              <Users size={20} />
              <span>Browse Users</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors">
                  <User size={20} />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors bg-transparent border-none cursor-pointer"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors">
                  <span>Login</span>
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors">
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 