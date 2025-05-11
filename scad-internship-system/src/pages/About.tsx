import { Link } from 'react-router-dom';
import { Building, Users, GraduationCap, Briefcase, Award, Globe } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
  const features = [
    {
      icon: <Building className="w-12 h-12 text-scad-red" />,
      title: "Industry Connections",
      description: "Access to a vast network of leading companies and organizations across various industries."
    },
    {
      icon: <Users className="w-12 h-12 text-scad-red" />,
      title: "Professional Development",
      description: "Gain real-world experience and develop essential skills through structured internship programs."
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-scad-red" />,
      title: "Academic Integration",
      description: "Seamlessly integrate your internship experience with your academic curriculum."
    },
    {
      icon: <Briefcase className="w-12 h-12 text-scad-red" />,
      title: "Career Opportunities",
      description: "Open doors to potential full-time positions and build your professional network."
    },
    {
      icon: <Award className="w-12 h-12 text-scad-red" />,
      title: "Quality Assurance",
      description: "All internship opportunities are vetted and monitored to ensure high-quality learning experiences."
    },
    {
      icon: <Globe className="w-12 h-12 text-scad-red" />,
      title: "Global Reach",
      description: "Opportunities available both locally and internationally across various industries."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-scad-dark text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              SCAD Internship Program
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Empowering students with real-world experience through carefully curated internship opportunities
            </p>
            <Link 
              to="/register" 
              className="inline-block bg-scad-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About Our Internship Program
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The SCAD Internship Program connects talented students with industry-leading companies, 
            providing valuable hands-on experience and professional development opportunities. 
            Our program is designed to bridge the gap between academic learning and real-world application, 
            preparing students for successful careers in their chosen fields.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose SCAD Internships?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                For Students
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Gain practical experience in your field of study</li>
                <li>• Build your professional network</li>
                <li>• Develop industry-specific skills</li>
                <li>• Receive academic credit for your internship</li>
                <li>• Access to exclusive internship opportunities</li>
                <li>• Career guidance and support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                For Companies
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Access to talented and motivated students</li>
                <li>• Fresh perspectives and innovative ideas</li>
                <li>• Potential pipeline for future full-time hires</li>
                <li>• Structured program management</li>
                <li>• Quality assurance and support</li>
                <li>• Industry-academic collaboration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our internship program today and take the first step towards building your professional future.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-scad-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Register Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-white text-scad-red border border-scad-red px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About; 