
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, User, Check, X } from 'lucide-react';
import { useVideoAppointment } from '@/contexts/VideoAppointmentContext';

// Mock data
const mockAppointments = [
  {
    id: '1',
    studentName: 'Ahmed Al-Farsi',
    studentId: 'S12345',
    date: '2023-11-25',
    time: '10:00 AM',
    reason: 'Career Guidance',
    status: 'confirmed',
    participant: {
      id: 'p1',
      name: 'Ahmed Al-Farsi',
      role: 'student' as const,
      isOnline: true,
    }
  },
  {
    id: '2',
    studentName: 'Fatima Al-Balushi',
    studentId: 'S12346',
    date: '2023-11-24',
    time: '11:30 AM',
    reason: 'Internship Report Discussion',
    status: 'pending',
    participant: {
      id: 'p2',
      name: 'Fatima Al-Balushi',
      role: 'student' as const,
      isOnline: false,
    }
  },
  {
    id: '3',
    studentName: 'Omar Al-Habsi',
    studentId: 'S12349',
    date: '2023-11-26',
    time: '2:00 PM',
    reason: 'Career Guidance',
    status: 'confirmed',
    participant: {
      id: 'p3',
      name: 'Omar Al-Habsi',
      role: 'student' as const,
      isOnline: true,
    }
  },
  {
    id: '4',
    studentName: 'Dr. Aisha Al-Zaabi',
    studentId: 'F10045',
    date: '2023-11-26',
    time: '4:30 PM',
    reason: 'Internship Program Coordination',
    status: 'confirmed',
    participant: {
      id: 'p4',
      name: 'Dr. Aisha Al-Zaabi',
      role: 'scadOfficer' as const,
      isOnline: true,
    }
  }
];

const AppointmentList = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all');
  const { startCall, simulateAppointmentAccepted } = useVideoAppointment();

  const filteredAppointments = mockAppointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  const handleAccept = (appointment) => {
    simulateAppointmentAccepted(appointment);
  };

  const handleStartCall = (appointment) => {
    startCall(appointment.id, appointment.participant);
  };

  return (
    <div className="mt-6">
      <div className="mb-4 flex gap-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'pending' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button 
          variant={filter === 'confirmed' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('confirmed')}
        >
          Confirmed
        </Button>
      </div>

      <div className="space-y-4">
        {filteredAppointments.map(appointment => (
          <Card key={appointment.id} className="bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{appointment.studentName}</h3>
                    <span 
                      className={`ml-2 inline-block w-2 h-2 rounded-full ${
                        appointment.participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`} 
                      title={appointment.participant.isOnline ? 'Online' : 'Offline'}
                    />
                    <Badge 
                      className={`ml-2 ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      }`}
                    >
                      {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{appointment.studentId}</p>
                  <p className="mt-2 text-sm">{appointment.reason}</p>
                  <div className="mt-2 flex text-sm text-gray-600">
                    <div className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {appointment.status === 'confirmed' ? (
                    <Button 
                      className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-600/90 ${!appointment.participant.isOnline ? 'opacity-50 cursor-not-allowed' : ''}`} 
                      disabled={!appointment.participant.isOnline} 
                      onClick={() => handleStartCall(appointment)}
                    >
                      <Video size={16} className="mr-2" />
                      Join Call
                    </Button>


                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
                        onClick={() => handleAccept(appointment)}
                      >
                        <X size={16} className="mr-1" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAccept(appointment)}
                      >
                        <Check size={16} className="mr-1" />
                        Accept
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No appointments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
