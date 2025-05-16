import { useSearchParams } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Navbar from '../components/layout/Navbar';

const Login = () => {
  const [searchParams] = useSearchParams();
  const redirected = searchParams.get('redirected');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center">
          <div className="max-w-md w-full">
            <LoginForm redirected={redirected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;