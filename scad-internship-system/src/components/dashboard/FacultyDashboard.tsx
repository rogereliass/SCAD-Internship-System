import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, FileText } from 'lucide-react';
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

// Mock reports data
const mockReports = [
  {
    id: 1,
    studentName: "Ahmed Al-Farsi",
    studentId: "S12345",
    major: "Computer Science",
    company: "TechSolutions Inc.",
    position: "Frontend Developer Intern",
    submissionDate: "2023-11-10",
    reviewDate: null,
    status: "pending",
    reviewedBy: null,
    comment: null,
    skills: ["React", "JavaScript", "HTML/CSS"],
    learningOutcomes: [
      "Developed responsive web interfaces using React",
      "Collaborated with a team using Git version control",
      "Implemented REST API integration with backend services"
    ]
  },
  {
    id: 2,
    studentName: "Fatima Al-Balushi",
    studentId: "S12346",
    major: "Marketing",
    company: "MarketingPro Ltd.",
    position: "Marketing Assistant",
    submissionDate: "2023-11-08",
    reviewDate: "2023-11-12",
    status: "accepted",
    reviewedBy: "Dr. Mohammed",
    comment: "Excellent report with detailed learning outcomes and evidence of practical skills acquired.",
    skills: ["Social Media", "Content Creation", "Analytics"],
    learningOutcomes: [
      "Managed social media campaigns for multiple clients",
      "Created content calendars and marketing materials",
      "Analyzed campaign performance metrics and prepared reports"
    ]
  },
  {
    id: 3,
    studentName: "Omar Al-Habsi",
    studentId: "S12349",
    major: "Design",
    company: "DesignHub Co.",
    position: "UI/UX Design Intern",
    submissionDate: "2023-11-05",
    reviewDate: "2023-11-14",
    status: "flagged",
    reviewedBy: "Dr. Aisha",
    comment: "The report is well-structured but lacks sufficient detail about the specific design methodologies used. Please elaborate on the design process and user research methodology.",
    skills: ["Figma", "UI/UX", "User Research"],
    learningOutcomes: [
      "Designed user interfaces for mobile applications",
      "Conducted user testing sessions",
      "Created wireframes and prototypes"
    ]
  }
];

// Move mockReports outside the component to make it accessible globally
const initialMockReports = [
  {
    id: 1,
    studentName: "Ahmed Al-Farsi",
    studentId: "S12345",
    major: "Computer Science",
    company: "TechSolutions Inc.",
    position: "Frontend Developer Intern",
    submissionDate: "2023-11-10",
    reviewDate: null,
    status: "pending",
    reviewedBy: null,
    comment: null,
    skills: ["React", "JavaScript", "HTML/CSS"],
    learningOutcomes: [
      "Developed responsive web interfaces using React",
      "Collaborated with a team using Git version control",
      "Implemented REST API integration with backend services"
    ]
  },
  {
    id: 2,
    studentName: "Fatima Al-Balushi",
    studentId: "S12346",
    major: "Marketing",
    company: "MarketingPro Ltd.",
    position: "Marketing Assistant",
    submissionDate: "2023-11-08",
    reviewDate: "2023-11-12",
    status: "accepted",
    reviewedBy: "Dr. Mohammed",
    comment: "Excellent report with detailed learning outcomes and evidence of practical skills acquired.",
    skills: ["Social Media", "Content Creation", "Analytics"],
    learningOutcomes: [
      "Managed social media campaigns for multiple clients",
      "Created content calendars and marketing materials",
      "Analyzed campaign performance metrics and prepared reports"
    ]
  },
  {
    id: 3,
    studentName: "Omar Al-Habsi",
    studentId: "S12349",
    major: "Design",
    company: "DesignHub Co.",
    position: "UI/UX Design Intern",
    submissionDate: "2023-11-05",
    reviewDate: "2023-11-14",
    status: "flagged",
    reviewedBy: "Dr. Aisha",
    comment: "The report is well-structured but lacks sufficient detail about the specific design methodologies used. Please elaborate on the design process and user research methodology.",
    skills: ["Figma", "UI/UX", "User Research"],
    learningOutcomes: [
      "Designed user interfaces for mobile applications",
      "Conducted user testing sessions",
      "Created wireframes and prototypes"
    ]
  }
];

// Create a global state for reports
let globalMockReports = [...initialMockReports];

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [faculty, setFaculty] = useState({ name: 'Dr. Eleanor Reed' }); // Replace with actual faculty data
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mockReports, setMockReports] = useState(globalMockReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const navigate = useNavigate();

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
    // Update the report in the mock data
    const updatedReports = mockReports.map(report => {
      if (report.id === selectedReport.id) {
        return {
          ...report,
          status,
          comment,
          reviewDate: new Date().toISOString().split('T')[0],
          reviewedBy: faculty.name
        };
      }
      return report;
    });

    // Update both local and global state
    setMockReports(updatedReports);
    globalMockReports = updatedReports;
    
    // Update the selected report for the modal
    setSelectedReport({
      ...selectedReport,
      status,
      comment,
      reviewDate: new Date().toISOString().split('T')[0],
      reviewedBy: faculty.name
    });
    
    toast.success(`Report review submitted successfully`);
    
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
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTable 
            reports={mockReports}
            onViewReport={viewReportDetails}
            onReviewReport={handleOpenReviewModal}
          />

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => navigate('/internship-reports', { state: { from: 'faculty' } })}
              className="flex items-center gap-2"
            >
              <FileText size={16} />
              View All Reports
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
          <StatisticsGraphs 
            courseInternshipData={courseInternshipData}
            companyRatingData={companyRatingData}
            companyInternshipData={companyInternshipData}
          />
        </TabsContent>
      </TabsLayout>
    </div>
  );
};

export default FacultyDashboard;
