import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Building2, DollarSign, Briefcase, X } from 'lucide-react';
import { Button } from '../ui/button';

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
  title: string;
  company: string;
  industry: string;
  location: string;
  duration: string;
  description: string;
  requirements: string[];
  postedDate: string;
  isPaid: boolean;
  salary?: string;
  startDate: string;
  endDate: string;
}

const internships: Internship[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp',
    industry: 'Information Technology',
    location: 'Remote',
    duration: '3 months',
    description: 'Join our team to work on cutting-edge web applications using React and TypeScript.',
    requirements: ['React', 'TypeScript', 'CSS'],
    postedDate: '2024-02-15',
    isPaid: true,
    salary: '$20/hour',
    startDate: '2024-06-01',
    endDate: '2024-09-01'
  },
  {
    id: '2',
    title: 'UX Design Intern',
    company: 'DesignHub',
    industry: 'Design',
    location: 'New York',
    duration: '6 months',
    description: 'Work on user interface design and user experience for our mobile applications.',
    requirements: ['Figma', 'UI/UX Design', 'Prototyping'],
    postedDate: '2024-02-14',
    isPaid: true,
    salary: '$22/hour',
    startDate: '2024-06-15',
    endDate: '2024-12-15'
  },
  {
    id: '3',
    title: 'Data Analyst Intern',
    company: 'DataSystems',
    industry: 'Data Analytics',
    location: 'San Francisco',
    duration: '3 months',
    description: 'Analyze large datasets and create meaningful insights for business decisions.',
    requirements: ['Python', 'SQL', 'Data Visualization'],
    postedDate: '2024-02-13',
    isPaid: false,
    startDate: '2024-07-01',
    endDate: '2024-10-01'
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

  return (
    <div className="space-y-4">
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
                <span>Posted {new Date(internship.postedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{internship.isPaid ? internship.salary : 'Unpaid'}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm">{internship.description}</p>

            <div className="flex flex-wrap gap-2">
              {internship.requirements.map((req, index) => (
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
        </div>
      ))}

      {filteredInternships.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No internships found matching your criteria.
        </div>
      )}

      {/* Detailed View Modal */}
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

              <div className="space-y-4">
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
                    <span>{selectedInternship.isPaid ? selectedInternship.salary : 'Unpaid'}</span>
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

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedInternship(null)}
                  >
                    Close
                  </Button>
                  <Button className="bg-scad-red hover:bg-scad-red/90 text-white">
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