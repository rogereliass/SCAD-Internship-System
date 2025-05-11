import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationsButton from './../DashboardEssentials/NotificationsButton';
import TabsLayout from './../DashboardEssentials/TabsLayout';
import { TabsContent } from '../ui/tabs';
import Footer from '../layout/Footer';
import { FileText, Users, GraduationCap, PlusCircle, ClipboardCheck, CheckCircle, Clock, FileCheck } from 'lucide-react';
import OverviewTab from './../companies/Overviewtab';
import JobPostingTab from '../companies/JobPostingTab';
import ApplicantsTab from '../companies/ApplicantsTab';
import InternTab from '../companies/InternTab';

const recentApplications = [
  { 
    id: '1', 
    name: 'Emily Johnson', 
    position: 'Frontend Developer', 
    appliedDate: '2023-11-15', 
    email: 'emily.johnson@example.com',
    jobPostingId: '1',
    status: 'accepted' as 'accepted' | 'rejected' | 'finalized',
    education: 'B.S. Computer Science, University of Washington, 2023',
    experiences: [
      {
        jobTitle: 'Web Developer Intern',
        company: 'TechStart Solutions',
        duration: 'May 2022 - August 2022',
        description: 'Developed responsive web applications using React and Node.js'
      },
      {
        jobTitle: 'Student Assistant',
        company: 'University IT Department',
        duration: 'Sep 2021 - May 2022',
        description: 'Provided technical support to faculty and students'
      }
    ],
    skills: ['JavaScript', 'React', 'HTML/CSS', 'Node.js', 'Git']
  },
  { 
    id: '2', 
    name: 'Michael Brown', 
    position: 'UX Design Intern', 
    appliedDate: '2023-11-14',
    email: 'michael.brown@example.com',
    jobPostingId: '2', 
    status: 'finalized' as 'accepted' | 'rejected' | 'finalized',
    education: 'B.F.A. Graphic Design, Rhode Island School of Design, 2023',
    experiences: [
      {
        jobTitle: 'UI/UX Design Intern',
        company: 'Creative Solutions Agency',
        duration: 'June 2022 - September 2022',
        description: 'Created wireframes and prototypes for mobile applications'
      }
    ],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'UI/UX Research', 'Prototyping']
  },
  { 
    id: '3', 
    name: 'Sarah Wilson', 
    position: 'Frontend Developer', 
    appliedDate: '2023-11-12',
    email: 'sarah.wilson@example.com',
    jobPostingId: '1', 
    status: 'accepted' as 'accepted' | 'rejected' | 'finalized',
    education: 'M.S. Software Engineering, Boston University, 2022',
    experiences: [
      {
        jobTitle: 'Software Engineering Intern',
        company: 'Global Tech Inc.',
        duration: 'May 2021 - August 2021',
        description: 'Worked on front-end development for enterprise web applications'
      },
      {
        jobTitle: 'Teaching Assistant',
        company: 'Boston University',
        duration: 'Sep 2020 - May 2021',
        description: 'Assisted in teaching web development courses'
      }
    ],
    skills: ['TypeScript', 'Angular', 'React', 'AWS', 'Jest']
  },
  { 
    id: '4', 
    name: 'David Garcia', 
    position: 'UX Design Intern', 
    appliedDate: '2023-11-10',
    email: 'david.garcia@example.com',
    jobPostingId: '2', 
    status: 'rejected' as 'accepted' | 'rejected' | 'finalized',
    education: 'B.A. Interactive Media Design, California Institute of Arts, 2023',
    experiences: [
      {
        jobTitle: 'Design Intern',
        company: 'Innovative Media Group',
        duration: 'June 2022 - August 2022',
        description: 'Designed user interfaces for web and mobile applications'
      }
    ],
    skills: ['Adobe Creative Suite', 'UI Design', 'Prototyping', 'User Research']
  },
];

const currentInterns = [
  { 
    id: 1, 
    name: 'Alex Martinez', 
    position: 'Web Developer', 
    startDate: '2023-09-01', 
    endDate: '2023-12-01',
    email: 'alex.martinez@example.com',
    major: 'Computer Science',
    year: '3',
    evaluationStatus: "pending" as "pending" | "submitted",
    status: 'completed' as "completed" | "active"
  },
  { 
    id: 2, 
    name: 'Jessica Lee', 
    position: 'Marketing Assistant', 
    startDate: '2023-10-15', 
    endDate: '2024-01-15',
    email: 'jessica.lee@example.com',
    major: 'Marketing',
    year: '4',
    evaluationStatus: "submitted" as "pending" | "submitted",
    status: 'completed' as "completed" | "active"
  },
  { 
    id: 3, 
    name: 'Ali Ahmed', 
    position: 'Backend Developer', 
    startDate: '2023-05-11', 
    endDate: '2023-11-11',
    email: 'ali.ahmed@example.com',
    major: 'Software Engineering',
    year: '4',
    status: 'active' as "completed" | "active"
  }
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
          applicants={recentApplications.map(app => ({
            ...app,
            email: `${app.name.toLowerCase().replace(' ', '.')}@example.com`,
            jobPostingId: app.position === 'Frontend Developer' ? '1' : '2',
            status: app.status as "pending" | "finalized" | "rejected" | "accepted",
          }))} 
          jobPostings={jobPostings.map(post => ({
            id: post.id.toString(),
            position: post.position
          }))}
      />

        </TabsContent>
        
        <TabsContent value="interns">
          <InternTab 
            interns={currentInterns}
            onTabChange={handleTabChange}
          />
        </TabsContent>
      </TabsLayout>
    </div>
  );
};

export default CompanyDashboard;
