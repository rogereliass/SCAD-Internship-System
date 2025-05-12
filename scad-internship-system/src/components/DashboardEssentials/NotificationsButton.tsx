import React, { useState } from 'react';
import { Bell, Building, FileText, Video, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "report" | "company" | "appointment" | "workshop" | "clarification";
  read: boolean;
}

interface NotificationsButtonProps {
  notifications: Notification[];
  onMarkAllAsRead?: () => void; // Add optional callback for parent component updates
  notificationsPagePath?: string; // Add this prop
}

const NotificationsButton: React.FC<NotificationsButtonProps> = ({ 
  notifications: initialNotifications,
  onMarkAllAsRead,
  notificationsPagePath = '/notifications/2' // Default to company if not provided
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  // Local state to manage notifications
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const navigate = useNavigate();
  
  // Function to mark all notifications as read
  const handleMarkAllAsRead = () => {
    // Update all notifications to be read
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    // Update local state
    setNotifications(updatedNotifications);
    
    // If parent provided a callback, call it
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
      >
        <Bell size={16} />
        <span>Notifications</span>
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </Button>
      
      {isNotificationsOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 overflow-hidden">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-black">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                size="sm" 
                className="h-auto py-1"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-gray-50' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {notification.type === 'company' && <Building size={18} className="text-blue-500" />}
                      {notification.type === 'report' && <FileText size={18} className="text-orange-500" />}
                      {notification.type === 'appointment' && <Video size={18} className="text-purple-500" />}
                      {notification.type === 'workshop' && <Calendar size={18} className="text-green-500" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black">{notification.title}</p>
                      <p className="text-xs text-gray-600">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                No notifications
              </div>
            )}
          </div>
          <div className="p-2 border-t border-gray-200 text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-sm bg-black text-white hover:bg-gray-800"
              onClick={() => navigate(notificationsPagePath)}
            >
              View all notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsButton;