import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import CompanyDashboard from '../components/dashboard/CompanyDashboard';
import ScadOfficeDashboard from '../components/dashboard/ScadDashboard';
import FacultyDashboard from '../components/dashboard/FacultyDashboard';
import Navbar from '../components/layout/Navbar';
import DemoControls from '@/components/Developing Controls/DemoControls';
import Footer from '@/components/layout/Footer';

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
        return <ScadOfficeDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
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
         <DemoControls currentId={id} />
      </div>
      < Footer />
    </div>
  );
};

export default Dashboard;
