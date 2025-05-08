import React, { useState } from 'react';
import { Bell, Building, FileText, Video, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string | number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'company' | 'report' | 'appointment' | 'workshop';
}

interface NotificationsButtonProps {
  notifications: Notification[];
}

const NotificationsButton: React.FC<NotificationsButtonProps> = ({ notifications }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
      >
        <Bell size={16} />
        <span>Notifications</span>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
          {notifications.filter(n => !n.read).length}
        </div>
      </Button>
      
      {isNotificationsOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 overflow-hidden">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            <Button variant="ghost" size="sm" className="h-auto py-1">
              Mark all as read
            </Button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map(notification => (
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
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-gray-600">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-200 text-center">
            <Button variant="ghost" size="sm" className="w-full text-sm">
              View all notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsButton;