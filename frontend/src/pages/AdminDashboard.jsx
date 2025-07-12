import { useState } from 'react';
import { Ban, FileDown, Mail, ShieldX, Repeat2, Users } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="flex gap-2 mb-8 border-b border-gray-200 justify-center">
        {[
          { key: 'skills', label: 'Moderate Skills', icon: <ShieldX size={16} /> },
          { key: 'ban', label: 'Ban Users', icon: <Ban size={16} /> },
          { key: 'swaps', label: 'Monitor Swaps', icon: <Repeat2 size={16} /> },
          { key: 'messages', label: 'Send Messages', icon: <Mail size={16} /> },
          { key: 'reports', label: 'Download Reports', icon: <FileDown size={16} /> },
        ].map(tab => (
          <button
            key={tab.key}
            className={`px-6 py-4 font-medium border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === tab.key
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        {activeTab === 'skills' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Reject Inappropriate Skills</h2>
            <p className="text-gray-600">Here you can review and reject skill descriptions flagged as spammy or inappropriate.</p>
            {/* Placeholder list */}
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                <span>"I will teach hacking for fun"</span>
                <button className="text-red-600 font-medium hover:underline">Reject</button>
              </li>
              <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                <span>"Best illegal tricks!"</span>
                <button className="text-red-600 font-medium hover:underline">Reject</button>
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'ban' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ban Users</h2>
            <p className="text-gray-600">Enter user email or ID to ban them from the platform.</p>
            <input type="text" placeholder="User ID or Email" className="mt-4 w-full p-3 border border-gray-300 rounded-lg" />
            <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Ban User</button>
          </div>
        )}

        {activeTab === 'swaps' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Monitor Swaps</h2>
            <p className="text-gray-600">View swap statistics and current activity.</p>
            <div className="mt-6 space-y-4">
              <div>Pending Swaps: <strong>12</strong></div>
              <div>Accepted Swaps: <strong>88</strong></div>
              <div>Cancelled Swaps: <strong>5</strong></div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send Platform-wide Messages</h2>
            <textarea placeholder="Write your message here..." rows={4} className="w-full p-3 border border-gray-300 rounded-lg"></textarea>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send Message</button>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Download Reports</h2>
            <div className="space-y-2">
              <button className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Download User Activity</button>
              <button className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Download Feedback Logs</button>
              <button className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Download Swap Stats</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
