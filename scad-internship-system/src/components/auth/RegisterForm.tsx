
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    industry: '',
    companySize: 'small',
    major: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-scad-dark mb-6">
        Register for SCAD Intern Compass
      </h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              userType === 'student'
                ? 'border-b-2 border-scad-red text-scad-dark'
                : 'text-gray-500 hover:text-scad-dark'
            }`}
            onClick={() => setUserType('student')}
          >
            Student Registration
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              userType === 'company'
                ? 'border-b-2 border-scad-red text-scad-dark'
                : 'text-gray-500 hover:text-scad-dark'
            }`}
            onClick={() => setUserType('company')}
          >
            Company Registration
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {userType === 'student' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-black block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-black block mb-1 font-medium">Email</label>
                 <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="text-black block mb-1 font-medium">Confirm Password</label>
                 <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="major" className="text-black block mb-1 font-medium">Major</label>
                 <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="Computer Science"
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="text-black block mb-1 font-medium">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="Acme Inc."
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-black block mb-1 font-medium">Official Company Email</label>
                 <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="contact@company.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="text-black block mb-1 font-medium">Industry</label>
                 <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="Technology"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="companySize" className="text-black block mb-1 font-medium">Company Size</label>
                 <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="input-field w-full" // Explicitly add bg-white
                  required
                >
                  <option value="small">Small (50 employees or less)</option>
                  <option value="medium">Medium (51-100 employees)</option>
                  <option value="large">Large (101-500 employees)</option>
                  <option value="corporate">Corporate (500+ employees)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="password" className="text-black block mb-1 font-medium">Password</label>
                 <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="text-black block mb-1 font-medium">Confirm Password</label>
                 <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="text-black block mb-1 font-medium">Company Logo</label>
                 <div className="border-2 border-dashed border-gray-300 rounded-md px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="mt-3 text-sm text-gray-500">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-scad-red hover:text-opacity-80"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  {fileUploaded && (
                    <div className="mt-4 text-center text-sm text-green-600">
                      File uploaded successfully!
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="text-black block mb-1 font-medium">Verification Documents</label>
                 <div className="border-2 border-dashed border-gray-300 rounded-md px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="mt-3 text-sm text-gray-500">
                      <label
                        htmlFor="doc-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-scad-red hover:text-opacity-80"
                      >
                        <span>Upload documents</span>
                        <input
                          id="doc-upload"
                          name="doc-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF, DOC up to 10MB (Tax documents, business registration, etc.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="mt-6">
          <button
            type="submit"
            className={`w-full btn ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-scad-red hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
