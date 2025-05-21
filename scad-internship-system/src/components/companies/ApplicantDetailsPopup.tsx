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
import { Calendar, Mail, CheckCircle, XCircle, Clock, FileText, Briefcase } from 'lucide-react';

// Enhanced Applicant interface with experience data
interface Experience {
  jobTitle: string;
  company: string;
  duration: string;
  description?: string;
}

interface Applicant {
  id: string;
  name: string;
  position: string;
  jobPostingId: string;
  email: string;
  appliedDate: string;
  status: 'Accepted' | 'Rejected' | 'Finalized';
  education?: string;
  experiences?: Experience[];
  skills?: string[];
}

interface ApplicantDetailsPopupProps {
  applicant: Applicant | null;
  isOpen: boolean;
  onClose: () => void;
}

const ApplicantDetailsPopup: React.FC<ApplicantDetailsPopupProps> = ({
  applicant,
  isOpen,
  onClose
}) => {
  if (!applicant) return null;

  // Get status info
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'finalized':
        return {
          color: 'bg-blue-100 text-blue-800',
          label: 'Finalized',
          description: 'Applicant has passed interview and is ready to start internship'
        };
      case 'accepted':
        return {
          color: 'bg-green-100 text-green-800',
          label: 'Accepted for Interview',
          description: 'Applicant is accepted for interview'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          label: 'Rejected',
          description: 'Applicant has been rejected'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          label: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  const statusInfo = getStatusInfo(applicant.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900">{applicant.name}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {applicant.position}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-gray-800">{applicant.email}</p>
              </div>
            </div>
          </div>
          
          {/* Application Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Application Details</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-gray-800">Applied on {applicant.appliedDate}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge className={`${statusInfo.color}`}>
                  {statusInfo.label}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-gray-500">{statusInfo.description}</p>
            </div>
          </div>
          
          {/* Past Experiences */}
          {applicant.experiences && applicant.experiences.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Past Experiences</h3>
              <div className="bg-gray-50 p-3 rounded-md space-y-3">
                {applicant.experiences.map((exp, index) => (
                  <div key={index} className={index > 0 ? "pt-3 border-t border-gray-200" : ""}>
                    <div className="flex items-start">
                      <Briefcase className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{exp.jobTitle}</h4>
                        <p className="text-xs text-gray-600">{exp.company}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{exp.duration}</p>
                        {exp.description && (
                          <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

            {/* Skills if available */}
            {applicant.skills && applicant.skills.length > 0 && (
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill, index) => (
                    <Badge 
                        key={index} 
                        className="bg-white border-gray-300 hover:bg-gray-50 text-gray-800 font-medium"
                    >
                        {skill}
                    </Badge>
                    ))}
                </div>
                </div>
            </div>
            )}
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

export default ApplicantDetailsPopup;