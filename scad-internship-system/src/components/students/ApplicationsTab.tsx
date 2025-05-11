import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Building2 } from 'lucide-react';
import ApplicationDetails from './ApplicationDetails';

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  description: string;
  status: 'pending' | 'finalized' | 'accepted' | 'rejected';
  startDate?: string;
  endDate?: string;
  contactEmail?: string;
  industry: string;
  location: string;
  duration: string;
  isPaid: boolean;
  salary: string | number;
  requirements: string[];
}

interface ApplicationsTabProps {
  applications: Application[];
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ applications }) => {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  if (selectedApplication) {
    return (
      <ApplicationDetails
        application={selectedApplication}
        onBack={() => setSelectedApplication(null)}
      />
    );
  }

  const getStatusInfo = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />
        };
      case 'finalized':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="h-3.5 w-3.5 mr-1" />
        };
      case 'accepted':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <Clock className="h-3.5 w-3.5 mr-1" />
        };
    }
  };

  return (
    <div className="space-y-4">
      {applications.map((application) => {
        const statusInfo = getStatusInfo(application.status);
        return (
          <div
            key={application.id}
            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedApplication(application)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <Building2 className="h-4 w-4 mr-1" />
                  <span>{application.companyName}</span>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                {statusInfo.icon}
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationsTab;