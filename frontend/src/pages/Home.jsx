import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, UserPlus, ArrowRight } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="py-8">
      <div className="text-center py-16 px-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            Welcome to <span className="text-blue-600">SkillBridge</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect, learn, and grow by exchanging skills with people in your community. 
            Offer your expertise and find the skills you need in return.
          </p>
          
          {isAuthenticated ? (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/browse" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transform hover:-translate-y-1 transition-all shadow-lg">
                <Users size={20} />
                Browse Users
                <ArrowRight size={20} />
              </Link>
              <Link to="/profile" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all">
                <UserPlus size={20} />
                Update Profile
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transform hover:-translate-y-1 transition-all shadow-lg">
                <UserPlus size={20} />
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How SkillBridge Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:transform hover:-translate-y-1 transition-all hover:shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">List Your Skills</h3>
            <p className="text-gray-600">Share what you're good at and what you want to learn</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:transform hover:-translate-y-1 transition-all hover:shadow-lg">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Find Matches</h3>
            <p className="text-gray-600">Browse users and discover skill exchange opportunities</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:transform hover:-translate-y-1 transition-all hover:shadow-lg">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Connect & Exchange</h3>
            <p className="text-gray-600">Arrange skill swaps and build meaningful connections</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:transform hover:-translate-y-1 transition-all hover:shadow-lg">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">Rate & Review</h3>
            <p className="text-gray-600">Share feedback and help build a trusted community</p>
          </div>
        </div>
      </div>

      {isAuthenticated && user && (
        <div className="text-center py-12 bg-white rounded-2xl mt-12">
          <h2 className="text-3xl font-bold mb-4">Welcome back, {user.name}! 👋</h2>
          <p className="text-gray-600 mb-6">Ready to continue your skill exchange journey?</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/profile" className="inline-flex items-center gap-2 bg-transparent text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all">
              Update Your Skills
            </Link>
            <Link to="/browse" className="inline-flex items-center gap-2 bg-transparent text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all">
              Find New Connections
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 