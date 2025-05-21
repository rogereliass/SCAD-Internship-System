import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Search, Filter, ChevronDown, Eye, Mail, FileText,
  CheckCircle, XCircle, Clock, Download, Users, ChevronRight, 
  Briefcase, SlidersHorizontal, Check, X, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import ApplicantDetailsPopup from './ApplicantDetailsPopup';

// Update the status type to only include the three allowed statuses
interface Applicant {
  id: string;
  name: string;
  position: string;
  jobPostingId: string;
  email: string;
  appliedDate: string;
  status: 'Accepted' | 'Rejected' | 'Finalized';
}

interface JobPosting {
  id: string;
  position: string;
}

interface ApplicantsTabProps {
  applicants: Applicant[];
  jobPostings: JobPosting[];
  onStatusChange?: (applicantId: string, newStatus: 'Accepted' | 'Rejected' | 'Finalized') => void;
}

const ApplicantsTab: React.FC<ApplicantsTabProps> = ({ 
  applicants = [], 
  jobPostings = [],
  onStatusChange 
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [statusDialogOpen, setStatusDialogOpen] = useState<boolean>(false);
  const [currentApplicant, setCurrentApplicant] = useState<string | null>(null);
  const [detailsPopupOpen, setDetailsPopupOpen] = useState<boolean>(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const filteredApplicants = useMemo(() => {
    return applicants.filter(applicant => {
      if (statusFilter !== 'all' && applicant.status !== statusFilter) {
        return false;
      }
      if (jobFilter !== 'all' && applicant.jobPostingId !== jobFilter) {
        return false;
      }
      if (searchTerm && !applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
         !applicant.email.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [applicants, statusFilter, jobFilter, searchTerm]);

  const groupedApplicants = useMemo(() => {
    const grouped: Record<string, Applicant[]> = {};
    filteredApplicants.forEach(applicant => {
      const jobId = applicant.jobPostingId;
      if (!grouped[jobId]) {
        grouped[jobId] = [];
      }
      grouped[jobId].push(applicant);
    });
    return grouped;
  }, [filteredApplicants]);

  const getJobTitle = (jobId: string) => {
    const job = jobPostings.find(j => j.id === jobId);
    return job ? job.position : "Unknown Position";
  };

  const toggleApplicant = (id: string) => {
    setSelectedApplicants(prev => {
      if (prev.includes(id)) {
        return prev.filter(appId => appId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleSelectMode = () => {
    setIsSelectMode(prev => !prev);
    setSelectedApplicants([]);
  };

  const toggleGroupCollapse = (jobId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const formatRelativeDate = (dateString: string) => {
    const now = new Date();
    const appliedDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - appliedDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return dateString;
    }
  };

  // Updated status info to only include the three allowed statuses
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Finalized':
        return {
          color: 'bg-blue-100 text-blue-800',
          tooltip: 'Applicant has passed interview and is ready to start internship',
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />
        };
      case 'Accepted':
        return {
          color: 'bg-green-100 text-green-800',
          tooltip: 'Applicant is accepted for interview',
          icon: <Clock className="h-3.5 w-3.5 mr-1" />
        };
      case 'Rejected':
        return {
          color: 'bg-red-100 text-red-800',
          tooltip: 'Applicant has been rejected',
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          tooltip: 'Status unknown',
          icon: <Clock className="h-3.5 w-3.5 mr-1" />
        };
    }
  };

  const handleOpenStatusDialog = (applicantId: string) => {
    setCurrentApplicant(applicantId);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = (status: 'Accepted' | 'Rejected' | 'Finalized') => {
    if (currentApplicant && onStatusChange) {
      onStatusChange(currentApplicant, status);
    }
    setStatusDialogOpen(false);
    setCurrentApplicant(null);
  };

  const handleStartInternship = (applicantId: string) => {
    toast.success("Internship started successfully!");
  };

  const getApplicantName = (id: string | null) => {
    if (!id) return '';
    const applicant = applicants.find(a => a.id === id);
    return applicant ? applicant.name : '';
  };

  const handleOpenApplicantDetails = (applicantId: string) => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (applicant) {
      setSelectedApplicant(applicant);
      setDetailsPopupOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-scad-dark">Applicants</h2>
          <p className="text-gray-500 text-sm mt-1">Review and manage internship applications</p>
        </div>
        
        <div className="mt-3 sm:mt-0 flex items-center space-x-3">
          <Button 
            variant={isSelectMode ? "default" : "outline"} 
            size="sm" 
            onClick={toggleSelectMode}
            className={isSelectMode ? "bg-scad-red hover:bg-scad-red/90" : ""}
          >
            {isSelectMode ? "Cancel Selection" : "Select Applicants"}
          </Button>
          
          {isSelectMode && selectedApplicants.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 mr-1 hidden sm:inline-block">
                {selectedApplicants.length} selected
              </span>
              <Button variant="outline" size="sm"
              onClick={() => toast.success("Emails Sent successfully!")}>
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
              <Button variant="outline" size="sm"
              onClick={() => toast.success("CVs downloaded successfully!")}>
                <Download className="h-4 w-4 mr-1" />
                Download CVs
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:items-center justify-between">
          {/* Filter buttons on the left - Updated to only show the three statuses */}
          <div className="flex flex-wrap gap-1 items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`border ${statusFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`border ${statusFilter === 'Finalized' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
              onClick={() => setStatusFilter('Finalized')}
            >
              Finalized
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`border ${statusFilter === 'Accepted' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
              onClick={() => setStatusFilter('Accepted')}
            >
              Accepted
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`border ${statusFilter === 'Rejected' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
              onClick={() => setStatusFilter('Rejected')}
            >
              Rejected
            </Button>
          </div>
            
          {/* Search and sliders moved to right */}
          <div className="flex items-center space-x-2 ml-auto">
            <div className="relative min-w-[180px] md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search applicants..."
                className="pl-9 bg-white text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowAdvancedFilters(true)}
              className={jobFilter !== 'all' ? "border-scad-red text-scad-red" : ""}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {jobFilter !== 'all' && (
          <div className="mt-2 flex items-center">
            <span className="text-xs text-scad-dark mr-2">Filtered by:</span>
            <Badge variant="outline" className="text-xs flex text-scad-dark items-center gap-1 bg-gray-50">
              {getJobTitle(jobFilter)}
              <button 
                onClick={() => setJobFilter('all')} 
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </div>
        )}
      </div>
      
      {Object.keys(groupedApplicants).length > 0 ? (
        <div className="space-y-6">
          {Object.keys(groupedApplicants).map(jobId => (
            <div key={jobId} className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                onClick={() => toggleGroupCollapse(jobId)}
              >
                <div className="flex items-center">
                  {collapsedGroups[jobId] ? (
                    <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                  )}
                  <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
                  <h3 className="font-medium text-gray-700">{getJobTitle(jobId)}</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">
                    {groupedApplicants[jobId].length} {groupedApplicants[jobId].length === 1 ? 'applicant' : 'applicants'}
                  </span>
                </div>
              </div>
              
              {!collapsedGroups[jobId] && (
                <div className="divide-y divide-gray-100">
                  {groupedApplicants[jobId].map(applicant => {
                    const statusInfo = getStatusInfo(applicant.status);
                    
                    return (
                      <div key={applicant.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          {isSelectMode && (
                            <div className="mr-3">
                              <input
                                type="checkbox"
                                checked={selectedApplicants.includes(applicant.id)}
                                onChange={() => toggleApplicant(applicant.id)}
                                className="rounded text-scad-red focus:ring-scad-red h-4 w-4"
                              />
                            </div>
                          )}
                          
                          <div className="flex-grow flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium text-gray-900">{applicant.name}</h3>
                                <div className="group relative ml-2">
                                  <Badge variant="outline" className={`${statusInfo.color} border-none flex items-center py-0.5`}>
                                    {statusInfo.icon}
                                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                  </Badge>
                                  <div className="hidden group-hover:block absolute z-10 p-2 bg-black text-white text-xs rounded w-48 top-full left-0 mt-1">
                                    {statusInfo.tooltip}
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{applicant.email}</p>
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                Applied {formatRelativeDate(applicant.appliedDate)}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2 mt-3 md:mt-0">
                              {applicant.status === 'Finalized' && (
                                <Button
                                  size="sm"
                                  className="text-xs flex items-center bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={() => handleStartInternship(applicant.id)}
                                >
                                  <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                                  Start Internship
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="text-xs flex items-center"
                              onClick={() => toast.success("Resume downloaded successfully!")}>
                                <FileText className="h-3.5 w-3.5 mr-1.5" />
                                Resume
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs flex items-center"
                              onClick={() => toast.success("Email Sent successfully!")}>
                                <Mail className="h-3.5 w-3.5 mr-1.5" />
                                Email
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs flex items-center"
                                onClick={() => handleOpenStatusDialog(applicant.id)}
                              >
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                Status
                              </Button>
                              
                              <Button 
                                variant="outline"
                                size="sm"
                                className="text-xs flex items-center text-scad-red hover:bg-red-50 hover:border-scad-red"
                                onClick={() => handleOpenApplicantDetails(applicant.id)}
                              >
                                <Eye className="h-3.5 w-3.5 mr-1.5" />
                                Review
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {collapsedGroups[jobId] && (
                <div className="py-3 px-5 text-sm text-center text-gray-500 italic">
                  Click to expand
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-50 rounded-full p-4 mb-4">
            <Users className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
          {searchTerm || statusFilter !== 'all' || jobFilter !== 'all' ? (
            <>
              <p className="text-gray-500 mb-6">Try adjusting your filters</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setJobFilter('all');
                }}
              >
                Clear All Filters
              </Button>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-6">You haven't received any applications yet</p>
              <Link to="/job-posts">
                <Button className="bg-scad-red hover:bg-scad-red/90">
                  Create Job Posting
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
      
      {/* Advanced filters dialog */}
      <Dialog open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Applicants</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="jobPosition" className="text-sm font-medium text-gray-700">Position</label>
              <select
                id="jobPosition"
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 text-sm p-2 bg-white text-gray-900 focus:ring-scad-red focus:border-scad-red"
              >
                <option value="all">All Positions</option>
                {jobPostings.map(job => (
                  <option key={job.id} value={job.id}>{job.position}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Applied</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="dateFrom" className="text-xs text-gray-500">From</label>
                  <Input id="dateFrom" type="date" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="dateTo" className="text-xs text-gray-500">To</label>
                  <Input id="dateTo" type="date" className="mt-1" />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdvancedFilters(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowAdvancedFilters(false);
              }}
              className="bg-scad-red hover:bg-scad-red/90"
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Status Update Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="sm:max-w-[550px] bg-white">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-xl text-gray-900">Update Application Status</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              Update status for <span className="font-semibold text-gray-900">{getApplicantName(currentApplicant)}</span>
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <Button 
                className="bg-blue-50 hover:bg-blue-100 text-blue-800 justify-start flex items-center gap-3 p-4 h-auto border border-blue-200"
                onClick={() => handleStatusChange('Finalized')}
              >
                <div className="bg-blue-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-blue-900">Finalize & Approve</p>
                  <p className="text-sm text-blue-700">Applicant has passed the interview and can begin internship</p>
                </div>
              </Button>
              
              <Button 
                className="bg-green-50 hover:bg-green-100 text-green-800 justify-start flex items-center gap-3 p-4 h-auto border border-green-200"
                onClick={() => handleStatusChange('Accepted')}
              >
                <div className="bg-green-100 p-2 rounded-full">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-green-900">Accept for Interview</p>
                  <p className="text-sm text-green-700">Approve applicant for interview phase</p>
                </div>
              </Button>
              
              <Button 
                className="bg-red-50 hover:bg-red-100 text-red-800 justify-start flex items-center gap-3 p-4 h-auto border border-red-200"
                onClick={() => handleStatusChange('Rejected')}
              >
                <div className="bg-red-100 p-2 rounded-full">
                  <XCircle className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-red-900">Reject Application</p>
                  <p className="text-sm text-red-700">Decline this applicant for the position</p>
                </div>
              </Button>
            </div>
          </div>
          
          <DialogFooter className="border-t pt-3">
            <Button 
              variant="outline" 
              onClick={() => setStatusDialogOpen(false)}
              className="text-gray-700 border-gray-300"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Applicant Details Popup */}
      <ApplicantDetailsPopup
        applicant={selectedApplicant}
        isOpen={detailsPopupOpen}
        onClose={() => setDetailsPopupOpen(false)}
      />
    </div>
  );
};

export default ApplicantsTab;