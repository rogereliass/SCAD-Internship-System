import { useState } from 'react';
import { Search, Filter, Clock, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '../ui/table';
import { Badge } from '../ui/badge';

interface Report {
  id: number;
  studentName: string;
  studentId: string;
  major: string;
  company: string;
  position: string;
  submissionDate: string;
  status: string;
  reviewedBy: string | null;
  comment: string | null;
}

interface ReportsTableProps {
  reports: Report[];
  onViewReport: (report: Report) => void;
  onReviewReport: (report: Report) => void;
}

const ReportsTable = ({ reports, onViewReport, onReviewReport }: ReportsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ major: '', status: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique values for filter dropdowns
  const majors = [...new Set(reports.map(r => r.major))];
  const statuses = ['accepted', 'pending', 'flagged', 'rejected'];

  // Filter reports based on search query and filters
  const filteredReports = reports.filter((report) => {
    const searchMatch = 
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const majorMatch = filters.major ? report.major === filters.major : true;
    const statusMatch = filters.status ? report.status === filters.status : true;
    
    return searchMatch && majorMatch && statusMatch;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getStatusIcon = (status: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search by student name, ID, or company..." 
              className="pl-10 text-gray-900" 
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
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
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
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
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
      <p className="text-sm text-gray-600">
        Showing {filteredReports.length} of {reports.length} reports
      </p>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 text-black font-bold">
              <TableHead className="text-black font-bold">Student</TableHead>
              <TableHead className="text-black font-bold">Major</TableHead>
              <TableHead className="text-black font-bold">Company</TableHead>
              <TableHead className="text-black font-bold">Submission Date</TableHead>
              <TableHead className="text-black font-bold">Status</TableHead>
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
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-800 py-2 px-4 rounded-md transition-all duration-300"
                      onClick={() => onViewReport(report)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="bg-white text-green-600 hover:bg-green-100 hover:text-green-800 py-2 px-4 rounded-md transition-all duration-300"
                      onClick={() => onReviewReport(report)}
                    >
                      Review
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredReports.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No reports found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReportsTable; 