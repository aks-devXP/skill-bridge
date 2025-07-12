import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, MapPin, Calendar, Edit2, Check, X, Award, Globe, MessageCircle } from 'lucide-react';

const countryOptions = [
  'United States', 'Canada', 'United Kingdom', 'Australia',
  'Germany', 'Spain', 'Netherlands', 'South Korea', 'India', 'Other'
];

const Profile = () => {
  const { user } = useAuth();
  const [editUser, setEditUser] = useState(user ? { ...user } : null);
  const [editing, setEditing] = useState(false);
  const [skillsOfferedInput, setSkillsOfferedInput] = useState('');
  const [skillsWantedInput, setSkillsWantedInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useState(null);

  if (!editUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="loading-spinner"></div>
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (type) => {
    if (type === 'offered' && skillsOfferedInput.trim()) {
      setEditUser((prev) => ({
        ...prev,
        skillsOffered: [...(prev.skillsOffered || []), skillsOfferedInput.trim()]
      }));
      setSkillsOfferedInput('');
    } else if (type === 'wanted' && skillsWantedInput.trim()) {
      setEditUser((prev) => ({
        ...prev,
        skillsWanted: [...(prev.skillsWanted || []), skillsWantedInput.trim()]
      }));
      setSkillsWantedInput('');
    }
  };

  const handleRemoveSkill = (type, index) => {
    setEditUser((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      setEditUser((prev) => ({
        ...prev,
        languages: Array.isArray(prev.languages)
          ? [...prev.languages, languageInput.trim()]
          : [languageInput.trim()]
      }));
      setLanguageInput('');
    }
  };

  const handleRemoveLanguage = (index) => {
    setEditUser((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // TODO: Save to backend
    setEditing(false);
  };

  const handleCancel = () => {
    setEditUser({ ...user });
    setEditing(false);
    setSkillsOfferedInput('');
    setSkillsWantedInput('');
    setLanguageInput('');
    setPhotoPreview(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setEditUser((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col p-0 relative my-10">
        {/* Top: Avatar, Name, Edit */}
        <div className="flex flex-col items-center pt-10 pb-4 px-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-white shadow-md mb-4">
              {editUser.profilePhoto ? (
                <img src={editUser.profilePhoto} alt={editUser.name} className="w-full h-full object-cover" />
              ) : (
                <User size={56} className="text-gray-300" />
              )}
              {editing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-photo-input"
                    onChange={handlePhotoChange}
                  />
                  <label
                    htmlFor="profile-photo-input"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                    style={{ zIndex: 10 }}
                    title="Change profile picture"
                  >
                    <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">Change</span>
                  </label>
                </>
              )}
            </div>
            <button
              disabled={editing}
              onClick={() => setEditing(true)}
              className={`absolute top-2 right-2 p-2 rounded-full ${editing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'} shadow-sm border border-blue-100`}
              title="Edit Profile"
            >
              <Edit2 size={20} />
            </button>
          </div>
          {editing ? (
            <input
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleChange}
              className="text-2xl font-bold w-full text-center border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-white mb-2 h-9"
              style={{ minHeight: '2.25rem' }}
            />
          ) : (
            <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center min-h-[2.25rem]">{editUser.name}</h1>
          )}
          <div className="flex items-center gap-2 text-gray-600 mb-2 min-h-[2.25rem]">
            <MapPin size={18} />
            {editing ? (
              <select
                name="location"
                value={editUser.location || 'Other'}
                onChange={handleChange}
                className="border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-white h-7"
                style={{ minHeight: '1.75rem' }}
              >
                {countryOptions.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
                {!editUser.location && <option value="Other">Other</option>}
              </select>
            ) : (
              <span>{editUser.location || 'Other'}</span>
            )}
          </div>
        </div>
        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pb-6">
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium min-h-[2rem]">
            <Calendar size={14} /> {editing ? (
              <select
                name="experience"
                value={editUser.experience || ''}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 w-24 text-xs text-gray-700 text-center h-7"
                style={{ minHeight: '1.5rem' }}
              >
                <option value="">Select</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            ) : (
              editUser.experience || 'N/A'
            )}
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium min-h-[2rem]">
            <Award size={14} /> {editUser.completedSwaps} swaps
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium min-h-[2rem]">
            <MessageCircle size={14} /> {editing ? (
              <div className="flex flex-col gap-1 min-w-[120px]">
                <div className="flex flex-wrap gap-1 mb-1">
                  {Array.isArray(editUser.languages) && editUser.languages.length > 0 ? (
                    editUser.languages.map((lang, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs flex items-center gap-1">
                        {lang}
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 ml-1"
                          onClick={() => handleRemoveLanguage(idx)}
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No languages</span>
                  )}
                </div>
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={languageInput}
                    onChange={e => setLanguageInput(e.target.value)}
                    className="border border-gray-200 rounded px-2 py-0.5 text-xs focus:outline-none focus:border-blue-500"
                    placeholder="Add language"
                  />
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="bg-blue-600 text-white rounded px-2 py-0.5 text-xs hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              Array.isArray(editUser.languages) ? editUser.languages.join(', ') : ''
            )}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold min-h-[2rem] ${editUser.availability === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {editing ? (
              <select
                name="availability"
                value={editUser.availability}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 text-xs text-gray-700 text-center h-7"
                style={{ minHeight: '1.5rem' }}
              >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
            ) : (
              editUser.availability === 'available' ? 'Available' : 'Busy'
            )}
          </span>
        </div>
        {/* Main Dashboard Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 px-10 pb-8">
          {/* About Section */}
          <div className="flex flex-col justify-center">
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <User size={18} className="text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
              </div>
              {editing ? (
                <textarea
                  name="bio"
                  value={editUser.bio || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 text-gray-800 flex-1 min-h-[120px] resize-none"
                  rows={6}
                  style={{ fontSize: '1rem', lineHeight: '1.5', minHeight: '120px' }}
                />
              ) : (
                <p className="text-gray-700 text-base leading-relaxed min-h-[120px] flex-1">{editUser.bio ? editUser.bio : `Hey there, I'm ${editUser.name}.`}</p>
              )}
            </div>
          </div>
          {/* Skills Section */}
          <div className="flex flex-col justify-center gap-8">
            {/* Skills Offered */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={18} className="text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">Skills offered by you</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {editUser.skillsOffered && editUser.skillsOffered.length > 0 ? (
                  editUser.skillsOffered.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium flex items-center gap-1">
                      {skill}
                      {editing && (
                        <button
                          type="button"
                          className="ml-1 text-xs text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveSkill('skillsOffered', idx)}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-600">No skills offered yet</span>
                )}
              </div>
              {editing && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={skillsOfferedInput}
                    onChange={e => setSkillsOfferedInput(e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                    placeholder="Add a skill"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill('offered')}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            {/* Skills Wanted */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={18} className="text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900">Skills you want to learn</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {editUser.skillsWanted && editUser.skillsWanted.length > 0 ? (
                  editUser.skillsWanted.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium flex items-center gap-1">
                      {skill}
                      {editing && (
                        <button
                          type="button"
                          className="ml-1 text-xs text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveSkill('skillsWanted', idx)}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-600">No skills wanted yet</span>
                )}
              </div>
              {editing && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={skillsWantedInput}
                    onChange={e => setSkillsWantedInput(e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                    placeholder="Add a skill"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill('wanted')}
                    className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Save/Cancel Actions (overlay, no layout shift) */}
        {editing && (
          <div className="absolute top-10 left-1/4 w-full flex justify-center z-50 bg-gradient-to-t from-gray-50 via-white/80 to-transparent py-4 pointer-events-none">
            <div className="flex gap-4 bg-white rounded-xl shadow-lg px-8 py-3 border border-gray-100 pointer-events-auto">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <Check size={18} /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 