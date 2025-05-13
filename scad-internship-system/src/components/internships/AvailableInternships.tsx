import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Building2, DollarSign, Briefcase, X } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface AvailableInternshipsProps {
  searchTerm: string;
  dateFilter: string;
  onInternshipClick: (id: string) => void;
  industryFilter: string;
  durationFilter: string;
  paymentFilter: string;
}

interface Internship {
  id: string;
  company: string;
  title: string;
  duration: string;
  industry: string;
  location: string;
  isPaid: boolean;
  salary: string | number;
  description: string;
  requirements: string[];
  startDate: string;
  endDate: string;
}

const internships: Internship[] = [
  { 
    id: '1', 
    company: 'TechCorp', 
    title: 'Frontend Developer', 
    duration: '3 months',
    industry: 'Information Technology',
    location: 'San Francisco, CA',
    isPaid: true,
    salary: '25',
    description: 'Join our frontend team to build modern web applications using React and TypeScript. You will work on real projects and learn from experienced developers.',
    requirements: ['React', 'TypeScript', 'HTML', 'CSS', 'Git'],
    startDate: '2024-06-01',
    endDate: '2024-09-01'
  },
  { 
    id: '2', 
    company: 'DesignHub', 
    title: 'UX Designer', 
    duration: '6 months',
    industry: 'Design',
    location: 'New York, NY',
    isPaid: true,
    salary: '22',
    description: 'Work with our design team to create beautiful and intuitive user interfaces. You will participate in user research, wireframing, and prototyping.',
    requirements: ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping', 'User Research'],
    startDate: '2024-07-01',
    endDate: '2024-12-31'
  },
  { 
    id: '3', 
    company: 'DataSystems', 
    title: 'Data Analyst', 
    duration: '3 months',
    industry: 'Data Analytics',
    location: 'Boston, MA',
    isPaid: true,
    salary: '23',
    description: 'Help analyze large datasets and create meaningful insights. You will work with SQL, Python, and data visualization tools.',
    requirements: ['Python', 'SQL', 'Data Visualization', 'Statistics', 'Excel'],
    startDate: '2024-06-15',
    endDate: '2024-09-15'
  },
  { 
    id: '4', 
    company: 'MarketingPro', 
    title: 'Digital Marketing Intern', 
    duration: '4 months',
    industry: 'Marketing',
    location: 'Chicago, IL',
    isPaid: true,
    salary: '20',
    description: 'Learn digital marketing strategies including SEO, social media marketing, and content creation. Work on real campaigns and track their performance.',
    requirements: ['Social Media', 'Content Creation', 'SEO', 'Analytics', 'Copywriting'],
    startDate: '2024-05-01',
    endDate: '2024-08-31'
  },
  { 
    id: '5', 
    company: 'FinanceFirst', 
    title: 'Financial Analyst', 
    duration: '6 months',
    industry: 'Finance',
    location: 'New York, NY',
    isPaid: true,
    salary: '28',
    description: 'Assist in financial analysis, market research, and investment strategies. Work with financial models and market data.',
    requirements: ['Financial Analysis', 'Excel', 'Financial Modeling', 'Market Research', 'Accounting'],
    startDate: '2024-07-01',
    endDate: '2024-12-31'
  },
  { 
    id: '6', 
    company: 'HealthTech', 
    title: 'Healthcare IT Intern', 
    duration: '3 months',
    industry: 'Healthcare',
    location: 'Austin, TX',
    isPaid: true,
    salary: '21',
    description: 'Work on healthcare software solutions and learn about healthcare IT systems. Help improve patient care through technology.',
    requirements: ['Healthcare IT', 'Software Development', 'Database Management', 'HIPAA Compliance', 'Python'],
    startDate: '2024-06-01',
    endDate: '2024-09-01'
  },
  { 
    id: '7', 
    company: 'EduTech', 
    title: 'Educational Technology Intern', 
    duration: '4 months',
    industry: 'Education',
    location: 'Seattle, WA',
    isPaid: false,
    salary: '0',
    description: 'Help develop educational software and learning platforms. Work on creating engaging educational content and tools.',
    requirements: ['Educational Technology', 'Content Development', 'Learning Management Systems', 'JavaScript', 'HTML/CSS'],
    startDate: '2024-07-01',
    endDate: '2024-10-31'
  },
  { 
    id: '8', 
    company: 'GreenEnergy', 
    title: 'Sustainability Analyst', 
    duration: '5 months',
    industry: 'Environmental',
    location: 'Portland, OR',
    isPaid: true,
    salary: '24',
    description: 'Analyze environmental data and help develop sustainable energy solutions. Work on projects that make a real environmental impact.',
    requirements: ['Environmental Science', 'Data Analysis', 'Sustainability', 'Project Management', 'Technical Writing'],
    startDate: '2024-06-15',
    endDate: '2024-11-15'
  }
];

