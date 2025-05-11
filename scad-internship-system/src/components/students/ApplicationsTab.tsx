import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  status: 'pending' | 'finalized' | 'accepted' | 'rejected';
}

interface ApplicationsTabProps {
  applications: Application[];
  onClick: (id: string) => void;
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ applications = [], onClick }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredApplications = useMemo(() => {
    return applications.filter(application => {
      if (statusFilter !== 'all' && application.status !== statusFilter) {
        return false;
      }
      if (
        searchTerm &&
        !application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !application.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [applications, statusFilter, searchTerm]);

  const getStatusInfo = (status: string) => {
    switch (status) {
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
    <div className="space-y-6">
      <div className="space-y-3">
        {filteredApplications.map((application) => {
          const statusInfo = getStatusInfo(application.status);
          return (
            <div 
              key={application.id} 
              className={`p-4 border rounded-lg ${statusInfo.color} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => onClick(application.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{application.jobTitle}</h3>
                  <p className="text-sm text-gray-600">{application.companyName}</p>
                </div>
                <div className="flex items-center gap-2">
                  {statusInfo.icon}
                  <span>{application.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationsTab;
