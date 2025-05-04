
import InternshipCard from '@/components/internships/InternshipCard';
import Navbar from '../components/layout/Navbar';

// Sample data
const featuredInternships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'San Francisco',
      duration: '3 months',
      isPaid: true,
      salary: '$25/hr',
      postedDate: '2023-11-10',
      industry: 'Technology'
    },
    {
      id: 2,
      title: 'UX Design Intern',
      company: 'DesignHub',
      location: 'Remote',
      duration: '6 months',
      isPaid: true,
      salary: '$20/hr',
      postedDate: '2023-11-15',
      industry: 'Design'
    },
    {
      id: 3,
      title: 'Marketing Assistant Intern',
      company: 'BrandWorks',
      location: 'Chicago',
      duration: '4 months',
      isPaid: false,
      postedDate: '2023-11-12',
      industry: 'Marketing'
    }
  ];

const ViewAllInternships = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInternships.map(internship => (
              <InternshipCard key={internship.id} {...internship} />
            ))}
          </div>
    </div>
  );
};

export default ViewAllInternships;
