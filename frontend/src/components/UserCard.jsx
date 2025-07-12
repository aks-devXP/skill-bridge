import { User, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  // Function to get rating colors based on rating value
  const getRatingColors = (rating) => {
    if (rating >= 4.5) {
      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800'
      };
    } else if (rating >= 4.0) {
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800'
      };
    } else if (rating >= 3.0) {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800'
      };
    } else {
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800'
      };
    }
  };

  const ratingColors = getRatingColors(user.rating);

  const handleConnect = () => {
    navigate(`/user/${user.id}`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:transform hover:-translate-y-1 transition-all hover:shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-15 h-15 rounded-full bg-gray-100 flex items-center justify-center">
          <User size={30} className="text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
          <p className="flex items-center gap-1 text-gray-600 text-sm mb-2">
            <MapPin size={14} />
            {user.location}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <div className={`inline-flex items-center px-2 py-1 ${ratingColors.bg} ${ratingColors.border} rounded-md`}>
              <span className={`${ratingColors.text} font-semibold text-xs`}>
                {user.rating.toFixed(1)} / 5
              </span>
            </div>
            <span className="text-gray-600">({user.totalRatings} reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Offers:</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Wants to learn:</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        {user.completedSwaps} swaps completed
      </div>

      <button 
        onClick={handleConnect}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Connect
      </button>
    </div>
  );
};

export default UserCard; 