import CompanyCard from '@/components/companies/CompanyCard';
import Navbar from '../components/layout/Navbar';

// Sample company data
const featuredCompanies = [
  {
    id: 1,
    name: 'TechCorp',
    industry: 'Technology',
    size: 'large',
    location: 'San Francisco',
    logo: '/images/companies/techcorp.png',
    openPositions: 5,
    rating: 4.5
  },
  {
    id: 2,
    name: 'DesignHub',
    industry: 'Design',
    size: 'medium',
    location: 'Remote',
    openPositions: 3,
    rating: 4.2
  },
  {
    id: 3,
    name: 'BrandWorks',
    industry: 'Marketing',
    size: 'small',
    location: 'Chicago',
    logo: '/images/companies/brandworks.png',
    openPositions: 2,
    rating: 3.8
  },
  {
    id: 4,
    name: 'FinTech Solutions',
    industry: 'Finance',
    size: 'corporate',
    location: 'New York',
    logo: '/images/companies/fintech.png',
    openPositions: 7,
    rating: 4.0
  },
  {
    id: 5,
    name: 'Green Energy Co',
    industry: 'Renewable Energy',
    size: 'medium',
    location: 'Austin',
    openPositions: 0,
    rating: 3.9
  },
  {
    id: 6,
    name: 'Global Media',
    industry: 'Media & Entertainment',
    size: 'large',
    location: 'Los Angeles',
    logo: '/images/companies/globalmedia.png',
    openPositions: 4,
    rating: 4.3
  }
];

const ViewAllCompanies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <h2 className="text-2xl font-bold text-gray-800 pt-6 px-6 mb-4">
        Partner Companies
      </h2>
      <div className="p-6 grid grid-cols-2 gap-6">
          {featuredCompanies.map(company => (
            <CompanyCard key={company.id} {...company} />
          ))}
        </div>
      </div>
  );
};

export default ViewAllCompanies;