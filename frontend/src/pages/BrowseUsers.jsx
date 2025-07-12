import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import UserCard from '../components/UserCard';

const BrowseUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    availability: 'all',
    minRating: 0,
    location: 'all',
    minSwaps: 0,
    maxSwaps: 100
  });
  const usersPerPage = 3;

  // Mock data for now - will be replaced with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'John Doe',
          location: 'United States',
          skillsOffered: ['JavaScript', 'React', 'Node.js'],
          skillsWanted: ['Python', 'Machine Learning'],
          rating: 4.5,
          totalRatings: 12,
          completedSwaps: 8,
          availability: 'available'
        },
        {
          id: 2,
          name: 'Jane Smith',
          location: 'Canada',
          skillsOffered: ['Python', 'Data Analysis', 'SQL'],
          skillsWanted: ['Web Design', 'UI/UX'],
          rating: 4.8,
          totalRatings: 15,
          completedSwaps: 12,
          availability: 'available'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          location: 'United Kingdom',
          skillsOffered: ['Graphic Design', 'Photoshop', 'Illustrator'],
          skillsWanted: ['JavaScript', 'Web Development'],
          rating: 4.2,
          totalRatings: 8,
          completedSwaps: 5,
          availability: 'busy'
        },
        {
          id: 4,
          name: 'Sarah Wilson',
          location: 'Australia',
          skillsOffered: ['UI/UX Design', 'Figma', 'Prototyping'],
          skillsWanted: ['React', 'Frontend Development'],
          rating: 2.6,
          totalRatings: 9,
          completedSwaps: 6,
          availability: 'available'
        },
        {
          id: 5,
          name: 'David Chen',
          location: 'Germany',
          skillsOffered: ['Machine Learning', 'Python', 'TensorFlow'],
          skillsWanted: ['Web Development', 'JavaScript'],
          rating: 4.9,
          totalRatings: 18,
          completedSwaps: 14,
          availability: 'available'
        },
        {
          id: 6,
          name: 'Emily Rodriguez',
          location: 'Spain',
          skillsOffered: ['Content Writing', 'SEO', 'Social Media'],
          skillsWanted: ['Graphic Design', 'Adobe Creative Suite'],
          rating: 4.3,
          totalRatings: 11,
          completedSwaps: 7,
          availability: 'busy'
        },
        {
          id: 7,
          name: 'Alex Thompson',
          location: 'Netherlands',
          skillsOffered: ['DevOps', 'AWS', 'Docker'],
          skillsWanted: ['Mobile Development', 'React Native'],
          rating: 4.7,
          totalRatings: 13,
          completedSwaps: 9,
          availability: 'available'
        },
        {
          id: 8,
          name: 'Lisa Park',
          location: 'South Korea',
          skillsOffered: ['Data Science', 'R', 'Statistics'],
          skillsWanted: ['Web Design', 'CSS', 'HTML'],
          rating: 4.4,
          totalRatings: 10,
          completedSwaps: 6,
          availability: 'available'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    // Skill filter
    const matchesSkill = !searchTerm || 
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Availability filter
    const matchesAvailability = filters.availability === 'all' || user.availability === filters.availability;
    
    // Rating filter
    const matchesRating = user.rating >= filters.minRating;
    
    // Location filter - case insensitive
    const specificCountries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 
      'Germany', 'Spain', 'Netherlands', 'South Korea', 'India'
    ];
    
    let matchesLocation = false;
    if (filters.location === 'all') {
      matchesLocation = true;
    } else if (filters.location === 'Other') {
      // Show users from countries not in the specific list
      matchesLocation = !specificCountries.includes(user.location);
    } else {
      // Exact match for specific countries
      matchesLocation = user.location.toLowerCase() === filters.location.toLowerCase();
    }
    
    // Swaps filter
    const matchesSwaps = user.completedSwaps >= filters.minSwaps && user.completedSwaps <= filters.maxSwaps;
    
    return matchesSkill && matchesAvailability && matchesRating && matchesLocation && matchesSwaps;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showFilterModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showFilterModal]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      availability: 'all',
      minRating: 0,
      location: 'all',
      minSwaps: 0,
      maxSwaps: 100
    });
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (filters.availability !== 'all') count++;
    if (filters.minRating > 0) count++;
    if (filters.location !== 'all') count++;
    if (filters.minSwaps > 0 || filters.maxSwaps < 100) count++;
    return count;
  };

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
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search by name, location, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter size={20} />
          Filters
          {getActiveFiltersCount() > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentUsers.length > 0 ? (
          currentUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer transition-colors"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:cursor-pointer ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer transition-colors"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Filter Users</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Users</option>
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0}>Any Rating</option>
                  <option value={1}>1+ Stars</option>
                  <option value={2}>2+ Stars</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Countries</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Spain">Spain</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="South Korea">South Korea</option>
                  <option value="India">India</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Swaps Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Completed Swaps Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minSwaps}
                    onChange={(e) => handleFilterChange('minSwaps', Number(e.target.value))}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <span className="text-gray-500 text-sm">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxSwaps}
                    onChange={(e) => handleFilterChange('maxSwaps', Number(e.target.value))}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={clearFilters}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseUsers; 