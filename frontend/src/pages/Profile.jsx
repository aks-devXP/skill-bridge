import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, MapPin, Star, Users } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="loading-spinner"></div>
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center gap-8 mb-8 p-8 bg-white rounded-2xl shadow-sm">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <User size={40} className="text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          {user.location && (
            <p className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin size={16} />
              {user.location}
            </p>
          )}
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Star size={16} className="text-yellow-500" />
              <span>{user.rating.toFixed(1)} ({user.totalRatings} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Users size={16} />
              <span>{user.completedSwaps} completed swaps</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-8 border-b border-gray-200">
        <button
          className={`px-6 py-4 font-medium border-b-2 transition-colors ${
            activeTab === 'profile' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-600 border-transparent hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`px-6 py-4 font-medium border-b-2 transition-colors ${
            activeTab === 'skills' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-600 border-transparent hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button
          className={`px-6 py-4 font-medium border-b-2 transition-colors ${
            activeTab === 'availability' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-600 border-transparent hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('availability')}
        >
          Availability
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            <p className="text-gray-600">Profile editing functionality coming soon...</p>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Skills</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Skills I Offer</h3>
                {user.skillsOffered && user.skillsOffered.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No skills offered yet</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Skills I Want to Learn</h3>
                {user.skillsWanted && user.skillsWanted.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No skills wanted yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Availability</h2>
            <div className="space-y-4">
              <p><strong>Current Availability:</strong> {user.availability}</p>
              {user.customAvailability && (
                <p><strong>Custom Schedule:</strong> {user.customAvailability}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 