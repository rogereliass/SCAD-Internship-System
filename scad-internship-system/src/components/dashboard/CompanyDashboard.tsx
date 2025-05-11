import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationsButton from './../DashboardEssentials/NotificationsButton';
import TabsLayout from './../DashboardEssentials/TabsLayout';
import { TabsContent } from '../ui/tabs';
import Footer from '../layout/Footer';
import { FileText, Users, GraduationCap, PlusCircle, ClipboardCheck } from 'lucide-react';
import OverviewTab from './../companies/Overviewtab';
import JobPostingTab from '../companies/JobPostingTab';
import ApplicantsTab from '../companies/ApplicantsTab';
import InternTab from '../companies/InternTab';

const recentApplications = [
  { id: '1', name: 'Emily Johnson', position: 'Frontend Developer', appliedDate: '2023-11-15', status: 'finalized' },
  { id: '2', name: 'Michael Brown', position: 'UX Design Intern', appliedDate: '2023-11-14', status: 'finalized' },
  { id: '3', name: 'Sarah Wilson', position: 'Frontend Developer', appliedDate: '2023-11-12', status: 'finalized' },
  { id: '4', name: 'David Garcia', position: 'UX Design Intern', appliedDate: '2023-11-10', status: 'rejected' },
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
  const [applications, setApplications] = useState(recentApplications);

  const companyTabs = [
    { value: "overview", label: "Overview" },
    { value: "postings", label: "Job Postings" },
    { value: "applicants", label: "Applicants" },
    { value: "interns", label: "Interns" }
  ];

  // Sample data
  const [jobPostings, setJobPostings] = useState([
    { id: 1, position: 'Frontend Developer', applicants: 15, status: 'active', createdAt: '2023-11-01' },
    { id: 2, position: 'UX Design Intern', applicants: 8, status: 'active', createdAt: '2023-11-05' },
    { id: 3, position: 'Backend Developer', applicants: 12, status: 'closed', createdAt: '2023-10-15' },
  ]);

  const handleDeletePosting = (id: number) => {
    // Update the local state to remove the deleted posting
    setJobPostings(prevPostings => prevPostings.filter(post => post.id !== id));
  };

  const [company, setCompany] = useState({
    name: 'TechSolutions Inc.',
    industry: 'Information Technology',
    companySize: 'medium',
    activeJobPostings: 2,
    totalApplications: 23,
    currentInterns: 2,
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusChange = (applicantId: string, newStatus: 'accepted' | 'rejected' | 'finalized') => {
    setApplications(prevApplications => 
      prevApplications.map(app => 
        app.id === applicantId ? { ...app, status: newStatus } : app
      )
    );
  };

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
          <OverviewTab 
            company={company} 
            jobPostings={jobPostings} 
            recentApplications={applications} 
            onTabChange={handleTabChange}
          />
        </TabsContent>
        
        <TabsContent value="postings">
          <JobPostingTab jobPostings={jobPostings} onDeletePosting={handleDeletePosting}/>
        </TabsContent>
        
        <TabsContent value="applicants">
          <ApplicantsTab 
            applicants={applications.map(app => ({
              ...app,
              email: `${app.name.toLowerCase().replace(' ', '.')}@example.com`,
              jobPostingId: app.position === 'Frontend Developer' ? '1' : '2',
              status: app.status as "accepted" | "rejected" | "finalized",
            }))} 
            jobPostings={jobPostings.map(post => ({
              id: post.id.toString(),
              position: post.position
            }))}
            onStatusChange={handleStatusChange}
          />
        </TabsContent>
        
        <TabsContent value="interns">
          <InternTab 
            interns={currentInterns.map(intern => ({
              ...intern,
              evaluationStatus: Math.random() > 0.5 ? 
                Math.random() > 0.5 ? 'submitted' : 'in_progress' : 
                'not_started'
            }))}
            onTabChange={handleTabChange}
          />
        </TabsContent>
      </TabsLayout>
    </div>
  );
};

export default CompanyDashboard;
