
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVideoAppointment } from '@/contexts/VideoAppointmentContext';
import { PhoneCall, PhoneIncoming, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const IncomingCallNotification = () => {
  const { incomingCall, acceptCall, rejectCall } = useVideoAppointment();

  if (!incomingCall) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center">
      <Card className="w-full max-w-md bg-white shadow-lg mt-4 animate-fade-in">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-green-500">
                  <AvatarImage src={incomingCall.caller.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {incomingCall.caller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              <div>
                <p className="font-medium">{incomingCall.caller.name}</p>
                <div className="flex items-center text-sm text-green-600">
                  <PhoneIncoming size={14} className="mr-1" />
                  <span>Incoming video call</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                className="rounded-full" 
                onClick={rejectCall}
              >
                <X size={18} />
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="rounded-full bg-green-600 hover:bg-green-700" 
                onClick={acceptCall}
              >
                <PhoneCall size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomingCallNotification;
