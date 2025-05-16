import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Building, Users, Award, Globe, Briefcase, Star } from 'lucide-react';

const Partnerships = () => {
  const benefits = [
    {
      icon: <Building className="w-8 h-8 text-scad-red" />,
      title: "Industry Integration",
      description: "Connect with SCAD's academic programs and integrate your industry expertise into our curriculum."
    },
    {
      icon: <Users className="w-8 h-8 text-scad-red" />,
      title: "Talent Pipeline",
      description: "Build a pipeline of talented students through internships, co-ops, and full-time opportunities."
    },
    {
      icon: <Award className="w-8 h-8 text-scad-red" />,
      title: "Brand Visibility",
      description: "Enhance your brand presence among students, faculty, and the broader SCAD community."
    },
    {
      icon: <Globe className="w-8 h-8 text-scad-red" />,
      title: "Global Network",
      description: "Access SCAD's global network of students, alumni, and industry partners."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-scad-red" />,
      title: "Research Collaboration",
      description: "Collaborate with faculty and students on research projects and innovative solutions."
    },
    {
      icon: <Star className="w-8 h-8 text-scad-red" />,
      title: "Professional Development",
      description: "Participate in workshops, seminars, and events to develop your team's skills."
    }
  ];

  const partnershipTypes = [
    {
      title: "Internship Partners",
      description: "Host SCAD students for internships and gain access to emerging talent.",
      features: [
        "Post internship opportunities",
        "Access student profiles",
        "Manage applications",
        "Track intern progress"
      ]
    },
    {
      title: "Research Partners",
      description: "Collaborate on research projects and innovative solutions.",
      features: [
        "Joint research initiatives",
        "Faculty collaboration",
        "Student research teams",
        "Industry insights"
      ]
    },
    {
      title: "Strategic Partners",
      description: "Long-term partnerships for comprehensive engagement.",
      features: [
        "Customized programs",
        "Priority access to talent",
        "Brand integration",
        "Executive networking"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-scad-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Partnerships</h1>
            <p className="text-xl text-gray-200">
              Join our network of industry partners and shape the future of talent
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Partnership Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Partnership Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {type.description}
                </p>
                <ul className="space-y-3">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-scad-red mt-1 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['TechCorp', 'DesignHub', 'MarketingPro', 'InnovateCo'].map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <span className="text-xl font-semibold text-gray-600">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Partner with SCAD?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of industry partners and start building meaningful connections with talented students.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-scad-red text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Become a Partner
            </Link>
            <Link
              to="/contact"
              className="bg-white text-scad-red border border-scad-red px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
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

export default Partnerships; 