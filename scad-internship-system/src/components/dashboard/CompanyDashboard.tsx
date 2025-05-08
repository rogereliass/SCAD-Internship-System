
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationsButton from './../DashboardEssentials/NotificationsButton';
import TabsLayout from './../DashboardEssentials/TabsLayout';
import { TabsContent } from '../ui/tabs';
import Footer from '../layout/Footer';


// Sample data
const jobPostings = [
  { id: 1, position: 'Frontend Developer', applicants: 15, status: 'active', createdAt: '2023-11-01' },
  { id: 2, position: 'UX Design Intern', applicants: 8, status: 'active', createdAt: '2023-11-05' },
  { id: 3, position: 'Backend Developer', applicants: 12, status: 'closed', createdAt: '2023-10-15' },
];

const recentApplications = [
  { id: 1, name: 'Emily Johnson', position: 'Frontend Developer', appliedDate: '2023-11-15', status: 'pending' },
  { id: 2, name: 'Michael Brown', position: 'UX Design Intern', appliedDate: '2023-11-14', status: 'finalized' },
  { id: 3, name: 'Sarah Wilson', position: 'Frontend Developer', appliedDate: '2023-11-12', status: 'pending' },
  { id: 4, name: 'David Garcia', position: 'UX Design Intern', appliedDate: '2023-11-10', status: 'rejected' },
];

const currentInterns = [
  { id: 1, name: 'Alex Martinez', position: 'Web Developer', startDate: '2023-09-01', endDate: '2023-12-01' },
  { id: 2, name: 'Jessica Lee', position: 'Marketing Assistant', startDate: '2023-10-15', endDate: '2024-01-15' },
];

const mockNotifications = [
  {
    id: 1,
    title: 'New Application',
    description: 'Jessica Lee applied for Frontend Developer position',
    time: '2 hours ago',
    type: 'company' as const,
    read: false
  },
  {
    id: 2,
    title: 'Report Submitted',
    description: 'Alex Martinez submitted their monthly report',
    time: '1 day ago',
    type: 'report' as const,
    read: false
  },
  {
    id: 3,
    title: 'Meeting Scheduled',
    description: 'SCAD Office requested a meeting on Nov 25',
    time: '2 days ago',
    type: 'appointment' as const,
    read: true
  }
];

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const companyTabs = [
    { value: "overview", label: "Overview" },
    { value: "postings", label: "Job Postings" },
    { value: "applicants", label: "Applicants" },
    { value: "interns", label: "Interns" }
  ];


  const [company, setCompany] = useState({
    name: 'TechSolutions Inc.',
    industry: 'Information Technology',
    companySize: 'medium',
    activeJobPostings: 2,
    totalApplications: 23,
    currentInterns: 2,
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-scad-dark mb-2">Welcome back, {company.name}!</h1>
          <p className="text-gray-600">{company.industry} | {company.companySize.charAt(0).toUpperCase() + company.companySize.slice(1)} Company</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <NotificationsButton notifications={mockNotifications} />
        </div>
      </div>
      {/* Tabs section */}
      <TabsLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={companyTabs}
        className="mb-6"
      >
        <TabsContent value="overview">
          {/* All your overview content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            <div className="card bg-gradient-to-r from-scad-red to-red-600 text-white">
              <h3 className="text-lg font-semibold mb-2">Active Job Postings</h3>
              <p className="text-3xl font-bold">{company.activeJobPostings}</p>
              <Link to="/job-posts" className="inline-block mt-4 text-sm text-white hover:underline">Manage Postings →</Link>
            </div>
            
            <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <h3 className="text-lg font-semibold mb-2">Pending Applications</h3>
              <p className="text-3xl font-bold">{company.totalApplications}</p>
              <Link to="/applicants" className="inline-block mt-4 text-sm text-white hover:underline">Review Applications →</Link>
            </div>
            
            <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
              <h3 className="text-lg font-semibold mb-2">Current Interns</h3>
              <p className="text-3xl font-bold">{company.currentInterns}</p>
              <Link to="/interns" className="inline-block mt-4 text-sm text-white hover:underline">Manage Interns →</Link>
            </div>

          </div>
         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Your tables and other content */}
          </div>
        </TabsContent>
        
        <TabsContent value="postings">
          {/* Job postings tab content */}
          <div className="card">
          <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-scad-dark">Job Postings</h2>
              <Link to="/job-posts/new" className="btn btn-primary text-sm">+ New Posting</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobPostings.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{post.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{post.applicants}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/job-posts/${post.id}`} className="text-scad-red hover:text-opacity-80 mr-3">
                          View
                        </Link>
                        <Link to={`/job-posts/${post.id}/edit`} className="text-blue-600 hover:text-blue-800">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          </div>
        </TabsContent>
        
        <TabsContent value="applicants">
        <div className="lg:col-span-1">
          <div className="card h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-scad-dark">Recent Applications</h2>
              <Link to="/applicants" className="text-sm text-scad-red hover:underline">View all</Link>
            </div>
            
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="p-3 bg-gray-50 rounded-md">
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
                    <span className="text-xs text-gray-500">Applied: {app.appliedDate}</span>
                    <Link to={`/applicants/${app.id}`} className="text-xs text-scad-red hover:underline">
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        </TabsContent>
        
        <TabsContent value="interns">
        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-scad-dark">Current Interns</h2>
              <Link to="/interns" className="text-sm text-scad-red hover:underline">View all</Link>
            </div>
            
            {currentInterns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentInterns.map((intern) => (
                  <div key={intern.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-scad-dark">{intern.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{intern.position}</p>
                    <div className="flex items-center text-gray-500 text-xs space-x-2">
                      <span>Start: {intern.startDate}</span>
                      <span>•</span>
                      <span>End: {intern.endDate}</span>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <Link to={`/interns/${intern.id}`} className="text-scad-red text-sm hover:underline">
                        View Details
                      </Link>
                      <span>•</span>
                      <Link to={`/interns/${intern.id}/evaluate`} className="text-blue-600 text-sm hover:underline">
                        Evaluate
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No current interns.</p>
                <Link to="/applicants" className="mt-3 text-scad-red hover:underline">
                  Review applications to accept interns
                </Link>
              </div>
            )}
          </div>
        </div>
        </TabsContent>
      </TabsLayout>

    </div>

  );
};

export default CompanyDashboard;
