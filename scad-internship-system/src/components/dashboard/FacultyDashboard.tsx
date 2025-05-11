import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Calendar, Building, Bell, BarChart, PieChart, Download, CheckCircle,
  AlertCircle, Clock, ChevronRight, Filter, X
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { toast } from 'sonner';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import { TabsContent } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TabsLayout from '../DashboardEssentials/TabsLayout';
import NotificationsButton from '../DashboardEssentials/NotificationsButton';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

// Mock Data (replace with actual API calls)
const mockNotifications = [
  { id: 1, title: 'New Report Submitted', description: 'John Doe submitted an internship report.', time: '2 hours ago', type: 'report', read: false },
  { id: 2, title: 'Clarification Requested', description: 'A clarification has been requested for report #123', time: '1 day ago', type: 'clarification', read: false },
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

interface Report {
  id: string;
  studentName: string;
  studentId: string;
  major: string;
  companyName: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'flagged' | 'rejected' | 'accepted';
  reportContent: string;
  evaluationScore: number;
  comments?: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    studentName: 'John Doe',
    studentId: '12345',
    major: 'Graphic Design',
    companyName: 'Company A',
    supervisor: 'Jane Smith',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'pending',
    reportContent: 'Detailed internship report content...',
    evaluationScore: 85,
  },
  {
    id: '2',
    studentName: 'Jane Roe',
    studentId: '12346',
    major: 'Illustration',
    companyName: 'Company B',
    supervisor: 'John Smith',
    startDate: '2024-06-15',
    endDate: '2024-09-15',
    status: 'flagged',
    reportContent: 'Detailed internship report content...',
    evaluationScore: 75,
    comments: 'Missing required documentation',
  },
];

// LaTeX template for PDF generation
const generatePDFLaTeX = (report: Report) => `
\\documentclass[a4paper,12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage{geometry}
\\geometry{margin=1in}
\\usepackage{enumitem}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\lhead{SCAD Intern Compass}
\\rhead{Internship Report}
\\cfoot{\\thepage}

\\begin{document}

\\begin{center}
    {\\Large \\textbf{Internship Report}}\\\\
    \\vspace{0.5cm}
    {\\large ${report.studentName}}\\\\
    \\vspace{0.2cm}
    Student ID: ${report.studentId}\\\\
    Major: ${report.major}
\\end{center}

\\vspace{1cm}

\\section*{Internship Details}
\\begin{description}
    \\item[Company Name:] ${report.companyName}
    \\item[Supervisor:] ${report.supervisor}
    \\item[Start Date:] ${new Date(report.startDate).toLocaleDateString()}
    \\item[End Date:] ${new Date(report.endDate).toLocaleDateString()}
    \\item[Status:] ${report.status.charAt(0).toUpperCase() + report.status.slice(1)}
    \\item[Evaluation Score:] ${report.evaluationScore}
\\end{description}

\\section*{Report Content}
${report.reportContent.replace(/\n/g, '\\\\')}

${
  report.comments
    ? `
