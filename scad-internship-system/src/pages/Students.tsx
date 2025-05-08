import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, FileText, Check, X, AlertTriangle } from 'lucide-react';
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
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';

// Mock students data
const mockStudents = [
  {
    id: 1,
    name: "Ahmed Al-Farsi",
    studentId: "S12345",
    major: "Computer Science",
    email: "ahmed@example.com",
    phone: "+123-456-7890",
    internshipStatus: "active",
    company: "TechSolutions Inc.",
    position: "Frontend Developer Intern",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    reportStatus: "pending"
  },
  {
    id: 2,
    name: "Fatima Al-Balushi",
    studentId: "S12346",
    major: "Marketing",
    email: "fatima@example.com",
    phone: "+123-456-7891",
    internshipStatus: "active",
    company: "MarketingPro Ltd.",
    position: "Marketing Assistant",
    startDate: "2023-09-15",
    endDate: "2023-12-15",
    reportStatus: "pending"
  },
  {
    id: 3,
    name: "Khalid Al-Abri",
    studentId: "S12347",
    major: "Computer Science",
    email: "khalid@example.com",
    phone: "+123-456-7892",
    internshipStatus: "searching",
    company: null,
    position: null,
    startDate: null,
    endDate: null,
    reportStatus: null
  },
  {
    id: 4,
    name: "Noor Al-Hadrami",
    studentId: "S12348",
    major: "Finance",
    email: "noor@example.com",
    phone: "+123-456-7893",
    internshipStatus: "declined",
    company: null,
    position: null,
    startDate: null,
    endDate: null,
    reportStatus: null
  },
  {
    id: 5,
    name: "Omar Al-Habsi",
    studentId: "S12349",
    major: "Design",
    email: "omar@example.com",
    phone: "+123-456-7894",
    internshipStatus: "active",
    company: "DesignHub Co.",
    position: "UI/UX Design Intern",
    startDate: "2023-09-01",
    endDate: "2024-02-01",
    reportStatus: "pending"
  },
  {
    id: 6,
    name: "Sara Al-Kindi",
    studentId: "S12350",
    major: "Computer Science",
    email: "sara@example.com",
    phone: "+123-456-7895",
    internshipStatus: "completed",
    company: "DataTech Solutions",
    position: "Data Science Intern",
    startDate: "2023-06-01",
    endDate: "2023-08-15",
    reportStatus: "accepted"
  },
  {
    id: 7,
    name: "Yusuf Al-Siyabi",
    studentId: "S12351",
    major: "Marketing",
    email: "yusuf@example.com",
    phone: "+123-456-7896",
    internshipStatus: "completed",
    company: "GlobalMarketing Inc.",
    position: "Content Creation Intern",
    startDate: "2023-06-01",
    endDate: "2023-08-15",
    reportStatus: "rejected"
  },
  {
    id: 8,
    name: "Zainab Al-Amri",
    studentId: "S12352",
    major: "Finance",
    email: "zainab@example.com",
    phone: "+123-456-7897",
    internshipStatus: "completed",
    company: "FinTech Innovations",
    position: "Financial Analysis Intern",
    startDate: "2023-06-01",
    endDate: "2023-08-15",
    reportStatus: "flagged"
  }
];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    major: '',
    internshipStatus: '',
    reportStatus: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filter students based on search query and filters
  const filteredStudents = mockStudents.filter((student) => {
    // Search filter
    const searchMatch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Other filters
    const majorMatch = filters.major ? student.major === filters.major : true;
    const statusMatch = filters.internshipStatus ? student.internshipStatus === filters.internshipStatus : true;
    const reportMatch = filters.reportStatus ? student.reportStatus === filters.reportStatus : true;
    
    return searchMatch && majorMatch && statusMatch && reportMatch;
  });

  // Get unique values for filter dropdowns
  const majors = [...new Set(mockStudents.map(s => s.major))];
  const statuses = [...new Set(mockStudents.map(s => s.internshipStatus))];
  const reportStatuses = [...new Set(mockStudents.map(s => s.reportStatus).filter(Boolean))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailsModalOpen(true);
  };

  const closeStudentDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedStudent(null);
  };

  const downloadStudentData = () => {
    toast.success('Student data export started');
  };

  const handleDownloadReport = (studentName) => {
    toast.success(`Downloading report for ${studentName}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'searching': return 'bg-yellow-100 text-yellow-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReportStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReportStatusIcon = (status) => {
    switch (status) {
      case 'accepted': 
        return <Check size={14} className="text-green-600" />;
      case 'pending':
        return null;
      case 'rejected':
        return <X size={14} className="text-red-600" />;
      case 'flagged':
        return <AlertTriangle size={14} className="text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="scadOffice" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Students Management</h1>
          <div className="flex items-center gap-3">
            <Link to="/scad-dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={downloadStudentData}
            >
              <Download size={16} />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-500">Total Students</p>
                <span className="text-2xl font-bold">{mockStudents.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-500">Active Internships</p>
                <span className="text-2xl font-bold">
                  {mockStudents.filter(s => s.internshipStatus === 'active').length}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-500">Completed</p>
                <span className="text-2xl font-bold">
                  {mockStudents.filter(s => s.internshipStatus === 'completed').length}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-500">Still Searching</p>
                <span className="text-2xl font-bold">
                  {mockStudents.filter(s => s.internshipStatus === 'searching').length}
                </span>
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
                placeholder="Search by name, ID, or email..." 
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
              
              {(filters.major || filters.internshipStatus || filters.reportStatus) ? (
                <Button 
                  variant="ghost" 
                  onClick={() => setFilters({ major: '', internshipStatus: '', reportStatus: '' })}
                >
                  Clear Filters
                </Button>
              ) : null}
            </div>
          </div>
          
          {/* Expanded Filters */}
          {isFilterOpen && (
            <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Internship Status</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.internshipStatus}
                  onChange={(e) => handleFilterChange('internshipStatus', e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Status</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.reportStatus}
                  onChange={(e) => handleFilterChange('reportStatus', e.target.value)}
                >
                  <option value="">All</option>
                  {reportStatuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredStudents.length} of {mockStudents.length} students
        </p>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 text-black font-bold">
                <TableHead className=" text-black font-bold">Name</TableHead>
                <TableHead className=" text-black font-bold">Student ID</TableHead>
                <TableHead className=" text-black font-bold">Major</TableHead>
                <TableHead className=" text-black font-bold">Internship Status</TableHead>
                <TableHead className=" text-black font-bold">Company</TableHead>
                <TableHead className=" text-black font-bold">Report</TableHead>
                <TableHead className="text-center text-black font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium text-black">{student.name}</TableCell>
                  <TableCell className="text-black">{student.studentId}</TableCell>
                  <TableCell className="text-black">{student.major}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.internshipStatus)}`}>
                      {student.internshipStatus.charAt(0).toUpperCase() + student.internshipStatus.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-black">{student.company || "-"}</TableCell>
                  <TableCell className="text-black">
                    {student.reportStatus ? (
                      <div className="flex items-center gap-1">
                        {getReportStatusIcon(student.reportStatus)}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getReportStatusColor(student.reportStatus)}`}>
                          {student.reportStatus.charAt(0).toUpperCase() + student.reportStatus.slice(1)}
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => viewStudentDetails(student)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No students found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Student Details Modal */}
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent className="max-w-3xl">
            {selectedStudent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">Student Details</DialogTitle>
                  <DialogDescription>
                    Complete information about the student
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Personal Information</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{selectedStudent.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Student ID</p>
                        <p className="font-medium">{selectedStudent.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Major</p>
                        <p className="font-medium">{selectedStudent.major}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">
                          <a href={`mailto:${selectedStudent.email}`} className="text-blue-600 hover:underline">
                            {selectedStudent.email}
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">
                          <a href={`tel:${selectedStudent.phone}`} className="text-blue-600 hover:underline">
                            {selectedStudent.phone}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Internship Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Internship Information</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <Badge className={`${getStatusColor(selectedStudent.internshipStatus)} border-none`}>
                          {selectedStudent.internshipStatus.charAt(0).toUpperCase() + selectedStudent.internshipStatus.slice(1)}
                        </Badge>
                      </div>
                      
                      {selectedStudent.company && (
                        <>
                          <div>
                            <p className="text-sm text-gray-500">Company</p>
                            <p className="font-medium">{selectedStudent.company}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Position</p>
                            <p className="font-medium">{selectedStudent.position}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Start Date</p>
                              <p className="font-medium">{selectedStudent.startDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">End Date</p>
                              <p className="font-medium">{selectedStudent.endDate}</p>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {selectedStudent.reportStatus && (
                        <div>
                          <p className="text-sm text-gray-500">Report Status</p>
                          <div className="flex items-center gap-1 mt-1">
                            {getReportStatusIcon(selectedStudent.reportStatus)}
                            <Badge className={`${getReportStatusColor(selectedStudent.reportStatus)} border-none`}>
                              {selectedStudent.reportStatus.charAt(0).toUpperCase() + selectedStudent.reportStatus.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex flex-wrap gap-3">
                  {selectedStudent.reportStatus && (
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownloadReport(selectedStudent.name)} 
                      className="flex items-center gap-1"
                    >
                      <FileText size={16} />
                      <span>Download Report</span>
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={closeStudentDetails}
                  >
                    Close
                  </Button>
                  
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Students;