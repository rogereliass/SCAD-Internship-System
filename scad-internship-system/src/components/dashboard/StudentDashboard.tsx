import { useState } from 'react';
import NotificationsButton from './../DashboardEssentials/NotificationsButton';
import TabsLayout from './../DashboardEssentials/TabsLayout';
import { TabsContent } from '../ui/tabs';
import ApplicationsTab from '../students/ApplicationsTab';
import ApplicationDetails from '../students/ApplicationDetails';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import InternshipCard from '../internships/InternshipCard';
import AvailableInternships from '../internships/AvailableInternships';
import CompanyCard from '../companies/CompanyCard';
import MyInternshipsTab from '../students/MyInternshipsTab';

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

  const studentTabs = [
    { value: "overview", label: "Overview" },
    { value: "internships", label: "Internships" },
    { value: "reports", label: "Reports" },
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
      contactEmail: 'hr@techcorp.com'
    },
    {
      id: '2',
      jobTitle: 'UX Design Intern',
      companyName: 'DesignHub',
      description: 'Work on user interface design and user experience',
      status: 'pending' as const
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

  const availableInternships = [
    { id: '1', company: 'TechCorp', title: 'Frontend Developer', duration: '3 months' },
    { id: '2', company: 'DesignHub', title: 'UX Designer', duration: '6 months' },
    { id: '3', company: 'DataSystems', title: 'Data Analyst', duration: '3 months' }
  ];

  const myInternships = [
    { id: '1', company: 'TechCorp', title: 'Frontend Developer', status: 'current', startDate: '2024-01-01', endDate: '2024-04-01' },
    { id: '2', company: 'DesignHub', title: 'UX Designer', status: 'completed', startDate: '2023-06-01', endDate: '2023-09-01' }
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

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-scad-dark mb-2">Welcome back, {student.name}!</h1>
          <p className="text-gray-600">{student.major} | Semester {student.semester}</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <NotificationsButton notifications={mockNotifications} />
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Completed Internships</h3>
                <p className="text-2xl font-bold text-scad-dark">{student.completedInternships}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Current Semester</h3>
                <p className="text-2xl font-bold text-scad-dark">{student.semester}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">PRO Status</h3>
                <p className="text-2xl font-bold text-scad-dark">{student.isPRO ? 'Yes' : 'No'}</p>
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
            <div className="bg-white rounded-lg shadow-sm p-6">
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
                onInternshipClick={handleApplicationClick} 
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
                onApplicationClick={handleApplicationClick} 
                searchTerm={searchTerm} 
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
              <MyInternshipsTab onInternshipClick={handleInternshipClick} searchTerm={searchTerm} dateFilter={dateFilter} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Reports</h2>
            <p className="text-gray-600">Report management features coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p className="text-gray-600">Profile management features coming soon...</p>
          </div>
        </TabsContent>
      </TabsLayout>
    </div>
  );
};

export default StudentDashboard;
