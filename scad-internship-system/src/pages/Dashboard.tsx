import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import CompanyDashboard from '../components/dashboard/CompanyDashboard';
import ScadOfficeDashboard from '../components/dashboard/ScadDashboard';
import FacultyDashboard from '../components/dashboard/FacultyDashboard';
import Navbar from '../components/layout/Navbar';
import DemoControls from '@/components/Developing Controls/DemoControls';
import Footer from '@/components/layout/Footer';

const DASHBOARD_MAP = {
  '1': StudentDashboard,
  '2': CompanyDashboard,
  '3': ScadOfficeDashboard,
  '4': FacultyDashboard,
} as const;

const USER_TYPE_MAP = {
  '1': 'student',
  '2': 'company',
  '3': 'scadOffice',
  '4': 'faculty',
} as const;

const Dashboard = () => {
  const { id } = useParams();
  const userType = id ? USER_TYPE_MAP[id as keyof typeof USER_TYPE_MAP] : null;
  const DashboardComponent = id ? DASHBOARD_MAP[id as keyof typeof DASHBOARD_MAP] : null;

  const dashboardContent = useMemo(() => {
    if (!DashboardComponent) return <div>Loading...</div>;
    return <DashboardComponent />;
  }, [DashboardComponent]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType={userType} />
      <div className="container mx-auto py-6">
        {dashboardContent}
        <DemoControls currentId={id} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
