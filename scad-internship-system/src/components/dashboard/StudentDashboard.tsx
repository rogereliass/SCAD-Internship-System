import { useState } from 'react';
import NotificationsButton from './../DashboardEssentials/NotificationsButton';
import TabsLayout from './../DashboardEssentials/TabsLayout';
import { TabsContent } from '../ui/tabs';
import ApplicationsTab from '../students/ApplicationsTab';
import ApplicationDetails from '../students/ApplicationDetails';
import { Search, Filter, FileText, Users, GraduationCap, PlusCircle, ClipboardCheck, ChevronRight, Video, Upload, BriefcaseIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import InternshipCard from '../internships/InternshipCard';
import AvailableInternships from '../internships/AvailableInternships';
import CompanyCard from '../companies/CompanyCard';
import MyInternshipsTab from '../students/MyInternshipsTab';
import Reports from '../reports/Reports';
import CompanyEvaluations from '../reports/CompanyEvaluations';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
  salary: string;
  requirements: string[];
}

// Placeholder data - to be replaced with actual data
const mockNotifications = [
  {
    id: 1,
    title: 'New Internship Cycle',
    description: 'The Summer 2024 internship cycle is now open! Start applying for positions.',
    time: '2 hours ago',
    type: 'company' as const,
    read: false
  },
  {
    id: 2,
    title: 'Upcoming Internship Cycle',
    description: 'The Fall 2024 internship cycle will begin in 2 weeks. Prepare your applications!',
    time: '1 day ago',
    type: 'workshop' as const,
    read: false
  },
  {
    id: 3,
    title: 'Internship Report Status',
    description: 'Your internship report for TechCorp has been reviewed and approved',
    time: '2 days ago',
    type: 'report' as const,
    read: true
  },
  {
    id: 4,
    title: 'Course Reminder',
    description: 'Web Development 101 starts tomorrow at 10:00 AM',
    time: '3 days ago',
    type: 'workshop' as const,
    read: false
  }
];

