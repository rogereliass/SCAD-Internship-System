import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import eye icons

interface LoginFormProps {
  redirected?: string | null;
}

const LoginForm = ({ redirected }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate login API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials for different user types
      if (email === 'student@example.com' && password === 'password') {
        navigate('/dashboard/1');
      } else if (email === 'company@example.com' && password === 'password') {
        navigate('/dashboard/2');
      } else if (email === 'scad@example.com' && password === 'password') {
        navigate('/dashboard/3');
      } else if (email === 'faculty@example.com' && password === 'password') {
        navigate('/dashboard/4');
      } else if (email === 'companypending@example.com' && password === 'password') {
        navigate('/company-pending');
      } else if (email === 'prostudent@example.com' && password === 'password') {
        navigate('/dashboard/5');
      } 
      else {
        setError('Invalid credentials. Please try again.');
      }
    }, 1000);
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-scad-dark mb-6">Login to SCAD Intern Compass</h2>
      
      {/* Show redirect message */}
      {redirected && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          <strong>Authentication required:</strong> You must log in before performing this action.
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="text-black block mb-1 font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field w-full bg-gray-50 text-black"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="text-black block mb-1 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full bg-gray-50 text-black pr-10"
              placeholder="••••••••"
              required
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-scad-red focus:ring-scad-red border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="text-scad-red hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className={`w-full btn ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-scad-red hover:underline">
            Register
          </a>
        </p>
      </div>

      {/* Demo accounts section (commented out) */}
    </div>
  );
};

export default LoginForm;
//xxxx
