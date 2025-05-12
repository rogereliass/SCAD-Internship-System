import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, Building2, Calendar, User, Download, Eye } from 'lucide-react';
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
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

// Mock data for company evaluations
const mockEvaluations = [
  {
    id: 1,
    studentName: "Ahmed Al-Farsi",
    studentId: "S12345",
    major: "Computer Science",
    company: "TechSolutions Inc.",
    supervisor: "John Smith",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    evaluationScore: 4.5,
    evaluationDate: "2023-09-05",
    skills: ["Technical Skills", "Communication", "Problem Solving"],
    feedback: [
      "Excellent technical capabilities",
      "Strong communication skills",
      "Demonstrated leadership potential"
    ],
    recommendations: "Highly recommended for future internships"
  },
  {
    id: 2,
    studentName: "Fatima Al-Balushi",
    studentId: "S12346",
    major: "Marketing",
    company: "MarketingPro Ltd.",
    supervisor: "Sarah Johnson",
    startDate: "2023-07-01",
    endDate: "2023-09-30",
    evaluationScore: 4.8,
    evaluationDate: "2023-10-05",
    skills: ["Creativity", "Project Management", "Teamwork"],
    feedback: [
      "Outstanding creative contributions",
      "Excellent project management skills",
      "Great team player"
    ],
    recommendations: "Exceptional candidate for full-time positions"
  },
  {
    id: 3,
    studentName: "Omar Al-Habsi",
    studentId: "S12349",
    major: "Design",
    company: "DesignHub Co.",
    supervisor: "Michael Brown",
    startDate: "2023-06-15",
    endDate: "2023-09-15",
    evaluationScore: 4.2,
    evaluationDate: "2023-09-20",
    skills: ["UI/UX Design", "Prototyping", "User Research"],
    feedback: [
      "Strong design skills",
      "Good understanding of user needs",
      "Needs improvement in time management"
    ],
    recommendations: "Recommended for future internships with focus on time management"
  }
];

const CompaniesEvaluations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFromFaculty = location.state?.from === 'faculty';
  
  const handleBack = () => {
    if (isFromFaculty) {
      navigate('/dashboard/4', { replace: true }); // Faculty dashboard
    } else {
      navigate('/dashboard/3', { replace: true }); // SCAD Office dashboard
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    major: '',
    company: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);

  // Filter evaluations based on search query and filters
  const filteredEvaluations = mockEvaluations.filter((evaluation) => {
    const searchMatch = 
      evaluation.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evaluation.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evaluation.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const majorMatch = filters.major ? evaluation.major === filters.major : true;
    const companyMatch = filters.company ? evaluation.company === filters.company : true;
    
    return searchMatch && majorMatch && companyMatch;
  });

  // Get unique values for filter dropdowns
  const majors = [...new Set(mockEvaluations.map(e => e.major))];
  const companies = [...new Set(mockEvaluations.map(e => e.company))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const viewEvaluationDetails = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setIsEvaluationModalOpen(true);
  };

  const closeEvaluationDetails = () => {
    setIsEvaluationModalOpen(false);
    setSelectedEvaluation(null);
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'bg-green-100 text-green-800';
    if (score >= 4.0) return 'bg-blue-100 text-blue-800';
    if (score >= 3.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="scadOffice" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Companies Evaluations</h1>
          <Button 
            onClick={handleBack}
            variant="outline"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-l-4 border-l-blue-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {mockEvaluations.length}
                  </h3>
                  <p className="text-lg text-gray-500">Total Evaluations</p>
                </div>
                <Building2 size={24} className="text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {(mockEvaluations.reduce((acc, curr) => acc + curr.evaluationScore, 0) / mockEvaluations.length).toFixed(1)}
                  </h3>
                  <p className="text-lg text-gray-500">Average Score</p>
                </div>
                <Calendar size={24} className="text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-400">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {companies.length}
                  </h3>
                  <p className="text-lg text-gray-500">Companies</p>
                </div>
                <User size={24} className="text-purple-500" />
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
              
              {(filters.major || filters.company) ? (
                <Button 
                  variant="ghost" 
                  onClick={() => setFilters({ major: '', company: '' })}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                >
                  <option value="">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredEvaluations.length} of {mockEvaluations.length} evaluations
        </p>

        {/* Evaluations Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 text-black font-bold">
                <TableHead className="text-black font-bold">Student</TableHead>
                <TableHead className="text-black font-bold">Company</TableHead>
                <TableHead className="text-black font-bold">Supervisor</TableHead>
                <TableHead className="text-black font-bold">Internship Period</TableHead>
                <TableHead className="text-black font-bold">Evaluation Score</TableHead>
                <TableHead className="text-center text-black font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvaluations.map(evaluation => (
                <TableRow key={evaluation.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-black">{evaluation.studentName}</p>
                      <p className="text-sm text-gray-500">{evaluation.studentId} | {evaluation.major}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-black">{evaluation.company}</TableCell>
                  <TableCell className="text-black">{evaluation.supervisor}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-gray-500">Start: {evaluation.startDate}</p>
                      <p className="text-sm text-gray-500">End: {evaluation.endDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getScoreColor(evaluation.evaluationScore)}>
                      {evaluation.evaluationScore.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-800 py-2 px-4 rounded-md transition-all duration-300"
                      onClick={() => viewEvaluationDetails(evaluation)}
                    >
                      <Eye className="h-4 w-4 mr-1" />View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredEvaluations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No evaluations found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Evaluation Details Modal */}
        <Dialog open={isEvaluationModalOpen} onOpenChange={setIsEvaluationModalOpen}>
          <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
            {selectedEvaluation && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">Company Evaluation</DialogTitle>
                  <DialogDescription>
                    Evaluation for {selectedEvaluation.studentName}'s internship at {selectedEvaluation.company}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  {/* Evaluation Header */}
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedEvaluation.studentName}</h3>
                      <p className="text-gray-500">{selectedEvaluation.studentId} | {selectedEvaluation.major}</p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <Badge className={getScoreColor(selectedEvaluation.evaluationScore)}>
                        Score: {selectedEvaluation.evaluationScore.toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Evaluation Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Company Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-3">
                          <div>
                            <dt className="text-sm text-gray-500">Company</dt>
                            <dd className="font-medium">{selectedEvaluation.company}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Supervisor</dt>
                            <dd className="font-medium">{selectedEvaluation.supervisor}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Internship Period</dt>
                            <dd className="font-medium">
                              {selectedEvaluation.startDate} to {selectedEvaluation.endDate}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Evaluation Date</dt>
                            <dd className="font-medium">{selectedEvaluation.evaluationDate}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Skills & Feedback</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Skills Demonstrated</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedEvaluation.skills.map((skill, i) => (
                              <Badge key={i} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Feedback Points</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedEvaluation.feedback.map((point, i) => (
                              <li key={i} className="text-gray-400">{point}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-900">{selectedEvaluation.recommendations}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <DialogFooter className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => toast.success(`Evaluation downloaded`)}
                  >
                    <Download size={16} />
                    <span>Download Evaluation</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={closeEvaluationDetails}
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

export default CompaniesEvaluations;
