
import React from 'react';
import Navbar from '../components/layout/Navbar';
import { VideoAppointmentProvider } from '@/contexts/VideoAppointmentContext';
import AppointmentList from '@/components/videoAppointments/AppointmentList';
import IncomingCallNotification from '@/components/videoAppointments/IncomingCallNotification';
import VideoCallUI from '@/components/videoAppointments/VideoCallUI';
import DemoPanel from '@/components/videoAppointments/DemoPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, History } from 'lucide-react';
import ScheduleAppointmentCard from '@/components/videoAppointments/ScheduleAppointmentCard';

const VideoAppointments = () => {
  // In a real app, we'd fetch the user type from auth context
  const userType = 'scadOffice'; // or 'student'

  return (
    <VideoAppointmentProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar userType={userType} />
        
        {/* Incoming call notification */}
        <IncomingCallNotification />
        
        {/* Video call UI */}
        <VideoCallUI />
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Video Appointments</h1>
            <p className="text-gray-600">Schedule and manage your video appointments</p>
          </div>
          {/* Schedule Appointment Card */}
          <ScheduleAppointmentCard />
          
          <Tabs defaultValue="upcoming" className="mt-8">
            <TabsList>
              <TabsTrigger value="upcoming" className="flex items-center">
                <Calendar size={16} className="mr-2" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <History size={16} className="mr-2" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <AppointmentList />
            </TabsContent>
            
            <TabsContent value="history">
              <div className="mt-6 text-center py-8">
                <p className="text-gray-500">No past appointments to display</p>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Demo Controls (for development only) */}
          <DemoPanel />
        </div>
      </div>
    </VideoAppointmentProvider>
  );
};

export default VideoAppointments;
