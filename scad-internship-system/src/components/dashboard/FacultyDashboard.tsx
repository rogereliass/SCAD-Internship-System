import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { TabsContent } from '../ui/tabs';
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
import { toast } from 'sonner';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from "../ui/badge";
import NotificationsButton from '../DashboardEssentials/NotificationsButton';

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
          <OverviewCards 
            mockStatistics={mockStatistics}
            reportStatusData={reportStatusData}
            onTabChange={setActiveTab}
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
