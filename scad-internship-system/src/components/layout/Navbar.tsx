
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = ({ userType = null }: { userType?: string | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-scad-red rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">SC</span>
              </div>
              <span className="text-scad-dark font-bold text-xl hidden md:block">SCAD Intern Compass</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!userType ? (
              <>
                <Link to="/about" className="text-scad-dark hover:text-scad-red transition-colors">About</Link>
                <Link to="/companies" className="text-scad-dark hover:text-scad-red transition-colors">Companies</Link>
                <Link to="/internships" className="text-scad-dark hover:text-scad-red transition-colors">Internships</Link>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-scad-dark hover:text-scad-red transition-colors">Dashboard</Link>
                {userType === 'student' && (
                  <>
                    <Link to="/internships" className="text-scad-dark hover:text-scad-red transition-colors">Find Internships</Link>
                    <Link to="/applications" className="text-scad-dark hover:text-scad-red transition-colors">My Applications</Link>
                  </>
                )}
                {userType === 'company' && (
                  <>
                    <Link to="/job-posts" className="text-scad-dark hover:text-scad-red transition-colors">Job Posts</Link>
                    <Link to="/applicants" className="text-scad-dark hover:text-scad-red transition-colors">Applicants</Link>
                    <Link to="/interns" className="text-scad-dark hover:text-scad-red transition-colors">Interns</Link>
                  </>
                )}
                {userType === 'scadOffice' && (
                  <>
                    <Link to="/applications" className="text-scad-dark hover:text-scad-red transition-colors">Company Applications</Link>
                    <Link to="/students" className="text-scad-dark hover:text-scad-red transition-colors">Students</Link>
                    <Link to="/reports" className="text-scad-dark hover:text-scad-red transition-colors">Reports</Link>
                  </>
                )}
                <Link to="/" className="text-scad-red hover:text-opacity-80 transition-colors">Logout</Link>
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
