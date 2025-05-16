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
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import StudentProfilePicture from '../assets/StudentProfilePicture.jpg';

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
    bio: 'Passionate CS student with a focus on web development and UI/UX design. Looking for opportunities to apply my skills in real-world projects.',
    jobInterests: ['Frontend Development', 'UI/UX Design', 'Mobile App Development', 'Web Development'],
    previousJobs: [
      { jobTitle: 'Part-time Web Developer', company: 'Webify', duration: '6 months', description: 'Built responsive websites for small businesses using React and Tailwind CSS.' },
      { jobTitle: 'UI Design Intern', company: 'CreativeLab', duration: '3 months', description: 'Created user interface mockups and prototypes for mobile applications.' }
    ],
    collegeActivities: ['Coding Club', 'Student Council', 'Hackathon Organizer', 'Design Workshop Leader'],
    documents: [] as { name: string; url: string }[],
    skills: [
      { name: 'React', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'TypeScript', level: 75 },
      { name: 'UI/UX Design', level: 80 },
      { name: 'Node.js', level: 65 },
    ],
    education: [
      { institution: 'University XYZ', degree: 'Bachelor of Computer Science', years: '2021-2025', gpa: '3.8/4.0' },
      { institution: 'ABC High School', degree: 'High School Diploma', years: '2017-2021', gpa: '4.0/4.0' }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Intermediate' },
      { name: 'French', proficiency: 'Basic' }
    ],
    achievements: [
      { title: 'First Place Hackathon 2023', issuer: 'TechFest', date: 'March 2023', description: 'Led a team to build an AI-powered educational platform' },
      { title: 'Dean\'s List', issuer: 'University XYZ', date: 'Fall 2022', description: 'Recognized for academic excellence' }
    ],
    socialProfiles: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexjohnson', username: 'alexjohnson' },
      { platform: 'GitHub', url: 'https://github.com/alexj', username: 'alexj' },
      { platform: 'Behance', url: 'https://behance.net/alexjohnson', username: 'alexjohnson' }
    ],
    availability: {
      status: 'Available',
      preferredHours: 'Part-time, 20 hours/week',
      startDate: 'June 2024'
    }
  });
  const [tempProfile, setTempProfile] = useState(profile);
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
    setTempProfile(prev => ({ ...prev, [name]: value }));
    
    // Update student state when major changes
    if (name === 'major') {
      const majorParts = value.split(' ');
      const major = majorParts.slice(0, -2).join(' '); // Get all parts except last two (semester and "Semester")
      const semesterNumber = parseInt(majorParts[majorParts.length - 2]); // Get the number before "Semester"
      setStudent(prev => ({ 
        ...prev, 
        major: major,
        semester: semesterNumber
      }));
    }
  };

  const handleAddJobInterest = () => {
    if (newJobInterest.trim()) {
      setTempProfile(prev => ({ ...prev, jobInterests: [...prev.jobInterests, newJobInterest.trim()] }));
      setNewJobInterest('');
    }
  };

  const handleRemoveJobInterest = (index: number) => {
    setTempProfile(prev => ({ ...prev, jobInterests: prev.jobInterests.filter((_, i) => i !== index) }));
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setTempProfile(prev => ({ ...prev, collegeActivities: [...prev.collegeActivities, newActivity.trim()] }));
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (index: number) => {
    setTempProfile(prev => ({ ...prev, collegeActivities: prev.collegeActivities.filter((_, i) => i !== index) }));
  };

  const handleAddJob = () => {
    if (newJob.jobTitle && newJob.company && newJob.duration) {
      //setTempProfile(prev => ({ ...prev, previousJobs: [...prev.previousJobs, newJob] }));
      setNewJob({ jobTitle: '', company: '', duration: '' });
    }
  };

  const handleRemoveJob = (index: number) => {
    setTempProfile(prev => ({ ...prev, previousJobs: prev.previousJobs.filter((_, i) => i !== index) }));
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
      setTempProfile(prev => ({ ...prev, documents: [...prev.documents, { name: newDocument.name, url }] }));
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

  const handleEditProfile = () => {
    setTempProfile(profile); // Initialize tempProfile with current profile
    setProfileEditMode(true);
  };

  const handleCancelEdit = () => {
    setTempProfile(profile); // Reset tempProfile to original profile
    // Reset student state to match original profile
    const majorParts = profile.major.split(' ');
    const major = majorParts.slice(0, -2).join(' '); // Get all parts except last two (semester and "Semester")
    const semesterNumber = parseInt(majorParts[majorParts.length - 2]); // Get the number before "Semester"
    setStudent(prev => ({
      ...prev,
      name: profile.name,
      major: major,
      semester: semesterNumber
    }));
    setProfileEditMode(false);
    setNewJobInterest('');
    setNewActivity('');
    setNewJob({ jobTitle: '', company: '', duration: '' });
    setNewDocument(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(tempProfile); // Save tempProfile to actual profile
    
    // Update student state to match the new profile
    const majorParts = tempProfile.major.split(' ');
    const major = majorParts.slice(0, -2).join(' '); // Get all parts except last two (semester and "Semester")
    const semesterNumber = parseInt(majorParts[majorParts.length - 2]); // Get the number before "Semester"
    setStudent(prev => ({
      ...prev,
      name: tempProfile.name,
      major: major,
      semester: semesterNumber
    }));
    
    setProfileEditMode(false);
    setNewJobInterest('');
    setNewActivity('');
    setNewJob({ jobTitle: '', company: '', duration: '' });
    setNewDocument(null);
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-900">Available Internships</h2>
                </div>
                <div className="flex items-center gap-2">
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Profile</h2>
              {!profileEditMode && (
                <Button onClick={handleEditProfile} className="bg-scad-red text-white">Edit Profile</Button>
              )}
            </div>
            
            {!profileEditMode ? (
              <div className="space-y-6">
                {/* Header Section with Bio */}
                <div className="flex flex-col lg:flex-row gap-6 pb-6 border-b border-gray-200">
                  <div className="flex-shrink-0">
                    <img 
                      src={StudentProfilePicture}
                      alt={profile.name}
                      className="w-48 h-48 object-cover border-2 border-gray-200 rounded-lg mx-auto lg:mx-0"
                    />
                    <div className="mt-2 text-center lg:text-left">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                        {profile.availability.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                      <p className="text-lg text-gray-600">{profile.major}</p>
                    </div>
                    
                    <p className="text-gray-700 italic">{profile.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Email</div>
                          <div className="text-black text-sm font-medium">{profile.email}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Phone</div>
                          <div className="text-black text-sm font-medium">{profile.phone}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Availability</div>
                          <div className="text-black text-sm font-medium">{profile.availability.preferredHours}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {profile.socialProfiles.map((social, idx) => (
                        <a 
                          key={idx} 
                          href={social.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-black inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                        >
                          {social.platform === 'LinkedIn' && (
                            <svg className="h-4 w-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          )}
                          {social.platform === 'GitHub' && (
                            <svg className="h-4 w-4 mr-1 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          )}
                          {social.platform === 'Behance' && (
                            <svg className="h-4 w-4 mr-1 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                            </svg>
                          )}
                          {social.username}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Two Column Layout for Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Skills Section */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-scad-red" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        Skills
                      </h4>
                      <div className="space-y-3">
                        {profile.skills.map((skill, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                              <span className="text-sm text-gray-500">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-scad-red h-1.5 rounded-full" 
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Languages Section */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-scad-red" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                        </svg>
                        Languages
                      </h4>
                      <div className="space-y-2">
                        {profile.languages.map((language, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                            <span className="font-medium text-gray-700">{language.name}</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">{language.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Documents Section */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-scad-red" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        Documents
                      </h4>
                      {profile.documents.length === 0 ? (
                        <div className="text-center py-6 text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p>No documents uploaded yet</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={handleEditProfile}
                          >
                            Upload Resume
                          </Button>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {profile.documents.map((doc, idx) => (
                            <li key={idx} className="py-2">
                              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-scad-red hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                {doc.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  {/* Right Column - 2/3 width */}
                  <div className="space-y-6 lg:col-span-2">
                    {/* Education Section */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-scad-red" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        Education
                      </h4>
                      <div className="space-y-4">
                        {profile.education.map((edu, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-md border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-gray-900">{edu.institution}</h5>
                                <p className="text-gray-700">{edu.degree}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">{edu.years}</p>
                                <p className="text-sm font-medium text-gray-700">GPA: {edu.gpa}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Job Interests Section */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-scad-red" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        Job Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.jobInterests.map((interest, idx) => (
                          <span key={idx} className="bg-white px-3 py-1.5 rounded-full text-gray-700 border border-gray-200 shadow-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Experience Section */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-scad-red" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        Work Experience
                      </h4>
                      <div className="space-y-4">
                        {profile.previousJobs.map((job, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-md border border-gray-200">
                            <div className="flex justify-between items-start">
                              <h5 className="font-medium text-gray-900">{job.jobTitle}</h5>
                              <span className="text-sm text-gray-500">{job.duration}</span>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">{job.company}</p>
                            <p className="text-gray-600 text-sm mt-2">{job.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* College Activities & Achievements Section - 2 column grid inside */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Activities Section */}
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-scad-red" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                          College Activities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.collegeActivities.map((activity, idx) => (
                            <span key={idx} className="bg-white px-3 py-1.5 rounded-full text-gray-700 border border-gray-200 shadow-sm">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Achievements Section */}
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-scad-red" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                          Achievements
                        </h4>
                        <div className="space-y-3">
                          {profile.achievements.map((achievement, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-md border border-gray-200">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-900">{achievement.title}</span>
                                <span className="text-xs text-gray-500">{achievement.date}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{achievement.issuer}</p>
                              <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" value={tempProfile.name} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={tempProfile.email} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="text" name="phone" value={tempProfile.phone} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Major & Semester</label>
                    <select name="major" value={tempProfile.major} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900">
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
                    {tempProfile.jobInterests.map((interest, idx) => (
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
                    {tempProfile.previousJobs.map((job, idx) => (
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
                    {tempProfile.collegeActivities.map((act, idx) => (
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
                    {tempProfile.documents.map((doc, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-scad-red underline">{doc.name}</a>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="submit" className="bg-scad-red text-white">Save</Button>
                  <Button type="button" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
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