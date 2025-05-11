
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

type CallStatus = 'idle' | 'ringing' | 'connecting' | 'connected' | 'ended';

interface AppointmentParticipant {
  id: string;
  name: string;
  role: 'student' | 'scadOfficer';
  isOnline: boolean;
  avatar?: string;
}

interface IncomingCall {
  callId: string;
  caller: AppointmentParticipant;
  appointmentId: string;
}

interface VideoAppointmentContextType {
  // Call state
  callStatus: CallStatus;
  currentCall: {
    callId: string;
    appointmentId: string;
    participant: AppointmentParticipant | null;
  } | null;
  incomingCall: IncomingCall | null;
  
  // Media state
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  
  // Actions
  startCall: (appointmentId: string, participant: AppointmentParticipant) => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleScreenShare: () => void;
  
  // For demo purposes
  simulateIncomingCall: (caller: AppointmentParticipant) => void;
  simulateParticipantLeft: () => void;
  simulateAppointmentAccepted: (appointment: any) => void;
}

const VideoAppointmentContext = createContext<VideoAppointmentContextType | undefined>(undefined);

export const VideoAppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Call state
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const getCallStatus = () => callStatus;

  const [currentCall, setCurrentCall] = useState<{
    callId: string;
    appointmentId: string;
    participant: AppointmentParticipant | null;
  } | null>(null);
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  
  // Media state
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Handle call actions
  const startCall = (appointmentId: string, participant: AppointmentParticipant) => {
    const callId = `call-${Date.now()}`;
    setCurrentCall({
      callId,
      appointmentId,
      participant,
    });
    setCallStatus('connecting');
    
    // Simulate connection after a delay
    setTimeout(() => {
      setCallStatus('connected');
      toast.success(`Connected with ${participant.name}`);
    }, 1500);
  };

  const acceptCall = () => {
    if (!incomingCall) return;
    
    setCurrentCall({
      callId: incomingCall.callId,
      appointmentId: incomingCall.appointmentId,
      participant: incomingCall.caller,
    });
    setIncomingCall(null);
    setCallStatus('connecting');
    
    // Simulate connection after a delay
    setTimeout(() => {
      setCallStatus('connected');
      toast.success(`Connected with ${incomingCall.caller.name}`);
    }, 1500);
  };

  const rejectCall = () => {
    if (!incomingCall) return;
    
    toast.info(`Call from ${incomingCall.caller.name} rejected`);
    setIncomingCall(null);
    setCallStatus('idle');
  };

  const endCall = () => {
    if (!currentCall) return;
    
    toast.info('Call ended');
    setCurrentCall(null);
    setCallStatus('ended');
    
    // Reset call status after a delay
    setTimeout(() => {
      setCallStatus('idle');
    }, 2000);
    
    // Reset media states
    setIsScreenSharing(false);
  };

  // Media controls
  const toggleVideo = () => {
    setIsVideoEnabled(prev => !prev);
    toast.info(`Camera ${!isVideoEnabled ? 'enabled' : 'disabled'}`);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
    toast.info(`Microphone ${!isAudioEnabled ? 'enabled' : 'disabled'}`);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(prev => !prev);
    toast.info(`Screen sharing ${!isScreenSharing ? 'started' : 'stopped'}`);
  };

  // For demo purposes
  const simulateIncomingCall = (caller: AppointmentParticipant) => {
    if (callStatus !== 'idle') {
      toast.error('Already in a call');
      return;
    }
    
    const newIncomingCall: IncomingCall = {
      callId: `call-${Date.now()}`,
      caller,
      appointmentId: `appointment-${Date.now()}`,
    };
    
    setIncomingCall(newIncomingCall);
    setCallStatus('ringing');
    
    // Auto-reject after 15 seconds if unanswered
    setTimeout(() => {
      setIncomingCall(prevCall => {
        if (prevCall?.callId === newIncomingCall.callId && getCallStatus() === 'ringing') {
          toast.info(`Missed call from ${caller.name}`);
          setCallStatus('idle');
          return null;
        }
        return prevCall;
      });
    }, 15000);
  };

  const simulateParticipantLeft = () => {
    if (callStatus !== 'connected' || !currentCall?.participant) return;
    
    toast.warning(`${currentCall.participant.name} has left the call`);
    endCall();
  };

  const simulateAppointmentAccepted = (appointment: any) => {
    toast.success(`${appointment.studentName}'s appointment request has been accepted`);
  };

  // Provide the context value
  const value = {
    callStatus,
    currentCall,
    incomingCall,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    simulateIncomingCall,
    simulateParticipantLeft,
    simulateAppointmentAccepted,
  };

  return (
    <VideoAppointmentContext.Provider value={value}>
      {children}
    </VideoAppointmentContext.Provider>
  );
};

export const useVideoAppointment = () => {
  const context = useContext(VideoAppointmentContext);
  if (context === undefined) {
    throw new Error('useVideoAppointment must be used within a VideoAppointmentProvider');
  }
  return context;
};
