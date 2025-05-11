
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import logo from '@/components/assets/logo.jpeg';


const Navbar = ({ userType = null }: { userType?: string | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <button 
              onClick={handleBack} 
              className="text-scad-dark hover:text-scad-red transition-colors focus:outline-none"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="SCAD Logo" 
                className="h-10 w-25 rounded-md object-cover"
              />

              <span className="text-scad-dark font-bold text-xl hidden md:block"> </span>
            </Link>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!userType ? (
              <>
                <Link to="/about" className="text-scad-dark hover:text-scad-red transition-colors font-bold">About</Link>
                <Link to="/companies" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Companies</Link>
                <Link to="/internships" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Internships</Link>
                <Link to="/login" className="bg-black text-white hover:bg-gray-800 py-2 px-4 rounded font-bold">Login</Link>
                <Link to="/register" className="btn btn-primary font-bold">Register</Link>
              </>
            ) : (
              <>
                
                {userType === 'student' && (
                  <>
                    <Link to="/dashboard/1" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Dashboard</Link>
                    <Link to="/internships" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Find Internships</Link>
                    <Link to="/applications" className="text-scad-dark hover:text-scad-red transition-colors font-bold">My Applications</Link>
                  </>
                )}
                {userType === 'company' && (
                  <>
                    <Link to="/dashboard/2" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Dashboard</Link>
                    {/* <Link to="/job-posts" className="text-scad-dark hover:text-scad-red transition-colors">Job Posts</Link>
                    <Link to="/applicants" className="text-scad-dark hover:text-scad-red transition-colors">Applicants</Link>
                    <Link to="/interns" className="text-scad-dark hover:text-scad-red transition-colors">Interns</Link> */}
                    
                  </>
                )}
                {userType === 'scadOffice' && (
                  <>
                    <Link to="/dashboard/3" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Dashboard</Link>
                    <Link to="/company-applications" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Company Applications</Link>
                    <Link to="/students" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Students</Link>
                    <Link to="/internship-reports" className="text-scad-dark hover:text-scad-red transition-colors font-bold">Reports</Link>
                  </>
                )}
                <Link to="/" className="btn btn-primary font-bold">Logout</Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-scad-dark focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 animate-fade-in">
            {!userType ? (
              <div className="flex flex-col space-y-3">
                <Link to="/about" className="text-scad-dark hover:text-scad-red transition-colors py-2">About</Link>
                <Link to="/companies" className="text-scad-dark hover:text-scad-red transition-colors py-2">Companies</Link>
                <Link to="/internships" className="text-scad-dark hover:text-scad-red transition-colors py-2">Internships</Link>
                <div className="flex space-x-4 pt-2">
                  <Link to="/login" className="btn btn-outline flex-1 text-center">Login</Link>
                  <Link to="/register" className="btn btn-primary flex-1 text-center">Register</Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/dashboard" className="text-scad-dark hover:text-scad-red transition-colors py-2">Dashboard</Link>
                {userType === 'student' && (
                  <>
                    <Link to="/internships" className="text-scad-dark hover:text-scad-red transition-colors py-2">Find Internships</Link>
                    <Link to="/applications" className="text-scad-dark hover:text-scad-red transition-colors py-2">My Applications</Link>
                  </>
                )}
                {userType === 'company' && (
                  <>
                    <Link to="/job-posts" className="text-scad-dark hover:text-scad-red transition-colors py-2">Job Posts</Link>
                    <Link to="/applicants" className="text-scad-dark hover:text-scad-red transition-colors py-2">Applicants</Link>
                    <Link to="/interns" className="text-scad-dark hover:text-scad-red transition-colors py-2">Interns</Link>
                  </>
                )}
                {userType === 'scadOffice' && (
                  <>
                    <Link to="/applications" className="text-scad-dark hover:text-scad-red transition-colors py-2">Company Applications</Link>
                    <Link to="/students" className="text-scad-dark hover:text-scad-red transition-colors py-2">Students</Link>
                    <Link to="/reports" className="text-scad-dark hover:text-scad-red transition-colors py-2">Reports</Link>
                  </>
                )}
                <Link to="/" className="text-scad-red hover:text-opacity-80 transition-colors py-2">Logout</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
