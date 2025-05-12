import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, FileText, Download, BriefcaseIcon, ClipboardCheck, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import NotificationsButton from './../DashboardEssentials/NotificationsButton';
import TabsLayout from './../DashboardEssentials/TabsLayout';
import OverviewCards from '../facultyMembers/OverviewCards';
import ReportsTable from '../facultyMembers/ReportsTable';
import StatisticsGraphs from '../facultyMembers/StatisticsGraphs';
import ReportDetailsModal from '../facultyMembers/ReportDetailsModal';
import ReviewModal from '../facultyMembers/ReviewModal';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from "../ui/badge";
import { useReports } from '../../contexts/ReportsContext';

// Mock Data (replace with actual data fetching)
const mockNotifications = [
  { id: 1, title: 'New Report Submitted', description: 'John Doe submitted an internship report.', time: '2 hours ago', type: 'report' as const, read: false },
  { id: 2, title: 'Clarification Requested', description: 'A clarification has been requested for report #123', time: '1 day ago', type: 'report' as const, read: false },
];

// New mock data for graphs
const courseInternshipData = [
  { name: 'Graphic Design', internships: 45 },
  { name: 'Illustration', internships: 38 },
  { name: 'Motion Media', internships: 32 },
  { name: 'Industrial Design', internships: 28 },
  { name: 'Architecture', internships: 25 },
];

const companyRatingData = [
  { name: 'Adobe', rating: 4.8 },
  { name: 'Pixar', rating: 4.7 },
  { name: 'Nike', rating: 4.6 },
  { name: 'Apple', rating: 4.5 },
  { name: 'Google', rating: 4.4 },
];

const companyInternshipData = [
  { name: 'Adobe', count: 65 },
  { name: 'Pixar', count: 58 },
  { name: 'Nike', count: 52 },
  { name: 'Apple', count: 48 },
  { name: 'Google', count: 45 },
];

const mockStatistics = {
  acceptedReports: 120,
  flaggedReports: 5,
  averageReviewTime: '2 days',
  unreviewedReports: 15,
  topCourses: ['Graphic Design', 'Illustration', 'Motion Media'],
  topRatedCompanies: ['Adobe', 'Pixar', 'Nike'],
  topCompaniesByInternshipCount: ['Adobe', 'Pixar', 'Nike'],
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
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const navigate = useNavigate();
  const { reports, updateReport } = useReports();

  const facultyTabs = [
    { value: "overview", label: "Overview" },
    { value: "reports", label: "Reports" },
    { value: "statistics", label: "Statistics" },
  ];

  const viewReportDetails = (report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  const closeReportDetails = () => {
    setIsReportModalOpen(false);
    setSelectedReport(null);
  };

  const handleOpenReviewModal = (report) => {
    setSelectedReport(report);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (status, comment) => {
    if (selectedReport) {
      updateReport(selectedReport.id, {
        status,
        comment,
        reviewDate: new Date().toISOString().split('T')[0],
        reviewedBy: faculty.name
      });
    }
    
    setIsReviewModalOpen(false);
    setIsReportModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-scad-dark mb-2">Welcome back, {faculty.name}!</h1>
          <p className="text-gray-600">Faculty Dashboard</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <NotificationsButton notifications={mockNotifications} notificationsPagePath="/notifications/4" />
        </div>
      </div>

      <TabsLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={facultyTabs}
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
                  onClick={() => setActiveTab('reports')}
                  className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-scad-red bg-opacity-10 flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-scad-red" />
                  </div>
                  <div>
                    <p className="font-medium text-scad-dark">Review Reports</p>
                    <p className="text-sm text-gray-500">15 reports pending review</p>
                  </div>
                </button>

                <button 
                  onClick={() => navigate('/companies-evaluations', { state: { from: 'faculty' } })}
                  className="flex items-center w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 bg-opacity-10 flex items-center justify-center mr-3">
                    <ClipboardCheck className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-scad-dark">View Companies Evaluations</p>
                    <p className="text-sm text-gray-500">Access company performance metrics</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Statistics Overview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Statistics Overview</CardTitle>
                  <CardDescription>Key metrics and performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
                        <p className="text-2xl font-bold">{mockStatistics.acceptedReports + mockStatistics.flaggedReports}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Average Review Time</h3>
                        <p className="text-2xl font-bold">{mockStatistics.averageReviewTime}</p>
                      </div>
                    </div>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartPieChart>
                          <Pie
                            data={reportStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top Companies and Courses Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Top Companies by Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Top Rated Companies</CardTitle>
                <CardDescription>Companies with highest student ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companyRatingData.slice(0, 3).map((company, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{company.name}</span>
                      <Badge variant="secondary">{company.rating.toFixed(1)}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Companies by Internship Count */}
            <Card>
              <CardHeader>
                <CardTitle>Top Companies</CardTitle>
                <CardDescription>Companies with most internships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companyInternshipData.slice(0, 3).map((company, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{company.name}</span>
                      <Badge variant="secondary">{company.count} internships</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Top Courses</CardTitle>
                <CardDescription>Courses with most internships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseInternshipData.slice(0, 3).map((course, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{course.name}</span>
                      <Badge variant="secondary">{course.internships} internships</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => toast.success('Report generation started')}
              className="flex items-center gap-2 bg-scad-dark hover:bg-scad-dark/90"
            >
              <Download size={16} />
              <span>Generate Report</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTable 
            reports={reports}
            onViewReport={viewReportDetails}
            onReviewReport={handleOpenReviewModal}
          />

          <div className="mt-6 flex justify-end gap-4">
            <Button
              onClick={() => navigate('/internship-reports', { state: { from: 'faculty' } })}
              className="flex items-center gap-2"
            >
              <FileText size={16} />
              View All Reports
            </Button>
            <Button
              onClick={() => toast.success('Report generation started')}
              className="flex items-center gap-2 bg-scad-dark hover:bg-scad-dark/90"
            >
              <Download size={16} />
              <span>Generate Report</span>
            </Button>
          </div>

          <ReportDetailsModal 
            isOpen={isReportModalOpen}
            onClose={closeReportDetails}
            report={selectedReport}
            onReview={handleOpenReviewModal}
          />

          <ReviewModal 
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            report={selectedReport}
            onSubmit={handleReviewSubmit}
          />
        </TabsContent>

        <TabsContent value="statistics">
          <div className="mb-0">
            <h2 className="text-2xl font-bold text-scad-dark mb-2">Statistics Overview</h2>
            <p className="text-gray-600">Comprehensive analysis of internship data and company performance</p>
          </div>
          <StatisticsGraphs 
            courseInternshipData={courseInternshipData}
            companyRatingData={companyRatingData}
            companyInternshipData={companyInternshipData}
          />
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => toast.success('Report generation started')}
              className="flex items-center gap-2 bg-scad-dark hover:bg-scad-dark/90"
            >
              <Download size={16} />
              <span>Generate Report</span>
            </Button>
          </div>
        </TabsContent>
      </TabsLayout>
    </div>
  );
};

export default FacultyDashboard;
