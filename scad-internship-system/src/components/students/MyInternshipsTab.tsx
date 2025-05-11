import React from 'react';
import { Calendar, MapPin, Clock, Building2, DollarSign } from 'lucide-react';

interface MyInternshipsTabProps {
  onInternshipClick: (id: string) => void;
  searchTerm: string;
  dateFilter: string;
}

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  status: 'current' | 'completed';
  startDate: string;
  endDate: string;
  isPaid: boolean;
  salary?: string;
}

const dummyInternships: Internship[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp',
    location: 'Remote',
    duration: '3 months',
    status: 'current',
    startDate: '2024-01-01',
    endDate: '2024-04-01',
    isPaid: true,
    salary: '$20/hour'
  },
  {
    id: '2',
    title: 'UX Design Intern',
    company: 'DesignHub',
    location: 'New York',
    duration: '6 months',
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-12-01',
    isPaid: true,
    salary: '$22/hour'
  },
  {
    id: '3',
    title: 'Data Analyst Intern',
    company: 'DataSystems',
    location: 'San Francisco',
    duration: '3 months',
    status: 'completed',
    startDate: '2023-09-01',
    endDate: '2023-12-01',
    isPaid: false
  }
];

const MyInternshipsTab: React.FC<MyInternshipsTabProps> = ({
  onInternshipClick,
  searchTerm,
  dateFilter
}) => {
  const filteredInternships = dummyInternships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = 
      dateFilter === 'all' || 
      (dateFilter === 'current' && internship.status === 'current') ||
      (dateFilter === 'completed' && internship.status === 'completed');

    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-4">
      {filteredInternships.map((internship) => (
        <div 
          key={internship.id}
          className="border rounded-lg p-4 hover:border-scad-red transition-colors cursor-pointer bg-white"
          onClick={() => onInternshipClick(internship.id)}
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
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                internship.status === 'current' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {internship.status}
              </span>
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
                <span>{new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{internship.isPaid ? internship.salary : 'Unpaid'}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {filteredInternships.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No internships found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default MyInternshipsTab;
