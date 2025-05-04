import InternshipApplicantCard from '@/components/internships/InternshipApplicantCard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Sample applicant data
const featuredApplicants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      semester: '6th Semester',
      faculty: 'Computer Science',
      appliedAt: '2023-11-10',
      gpa: 3.8,
      profilePhoto: '/images/applicants/sarah.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      semester: '7th Semester',
      faculty: 'Graphic Design',
      appliedAt: '2023-11-15',
      gpa: 3.5
    },
    {
      id: 3,
      name: 'Jessica Rivera',
      semester: '5th Semester',
      faculty: 'Marketing',
      appliedAt: '2023-11-12',
      gpa: 3.9,
      profilePhoto: '/images/applicants/jessica.jpg'
    },
    {
      id: 4,
      name: 'David Park',
      semester: '8th Semester',
      faculty: 'Computer Engineering',
      appliedAt: '2023-11-16',
      gpa: 4.0
    },
    {
      id: 5,
      name: 'Emma Wilson',
      semester: '6th Semester',
      faculty: 'Information Systems',
      appliedAt: '2023-11-14',
      gpa: 3.7,
      profilePhoto: '/images/applicants/emma.jpg'
    },
    {
      id: 6,
      name: 'James Thompson',
      semester: '7th Semester',
      faculty: 'Communications',
      appliedAt: '2023-11-09',
      gpa: 3.6
    }
];

const ViewInternshipApplicants = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Internship Applicants</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredApplicants.map(applicant => (
            <InternshipApplicantCard key={applicant.id} {...applicant} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewInternshipApplicants;