
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Users, Briefcase, FileText, Calendar, Building, Bell, 
    BarChart, PieChart, TrendingUp, Download, CheckCircle, 
    AlertCircle, Clock, X, ChevronRight, Video, MapPin, Globe, Phone, Mail,  Plus 
  } from 'lucide-react';
import Navbar from '../layout/Navbar';
import NotificationsButton from '@/components/DashboardEssentials/NotificationsButton';
import TabsLayout from '@/components/DashboardEssentials/TabsLayout';
import { toast } from 'sonner';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from "../ui/badge";
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

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

const mockReports = [
  { id: '1', student: 'Alice Smith', major: 'Illustration', company: 'Studio XYZ', status: 'pending', detailsLink: '/faculty/reports/1' },
  { id: '2', student: 'Bob Johnson', major: 'Graphic Design', company: 'Design Co', status: 'accepted', detailsLink: '/faculty/reports/2' },
  { id: '3', student: 'Charlie Davis', major: 'Illustration', company: 'Studio XYZ', status: 'flagged', detailsLink: '/faculty/reports/3' },
  { id: '4', student: 'Diana Evans', major: 'Motion Media Design', company: 'Media Group', status: 'rejected', detailsLink: '/faculty/reports/4' },
  { id: '5', student: 'Ethan Harris', major: 'Illustration', company: 'Studio XYZ', status: 'accepted', detailsLink: '/faculty/reports/5' },
  // ...more reports
];

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [faculty, setFaculty] = useState({ name: 'Dr. Eleanor Reed' }); // Replace with actual faculty data
  const [reports, setReports] = useState(mockReports);
  const [filterMajor, setFilterMajor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const facultyTabs = [
    { value: "overview", label: "Overview" },
    { value: "reports", label: "Reports" },
  ];

  // Filtering logic
  const filteredReports = reports.filter(report => {
    const majorMatch = !filterMajor || report.major === filterMajor;
    const statusMatch = !filterStatus || report.status === filterStatus;
    return majorMatch && statusMatch;
  });

  const handleReportAction = (reportId: string, action: 'flagged' | 'rejected' | 'accepted') => {
    // In a real app, you would call an API to update the report status
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId ? { ...report, status: action } : report
      )
    );
    // You can add further logic, e.g., success messages, error handling
    console.log(`Report ${reportId} status updated to: ${action}`);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-scad-dark mb-2">Welcome, {faculty.name}!</h1>
          <p className="text-gray-600">Faculty Dashboard</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <NotificationsButton notifications={mockNotifications} />
        </div>
      </div>

      <TabsLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={facultyTabs}
        className="mb-6"
      >
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Accepted Reports</h3>
              <p className="text-3xl font-bold">{mockStatistics.acceptedReports}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Flagged Reports</h3>
              <p className="text-3xl font-bold">{mockStatistics.flaggedReports}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Average Review Time</h3>
              <p className="text-3xl font-bold">{mockStatistics.averageReviewTime}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Top Courses in Internships</h3>
              <ul className="list-disc list-inside">
                {mockStatistics.topCourses.map(course => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Top Rated Companies</h3>
              <ul className="list-disc list-inside">
                {mockStatistics.topRatedCompanies.map(company => (
                  <li key={company}>{company}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Top Companies by Internship Count</h3>
              <ul className="list-disc list-inside">
                {mockStatistics.topCompaniesByInternshipCount.map(company => (
                  <li key={company}>{company}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Generate Reports Button (Placeholder) */}
          <Button className="btn-primary" onClick={() => { /* Add report generation logic here */ }}>
            Generate Report
          </Button>
        </TabsContent>

        <TabsContent value="reports">
          {/* Report filtering */}
          <div className="flex space-x-4 mb-4">
            <select
              value={filterMajor}
              onChange={e => setFilterMajor(e.target.value)}
              className="input-field"
            >
              <option value="">All Majors</option>
              {/* Populate with actual majors from your data */}
              <option value="Illustration">Illustration</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Motion Media Design">Motion Media Design</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>

          {/* Report List */}
          <div className="card">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map(report => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.student}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{report.major}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{report.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        report.status === 'flagged' ? 'bg-orange-100 text-orange-800' :
                        report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={report.detailsLink} className="text-scad-red hover:text-opacity-80 mr-3">View</Link>
                      {/* Example actions based on status (adjust as needed) */}
                      {report.status === 'pending' && (
                        <>
                          <Button size="sm" className="mr-2" onClick={() => handleReportAction(report.id, 'flagged')}>Flag</Button>
                          <Button size="sm" className="mr-2" onClick={() => handleReportAction(report.id, 'accepted')}>Accept</Button>
                          <Button size="sm" className="mr-2" onClick={() => handleReportAction(report.id, 'rejected')}>Reject</Button>
                        </>
                      )}
                      {report.status === 'flagged' && (
                        <Button size="sm" onClick={() => handleReportAction(report.id, 'rejected')}>Reject</Button>
                      )}
                      {/* Add more status-based actions if required */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Download All Reports Button (Placeholder) */}
          <Button className="btn-outline mt-4" onClick={() => { /* Add download all logic here */ }}>
            Download All Reports (PDF)
          </Button>
        </TabsContent>
      </TabsLayout>
      
    </div>
  );
};

export default FacultyDashboard;