const AvailableInternships: React.FC<AvailableInternshipsProps> = ({
  searchTerm,
  dateFilter,
  onInternshipClick,
  industryFilter,
  durationFilter,
  paymentFilter
}) => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = 
      dateFilter === 'all' || 
      (dateFilter === 'current' && new Date(internship.startDate) <= new Date() && new Date(internship.endDate) >= new Date()) ||
      (dateFilter === 'upcoming' && new Date(internship.startDate) > new Date());

    const matchesIndustry = industryFilter === 'all' || internship.industry === industryFilter;
    const matchesDuration = durationFilter === 'all' || internship.duration === durationFilter;
    const matchesPayment = paymentFilter === 'all' || (paymentFilter === 'paid' && internship.isPaid) || (paymentFilter === 'unpaid' && !internship.isPaid);

    return matchesSearch && matchesDate && matchesIndustry && matchesDuration && matchesPayment;
  });

  const handleApply = (internshipId: string) => {
    onInternshipClick(internshipId);
    setSelectedInternship(null);
    toast.success('Application submitted successfully!', {
      description: 'Your application has been sent to the company.',
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#ef4444', // SCAD red
        color: 'white',
        border: 'none',
      },
      className: 'border-none',
    });
  };

  return (
    <div className="space-y-4">
      <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInternships.map((internship) => (
            <div 
              key={internship.id}
              className="border rounded-lg p-4 hover:border-scad-red transition-colors cursor-pointer bg-white"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{internship.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{internship.company}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-scad-red hover:text-scad-red/80 hover:bg-transparent"
                    onClick={() => setSelectedInternship(internship)}
                  >
                    View Details
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Starts {new Date(internship.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{internship.isPaid ? `$${internship.salary}/hour` : 'Unpaid'}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2">{internship.description}</p>

                <div className="flex flex-wrap gap-2">
                  {internship.requirements.slice(0, 3).map((req, index) => (
                    <span 
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        index % 4 === 0 ? 'bg-blue-100 text-blue-800' :
                        index % 4 === 1 ? 'bg-green-100 text-green-800' :
                        index % 4 === 2 ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {req}
                    </span>
                  ))}
                  {internship.requirements.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{internship.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredInternships.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No internships found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {selectedInternship && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedInternship.title}</h2>
                  <p className="text-lg text-gray-600">{selectedInternship.company}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedInternship(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{selectedInternship.industry}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedInternship.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{selectedInternship.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{selectedInternship.isPaid ? `$${selectedInternship.salary}/hour` : 'Unpaid'}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedInternship.description}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInternship.requirements.map((req, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          index % 4 === 0 ? 'bg-blue-100 text-blue-800' :
                          index % 4 === 1 ? 'bg-green-100 text-green-800' :
                          index % 4 === 2 ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Start Date</h3>
                    <p className="text-gray-600">{new Date(selectedInternship.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">End Date</h3>
                    <p className="text-gray-600">{new Date(selectedInternship.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedInternship(null)}
                  >
                    Close
                  </Button>
                  <Button 
                    className="bg-scad-red hover:bg-scad-red/90 text-white"
                    onClick={() => handleApply(selectedInternship.id)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableInternships; 