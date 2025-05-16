import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Book, FileText, Video, Users, Briefcase, Award } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      icon: <Book className="w-8 h-8 text-scad-red" />,
      title: "Internship Guide",
      description: "Comprehensive guide to finding and securing the perfect internship opportunity.",
      link: "#"
    },
    {
      icon: <FileText className="w-8 h-8 text-scad-red" />,
      title: "Resume Templates",
      description: "Professional templates and tips for creating an outstanding resume.",
      link: "#"
    },
    {
      icon: <Video className="w-8 h-8 text-scad-red" />,
      title: "Interview Preparation",
      description: "Video tutorials and resources to help you ace your internship interviews.",
      link: "#"
    },
    {
      icon: <Users className="w-8 h-8 text-scad-red" />,
      title: "Networking Guide",
      description: "Learn how to build and maintain professional relationships.",
      link: "#"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-scad-red" />,
      title: "Career Development",
      description: "Resources to help you plan and develop your career path.",
      link: "#"
    },
    {
      icon: <Award className="w-8 h-8 text-scad-red" />,
      title: "Success Stories",
      description: "Read about successful internship experiences from SCAD students.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-scad-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Resources</h1>
            <p className="text-xl text-gray-200">
              Everything you need to succeed in your internship journey
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="mb-4">
                {resource.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {resource.description}
              </p>
              <Link 
                to={resource.link}
                className="text-scad-red hover:text-red-700 font-medium inline-flex items-center"
              >
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Students</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Schedule a career counseling session</li>
                <li>• Attend our weekly workshops</li>
                <li>• Join our mentorship program</li>
                <li>• Access our online learning platform</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Companies</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Download our company guide</li>
                <li>• Access our best practices toolkit</li>
                <li>• Schedule a consultation</li>
                <li>• Join our employer network</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Resources; 