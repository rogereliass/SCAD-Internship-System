import { useState } from 'react';
import NotificationsButton from './../DashboardEssentials/NotificationsButton';
import TabsLayout from './../DashboardEssentials/TabsLayout';
import { TabsContent } from '../ui/tabs';
import ApplicationsTab from '../students/ApplicationsTab';
import ApplicationDetails from '../students/ApplicationDetails';
import { Search, Filter, FileText, Users, GraduationCap, PlusCircle, ClipboardCheck, ChevronRight, Video, Upload, BriefcaseIcon, Calendar, BookOpen } from 'lucide-react';
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const majorsList = [
  'Computer Science 6th Semester',
  'Computer Science 5th Semester',
  'Computer Science 4th Semester',
  'Computer Science 3rd Semester',
  'Computer Science 2nd Semester',
  'Computer Science 1st Semester',
  'Information Technology 6th Semester',
  'Information Technology 5th Semester',
  'Information Technology 4th Semester',
  'Information Technology 3rd Semester',
  'Information Technology 2nd Semester',
  'Information Technology 1st Semester'
];

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

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    studentName: 'Ahmed Al-Farsi',
    studentId: 'S12345',
    date: '2023-11-25',
    time: '10:00 AM',
    reason: 'Career Guidance',
    status: 'confirmed'
  },
  {
    id: 2,
    studentName: 'Fatima Al-Balushi',
    studentId: 'S12346',
    date: '2023-11-24',
    time: '11:30 AM',
    reason: 'Internship Report Discussion',
    status: 'pending'
  },
  {
    id: 3,
    studentName: 'Omar Al-Habsi',
    studentId: 'S12349',
    date: '2023-11-26',
    time: '2:00 PM',
    reason: 'Career Guidance',
    status: 'confirmed'
  }
];

