import { useState, useEffect } from 'react';
import { User, MapPin, Star, Search } from 'lucide-react';

const BrowseUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');

  // Mock data for now - will be replaced with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'John Doe',
          location: 'New York, NY',
          skillsOffered: ['JavaScript', 'React', 'Node.js'],
          skillsWanted: ['Python', 'Machine Learning'],
          rating: 4.5,
          totalRatings: 12,
          completedSwaps: 8
        },
        {
          id: 2,
          name: 'Jane Smith',
          location: 'San Francisco, CA',
          skillsOffered: ['Python', 'Data Analysis', 'SQL'],
          skillsWanted: ['Web Design', 'UI/UX'],
          rating: 4.8,
          totalRatings: 15,
          completedSwaps: 12
        },
        {
          id: 3,
          name: 'Mike Johnson',
          location: 'Chicago, IL',
          skillsOffered: ['Graphic Design', 'Photoshop', 'Illustrator'],
          skillsWanted: ['JavaScript', 'Web Development'],
          rating: 4.2,
          totalRatings: 8,
          completedSwaps: 5
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !filterSkill || 
                        user.skillsOffered.some(skill => skill.toLowerCase().includes(filterSkill.toLowerCase())) ||
                        user.skillsWanted.some(skill => skill.toLowerCase().includes(filterSkill.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="loading-spinner"></div>
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Users</h1>
        <p className="text-gray-600">Find people to exchange skills with</p>
      </div>

      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Filter by skill..."
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user.id} className="bg-white p-6 rounded-2xl shadow-sm hover:transform hover:-translate-y-1 transition-all hover:shadow-lg">
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
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <Star size={14} />
                    <span>{user.rating.toFixed(1)} ({user.totalRatings} reviews)</span>
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

              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Connect
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseUsers; 