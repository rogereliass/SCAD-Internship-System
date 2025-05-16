import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import InternshipCard from '../components/internships/InternshipCard';
import CompanyCard from '../components/companies/CompanyCard';
import Footer from '../components/layout/Footer';
import logo from '@/components/assets/Internship.jpg';

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

// Replace with the recommended companies
const featuredCompanies = [
  { 
    id: 1,
    name: 'TechCorp', 
    industry: 'Information Technology', 
    email: 'careers@techcorp.com',
    contactPerson: 'John Smith',
    phone: '+1 (555) 123-4567',
    website: 'https://techcorp.com',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15',
    about: 'TechCorp is a leading technology company specializing in innovative software solutions. We focus on creating cutting-edge products that help businesses transform their digital presence.',
    size: 'large' as const
  },
  { 
    id: 2,
    name: 'DesignHub', 
    industry: 'Design', 
    email: 'jobs@designhub.com',
    contactPerson: 'Sarah Johnson',
    phone: '+1 (555) 234-5678',
    website: 'https://designhub.com',
    location: 'New York, NY',
    joinDate: '2023-03-20',
    about: 'DesignHub is a creative design agency that helps brands establish their visual identity. Our team of expert designers creates stunning, user-centered designs that make an impact.',
    size: 'medium' as const
  },
  { 
    id: 3,
    name: 'DataSystems', 
    industry: 'Data Analytics', 
    email: 'recruiting@datasystems.com',
    contactPerson: 'Michael Chen',
    phone: '+1 (555) 345-6789',
    website: 'https://datasystems.com',
    location: 'Boston, MA',
    joinDate: '2023-06-10',
    about: 'DataSystems is a data analytics company that helps organizations make data-driven decisions. We provide advanced analytics solutions and consulting services to businesses of all sizes.',
    size: 'corporate' as const
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-scad-dark to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Internship Match</h1>
              <p className="text-xl mb-8 opacity-90">
                SCAD Intern Compass connects students with opportunities that launch careers. Get matched with companies that fit your skills and interests.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn bg-scad-red hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium">
                  Get Started
                </Link>
                <Link to={"/login?redirected=true"} className="btn bg-scad-yellow hover:bg-opacity-90 text-scad-dark px-6 py-3 rounded-md font-medium">
                  Browse Internships
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              
              <img 
                src={logo} 
                alt="Internship" 
                className=" rounded-md object-cover"
              />

              <span className="text-scad-dark font-bold text-xl hidden md:block"> </span>
            
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-scad-dark">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-scad-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-scad-dark">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build your profile with your skills, interests, and academic information.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-scad-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-scad-dark">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-scad-dark">Discover Opportunities</h3>
              <p className="text-gray-600">
                Browse internships that match your interests and qualifications.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-scad-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-scad-dark">Apply & Get Hired</h3>
              <p className="text-gray-600">
                Submit applications, track your progress, and launch your career with an internship.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Internships */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-scad-dark">Featured Internships</h2>
            <Link to= {"/login?redirected=true"} className="text-scad-red hover:underline font-medium">
              View All Internships
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInternships.map(internship => (
              <InternshipCard key={internship.id} {...internship} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Companies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-scad-dark">Featured Companies</h2>
            <Link to="/login?redirected=true" className="text-scad-red hover:underline font-medium">
              View All Companies
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCompanies.map(company => (
              <CompanyCard 
                key={company.id}
                name={company.name}
                industry={company.industry}
                size={company.size as 'small' | 'medium' | 'large' | 'corporate'}
                location={company.location}
                email={company.email}
                contactPerson={company.contactPerson}
                phone={company.phone}
                website={company.website}
                joinDate={company.joinDate}
                about={company.about}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-scad-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4">
                "SCAD Intern Compass helped me land my dream internship at a tech company. The platform was so easy to use and I received helpful feedback from the SCAD Office."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-scad-red rounded-full flex items-center justify-center mr-3">
                  <span>SJ</span>
                </div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm opacity-75">Computer Science Major</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4">
                "As a company, we've found amazing talent through the SCAD Intern Compass platform. The students are well-prepared and bring fresh ideas to our projects."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-scad-yellow rounded-full flex items-center justify-center mr-3">
                  <span className="text-scad-dark">RB</span>
                </div>
                <div>
                  <h4 className="font-medium">Robert Blake</h4>
                  <p className="text-sm opacity-75">Hiring Manager, DataSystems</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4">
                "The SCAD Intern Compass made tracking my internship progress so simple. I could easily submit my reports and get feedback from faculty."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-scad-red rounded-full flex items-center justify-center mr-3">
                  <span>DM</span>
                </div>
                <div>
                  <h4 className="font-medium">David Martinez</h4>
                  <p className="text-sm opacity-75">Marketing Major</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-scad-yellow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-scad-dark">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-scad-dark max-w-3xl mx-auto">
            Join the SCAD Intern Compass today and take the first step toward your professional future.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn bg-scad-red hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium">
              Sign Up Now
            </Link>
            <Link to="/about" className="btn bg-white hover:bg-opacity-90 text-scad-dark px-8 py-3 rounded-md font-medium">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SCAD Intern Compass</h3>
              <p className="text-gray-400">
                Connecting students with meaningful internship opportunities.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-bold mb-4">For Students</h4>
              <ul className="space-y-2">
                <li><Link to="/internships" className="text-gray-400 hover:text-white">Find Internships</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Create Account</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
                <li><Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-bold mb-4">For Companies</h4>
              <ul className="space-y-2">
                <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
                <li><Link to="/post-internship" className="text-gray-400 hover:text-white">Post Internship</Link></li>
                <li><Link to="/find-talent" className="text-gray-400 hover:text-white">Find Talent</Link></li>
                <li><Link to="/partnerships" className="text-gray-400 hover:text-white">Partnerships</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: info@scadcompass.edu</li>
                <li className="text-gray-400">Phone: (555) 123-4567</li>
                <li className="text-gray-400">Address: 123 University Ave, City, State 12345</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SCAD Intern Compass. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-white text-sm">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
};

export default Index;
