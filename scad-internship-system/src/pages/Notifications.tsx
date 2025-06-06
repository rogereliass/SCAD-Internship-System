// src/pages/Notifications.tsx

import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom'; // Add Link import
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DemoControls from '@/components/Developing Controls/DemoControls';

const USER_TYPE_MAP = {
  '1': 'student',
  '2': 'company',
  '3': 'scadOffice',
  '4': 'faculty',
} as const;

type NotificationItem = {
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success';
};

const Notifications = () => {
  const { id } = useParams();
  const userType = id ? USER_TYPE_MAP[id as keyof typeof USER_TYPE_MAP] : null;

  const notifications = useMemo(() => {
    const mockNotifications: Record<string, NotificationItem[]> = {
      student: [
        {
          title: 'New Internship Cycle',
          message: 'The Summer 2024 internship cycle is now open! Start applying for positions.',
          timestamp: '2 hours ago',
          type: 'info'
        },
        {
          title: 'Upcoming Internship Cycle',
          message: 'The Fall 2024 internship cycle will begin in 2 weeks. Prepare your applications!',
          timestamp: '1 day ago',
          type: 'success'
        },
        {
          title: 'Internship Report Status',
          message: 'Your internship report for TechCorp has been reviewed and approved',
          timestamp: '2 days ago',
          type: 'warning'
        },
        {
          title: 'Course Reminder',
          message: 'Web Development 101 starts tomorrow at 10:00 AM',
          timestamp: '3 days ago',
          type: 'success'
        }
      ],
      company: [
        {
          title: 'Interview Scheduling Required',
          message: 'New applicant Jessica Lee has been shortlisted for the Frontend Developer position. Please schedule an interview.',
          timestamp: '2 hours ago',
          type: 'info'
        },
        {
          title: 'New Application Received',
          message: 'Mohammed Al-Harthy has applied for the UX/UI Designer position. Review their application in the Applicants tab.',
          timestamp: '1 day ago',
          type: 'info'
        },
        {
          title: 'Evaluation Required',
          message: 'Alex Martinez is approaching the end of their internship period. Please complete their performance evaluation by November 30.',
          timestamp: '2 days ago',
          type: 'warning'
        },
        {
          title: 'Internship Cycle Reminder',
          message: 'The Winter 2024 internship cycle begins next week. Update your job postings accordingly.',
          timestamp: '4 days ago',
          type: 'success'
        },
        {
          title: 'Company Application Approved',
          message: 'SCAD has officially approved your company registration. You can now post internship opportunities.',
          timestamp: '3 weeks ago',
          type: 'success'
        }
      ],
      scadOffice: [
        {
          title: 'New Company Application',
          message: 'EcoSolutions has applied to join SCAD system',
          timestamp: '10 minutes ago',
          type: 'info'
        },
        {
          title: 'Pending Report Review',
          message: '3 new internship reports awaiting review',
          timestamp: '2 hours ago',
          type: 'warning'
        },
        {
          title: 'Video Call Request',
          message: 'Appointment request from Fatima Al-Balushi',
          timestamp: '3 hours ago',
          type: 'info'
        },
        {
          title: 'Upcoming Workshop',
          message: 'Reminder: Career Development workshop tomorrow',
          timestamp: 'in 1 day',
          type: 'success'
        }
      ],
      faculty: [
        {
          title: 'New Report Submitted',
          message: 'John Doe submitted an internship report.',
          timestamp: '2 hours ago',
          type: 'warning'
        },
        {
          title: 'Clarification Requested',
          message: 'A clarification has been requested for report #123',
          timestamp: '1 day ago',
          type: 'info'
        }
      ]
    };

    return userType ? mockNotifications[userType] || [] : [];
  }, [userType]);

  const getNotificationColor = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType={userType} />
      <div className="container mx-auto py-6 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Add flex container with justification for title and back button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          </div>

          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} shadow-sm`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No notifications available at this time.
              </div>
            )}
          </div>
        </div>
        <DemoControls currentId={id} />
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
