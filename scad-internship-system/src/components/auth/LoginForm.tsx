
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate login API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials for different user types
      if ( email === 'student@example.com' && password === 'password') {
        navigate('/dashboard/1');
      } else if ( email === 'company@example.com' && password === 'password') {
        navigate('/dashboard/2');
      } else if ( email === 'scad@example.com' && password === 'password') {
        navigate('/dashboard/3');
      } else if (email === 'faculty@example.com' && password === 'password') {
        navigate('/dashboard/4');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-scad-dark mb-6">Login to SCAD Intern Compass</h2>
      
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
    className="input-field w-full"
    placeholder="your@email.com"
    required
  />
</div>

<div>
  <label htmlFor="password" className="text-black block mb-1 font-medium">Password</label>
  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="input-field w-full"
    placeholder="••••••••"
    required
  />
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

      <div className="mt-8 border-t pt-6">
        <p className="text-sm text-gray-500 text-center mb-4">Demo Accounts:</p>
        <div className="grid grid-cols-1 gap-3 text-xs text-gray-600">
          <div className="p-2 bg-gray-50 rounded">
            <p><strong>Student:</strong> student@example.com / password</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p><strong>Company:</strong> company@example.com / password</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p><strong>SCAD Office:</strong> scad@example.com / password</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p><strong>Faculty:</strong> faculty@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
//xxxx
