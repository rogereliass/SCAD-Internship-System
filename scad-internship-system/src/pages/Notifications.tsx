// src/pages/Notifications.tsx

import { useParams } from 'react-router-dom';

const Notifications = () => {
  const { id } = useParams();

  const userType = {
    '1': 'student',
    '2': 'company',
    '3': 'scadOffice',
    '4': 'faculty',
  }[id || ''] || 'unknown';

  const renderNotifications = () => {
    switch (userType) {
      case 'student':
        return <p>You have new internship opportunities waiting!</p>;
      case 'company':
        return <p>New student applications received for your postings.</p>;
      case 'scadOffice':
        return <p>Pending approvals and reports require your attention.</p>;
      case 'faculty':
        return <p>Student project proposals are ready for review.</p>;
      default:
        return <p>No notifications available.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="bg-black p-6 rounded shadow">{renderNotifications()}</div>
    </div>
  );
};

export default Notifications;
