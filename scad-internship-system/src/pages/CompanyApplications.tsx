
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Building, MapPin, Globe, Phone, Mail, Eye } from 'lucide-react';
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
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// Mock company applications data
const mockCompanyApplications = [
  {
    id: 1,
    companyName: 'TechSolutions Inc.',
    industry: 'Information Technology',
    size: 'Medium (50-250 employees)',
    location: 'New York, NY',
    website: 'https://techsolutions.example.com',
    contactName: 'John Smith',
    contactEmail: 'john@techsolutions.example.com',
    contactPhone: '+1 (555) 123-4567',
    appliedDate: '2023-11-15',
    status: 'pending',
    description: 'TechSolutions is a growing IT company specializing in custom software development and cloud solutions for businesses.',
    reasonToJoin: 'We want to provide valuable internship opportunities for students interested in software development and IT.',
    proposedInternships: [
      'Frontend Developer Intern',
      'Backend Developer Intern',
      'DevOps Intern'
    ]
  },
  {
    id: 2,
    companyName: 'DesignHub Co.',
    industry: 'Design',
    size: 'Small (10-49 employees)',
    location: 'San Francisco, CA',
    website: 'https://designhub.example.com',
    contactName: 'Emily Johnson',
    contactEmail: 'emily@designhub.example.com',
    contactPhone: '+1 (555) 234-5678',
    appliedDate: '2023-11-14',
    status: 'pending',
    description: 'DesignHub is a creative design studio working with clients across various industries to deliver high-quality design solutions.',
    reasonToJoin: 'We want to mentor the next generation of designers and provide them with hands-on experience in a professional environment.',
    proposedInternships: [
      'UI/UX Design Intern',
      'Graphic Design Intern'
    ]
  },
  {
    id: 3,
    companyName: 'MarketingPro Ltd.',
    industry: 'Marketing',
    size: 'Small (10-49 employees)',
    location: 'Chicago, IL',
    website: 'https://marketingpro.example.com',
    contactName: 'Michael Brown',
    contactEmail: 'michael@marketingpro.example.com',
    contactPhone: '+1 (555) 345-6789',
    appliedDate: '2023-11-10',
    status: 'pending',
    description: 'MarketingPro is a digital marketing agency specializing in social media marketing, SEO, and content creation.',
    reasonToJoin: 'We want to provide practical marketing experience to students and potentially recruit talented individuals after graduation.',
    proposedInternships: [
      'Digital Marketing Intern',
      'Content Creation Intern',
      'Social Media Intern'
    ]
  },
  {
    id: 4,
    companyName: 'FinTech Innovations',
    industry: 'Finance',
    size: 'Large (250+ employees)',
    location: 'Boston, MA',
    website: 'https://fintechinnovations.example.com',
    contactName: 'Sarah Wilson',
    contactEmail: 'sarah@fintechinnovations.example.com',
    contactPhone: '+1 (555) 456-7890',
    appliedDate: '2023-11-08',
    status: 'pending',
    description: 'FinTech Innovations develops cutting-edge financial technology solutions for banks and financial institutions.',
    reasonToJoin: 'We want to introduce students to the growing field of financial technology and help them develop specialized skills.',
    proposedInternships: [
      'Financial Analysis Intern',
      'Software Development Intern',
      'Data Science Intern'
    ]
  },
  {
    id: 5,
    companyName: 'EcoSolutions',
    industry: 'Environmental Services',
    size: 'Small (10-49 employees)',
    location: 'Portland, OR',
    website: 'https://ecosolutions.example.com',
    contactName: 'David Garcia',
    contactEmail: 'david@ecosolutions.example.com',
    contactPhone: '+1 (555) 567-8901',
    appliedDate: '2023-11-05',
    status: 'pending',
    description: 'EcoSolutions provides consulting services for businesses looking to reduce their environmental impact and implement sustainable practices.',
    reasonToJoin: 'We want to inspire the next generation of environmental professionals and provide them with practical experience in sustainability consulting.',
    proposedInternships: [
      'Environmental Consultant Intern',
      'Sustainability Analyst Intern'
    ]
  }
];

const CompanyApplications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Filter companies based on search query and filters
  const filteredCompanies = mockCompanyApplications.filter((company) => {
    // Search filter
    const searchMatch = company.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Industry filter
    const industryMatch = filters.industry ? company.industry === filters.industry : true;
    
    return searchMatch && industryMatch;
  });

  // Get unique industries for filter dropdown
  const industries = [...new Set(mockCompanyApplications.map(c => c.industry))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const viewCompanyDetails = (company) => {
    setSelectedCompany(company);
  };

  const closeCompanyDetails = () => {
    setSelectedCompany(null);
  };

  const handleApplicationAction = (companyId, action) => {
    // In a real application, this would make an API call to update the status
    toast.success(`Company application ${action === 'accept' ? 'accepted' : 'rejected'}`);
    closeCompanyDetails();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="scadOffice" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Company Applications</h1>
          <Link
            to="/dashboard/3"
            className="inline-block px-4 py-2 rounded-md border border-gray-500 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow bg-white">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search by company name..." 
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
              
              {filters.industry ? (
                <Button 
                  variant="ghost" 
                  onClick={() => setFilters({ industry: '' })}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                  value={filters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredCompanies.length} of {mockCompanyApplications.length} company applications
        </p>

        {/* Companies Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 text-black font-bold">
                <TableHead className="text-black font-bold">Company Name</TableHead>
                <TableHead className="text-black font-bold">Industry</TableHead>
                <TableHead className="text-black font-bold">Size</TableHead>
                <TableHead className="text-black font-bold">Applied Date</TableHead>
                <TableHead className="text-black font-bold">Status</TableHead>
                <TableHead className="text-center text-black font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map(company => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium text-black">{company.companyName}</TableCell>
                  <TableCell className="font-medium text-black">{company.industry}</TableCell>
                  <TableCell className="font-medium text-black">{company.size}</TableCell>
                  <TableCell className="font-medium text-black">{company.appliedDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                        size="sm" 
                        className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-800 py-2 px-4 rounded-md transition-all duration-300"
                        onClick={() => viewCompanyDetails(company)}
                    >
                      <Eye className="h-4 w-4" />Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredCompanies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No company applications found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Company Details Modal */}
        {selectedCompany && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-gray-50 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
             <Card className="border-0 shadow-none bg-gray-50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{selectedCompany.companyName}</CardTitle>
                      <CardDescription className="text-lg mt-1">
                        {selectedCompany.industry}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={closeCompanyDetails}>
                      ✕
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-gray-500" />
                        <span className="text-gray-600">{selectedCompany.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-gray-600">{selectedCompany.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-gray-500" />
                        <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedCompany.website}
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">Contact Person</p>
                      <p className="text-gray-700">{selectedCompany.contactName}</p>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-500" />
                        <a href={`mailto:${selectedCompany.contactEmail}`} className="text-blue-600 hover:underline">
                          {selectedCompany.contactEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />
                        <a href={`tel:${selectedCompany.contactPhone}`} className="text-blue-600 hover:underline">
                          {selectedCompany.contactPhone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Company Description</h3>
                    <p className="text-gray-700">{selectedCompany.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Reason for Joining SCAD</h3>
                    <p className="text-gray-700">{selectedCompany.reasonToJoin}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Proposed Internships</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedCompany.proposedInternships.map((internship, i) => (
                        <li key={i} className="text-gray-700">{internship}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Application Status</h3>
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Pending Review
                      </Badge>
                      <span className="ml-2 text-sm text-gray-500">
                        Applied on {selectedCompany.appliedDate}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 border-t pt-4">
                  <Button 
                    variant="outline"
                    onClick={closeCompanyDetails}
                  >
                    Close
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleApplicationAction(selectedCompany.id, 'reject')}
                  >
                    Reject Application
                  </Button>
                  <Button 
                    onClick={() => handleApplicationAction(selectedCompany.id, 'accept')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Accept Company
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

export default CompanyApplications;