
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import WorkshopList from '../components/workshops/WorkshopList';
import WorkshopManagement from '../components/workshops/WorkshopManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Settings } from 'lucide-react';

const Workshops = () => {
  // In a real app, we'd fetch the user type from auth context
  const userType = 'scadOffice'; // or 'student'
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType={userType} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Career Workshops</h1>
          <p className="text-gray-600">View and register for upcoming career development workshops</p>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming" className="flex items-center">
              <Calendar size={16} className="mr-2" />
              Upcoming Workshops
            </TabsTrigger>
            
            {userType === 'scadOffice' && (
              <TabsTrigger value="manage" className="flex items-center">
                <Settings size={16} className="mr-2" />
                Manage Workshops
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="upcoming">
            <WorkshopList />
          </TabsContent>
          
          {userType === 'scadOffice' && (
            <TabsContent value="manage">
              <WorkshopManagement />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Workshops;
