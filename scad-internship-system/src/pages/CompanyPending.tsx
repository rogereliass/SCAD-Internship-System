import Navbar from '../components/layout/Navbar';
import { Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CompanyPending = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="company" />
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-scad-yellow bg-opacity-20 flex items-center justify-center">
              <Clock className="h-10 w-10 text-scad-yellow" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-scad-dark mb-4">Application Under Review</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your company application is currently being reviewed by the SCAD Office. 
            This process typically takes 2-3 business days.
          </p>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-scad-dark">Application Status</h2>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center text-scad-green">
                <CheckCircle className="h-6 w-6 mr-3" />
                <span>Application submitted</span>
              </div>
              
              <div className="flex items-center text-scad-yellow">
                <Clock className="h-6 w-6 mr-3" />
                <span className="font-medium">Under review by SCAD Office</span>
              </div>
              
              <div className="flex items-center text-gray-400">
                <HelpCircle className="h-6 w-6 mr-3" />
                <span>Decision (Pending)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex">
              <AlertCircle className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-medium text-blue-800 mb-2">While you're waiting</h3>
                <p className="text-blue-700">
                  You can prepare your company profile details and internship postings. 
                  Once approved, you'll be able to immediately publish them on our platform.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <Link to="/contact">
                Contact Support
              </Link>
            </Button>
            
            <Button
              variant="default"
              className="w-full sm:w-auto bg-scad-red hover:bg-scad-red/90"
              asChild
            >
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPending;