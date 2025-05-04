
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import CompanyDashboard from '../components/dashboard/CompanyDashboard';
import ScadOfficeDashboard from '../components/dashboard/ScadOfficeDashboard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Dashboard = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking user type from session
    // In a real app, this would come from authentication state or API
    const checkUserType = () => {
      // Check if we have user data in session storage
      const storedUserType = sessionStorage.getItem('userType');
      
      if (storedUserType) {
        setUserType(storedUserType);
      } else {
        // For demo purposes, set a default user type
        // In real app, redirect to login if no user found
        const urlParams = new URLSearchParams(window.location.search);
        const typeFromUrl = urlParams.get('type');
        
        if (typeFromUrl && ['student', 'company', 'scadOffice', 'faculty'].includes(typeFromUrl)) {
          setUserType(typeFromUrl);
          sessionStorage.setItem('userType', typeFromUrl);
        } else {
          // Default to student for demo
          setUserType('student');
          sessionStorage.setItem('userType', 'student');
        }
      }
    };

    checkUserType();
  }, []);

  // Function to render dashboard based on user type
  const renderDashboard = () => {
    switch (userType) {
      case 'student':
        return <StudentDashboard />;
      case 'company':
        return <CompanyDashboard />;
      case 'scadOffice':
      case 'faculty':
        return <ScadOfficeDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

  // Debug controls for demo purposes
  const switchUserType = (newType: string) => {
    setUserType(newType);
    sessionStorage.setItem('userType', newType);
    // Update URL without page reload
    navigate(`/dashboard?type=${newType}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType={userType} />
      
      <div className="container mx-auto py-6">
        {renderDashboard()}
        
        {/* Debug controls (for demo only) */}
        <div className="mt-10 border-t pt-6">
          <div className="max-w-md mx-auto">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Demo Controls - Switch Dashboard</h3>
            <div className="flex space-x-4">
              <button 
                onClick={() => switchUserType('student')} 
                className={`px-4 py-2 text-sm rounded ${userType === 'student' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Student
              </button>
              <button 
                onClick={() => switchUserType('company')} 
                className={`px-4 py-2 text-sm rounded ${userType === 'company' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Company
              </button>
              <button 
                onClick={() => switchUserType('scadOffice')} 
                className={`px-4 py-2 text-sm rounded ${userType === 'scadOffice' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                SCAD Office
              </button>
              <button 
                onClick={() => switchUserType('faculty')} 
                className={`px-4 py-2 text-sm rounded ${userType === 'faculty' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Faculty
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
