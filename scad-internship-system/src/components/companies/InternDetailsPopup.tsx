import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, BookOpen, GraduationCap, Briefcase } from 'lucide-react';

// Update the interface to reflect only relevant information
interface InternDetails {
  id: number;
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  evaluationStatus?: 'pending' | 'submitted';
  email: string;
  major?: string;
  year?: string;
  status?: 'active' | 'completed';
}

interface InternDetailsPopupProps {
  intern: InternDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const InternDetailsPopup: React.FC<InternDetailsPopupProps> = ({
  intern,
  isOpen,
  onClose
}) => {
  if (!intern) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900">{intern.name}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {intern.position}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2 space-y-4">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center mb-2">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-gray-800">{intern.email}</p>
              </div>
            </div>
          </div>
          
          {/* Academic Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Academic Background</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center mb-2">
                <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-gray-800">{intern.major}</p>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-gray-800">Year {intern.year}</p>
              </div>
            </div>
          </div>
          
          {/* Internship Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Internship Information</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-start mb-2">
                <Briefcase className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-800">{intern.position}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-600">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {intern.startDate} - {intern.endDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge className={
                  intern.status === 'active' 
                    ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                }>
                  {intern.status === 'active' ? 'Active' : 'Completed'}
                </Badge>
              </div>
              {intern.evaluationStatus && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Evaluation:</span>
                  <Badge className={
                    intern.evaluationStatus === 'submitted' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                  }>
                    {intern.evaluationStatus === 'submitted' ? 'Submitted' : 'Pending'}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="border-t pt-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-gray-700 border-gray-300"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InternDetailsPopup;