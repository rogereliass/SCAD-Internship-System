import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Building2 } from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  description: string;
  status: 'pending' | 'finalized' | 'accepted' | 'rejected';
  startDate?: string;
  endDate?: string;
  contactEmail?: string;
}

interface ApplicationsTabProps {
  applications: Application[];
  onApplicationClick: (id: string) => void;
  searchTerm: string;
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({
  applications,
  onApplicationClick,
  searchTerm
}) => {
  const filteredApplications = applications.filter(application => 
    application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {filteredApplications.map((application) => {
        const statusInfo = getStatusInfo(application.status);
        return (
          <div 
            key={application.id}
            className="border rounded-lg p-4 hover:border-scad-red transition-colors cursor-pointer bg-white"
            onClick={() => onApplicationClick(application.id)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{application.jobTitle}</h3>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Building2 className="h-4 w-4 mr-1" />
                    <span>{application.companyName}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center`}>
                  {statusInfo.icon}
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{application.description}</p>
              {application.startDate && application.endDate && (
                <div className="text-sm text-gray-500">
                  Duration: {new Date(application.startDate).toLocaleDateString()} - {new Date(application.endDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {filteredApplications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No applications found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ApplicationsTab;
