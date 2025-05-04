import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import CompanyDashboard from '../components/dashboard/CompanyDashboard';
import ScadOfficeDashboard from '../components/dashboard/ScadOfficeDashboard';
import Navbar from '../components/layout/Navbar';

const Dashboard = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();  // gets "1", "2", etc.

  useEffect(() => {
    const mappedType = idToUserType(id);
    setUserType(mappedType);
  }, [id]);

    
  const idToUserType = (id: string | undefined): string | null => {
    switch (id) {
      case '1': return 'student';
      case '2': return 'company';
      case '3': return 'scadOffice';
      case '4': return 'faculty';
      default: return null;
    }
  };


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

  const switchUserById = (id: string) => {
    useParams();
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
        onClick={() => navigate('/dashboard/1')}
        className={`px-4 py-2 text-sm rounded ${id === '1' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        Student
      </button>
      <button 
        onClick={() => navigate('/dashboard/2')}
        className={`px-4 py-2 text-sm rounded ${id === '2' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        Company
      </button>
      <button 
        onClick={() => navigate('/dashboard/3')}
        className={`px-4 py-2 text-sm rounded ${id === '3' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        SCAD Office
      </button>
      <button 
        onClick={() => navigate('/dashboard/4')}
        className={`px-4 py-2 text-sm rounded ${id === '4' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        Faculty
      </button>
    </div>
  </div>
</div>
      </div>
     

    </div>
  );
};

export default Dashboard;
