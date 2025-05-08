import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, AlertTriangle, Download, FileText, CheckCircle, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { Input } from '../components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';

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
  },
  {
    id: 4,
    studentName: "Sara Al-Kindi",
    studentId: "S12350",
    major: "Computer Science",
    company: "DataTech Solutions",
    position: "Data Science Intern",
    submissionDate: "2023-08-20",
    reviewDate: "2023-08-25",
    status: "accepted",
    reviewedBy: "Dr. Khalid",
    comment: "Excellent technical report with strong evidence of data science skills application.",
    skills: ["Python", "Machine Learning", "SQL"],
    learningOutcomes: [
      "Built predictive models using machine learning algorithms",
      "Cleaned and prepared large datasets for analysis",
      "Visualized data findings for stakeholders"
    ]
  },
  {
    id: 5,
    studentName: "Yusuf Al-Siyabi",
    studentId: "S12351",
    major: "Marketing",
    company: "GlobalMarketing Inc.",
    position: "Content Creation Intern",
    submissionDate: "2023-08-18",
    reviewDate: "2023-08-26",
    status: "rejected",
    reviewedBy: "Dr. Laila",
    comment: "The report does not meet the minimum requirements. Lacks evidence of activities performed and reflection on learning outcomes. Please revise and resubmit with more details about your daily tasks and experiences.",
    skills: ["Copywriting", "Social Media", "Video Editing"],
    learningOutcomes: [
      "Created content for social media platforms",
      "Assisted with email marketing campaigns",
      "Edited promotional videos"
    ]
  },
  {
    id: 6,
    studentName: "Zainab Al-Amri",
    studentId: "S12352",
    major: "Finance",
    company: "FinTech Innovations",
    position: "Financial Analysis Intern",
    submissionDate: "2023-08-19",
    reviewDate: "2023-08-28",
    status: "flagged",
    reviewedBy: "Dr. Hassan",
    comment: "The financial analysis section needs clarification. Please provide more detailed explanation of the methodologies used and how they align with industry standards.",
    skills: ["Financial Modeling", "Excel", "Data Analysis"],
    learningOutcomes: [
      "Analyzed financial statements and prepared reports",
      "Assisted with budget forecasting",
      "Researched market trends and competitor analysis"
    ]
  }
];

const InternshipReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    major: '',
    status: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  const [reviewData, setReviewData] = useState({
    status: '',
    comment: ''
  });
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Filter reports based on search query and filters
  const filteredReports = mockReports.filter((report) => {
    // Search filter
    const searchMatch = 
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Other filters
    const majorMatch = filters.major ? report.major === filters.major : true;
    const statusMatch = filters.status ? report.status === filters.status : true;
    
    return searchMatch && majorMatch && statusMatch;
  });

  // Get unique values for filter dropdowns
  const majors = [...new Set(mockReports.map(r => r.major))];
  const statuses = [...new Set(mockReports.map(r => r.status))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

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
    setReviewData({
      status: report.status,
      comment: report.comment || ''
    });
    setIsReviewModalOpen(true);
  };
  
  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!reviewData.status || (reviewData.status !== 'accepted' && !reviewData.comment.trim())) {
      toast.error("Please provide a comment for flagged/rejected reports");
      return;
    }
    
    // In a real app, this would update the report status in the database
    toast.success(`Report review submitted successfully`);
    
    setIsReviewModalOpen(false);
    setIsReportModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': 
        return <CheckCircle size={16} className="text-green-600" />;
      case 'pending': 
        return <Clock size={16} className="text-yellow-600" />;
      case 'flagged': 
        return <AlertTriangle size={16} className="text-orange-600" />;
      case 'rejected': 
        return <X size={16} className="text-red-600" />;
      default: 
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="scadOffice" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Internship Reports</h1>
          <Link to="/dashboard/3" className="text-gray-600 hover:text-gray-900">
            Back to Dashboard
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-yellow-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {mockReports.filter(r => r.status === 'pending').length}
                  </h3>
                  <p className="text-lg text-gray-500">Pending Review</p>
                </div>
                <Clock size={24} className="text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {mockReports.filter(r => r.status === 'accepted').length}
                  </h3>
                  <p className="text-lg text-gray-500">Accepted</p>
                </div>
                <CheckCircle size={24} className="text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {mockReports.filter(r => r.status === 'flagged').length}
                  </h3>
                  <p className="text-lg text-gray-500">Flagged</p>
                </div>
                <AlertTriangle size={24} className="text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {mockReports.filter(r => r.status === 'rejected').length}
                  </h3>
                  <p className="text-lg text-gray-500">Rejected</p>
                </div>
                <X size={24} className="text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search by student name, ID, or company..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                <span>Filters</span>
              </Button>
              
              {(filters.major || filters.status) ? (
                <Button 
                  variant="ghost" 
                  onClick={() => setFilters({ major: '', status: '' })}
                >
                  Clear Filters
                </Button>
              ) : null}
            </div>
          </div>
          
          {/* Expanded Filters */}
          {isFilterOpen && (
            <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.major}
                  onChange={(e) => handleFilterChange('major', e.target.value)}
                >
                  <option value="">All Majors</option>
                  {majors.map(major => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredReports.length} of {mockReports.length} reports
        </p>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 text-black font-bold">
                <TableHead className=" text-black font-bold">Student</TableHead>
                <TableHead className=" text-black font-bold">Major</TableHead>
                <TableHead className=" text-black font-bold">Company</TableHead>
                <TableHead className=" text-black font-bold">Submission Date</TableHead>
                <TableHead className=" text-black font-bold">Status</TableHead>
                <TableHead className=" text-black font-bold">Reviewer</TableHead>
                <TableHead className="text-center text-black font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map(report => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div>
                     <p className="font-medium text-black">{report.studentName}</p>
                      <p className="text-sm text-gray-500">{report.studentId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-black">{report.major}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-black">{report.company}</p>
                      <p className="text-sm text-gray-500">{report.position}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-black">{report.submissionDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(report.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-black">
                    {report.reviewedBy || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => viewReportDetails(report)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleOpenReviewModal(report)}
                      >
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredReports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No reports found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Report Details Modal */}
        <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
          <DialogContent className="max-w-4xl">
            {selectedReport && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">Internship Report</DialogTitle>
                  <DialogDescription>
                    Report submitted by {selectedReport.studentName}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  {/* Report Header */}
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedReport.studentName}</h3>
                      <p className="text-gray-500">{selectedReport.studentId} | {selectedReport.major}</p>
                    </div>
                    <div className="mt-3 md:mt-0 flex items-center">
                      <Badge className={`${getStatusColor(selectedReport.status)}`}>
                        {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Report Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Internship Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-3">
                          <div>
                            <dt className="text-sm text-gray-500">Company</dt>
                            <dd className="font-medium">{selectedReport.company}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Position</dt>
                            <dd className="font-medium">{selectedReport.position}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Submission Date</dt>
                            <dd className="font-medium">{selectedReport.submissionDate}</dd>
                          </div>
                          {selectedReport.reviewDate && (
                            <div>
                              <dt className="text-sm text-gray-500">Review Date</dt>
                              <dd className="font-medium">{selectedReport.reviewDate}</dd>
                            </div>
                          )}
                          {selectedReport.reviewedBy && (
                            <div>
                              <dt className="text-sm text-gray-500">Reviewed By</dt>
                              <dd className="font-medium">{selectedReport.reviewedBy}</dd>
                            </div>
                          )}
                        </dl>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Skills & Competencies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Skills Developed</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedReport.skills.map((skill, i) => (
                              <Badge key={i} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Learning Outcomes</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedReport.learningOutcomes.map((outcome, i) => (
                              <li key={i} className="text-gray-400">{outcome}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Review Comments */}
                  {selectedReport.comment && (
                    <Card className={selectedReport.status === 'rejected' ? 'border-red-200' : selectedReport.status === 'flagged' ? 'border-orange-200' : 'border-green-200'}>
                      <CardHeader className={selectedReport.status === 'rejected' ? 'bg-red-50' : selectedReport.status === 'flagged' ? 'bg-orange-50' : 'bg-green-50'}>
                        <CardTitle className="text-lg text-black">Reviewer Comments</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-white">{selectedReport.comment}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <DialogFooter className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => toast.success(`Report downloaded`)}
                  >
                    <Download size={16} />
                    <span>Download Report</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={closeReportDetails}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleOpenReviewModal(selectedReport)}
                  >
                    Review Report
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Review Modal */}
        <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Review Internship Report</DialogTitle>
              <DialogDescription>
                {selectedReport && `Provide feedback for ${selectedReport.studentName}'s report`}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleReviewSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="status">
                  Review Status
                </label>
                <select 
                  id="status"
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={reviewData.status}
                  onChange={handleReviewInputChange}
                  required
                >
                  <option value="accepted">Accepted</option>
                  <option value="flagged">Flagged (Needs Clarification)</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="comment">
                  {reviewData.status === 'accepted' ? 'Feedback (Optional)' : 'Feedback *'}
                </label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={reviewData.comment}
                  onChange={handleReviewInputChange}
                  placeholder="Provide feedback on the internship report"
                  rows={4}
                  required={reviewData.status !== 'accepted'}
                />
                {reviewData.status !== 'accepted' && (
                  <p className="text-sm text-gray-500">
                    Please provide a detailed explanation for flagging or rejecting this report.
                  </p>
                )}
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsReviewModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className={
                    reviewData.status === 'accepted' ? 'bg-green-600 hover:bg-green-700' :
                    reviewData.status === 'flagged' ? 'bg-orange-600 hover:bg-orange-700' :
                    'bg-red-600 hover:bg-red-700'
                  }
                >
                  Submit Review
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InternshipReports;