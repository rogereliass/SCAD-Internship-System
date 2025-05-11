
import React from 'react';
import { useVideoAppointment } from '@/contexts/VideoAppointmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneIncoming, UserCheck, UserMinus } from 'lucide-react';

const DemoPanel = () => {
  const { simulateIncomingCall, simulateParticipantLeft } = useVideoAppointment();

  // Mock callers for demo
  const mockCallers = [
    {
      id: 'student1',
      name: 'Ahmed Al-Farsi',
      role: 'student' as const,
      isOnline: true
    },
    {
      id: 'officer1',
      name: 'Dr. Mohammed Al-Siyabi',
      role: 'scadOfficer' as const,
      isOnline: true
    }
  ];

  return (
    <Card className="bg-gray-100 mt-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Demo Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Simulate Incoming Call</h4>
            <div className="flex flex-wrap gap-2">
              {mockCallers.map(caller => (
                <Button
                  key={caller.id}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={() => simulateIncomingCall(caller)}
                >
                  <PhoneIncoming size={14} className="mr-1" />
                  Call from {caller.name}
                </Button>
              ))}
            </div>
          </div>
          
        
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoPanel;
