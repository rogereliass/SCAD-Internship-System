import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Users, Briefcase, FileText, Calendar, Building, Bell, 
    BarChart, PieChart, TrendingUp, Download, CheckCircle, 
    AlertCircle, Clock, X, ChevronRight, Video, MapPin, Globe, Phone, Mail,  Plus 
  } from 'lucide-react';
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
import NotificationsButton from './../DashboardEssentials/NotificationsButton';


// Mock Data (replace with actual data fetching)
const mockNotifications = [
  { id: 1, title: 'New Report Submitted', description: 'John Doe submitted an internship report.', time: '2 hours ago', type: 'report' as const, read: false },
  { id: 2, title: 'Clarification Requested', description: 'A clarification has been requested for report #123', time: '1 day ago', type: 'clarification' as const, read: false },
];

const mockStatistics = {
  acceptedReports: 120,
  flaggedReports: 5,
  averageReviewTime: '2 days',
  topCourses: ['Graphic Design', 'Illustration', 'Motion Media Design'],
  topRatedCompanies: ['Company A', 'Company B', 'Company C'],
  topCompaniesByInternshipCount: ['Company X', 'Company Y', 'Company Z'],
};

const reportStatusData = [
  { name: 'Accepted', value: 42, color: '#22c55e' },
  { name: 'Pending', value: 28, color: '#eab308' },
  { name: 'Flagged', value: 8, color: '#f97316' },
  { name: 'Rejected', value: 4, color: '#ef4444' },
];

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [faculty, setFaculty] = useState({ name: 'Dr. Eleanor Reed' }); // Replace with actual faculty data
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const facultyTabs = [
    { value: "overview", label: "Overview" },
    { value: "reports", label: "Reports" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {faculty.name}!</h1>
            <p className="text-gray-600">Faculty Dashboard</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <NotificationsButton notifications={mockNotifications} notificationsPagePath="/notifications/4" />
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full md:w-auto grid grid-cols-2 gap-2 h-auto p-1">
            <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
            <TabsTrigger value="reports" className="py-2">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link to="/internship-reports" state={{ from: 'faculty' }}>
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

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Review Time</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-3xl font-bold">{mockStatistics.averageReviewTime}</div>
                  <p className="text-sm text-gray-500">Time to review reports</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Courses</CardTitle>
                  <CardDescription>Most active in internships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockStatistics.topCourses.map(course => (
                      <div key={course} className="flex items-center justify-between">
                        <span className="text-sm">{course}</span>
                        <Badge variant="secondary">{course}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Rated Companies</CardTitle>
                  <CardDescription>Highest rated by students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockStatistics.topRatedCompanies.map(company => (
                      <div key={company} className="flex items-center justify-between">
                        <span className="text-sm">{company}</span>
                        <Badge variant="secondary">{company}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Companies</CardTitle>
                  <CardDescription>By internship count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockStatistics.topCompaniesByInternshipCount.map(company => (
                      <div key={company} className="flex items-center justify-between">
                        <span className="text-sm">{company}</span>
                        <Badge variant="secondary">{company}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={() => toast.success('Report generation started')}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                <span>Generate Report</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Link to="/internship-reports" state={{ from: 'faculty' }}>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyDashboard;
