import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (

<footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SCAD Intern Compass</h3>
              <p className="text-gray-400">
                Connecting students with meaningful internship opportunities.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-bold mb-4">For Students</h4>
              <ul className="space-y-2">
                <li><Link to="/internships" className="text-gray-400 hover:text-white">Find Internships</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Create Account</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
                <li><Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-bold mb-4">For Companies</h4>
              <ul className="space-y-2">
                <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
                <li><Link to="/post-internship" className="text-gray-400 hover:text-white">Post Internship</Link></li>
                <li><Link to="/find-talent" className="text-gray-400 hover:text-white">Find Talent</Link></li>
                <li><Link to="/partnerships" className="text-gray-400 hover:text-white">Partnerships</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: info@scadcompass.edu</li>
                <li className="text-gray-400">Phone: +20 110 099 6345</li>
                <li className="text-gray-400">Address: New Cairo City . Main Entrance El-Tagamoa El-Khames</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SCAD Intern Compass. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-white text-sm">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    );
};
export default Footer;