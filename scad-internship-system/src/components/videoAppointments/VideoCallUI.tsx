
import React from 'react';
import { useVideoAppointment } from '@/contexts/VideoAppointmentContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Mic, MicOff, Video, VideoOff, PhoneCall, 
  ScreenShare, X, UserCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VideoCallUI = () => {
  const { 
    callStatus, 
    currentCall, 
    isVideoEnabled, 
    isAudioEnabled,
    isScreenSharing,
    endCall, 
    toggleVideo, 
    toggleAudio,
    toggleScreenShare
  } = useVideoAppointment();

  // If not in a call, don't render
  if (!currentCall || callStatus === 'idle' || callStatus === 'ended') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Call status indicator */}
      {callStatus === 'connecting' && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-black/20 border-4 border-primary flex items-center justify-center mb-4">
                <PhoneCall size={36} className="text-primary" />
              </div>
              <p className="text-xl font-medium">Connecting to call...</p>
              <p className="text-gray-400 mt-2">Please wait</p>
            </div>
          </div>
        </div>
      )}

      {/* Main call UI */}
      <div className="flex-1 flex flex-col">
        {/* Video area */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Main video (remote participant or self if no video) */}
          <div className="w-full h-full max-w-5xl max-h-[80vh] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center relative">
            {isVideoEnabled ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={currentCall.participant?.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      {currentCall.participant?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-white text-xl">{currentCall.participant?.name}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <UserCircle size={128} className="text-gray-600 mb-4" />
                  <p className="text-white text-xl">Camera is turned off</p>
                </div>
              </div>
            )}
            
            {/* Screen sharing indicator */}
            {isScreenSharing && (
              <Badge className="absolute top-4 right-4 bg-blue-600">
                <ScreenShare size={14} className="mr-1" />
                Screen sharing active
              </Badge>
            )}

            {/* Self view (picture in picture) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden border-2 border-primary flex items-center justify-center">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/30 text-white">You</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        
        {/* Call controls */}
        <div className="h-24 bg-gray-900 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className={`rounded-full h-12 w-12 ${!isAudioEnabled ? 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:text-white' : ''}`}
            onClick={toggleAudio}
          >
            {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className={`rounded-full h-12 w-12 ${!isVideoEnabled ? 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:text-white' : ''}`}
            onClick={toggleVideo}
          >
            {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className={`rounded-full h-12 w-12 ${isScreenSharing ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white' : ''}`}
            onClick={toggleScreenShare}
          >
            <ScreenShare size={20} />
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full h-12 w-12"
            onClick={endCall}
          >
            <X size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallUI;
