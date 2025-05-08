
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Briefcase, FileText, Calendar, Building, Bell, 
  BarChart, PieChart, TrendingUp, Download, CheckCircle, 
  AlertCircle, Clock, X, ChevronRight, Video, MapPin, Globe, Phone, Mail,  Plus 
} from 'lucide-react';
import Navbar from '../layout/Navbar';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { toast } from 'sonner';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from "../ui/badge";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

// Mock data for charts
const reportStatusData = [
  { name: 'Accepted', value: 42, color: '#22c55e' },
  { name: 'Pending', value: 28, color: '#eab308' },
  { name: 'Flagged', value: 8, color: '#f97316' },
  { name: 'Rejected', value: 4, color: '#ef4444' },
];

const companyIntershipsData = [
  { name: 'TechSol', count: 12 },
  { name: 'MarkPro', count: 8 },
  { name: 'DesignHub', count: 7 },
  { name: 'DataTech', count: 6 },
  { name: 'FinTech', count: 5 },
  { name: 'Others', count: 24 },
];

const monthlyApplicationsData = [
  { month: 'Jan', applications: 18, placements: 15 },
  { month: 'Feb', applications: 22, placements: 18 },
  { month: 'Mar', applications: 24, placements: 20 },
  { month: 'Apr', applications: 15, placements: 12 },
  { month: 'May', applications: 19, placements: 16 },
  { month: 'Jun', applications: 28, placements: 24 },
  { month: 'Jul', applications: 32, placements: 28 },
  { month: 'Aug', applications: 26, placements: 22 },
  { month: 'Sep', applications: 30, placements: 25 },
  { month: 'Oct', applications: 34, placements: 29 },
  { month: 'Nov', applications: 42, placements: 0 },
  { month: 'Dec', applications: 0, placements: 0 },
];

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: 'New Company Application',
    description: 'EcoSolutions has applied to join SCAD system',
    time: '10 minutes ago',
    type: 'company',
    read: false
  },
  {
    id: 2,
    title: 'Pending Report Review',
    description: '3 new internship reports awaiting review',
    time: '2 hours ago',
    type: 'report',
    read: false
  },
  {
    id: 3,
    title: 'Video Call Request',
    description: 'Appointment request from Fatima Al-Balushi',
    time: '3 hours ago',
    type: 'appointment',
    read: true
  },
  {
    id: 4,
    title: 'Upcoming Workshop',
    description: 'Reminder: Career Development workshop tomorrow',
    time: '1 day ago',
    type: 'workshop',
    read: true
  }
];

// Mock upcoming appointments
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

// Mock company applications
const mockCompanyApplications = [
  {
    id: 1,
    name: 'EcoSolutions',
    industry: 'Environmental Services',
    applied: '2023-11-05',
    status: 'pending'
  },
  {
    id: 2,
    name: 'MedTech Innovations',
    industry: 'Healthcare',
    applied: '2023-11-08',
    status: 'pending'
  },
  {
    id: 3,
    name: 'BuildRight Construction',
    industry: 'Construction',
    applied: '2023-11-12',
    status: 'pending'
  }
];

const ScadDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleExportStats = () => {
    toast.success('Statistics export started');
  };
  
  const handleAppointmentAction = (id, action) => {
    toast.success(`Appointment ${action === 'accept' ? 'accepted' : 'rejected'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">SCAD Office Dashboard</h1>
            <p className="text-gray-600">Manage internships, students, and reports</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex gap-2">
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={16} />
                <span>Notifications</span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {mockNotifications.filter(n => !n.read).length}
                </div>
              </Button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 overflow-hidden">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium font-bold text-black">Notifications</h3>
                    <Button size="sm" className="h-auto py-1">
                      Mark all as read
                    </Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-gray-50' : ''}`}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {notification.type === 'company' && <Building size={18} className="text-blue-500" />}
                            {notification.type === 'report' && <FileText size={18} className="text-orange-500" />}
                            {notification.type === 'appointment' && <Video size={18} className="text-purple-500" />}
                            {notification.type === 'workshop' && <Calendar size={18} className="text-green-500" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-black font-bold">{notification.title}</p>
                            <p className="text-xs text-gray-600">{notification.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-200 text-center">
                  <Button variant="ghost" size="sm" className="w-full text-sm bg-black text-white hover:bg-gray-800">
                    View all notifications
                  </Button>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-1">
            <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="py-2">Analytics</TabsTrigger>
            <TabsTrigger value="companies" className="py-2">Companies</TabsTrigger>
            <TabsTrigger value="appointments" className="py-2">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Link to="/internship-cycles">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div>
                      <Calendar size={24} className="text-primary mb-2" />
                      <h3 className="font-medium">Manage Cycles</h3>
                      <p className="text-sm text-gray-500">Set internship periods</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/company-applications">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div>
                      <Building size={24} className="text-primary mb-2" />
                      <h3 className="font-medium">Company Applications</h3>
                      <p className="text-sm text-gray-500">Review new companies</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/students">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div>
                      <Users size={24} className="text-primary mb-2" />
                      <h3 className="font-medium">Manage Students</h3>
                      <p className="text-sm text-gray-500">View student profiles</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/internship-reports">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div>
                      <FileText size={24} className="text-primary mb-2" />
                      <h3 className="font-medium">Review Reports</h3>
                      <p className="text-sm text-gray-500">Evaluate internship reports</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
            </div>
            
            {/* Current Cycle Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="md:col-span-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Current Cycle: Fall 2023</CardTitle>
                  <CardDescription>Sep 1, 2023 - Dec 15, 2023 (35 days remaining)</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-blue-600 font-medium">Total Students</p>
                      <p className="text-2xl font-bold text-gray-700">128</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <p className="text-sm text-green-600 font-medium">Placed</p>
                      <p className="text-2xl font-bold text-gray-700">104</p>
                      <p className="text-xs text-gray-500">81% placement rate</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                      <p className="text-sm text-orange-600 font-medium">Searching</p>
                      <p className="text-2xl font-bold text-gray-700">18</p>
                      <p className="text-xs text-gray-500">14% of students</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                      <p className="text-sm text-red-600 font-medium">No Placement</p>
                      <p className="text-2xl font-bold text-gray-700">6</p>
                      <p className="text-xs text-gray-500">5% of students</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/internship-cycles">
                    <Button variant="outline" size="sm" className="text-blue-600">
                      Manage Cycle
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            {/* Reports Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Latest Reports</CardTitle>
                  <CardDescription>Recent internship report submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-8 text-xs font-medium text-gray-500 border-b">
                        <div className="p-2 col-span-2">Student</div>
                        <div className="p-2 col-span-2">Company</div>
                        <div className="p-2">Submitted</div>
                        <div className="p-2">Status</div>
                        <div className="p-2">Reviewer</div>
                        <div className="p-2"></div>
                      </div>
                      
                      <div className="grid grid-cols-8 items-center py-1.5 text-sm border-b">
                        <div className="p-2 col-span-2">Ahmed Al-Farsi</div>
                        <div className="p-2 col-span-2">TechSolutions Inc.</div>
                        <div className="p-2">Nov 10</div>
                        <div className="p-2">
                          <Badge className="bg-yellow-100 hover:bg-yellow-100 text-yellow-800 border-none">Pending</Badge>
                        </div>
                        <div className="p-2">-</div>
                        <div className="p-2 text-right">
                          <Button variant="ghost" size="sm">Review</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-8 items-center py-1.5 text-sm border-b">
                        <div className="p-2 col-span-2">Fatima Al-Balushi</div>
                        <div className="p-2 col-span-2">MarketingPro Ltd.</div>
                        <div className="p-2">Nov 8</div>
                        <div className="p-2">
                          <Badge className="bg-green-100 hover:bg-green-100 text-green-800 border-none">Accepted</Badge>
                        </div>
                        <div className="p-2">Dr. Mohammed</div>
                        <div className="p-2 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-8 items-center py-1.5 text-sm">
                        <div className="p-2 col-span-2">Omar Al-Habsi</div>
                        <div className="p-2 col-span-2">DesignHub Co.</div>
                        <div className="p-2">Nov 5</div>
                        <div className="p-2">
                          <Badge className="bg-orange-100 hover:bg-orange-100 text-orange-800 border-none">Flagged</Badge>
                        </div>
                        <div className="p-2">Dr. Aisha</div>
                        <div className="p-2 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/internship-reports" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Reports
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Report Status</CardTitle>
                  <CardDescription>Current cycle reports by status</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-60 w-full max-w-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={reportStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {reportStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity & Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Companies & Internships</CardTitle>
                  <CardDescription>Current partner companies and opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartBarChart data={companyIntershipsData} layout="vertical">
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={100} />
                        <Tooltip />
                        <Bar dataKey="count" name="Internships" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                      </RechartBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/internships" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Internships
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                  <CardDescription>Scheduled video calls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAppointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="border rounded-lg p-3 space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appointment.studentName}</p>
                            <p className="text-xs text-gray-500">{appointment.studentId}</p>
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
                        <div>
                          <p className="text-sm text-gray-400">
                            <span className="font-medium">Reason:</span> {appointment.reason}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        
                        {appointment.status === 'pending' && (
                          <div className="flex gap-2 pt-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleAppointmentAction(appointment.id, 'reject')}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                            >
                              Accept
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {mockAppointments.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No upcoming appointments
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/appointments" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Appointments
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            {/* Analytics Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Internship Applications & Placements</CardTitle>
                  <CardDescription>Monthly statistics for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartBarChart data={monthlyApplicationsData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="applications" name="Applications" fill="#8b5cf6" />
                        <Bar dataKey="placements" name="Placements" fill="#22c55e" />
                      </RechartBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Report Status Distribution</CardTitle>
                  <CardDescription>Current cycle reports by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={reportStatusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {reportStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Placement Rate</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center">
                    <div className="text-3xl font-bold">81%</div>
                    <div className="ml-2 flex items-center text-green-600 text-sm">
                      <TrendingUp size={16} className="mr-1" />
                      <span>+5% from last cycle</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">104 out of 128 students placed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Review Time</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-3xl font-bold">3.5 days</div>
                  <p className="text-sm text-gray-500">From submission to review completion</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Company Satisfaction</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center">
                    <div className="text-3xl font-bold">92%</div>
                    <div className="ml-2 flex items-center text-green-600 text-sm">
                      <TrendingUp size={16} className="mr-1" />
                      <span>+3% from last cycle</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Based on end-of-cycle surveys</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Export Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleExportStats}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                <span>Export Statistics</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="companies">
            {/* Companies Tab Content */}
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company Applications</CardTitle>
                  <CardDescription>
                    Recent companies applying to join SCAD Intern Compass
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 text-xs font-medium text-gray-500 border-b">
                      <div className="p-2 col-span-2">Company</div>
                      <div className="p-2">Industry</div>
                      <div className="p-2">Applied Date</div>
                      <div className="p-2">Status</div>
                      <div className="p-2"></div>
                    </div>
                    
                    {mockCompanyApplications.map(company => (
                      <div key={company.id} className="grid grid-cols-6 items-center py-2 text-sm border-b last:border-b-0">
                        <div className="p-2 col-span-2 font-medium">{company.name}</div>
                        <div className="p-2">{company.industry}</div>
                        <div className="p-2">{company.applied}</div>
                        <div className="p-2">
                          <Badge className="bg-yellow-100 hover:bg-yellow-100 text-yellow-800 border-none">
                            Pending
                          </Badge>
                        </div>
                        <div className="p-2 text-right">
                          <Link to="/company-applications">
                            <Button variant="ghost" size="sm">Review</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/company-applications" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Applications
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Partner Companies (15)</CardTitle>
                  <CardDescription>Active companies offering internships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium">TechSolutions Inc.</h3>
                      <p className="text-sm text-gray-500">Information Technology</p>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-xs text-gray-600">12 internships</p>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium">MarketingPro Ltd.</h3>
                      <p className="text-sm text-gray-500">Marketing</p>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-xs text-gray-600">8 internships</p>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium">DesignHub Co.</h3>
                      <p className="text-sm text-gray-500">Design</p>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-xs text-gray-600">7 internships</p>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/companies" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Companies
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments">
            {/* Appointments Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Video Appointments</CardTitle>
                  <CardDescription>Scheduled sessions with students</CardDescription>
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
                              <Button 
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                              >
                                <Video size={16} />
                                <span>Join Call</span>
                              </Button>
                            ) : (
                              <>
                                <Button 
                                  variant="outline" 
                                  className="text-red-600"
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
              </Card>
              
              <Card>
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
                <CardFooter>
                  <Link to="/appointments" className="w-full">
                    
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ScadDashboard;