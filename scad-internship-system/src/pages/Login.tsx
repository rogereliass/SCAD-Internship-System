import { useSearchParams } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Navbar from '../components/layout/Navbar';

const Login = () => {
  const [searchParams] = useSearchParams();
  const redirected = searchParams.get('redirected');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md px-4 py-8">
          <LoginForm redirected={redirected}/>
        </div>
      </div>
    </div>
  );
};

export default Login;