const majors = [
  'CSE',
  'DMET',
  'Mechatronics',
  'BI',
  'Civil',
  'Architecture',
  'Materials',
  'Design and Production',
  'Networks',
  'Communication',
  'Pharmacy',
  'Applied Arts',
  'Law',
  'Management'
];
const semesters = [3,4,5,6,7,8];
const majorsList = majors.flatMap(major => semesters.map(sem => `${major} ${sem}${sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester`));

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 987-6543',
    major: 'Computer Science 6th Semester',
    jobInterests: ['Frontend Development', 'UI/UX Design'],
    previousJobs: [
      { jobTitle: 'Part-time Web Developer', company: 'Webify', duration: '6 months' }
    ],
    collegeActivities: ['Coding Club', 'Student Council'],
    documents: [] as { name: string; url: string }[],
  });
  const [newJobInterest, setNewJobInterest] = useState('');
  const [newActivity, setNewActivity] = useState('');
  const [newJob, setNewJob] = useState({ jobTitle: '', company: '', duration: '' });
  const [newDocument, setNewDocument] = useState<File | null>(null);
  const [createReportData, setCreateReportData] = useState<{ jobTitle: string; companyName: string } | null>(null);
  const [reportsSubTab, setReportsSubTab] = useState<'reports' | 'evaluations'>('reports');
  const [companyEvaluations, setCompanyEvaluations] = useState<{
    id: string;
    companyName: string;
    recommended: boolean;
    comments: string;
    submittedAt: string;
  }[]>([]);

  const studentTabs = [
    { value: "overview", label: "Overview" },
    { value: "internships", label: "Internships" },
    { value: "reports", label: "Reports & Evaluations" },
    { value: "profile", label: "Profile" }
  ];

  const [student, setStudent] = useState({
    name: 'Alex Johnson',
    major: 'Computer Science',
    semester: 6,
    completedInternships: 1,
    isPRO: false,
  });

  const applications = [
    {
      id: '1',
      jobTitle: 'Frontend Developer Intern',
      companyName: 'TechCorp',
      description: 'A 3-month internship focused on React development',
      status: 'finalized' as const,
      startDate: '2024-06-01',
      endDate: '2024-09-01',
      contactEmail: 'hr@techcorp.com',
      industry: 'Information Technology',
      location: 'San Francisco, CA',
      duration: '3 months',
      isPaid: true,
      salary: '20',
      requirements: ['React', 'JavaScript', 'HTML', 'CSS']
    },
    {
      id: '2',
      jobTitle: 'UX Design Intern',
      companyName: 'DesignHub',
      description: 'Work on user interface design and user experience',
      status: 'pending' as const,
      industry: 'Design',
      location: 'New York, NY',
      duration: '6 months',
      isPaid: true,
      salary: '22',
      requirements: ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping']
    }
  ];

  const recommendedCompanies = [
    { 
      name: 'TechCorp', 
      industry: 'Information Technology', 
      email: 'careers@techcorp.com',
      contactPerson: 'John Smith',
      phone: '+1 (555) 123-4567',
      website: 'https://techcorp.com',
      location: 'San Francisco, CA',
      joinDate: '2023-01-15',
      about: 'TechCorp is a leading technology company specializing in innovative software solutions. We focus on creating cutting-edge products that help businesses transform their digital presence.',
      size: 'large' as const
    },
    { 
      name: 'DesignHub', 
      industry: 'Design', 
      email: 'jobs@designhub.com',
      contactPerson: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      website: 'https://designhub.com',
      location: 'New York, NY',
      joinDate: '2023-03-20',
      about: 'DesignHub is a creative design agency that helps brands establish their visual identity. Our team of expert designers creates stunning, user-centered designs that make an impact.',
      size: 'medium' as const
    },
    { 
      name: 'DataSystems', 
      industry: 'Data Analytics', 
      email: 'recruiting@datasystems.com',
      contactPerson: 'Michael Chen',
      phone: '+1 (555) 345-6789',
      website: 'https://datasystems.com',
      location: 'Boston, MA',
      joinDate: '2023-06-10',
      about: 'DataSystems is a data analytics company that helps organizations make data-driven decisions. We provide advanced analytics solutions and consulting services to businesses of all sizes.',
      size: 'corporate' as const
    }
  ];

  const myInternships = [
    { id: '1', company: 'TechCorp', title: 'Frontend Developer', status: 'current', startDate: '2024-01-01', endDate: '2024-04-01' },
    { id: '2', company: 'DesignHub', title: 'UX Designer', status: 'completed', startDate: '2023-06-01', endDate: '2023-09-01' }
  ];

  // List of all companies for evaluation
  const allCompanies = [
    'TechCorp',
    'DesignHub',
    'DataSystems',
    'MarketingPro',
    'FinanceFirst',
    'HealthTech',
    'EduTech',
    'GreenEnergy',
    'E-finance',
    // ...add more as needed
  ];

  // Add new state for application status data
  const applicationStatusData = [
    { name: 'Accepted', value: 2, color: '#22c55e' },
    { name: 'Rejected', value: 1, color: '#ef4444' },
    { name: 'Pending', value: 3, color: '#eab308' },
    { name: 'Finalized', value: 1, color: '#3b82f6' },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplicationClick = (id: string) => {
    const application = applications.find(app => app.id === id);
    if (application) {
      setSelectedApplication(application);
    }
  };

  const handleInternshipClick = (id: string) => {
    const internship = myInternships.find(intern => intern.id === id);
    if (internship) {
      console.log('Internship clicked:', internship);
    }
  };

  const handleBack = () => {
    setSelectedApplication(null);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAddJobInterest = () => {
    if (newJobInterest.trim()) {
      setProfile(prev => ({ ...prev, jobInterests: [...prev.jobInterests, newJobInterest.trim()] }));
      setNewJobInterest('');
    }
  };

  const handleRemoveJobInterest = (index: number) => {
    setProfile(prev => ({ ...prev, jobInterests: prev.jobInterests.filter((_, i) => i !== index) }));
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setProfile(prev => ({ ...prev, collegeActivities: [...prev.collegeActivities, newActivity.trim()] }));
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (index: number) => {
    setProfile(prev => ({ ...prev, collegeActivities: prev.collegeActivities.filter((_, i) => i !== index) }));
  };

  const handleAddJob = () => {
    if (newJob.jobTitle && newJob.company && newJob.duration) {
      setProfile(prev => ({ ...prev, previousJobs: [...prev.previousJobs, newJob] }));
      setNewJob({ jobTitle: '', company: '', duration: '' });
    }
  };

  const handleRemoveJob = (index: number) => {
    setProfile(prev => ({ ...prev, previousJobs: prev.previousJobs.filter((_, i) => i !== index) }));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewDocument(file);
    }
  };

  const handleAddDocument = () => {
    if (newDocument) {
      const url = URL.createObjectURL(newDocument);
      setProfile(prev => ({ ...prev, documents: [...prev.documents, { name: newDocument.name, url }] }));
      setNewDocument(null);
    }
  };

  const handleCreateReportFromInternship = (internship) => {
    setActiveTab('reports');
    setCreateReportData({
      jobTitle: internship.title,
      companyName: internship.company,
    });
  };

  // Add handlers for quick actions
  const handleCreateReport = () => {
    setActiveTab('reports');
    setReportsSubTab('reports');
    setCreateReportData({ jobTitle: '', companyName: '' });
  };

  const handleEvaluateCompany = () => {
    setActiveTab('reports');
    setReportsSubTab('evaluations');
    // Wait for the tab to change and then trigger the create evaluation button
    setTimeout(() => {
      const createEvaluationButton = document.querySelector('[data-testid="create-evaluation-button"]');
      if (createEvaluationButton instanceof HTMLElement) {
        createEvaluationButton.click();
      }
    }, 100);
  };

  const handleViewInternships = () => {
    setActiveTab('internships');
    // Scroll to available internships section
    setTimeout(() => {
      const element = document.getElementById('available-internships');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleUploadDocument = () => {
    setActiveTab('profile');
    setProfileEditMode(true);
    // Wait for the profile tab to open and then trigger the file input
    setTimeout(() => {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput instanceof HTMLElement) {
        fileInput.click();
      }
    }, 100);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-scad-dark mb-2">Welcome back, {student.name}!</h1>
          <p className="text-gray-600">{student.major} | Semester {student.semester}</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <NotificationsButton notifications={mockNotifications} notificationsPagePath="/notifications/1" />
        </div>
      </div>

      {/* Tabs section */}
      <TabsLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={studentTabs}
        className="mb-6"
      >
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-scad-dark mb-4 flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-scad-red" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button 
                  onClick={handleCreateReport}
                  className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-scad-red bg-opacity-10 flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-scad-red" />
                  </div>
                  <div>
                    <p className="font-medium text-scad-dark">Create Report</p>
                    <p className="text-sm text-gray-500">Submit your internship report</p>
                  </div>
                </button>

                <button 
                  onClick={handleEvaluateCompany}
                  className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 bg-opacity-10 flex items-center justify-center mr-3">
                    <ClipboardCheck className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-scad-dark">Evaluate Company</p>
                    <p className="text-sm text-gray-500">Share your internship experience</p>
                  </div>
                </button>

                <button 
                  onClick={handleViewInternships}
                  className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 bg-opacity-10 flex items-center justify-center mr-3">
                    <BriefcaseIcon className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-scad-dark">View Available Internships</p>
                    <p className="text-sm text-gray-500">Browse current opportunities</p>
                  </div>
                </button>

                <button 
                  onClick={handleUploadDocument}
                  className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500 bg-opacity-10 flex items-center justify-center mr-3">
                    <Upload className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-scad-dark">Upload Document</p>
                    <p className="text-sm text-gray-500">Add files to your profile</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Video Card */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-scad-dark mb-4 flex items-center">
                <Video className="h-5 w-5 mr-2 text-scad-red" />
                Internship Requirements
              </h2>
              <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/your-video-id"
                  title="Internship Requirements Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Learn about what kinds of internships count towards your {student.major} requirements
              </p>
            </div>

            {/* Application Status Chart */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-scad-dark mb-4">Application Status</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="internships">
          <div className="space-y-6">
            {/* Recommended Companies Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedCompanies.map((company, index) => (
                  <CompanyCard
                    key={index}
                    name={company.name}
                    industry={company.industry}
                    email={company.email}
                    size={company.size}
                    contactPerson={company.contactPerson}
                    phone={company.phone}
                    website={company.website}
                    location={company.location}
                    joinDate={company.joinDate}
                    about={company.about}
                  />
                ))}
              </div>
            </div>

            {/* Available Internships Section */}
            <div id="available-internships" className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-900">Available Internships</h2>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                  <h2 className="text-xl font-bold text-gray-900">Available Internships</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      type="text"
                      placeholder="Search internships..."
                      className="pl-9 bg-white text-gray-900 border-gray-200 focus:border-scad-red focus:ring-scad-red/20"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-500"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              {showFilters && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={industryFilter} onValueChange={setIndustryFilter}>
                      <SelectTrigger className="bg-white border-gray-200 text-gray-500 focus:border-scad-red focus:ring-scad-red/20">
                        <SelectValue placeholder="Filter by industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-gray-500">All Industries</SelectItem>
                        <SelectItem value="technology" className="text-gray-500">Technology</SelectItem>
                        <SelectItem value="design" className="text-gray-500">Design</SelectItem>
                        <SelectItem value="marketing" className="text-gray-500">Marketing</SelectItem>
                        <SelectItem value="finance" className="text-gray-500">Finance</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger className="bg-white border-gray-200 text-gray-500 focus:border-scad-red focus:ring-scad-red/20">
                        <SelectValue placeholder="Filter by duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-gray-500">All Durations</SelectItem>
                        <SelectItem value="1-3" className="text-gray-500">1-3 months</SelectItem>
                        <SelectItem value="3-6" className="text-gray-500">3-6 months</SelectItem>
                        <SelectItem value="6+" className="text-gray-500">6+ months</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                      <SelectTrigger className="bg-white border-gray-200 text-gray-500 focus:border-scad-red focus:ring-scad-red/20">
                        <SelectValue placeholder="Filter by payment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-gray-500">All Payment Types</SelectItem>
                        <SelectItem value="paid" className="text-gray-500">Paid</SelectItem>
                        <SelectItem value="unpaid" className="text-gray-500">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <AvailableInternships 
                onInternshipClick={handleInternshipClick} 
                searchTerm={searchTerm} 
                dateFilter={dateFilter}
                industryFilter={industryFilter}
                durationFilter={durationFilter}
                paymentFilter={paymentFilter}
              />
            </div>

            {/* My Applications Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search applications..."
                    className="pl-9 bg-white text-gray-900 border-gray-200 focus:border-scad-red focus:ring-scad-red/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <ApplicationsTab 
                applications={applications}
              />
            </div>

            {/* My Internships Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                  <h2 className="text-xl font-bold text-gray-900">My Internships</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      type="text"
                      placeholder="Search internships..."
                      className="pl-9 bg-white text-gray-900 border-gray-200 focus:border-scad-red focus:ring-scad-red/20"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px] bg-white text-gray-500 border-gray-200 focus:border-scad-red focus:ring-scad-red/20">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-gray-500">All Dates</SelectItem>
                      <SelectItem value="current" className="text-gray-500">Current</SelectItem>
                      <SelectItem value="completed" className="text-gray-500">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <MyInternshipsTab 
                onInternshipClick={handleInternshipClick} 
                onCreateReport={handleCreateReportFromInternship}
                searchTerm={searchTerm} 
                dateFilter={dateFilter} 
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Reports createReportData={createReportData} setCreateReportData={setCreateReportData} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <CompanyEvaluations
                evaluations={companyEvaluations}
                setEvaluations={setCompanyEvaluations}
                allCompanies={allCompanies}
                createButtonProps={{ 'data-testid': 'create-evaluation-button' }}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            {!profileEditMode ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{profile.name}</h3>
                    <p className="text-gray-600">{profile.email} | {profile.phone}</p>
                    <p className="text-gray-600">Major: {profile.major}</p>
                  </div>
                  <Button onClick={() => setProfileEditMode(true)} className="bg-scad-red text-white">Edit Profile</Button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Job Interests</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {profile.jobInterests.map((interest, idx) => (
                      <li key={idx}>{interest}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Previous Internships / Part-time Jobs</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {profile.previousJobs.map((job, idx) => (
                      <li key={idx}>{job.jobTitle} at {job.company} ({job.duration})</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">College Activities</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {profile.collegeActivities.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Documents</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {profile.documents.map((doc, idx) => (
                      <li key={idx}><a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-scad-red underline">{doc.name}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); setProfileEditMode(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Major & Semester</label>
                    <select name="major" value={profile.major} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900">
                      {majorsList.map((major, idx) => (
                        <option key={idx} value={major}>{major}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Interests</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={newJobInterest} onChange={e => setNewJobInterest(e.target.value)} className="border rounded px-3 py-2 flex-1 text-gray-900" placeholder="Add job interest" />
                    <Button type="button" onClick={handleAddJobInterest}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.jobInterests.map((interest, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        {interest}
                        <button type="button" onClick={() => handleRemoveJobInterest(idx)} className="text-red-500 ml-1">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Internships / Part-time Jobs</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <input type="text" placeholder="Job Title" value={newJob.jobTitle} onChange={e => setNewJob(j => ({ ...j, jobTitle: e.target.value }))} className="border rounded px-3 py-2 text-gray-900" />
                    <input type="text" placeholder="Company Name" value={newJob.company} onChange={e => setNewJob(j => ({ ...j, company: e.target.value }))} className="border rounded px-3 py-2 text-gray-900" />
                    <input type="text" placeholder="Duration" value={newJob.duration} onChange={e => setNewJob(j => ({ ...j, duration: e.target.value }))} className="border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <Button type="button" onClick={handleAddJob}>Add</Button>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.previousJobs.map((job, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        {job.jobTitle} at {job.company} ({job.duration})
                        <button type="button" onClick={() => handleRemoveJob(idx)} className="text-red-500 ml-1">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Activities</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={newActivity} onChange={e => setNewActivity(e.target.value)} className="border rounded px-3 py-2 flex-1 text-gray-900" placeholder="Add activity" />
                    <Button type="button" onClick={handleAddActivity}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.collegeActivities.map((act, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        {act}
                        <button type="button" onClick={() => handleRemoveActivity(idx)} className="text-red-500 ml-1">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Documents (CV, Cover Letter, Certificates)</label>
                  <div className="flex gap-2 mb-2">
                    <input type="file" onChange={handleDocumentUpload} />
                    <Button type="button" onClick={handleAddDocument} disabled={!newDocument}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.documents.map((doc, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-scad-red underline">{doc.name}</a>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="submit" className="bg-scad-red text-white">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setProfileEditMode(false)}>Cancel</Button>
                </div>
              </form>
            )}
          </div>
        </TabsContent>
      </TabsLayout>
    </div>
  );
};

export default StudentDashboard;