const PROStudentDashboard = () => {
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

  // Placeholder data - to be replaced with actual data
  const mockNotifications = [
    {
      id: 1,
      title: 'New Workshop Available',
      description: 'Advanced Interview Preparation Workshop is now open for registration.',
      time: '2 hours ago',
      type: 'workshop' as const,
      read: false
    },
    {
      id: 2,
      title: 'Career Readiness Report',
      description: 'Your Career Readiness Assessment report is now available.',
      time: '1 day ago',
      type: 'report' as const,
      read: false
    },
    {
      id: 3,
      title: 'Appointment Confirmed',
      description: 'Your career counseling session with Dr. Smith is confirmed for tomorrow.',
      time: '2 days ago',
      type: 'appointment' as const,
      read: true
    }
  ];

  const [student, setStudent] = useState({
    name: 'Alex Johnson',
    major: 'Computer Science',
    semester: 6,
    completedInternships: 1,
    isPRO: true,
    proStatus: 'active',
    proExpiryDate: '2024-12-31',
    workshopsCompleted: 3,
    assessmentsCompleted: 2,
    upcomingAppointments: 1
  });

  const proTabs = [
    { value: "overview", label: "Overview" },
    { value: "internships", label: "Internships" },
    { value: "reports", label: "Reports & Evaluations" },
    { value: "appointments", label: "Appointments" },
    { value: "workshops", label: "Workshops & Assessments" },
    { value: "profile", label: "Profile" }
  ];

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
      about: 'TechCorp is a leading technology company specializing in innovative software solutions.',
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
      about: 'DesignHub is a creative design agency that helps brands establish their visual identity.',
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
      about: 'DataSystems is a data analytics company that helps organizations make data-driven decisions.',
      size: 'corporate' as const
    }
  ];

  const myInternships = [
    { id: '1', company: 'TechCorp', title: 'Frontend Developer', status: 'current', startDate: '2024-01-01', endDate: '2024-04-01' },
    { id: '2', company: 'DesignHub', title: 'UX Designer', status: 'completed', startDate: '2023-06-01', endDate: '2023-09-01' }
  ];

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
  ];

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

  const handleCreateReport = () => {
    setActiveTab('reports');
    setReportsSubTab('reports');
    setCreateReportData({ jobTitle: '', companyName: '' });
  };

  const handleEvaluateCompany = () => {
    setActiveTab('reports');
    setReportsSubTab('evaluations');
    setTimeout(() => {
      const createEvaluationButton = document.querySelector('[data-testid="create-evaluation-button"]');
      if (createEvaluationButton instanceof HTMLElement) {
        createEvaluationButton.click();
      }
    }, 100);
  };

  const handleViewInternships = () => {
    setActiveTab('internships');
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
    setTimeout(() => {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput instanceof HTMLElement) {
        fileInput.click();
      }
    }, 100);
  };

  const handleAppointmentAction = (id: number, action: 'accept' | 'reject') => {
    toast.success(`Appointment ${action === 'accept' ? 'accepted' : 'rejected'}`);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-scad-dark mb-2">Welcome back, {student.name}!</h1>
            <span className="px-2 py-1 bg-scad-red text-white text-sm rounded-full">PRO</span>
          </div>
          <p className="text-gray-600">{student.major} | Semester {student.semester}</p>
          <p className="text-sm text-gray-500">PRO Status: Active until {student.proExpiryDate}</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <NotificationsButton notifications={mockNotifications} notificationsPagePath="/notifications/1" />
        </div>
      </div>

      {/* Tabs section */}
      <TabsLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={proTabs}
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
                {/* Quick actions will be added here */}
                <p className="text-gray-500 text-sm">Quick actions coming soon...</p>
              </div>
            </div>

            {/* PRO Benefits Card */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-scad-dark mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-scad-red" />
                PRO Benefits
              </h2>
              <div className="space-y-3">
                {/* PRO benefits will be added here */}
                <p className="text-gray-500 text-sm">PRO benefits coming soon...</p>
              </div>
            </div>

            {/* Progress Overview Card */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-scad-dark mb-4 flex items-center">
                <ClipboardCheck className="h-5 w-5 mr-2 text-scad-red" />
                Progress Overview
              </h2>
              <div className="space-y-3">
                {/* Progress overview will be added here */}
                <p className="text-gray-500 text-sm">Progress overview coming soon...</p>
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
              <div className="flex justify-end items-center mb-6">
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
                  className="flex items-center gap-2 bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-500 ml-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
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

        <TabsContent value="appointments">
          {/* Appointments Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Video Appointments</CardTitle>
                <CardDescription>Scheduled sessions with SCAD Office</CardDescription>
              </CardHeader>
              <CardContent>
                {mockAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {mockAppointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appointment.studentName}</p>
                            <p className="text-sm text-gray-500">{appointment.studentId}</p>
                          </div>
                          <Badge 
                            className={appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Reason:</span> {appointment.reason}
                          </p>
                          <p className="text-sm flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-500" />
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {appointment.status === 'confirmed' ? (
                            <Link to={'/appointments'}>
                              <Button 
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/90"
                              >
                                <Video size={16} />
                                <span>Join Call</span>
                              </Button>
                            </Link>
                          ) : (
                            <>
                              <Button 
                                variant="outline" 
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
                                onClick={() => handleAppointmentAction(appointment.id, 'reject')}
                              >
                                Reject
                              </Button>
                              <Button 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                              >
                                Accept
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No upcoming appointments
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link to="/appointments" className="w-full">
                  <Button variant="default" size="sm" className="w-full">
                    Manage Your Appointments
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className='max-h-[450px]'>
              <CardHeader>
                <CardTitle className="text-lg">Call Statistics</CardTitle>
                <CardDescription>Recent video call activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-black">This Week</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Total Calls</p>
                        <p className="font-medium text-black">8</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Avg. Duration</p>
                        <p className="font-medium text-black">24 mins</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Career Guidance</p>
                        <p className="font-medium text-black">5</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Report Discussion</p>
                        <p className="font-medium text-black">3</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-black">Pending Requests</p>
                    <div className="mt-2">
                      <p className="text-2xl font-bold text-black">3</p>
                      <p className="text-sm text-gray-600">Awaiting your response</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workshops">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-500">Workshops & Assessments content coming soon...</p>
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

export default PROStudentDashboard;
