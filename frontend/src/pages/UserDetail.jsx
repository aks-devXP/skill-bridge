import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, MapPin, Star, ArrowLeft, MessageCircle, Calendar, Award } from 'lucide-react';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from API
  useEffect(() => {
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          location: 'United States',
          skillsOffered: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB'],
          skillsWanted: ['Python', 'Machine Learning', 'Data Science'],
          rating: 4.5,
          totalRatings: 12,
          completedSwaps: 8,
          availability: 'available',
          bio: 'Full-stack developer with 5+ years of experience. Passionate about creating scalable web applications and always eager to learn new technologies.',
          experience: '5+ years',
          languages: ['English', 'Spanish'],
          feedback: [
            {
              id: 1,
              reviewer: 'Alice Johnson',
              rating: 5,
              comment: 'Excellent teacher! John helped me understand React hooks in just one session. Very patient and knowledgeable.',
              date: '2024-01-15',
              skill: 'React'
            },
            {
              id: 2,
              reviewer: 'Bob Smith',
              rating: 4,
              comment: 'Great session on Node.js backend development. John explained complex concepts clearly and provided practical examples.',
              date: '2024-01-10',
              skill: 'Node.js'
            },
            {
              id: 3,
              reviewer: 'Carol Davis',
              rating: 5,
              comment: 'Amazing JavaScript tutor! John helped me debug my code and taught me best practices. Highly recommended!',
              date: '2024-01-05',
              skill: 'JavaScript'
            },
            {
              id: 4,
              reviewer: 'David Wilson',
              rating: 4,
              comment: 'Very helpful with TypeScript concepts. John is patient and explains things well.',
              date: '2023-12-20',
              skill: 'TypeScript'
            },
            {
              id: 5,
              reviewer: 'Emma Brown',
              rating: 5,
              comment: 'Outstanding mentor! John helped me build a full-stack application from scratch. Very knowledgeable and supportive.',
              date: '2023-12-15',
              skill: 'Full-stack Development'
            }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          location: 'Canada',
          skillsOffered: ['Python', 'Data Analysis', 'SQL', 'Pandas', 'NumPy'],
          skillsWanted: ['Web Design', 'UI/UX', 'Frontend Development'],
          rating: 4.8,
          totalRatings: 15,
          completedSwaps: 12,
          availability: 'available',
          bio: 'Data scientist with expertise in Python and machine learning. Love working with data and creating insightful visualizations.',
          experience: '4+ years',
          languages: ['English', 'French'],
          feedback: [
            {
              id: 1,
              reviewer: 'Frank Miller',
              rating: 5,
              comment: 'Jane is an excellent Python tutor! She helped me understand data analysis concepts clearly.',
              date: '2024-01-12',
              skill: 'Python'
            },
            {
              id: 2,
              reviewer: 'Grace Lee',
              rating: 5,
              comment: 'Amazing data analysis session! Jane taught me pandas and numpy in a very practical way.',
              date: '2024-01-08',
              skill: 'Data Analysis'
            }
          ]
        }
      ];

      const foundUser = mockUsers.find(u => u.id === parseInt(userId));
      setUser(foundUser);
      setLoading(false);
    }, 500);
  }, [userId]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  const handleRequestSwap = () => {
    // TODO: Implement swap request functionality
    console.log('Requesting swap with:', user.name);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="loading-spinner"></div>
        <p className="text-gray-600">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-gray-600">User not found</p>
        <button
          onClick={() => navigate('/browse')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/browse')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Browse
          </button>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={40} className="text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <div className="flex items-center gap-2">
                  {renderStars(user.rating)}
                  <span className="text-gray-600">({user.totalRatings} reviews)</span>
                </div>
              </div>
              <p className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin size={16} />
                {user.location}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {user.experience} experience
                </div>
                <div className="flex items-center gap-1">
                  <Award size={16} />
                  {user.completedSwaps} swaps completed
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  {user.languages.join(', ')}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.availability === 'available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.availability === 'available' ? 'Available' : 'Busy'}
              </div>
              <button
                onClick={handleRequestSwap}
                className="bg-blue-600 text-white py-3 px-3 cursor-pointer rounded-lg font-medium hover:bg-blue-700 transition-colors mt-2"
              >
                Request Skill Swap
              </button>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>

          {/* Skills Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Skills Offered</h3>
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Wants to Learn</h3>
              <div className="flex flex-wrap gap-2">
                {user.skillsWanted.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold mb-6">Reviews & Feedback</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
              {user.feedback.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-6 min-w-80">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{review.reviewer}</h4>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{review.comment}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {review.skill}
                    </span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail; 