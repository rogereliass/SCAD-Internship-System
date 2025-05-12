import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, GraduationCap, PlusCircle, ClipboardCheck, Calendar, ChevronRight, BriefcaseIcon } from 'lucide-react';
import ApplicantDetailsPopup from './ApplicantDetailsPopup';

// Add these interfaces to ensure consistency with ApplicantsTab
interface Applicant {
  id: string;
  name: string;
  position: string;
  jobPostingId: string;
  email: string;
  appliedDate: string;
  status: 'accepted' | 'rejected' | 'finalized';
}

interface OverviewTabProps {
    company: {
        activeJobPostings: number;
        totalApplications: number;
        currentInterns: number;
        name: string;
    };
    jobPostings: { position: string; createdAt: string }[];
    recentApplications: Applicant[]; // Updated to use the Applicant interface
    onTabChange: (tab: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ company, jobPostings = [], recentApplications = [], onTabChange }) => {
  // Add state for the applicant details popup
  const [detailsPopupOpen, setDetailsPopupOpen] = useState<boolean>(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  // Add function to open applicant details popup
  const handleOpenApplicantDetails = (applicantId: string) => {
    const applicant = recentApplications.find(app => app.id === applicantId);
    if (applicant) {
      setSelectedApplicant(applicant);
      setDetailsPopupOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-scad-dark">{company.name}'s Overview</h2>
            <p className="text-gray-500 text-sm mt-1">A snapshot of your internship program</p>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-scad-red to-red-600 text-white hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="mr-3">
                  <FileText className="h-6 w-6 opacity-80" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Active Job Postings</h3>
                  <p className="text-3xl font-bold">{company.activeJobPostings}</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-white">
            <button 
              onClick={() => onTabChange('postings')}
              className="text-sm text-scad-red hover:underline flex items-center justify-end"
            >
              Manage Postings <ChevronRight className="h-4 w-4 ml-1" />
            </button>
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="mr-3">
                  <Users className="h-6 w-6 opacity-80" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pending Applications</h3>
                  <p className="text-3xl font-bold">{company.totalApplications}</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-white">
            <button 
              onClick={() => onTabChange('applicants')}
              className="text-sm text-scad-red hover:underline flex items-center justify-end"
            >
              Review Applications <ChevronRight className="h-4 w-4 ml-1" />
            </button>
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="mr-3">
                  <GraduationCap className="h-6 w-6 opacity-80" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Current Interns</h3>
                  <p className="text-3xl font-bold">{company.currentInterns}</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-white">
            <button 
              onClick={() => onTabChange('interns')}
              className="text-sm text-scad-red hover:underline flex items-center justify-end"
            >
              Manage Interns <ChevronRight className="h-4 w-4 ml-1" />
            </button>
            </div>
          </div>
        </div>

        {/* Activity Breakdown */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-5 flex items-center text-scad-dark">
            <Calendar className="h-5 w-5 mr-2 text-scad-red" />
            Recent Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Most Recent Posting */}
            <div className="p-4 bg-gray-50 rounded-md border-l-4 border-scad-red">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Most Recent Posting</h3>
              {jobPostings.length > 0 ? (
                <>
                  <p className="font-medium text-scad-dark">{jobPostings[0].position}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" /> 
                    {jobPostings[0].createdAt}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">No job postings yet</p>
              )}
            </div>
            
            {/* Latest Application */}
            <div className="p-4 bg-gray-50 rounded-md border-l-4 border-yellow-300">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Latest Application</h3>
              {recentApplications.length > 0 ? (
                <>
                  <p className="font-medium text-scad-dark">{recentApplications[0].name}</p>
                  <p className="text-sm text-gray-600 mt-1">{recentApplications[0].position}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      recentApplications[0].status === 'accepted' ? 'bg-green-100 text-green-800' :
                      recentApplications[0].status === 'rejected' ? 'bg-red-100 text-red-800' :
                      recentApplications[0].status === 'finalized' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {recentApplications[0].status}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">No applications received</p>
              )}
            </div>
            
            {/* Intern Evaluation Status */}
            <div className="p-4 bg-gray-50 rounded-md border-l-4 border-green-500">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Intern Evaluation Status</h3>
              <p className="font-medium text-scad-dark">50% Complete</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 overflow-hidden">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">2 of 4 evaluations submitted</p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-scad-dark mb-4 flex items-center">
              <BriefcaseIcon className="h-5 w-5 mr-2 text-scad-red" />
              Quick Actions
            </h2>
            <div className="space-y-3">

              <button 
              onClick={() => onTabChange && onTabChange('postings')} 
              className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
              >
                  <div className="w-8 h-8 rounded-full bg-scad-red bg-opacity-10 flex items-center justify-center mr-3">
                      <PlusCircle className="h-4 w-4 text-scad-red" />
                  </div>
                  <div>
                      <p className="font-medium text-scad-dark">Create a Job Posting</p>
                      <p className="text-sm text-gray-500">Add a new job opportunity</p>
                  </div>
              </button>
              
              <button 
              onClick={() => onTabChange && onTabChange('applicants')} 
              className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
              >
                  <div className="w-8 h-8 rounded-full bg-blue-500 bg-opacity-10 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                      <p className="font-medium text-scad-dark">Review All Applicants</p>
                      <p className="text-sm text-gray-500">Process pending applications</p>
                  </div>
              </button>
              
              <button 
                onClick={() => onTabChange && onTabChange('interns')} 
                className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-green-500 bg-opacity-10 flex items-center justify-center mr-3">
                  <ClipboardCheck className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-scad-dark">Evaluate Interns</p>
                  <p className="text-sm text-gray-500">Submit performance reviews</p>
                </div>
              </button>

              <Link to="/internships/2" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 bg-opacity-10 flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-yellow-500" />
                  </div>
                <div>
                  <p className="font-medium text-scad-dark">View All Internships</p>
                  <p className="text-sm text-gray-500">Browse all internships across companies</p>
                </div>
              </Link>

            </div>
          </div>
          
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-scad-dark flex items-center">
                  <Users className="h-5 w-5 mr-2 text-scad-red" />
                  Recent Applications
                </h2>
                <button 
                  onClick={() => onTabChange('applicants')}
                  className="text-sm text-scad-red hover:underline flex items-center justify-end"
                >
                  All Applications <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              {recentApplications.length > 0 ? (
                <div className="space-y-3">
                  {recentApplications.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
                      <div className="flex justify-between">
                        <p className="font-medium text-scad-dark">{app.name}</p>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          app.status === 'finalized' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{app.position}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> Applied: {app.appliedDate}
                        </span>
                        <button 
                          onClick={() => handleOpenApplicantDetails(app.id)}
                          className="text-xs text-scad-red hover:underline flex items-center bg-transparent border-0 p-0 cursor-pointer"
                        >
                          Review <ChevronRight className="h-3 w-3 ml-0.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center text-center bg-gray-50 rounded-md border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-medium mb-1">No applicants yet</h3>
                  <p className="text-sm text-gray-500 mb-4">When students apply to your internships, they will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add ApplicantDetailsPopup */}
      <ApplicantDetailsPopup
        applicant={selectedApplicant}
        isOpen={detailsPopupOpen}
        onClose={() => setDetailsPopupOpen(false)}
      />
    </>
  );
};

export default OverviewTab;