\\section*{Comments}
${report.comments.replace(/\n/g, '\\\\')}
`
    : ''
}

\\end{document}
`;

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [faculty] = useState({ name: 'Dr. Eleanor Reed' });
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [clarification, setClarification] = useState('');
  const [majorFilter, setMajorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const facultyTabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'reports', label: 'Reports' },
    { value: 'evaluations', label: 'Evaluations' },
  ];

  const majors = ['all', 'Graphic Design', 'Illustration', 'Motion Media Design'];

  const handleStatusChange = (reportId: string, newStatus: Report['status']) => {
    setReports(reports.map(report =>
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
    toast.success(`Report status updated to ${newStatus}`);
  };

  const handleSubmitClarification = (reportId: string) => {
    setReports(reports.map(report =>
      report.id === reportId ? { ...report, comments: clarification } : report
    ));
    setClarification('');
    toast.success('Clarification submitted');
  };

  const handleDownloadPDF = (report: Report) => {
    // In a real implementation, this would trigger a download
    toast.success('PDF download initiated');
    return generatePDFLaTeX(report);
  };

  const handleGenerateReport = () => {
    const reportContent = `
# Faculty Statistics Report
## Overview
- Accepted Reports: ${mockStatistics.acceptedReports}
- Flagged Reports: ${mockStatistics.flaggedReports}
- Average Review Time: ${mockStatistics.averageReviewTime}

## Top Courses
${mockStatistics.topCourses.map(course => `- ${course}`).join('\n')}

## Top Rated Companies
${mockStatistics.topRatedCompanies.map(company => `- ${company}`).join('\n')}

## Top Companies by Internship Count
${mockStatistics.topCompaniesByInternshipCount.map(company => `- ${company}`).join('\n')}
`;
    // In a real implementation, convert to PDF
    toast.success('Statistics report generated');
  };

  const filteredReports = reports.filter(report => {
    const matchesMajor = majorFilter === 'all' || report.major === majorFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesMajor && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {faculty.name}!</h1>
            <p className="text-gray-600">Faculty Dashboard</p>
          </div>
          <NotificationsButton
            notifications={notifications}
            onMarkAllAsRead={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          />
        </div>

        <TabsLayout activeTab={activeTab} setActiveTab={setActiveTab} tabs={facultyTabs}>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reports Summary</CardTitle>
                  <CardDescription>Accepted vs Flagged</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Accepted</p>
                      <p className="text-2xl font-bold">{mockStatistics.acceptedReports}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Flagged</p>
                      <p className="text-2xl font-bold">{mockStatistics.flaggedReports}</p>
                    </div>
                  </div>
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleGenerateReport}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                <span>Generate Statistics Report</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Internship Reports</CardTitle>
                <CardDescription>View and manage internship reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <Select value={majorFilter} onValueChange={setMajorFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by major" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map(major => (
                        <SelectItem key={major} value={major}>
                          {major === 'all' ? 'All Majors' : major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Major</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map(report => (
                      <TableRow key={report.id}>
                        <TableCell>{report.studentName}</TableCell>
                        <TableCell>{report.major}</TableCell>
                        <TableCell>{report.companyName}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedReport(report)}
                            >
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadPDF(report)}
                            >
                              <Download size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluations">
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Reports</CardTitle>
                <CardDescription>Review and update evaluation statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Major</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map(report => (
                      <TableRow key={report.id}>
                        <TableCell>{report.studentName}</TableCell>
                        <TableCell>{report.major}</TableCell>
                        <TableCell>{report.companyName}</TableCell>
                        <TableCell>{report.evaluationScore}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select
                              onValueChange={(value: Report['status']) => handleStatusChange(report.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder={report.status} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="flagged">Flagged</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </TabsLayout>

        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedReport.studentName}'s Report</h2>
                    <p className="text-lg text-gray-600">{selectedReport.companyName}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedReport(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Student Details</h3>
                    <p className="text-gray-600">ID: {selectedReport.studentId}</p>
                    <p className="text-gray-600">Major: {selectedReport.major}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">Internship Details</h3>
                    <p className="text-gray-600">Company: {selectedReport.companyName}</p>
                    <p className="text-gray-600">Supervisor: {selectedReport.supervisor}</p>
                    <p className="text-gray-600">Start Date: {new Date(selectedReport.startDate).toLocaleDateString()}</p>
                    <p className="text-gray-600">End Date: {new Date(selectedReport.endDate).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">Report Content</h3>
                    <p className="text-gray-600">{selectedReport.reportContent}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">Evaluation</h3>
                    <p className="text-gray-600">Score: {selectedReport.evaluationScore}</p>
                    <p className="text-gray-600">Status: {selectedReport.status}</p>
                    {selectedReport.comments && (
                      <p className="text-gray-600">Comments: {selectedReport.comments}</p>
                    )}
                  </div>

                  {(selectedReport.status === 'flagged' || selectedReport.status === 'rejected') && (
                    <div>
                      <h3 className="font-medium text-gray-900">Submit Clarification</h3>
                      <Textarea
                        value={clarification}
                        onChange={(e) => setClarification(e.target.value)}
                        placeholder="Enter clarification for flagged/rejected report"
                        className="mt-2"
                      />
                      <Button
                        className="mt-2"
                        onClick={() => handleSubmitClarification(selectedReport.id)}
                        disabled={!clarification}
                      >
                        Submit Clarification
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedReport(null)}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => handleDownloadPDF(selectedReport)}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;