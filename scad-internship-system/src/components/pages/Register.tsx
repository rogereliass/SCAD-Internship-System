import React from 'react';
import RegisterForm from '../auth/RegisterForm';
import Navbar from '../layout/Navbar';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center">
          <div className="max-w-2xl w-full">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;