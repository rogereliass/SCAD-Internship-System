import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar } from 'lucide-react';
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
import InternshipCard from '../components/internships/InternshipCard';

// Mock internships data
const mockInternships = [
  {
    id: 1,
    title: 'Frontend Developer Internship',
    company: 'TechSolutions Inc.',
    industry: 'Information Technology',
    location: 'New York, NY',
    duration: '3 months',
    isPaid: true,
    salary: '$20/hour',
    startDate: '2023-09-01',
    endDate: '2023-12-01',
    status: 'active',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    description: 'Join our team to develop modern web applications using React and related technologies.',
    postedDate: '2023-08-01'
  },
  {
    id: 2,
    title: 'UX Design Intern',
    company: 'DesignHub Co.',
    industry: 'Design',
    location: 'San Francisco, CA',
    duration: '6 months',
    isPaid: true,
    salary: '$22/hour',
    startDate: '2023-08-15',
    endDate: '2024-02-15',
    status: 'active',
    skills: ['Figma', 'UI/UX', 'User Research'],
    description: 'Help us create beautiful and intuitive user interfaces for our clients.',
    postedDate: '2023-07-15'
  },
  {
    id: 3,
    title: 'Marketing Assistant',
    company: 'MarketingPro Ltd.',
    industry: 'Marketing',
    location: 'Chicago, IL',
    duration: '4 months',
    isPaid: false,
    salary: null,
    startDate: '2023-10-01',
    endDate: '2024-02-01',
    status: 'upcoming',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    description: 'Assist our marketing team with campaigns, social media, and content creation.',
    postedDate: '2023-08-20'
  },
  {
    id: 4,
    title: 'Data Science Intern',
    company: 'DataTech Solutions',
    industry: 'Information Technology',
    location: 'Remote',
    duration: '6 months',
    isPaid: true,
    salary: '$25/hour',
    startDate: '2023-09-15',
    endDate: '2024-03-15',
    status: 'active',
    skills: ['Python', 'Machine Learning', 'SQL'],
    description: 'Work on data-driven projects using machine learning and statistical analysis.',
    postedDate: '2023-07-30'
  },
  {
    id: 5,
    title: 'Graphic Design Intern',
    company: 'Creative Designs Inc.',
    industry: 'Design',
    location: 'Los Angeles, CA',
    duration: '3 months',
    isPaid: true,
    salary: '$18/hour',
    startDate: '2023-11-01',
    endDate: '2024-02-01',
    status: 'upcoming',
    skills: ['Adobe Creative Suite', 'Typography', 'Branding'],
    description: 'Join our creative team to develop visual assets for various marketing campaigns.',
    postedDate: '2023-08-25'
  },
  {
    id: 6,
    title: 'Software Engineering Intern',
    company: 'TechSolutions Inc.',
    industry: 'Information Technology',
    location: 'Boston, MA',
    duration: '4 months',
    isPaid: true,
    salary: '$22/hour',
    startDate: '2023-10-15',
    endDate: '2024-02-15',
    status: 'active',
    skills: ['Java', 'Spring Boot', 'SQL'],
    description: 'Develop backend services for our enterprise applications.',
    postedDate: '2023-08-10'
  },
];

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    isPaid: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  // Filter internships based on search query and filters
  const filteredInternships = mockInternships.filter((internship) => {
    // Search filter
    const searchMatch = 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Other filters
    const industryMatch = filters.industry ? internship.industry === filters.industry : true;
    const durationMatch = filters.duration ? internship.duration === filters.duration : true;
    const paidMatch = 
      filters.isPaid === 'paid' ? internship.isPaid : 
      filters.isPaid === 'unpaid' ? !internship.isPaid : true;
    
    return searchMatch && industryMatch && durationMatch && paidMatch;
  });

  // Get unique industries for filter dropdown
  const industries = [...new Set(mockInternships.map(i => i.industry))];
  const durations = [...new Set(mockInternships.map(i => i.duration))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const viewInternshipDetails = (internship) => {
    setSelectedInternship(internship);
  };

  const closeInternshipDetails = () => {
    setSelectedInternship(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Available Internships</h1>
          <Link to="/dashboard/3" className="text-gray-600 hover:text-gray-900">
            Back to Dashboard
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search by job title or company name..." 
                className="pl-10 bg-white text-gray-900 border-gray-300 rounded-md focus:border-scad-dark focus:ring-0 focus:outline-none"
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
              
              {filters.industry || filters.duration || filters.isPaid ? (
                <Button 
                  variant="ghost" 
                  onClick={() => setFilters({ industry: '', duration: '', isPaid: '' })}
                >
                  Clear Filters
                </Button>
              ) : null}
              
              <div className="flex h-9 border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('table')}
                  className={`w-20 px-4 text-sm font-medium transition-colors rounded-none ${
                    viewMode === 'table'
                      ? 'bg-scad-dark text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Table
                </button>

                <button
                  onClick={() => setViewMode('card')}
                  className={`w-20 px-4 text-sm font-medium transition-colors rounded-none ${
                    viewMode === 'card'
                      ? 'bg-scad-dark text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Cards
                </button>
              </div>

            </div>
          </div>
          
          {/* Expanded Filters */}
          {isFilterOpen && (
            <div className="mt-4 border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Industry</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  value={filters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry} className="text-gray-900">{industry}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Duration</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                >
                  <option value="">All Durations</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration} className="text-gray-900">{duration}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Payment Status</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  value={filters.isPaid}
                  onChange={(e) => handleFilterChange('isPaid', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="paid" className="text-gray-900">Paid</option>
                  <option value="unpaid" className="text-gray-900">Unpaid</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredInternships.length} of {mockInternships.length} internships
        </p>

        {/* Internships Display */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 text-black font-bold">
                  <TableHead className=" text-black font-bold">Job Title</TableHead>
                  <TableHead className=" text-black font-bold">Company</TableHead>
                  <TableHead className=" text-black font-bold">Industry</TableHead>
                  <TableHead className=" text-black font-bold">Duration</TableHead>
                  <TableHead className="text-center text-black font-bold">Payment</TableHead>
                  <TableHead className="text-center text-black font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInternships.map(internship => (
                  <TableRow key={internship.id}>
                    <TableCell className="font-medium text-black">{internship.title}</TableCell>
                    <TableCell className="text-black">{internship.company}</TableCell>
                    <TableCell className="text-black">{internship.industry}</TableCell>
                    <TableCell className="text-black">{internship.duration}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        internship.isPaid 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {internship.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => viewInternshipDetails(internship)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredInternships.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No internships found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map(internship => (
              <InternshipCard
                key={internship.id}
                id={internship.id}
                title={internship.title}
                company={internship.company}
                location={internship.location}
                duration={internship.duration}
                isPaid={internship.isPaid}
                salary={internship.salary}
                postedDate={internship.postedDate}
                industry={internship.industry}
              />
            ))}
            
            {filteredInternships.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
                No internships found matching your search criteria.
              </div>
            )}
          </div>
        )}

        {/* Internship Details Modal */}
        {selectedInternship && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-50 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <Card className="border-0 shadow-none bg-gray-50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                    <CardTitle className="text-xl text-gray-900">{selectedInternship.title}</CardTitle>
                    <CardDescription className="text-lg mt-1 text-gray-700">
                        {selectedInternship.company}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={closeInternshipDetails} className="text-gray-900">
                      ✕
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                      {selectedInternship.industry}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-sm">
                      {selectedInternship.location}
                    </span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-sm flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {selectedInternship.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-sm ${
                      selectedInternship.isPaid 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedInternship.isPaid ? `Paid: ${selectedInternship.salary}` : 'Unpaid'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-700">{selectedInternship.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-md font-medium mb-1">Start Date</h3>
                      <p className="text-gray-700">{selectedInternship.startDate}</p>
                    </div>
                    <div>
                      <h3 className="text-md font-medium mb-1">End Date</h3>
                      <p className="text-gray-700">{selectedInternship.endDate}</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 border-t pt-4">
                  <Button 
                    variant="outline"
                    onClick={closeInternshipDetails}
                    className="text-gray-900 border-gray-300"
                  >
                    Close
                  </Button>
                  <Button 
                    className="bg-scad-red hover:bg-scad-red/90 text-white"
                  >
                    Apply
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;