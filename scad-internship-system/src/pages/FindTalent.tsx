import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Search, Filter, GraduationCap, MapPin, Briefcase, Star } from 'lucide-react';

const FindTalent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Dummy data for demonstration
  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      major: 'Computer Science',
      year: 'Junior',
      gpa: '3.8',
      skills: ['React', 'Node.js', 'Python', 'UI/UX Design'],
      location: 'New Cairo',
      interests: ['Web Development', 'AI/ML', 'Data Science'],
      availability: 'Summer 2024'
    },
    {
      id: 2,
      name: 'Mohammed Ahmed',
      major: 'Business Administration',
      year: 'Senior',
      gpa: '3.9',
      skills: ['Marketing', 'Project Management', 'Data Analysis', 'Leadership'],
      location: 'Cairo',
      interests: ['Digital Marketing', 'Business Strategy', 'Entrepreneurship'],
      availability: 'Immediate'
    },
    {
      id: 3,
      name: 'Layla Hassan',
      major: 'Graphic Design',
      year: 'Sophomore',
      gpa: '3.7',
      skills: ['Adobe Creative Suite', 'UI Design', 'Branding', 'Typography'],
      location: 'Giza',
      interests: ['Brand Design', 'Digital Art', 'User Experience'],
      availability: 'Fall 2024'
    }
  ];

  const majors = [
    'Computer Science',
    'Business Administration',
    'Graphic Design',
    'Engineering',
    'Marketing',
    'Finance',
    'Architecture',
    'Interior Design'
  ];

  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-scad-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Find Talent</h1>
            <p className="text-xl text-gray-200">
              Discover talented SCAD students ready to contribute to your organization
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, skills, or interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-scad-red focus:border-scad-red"
                />
              </div>
            </div>
            <div>
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-scad-red focus:border-scad-red"
              >
                <option value="">All Majors</option>
                {majors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-scad-red focus:border-scad-red"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <div key={student.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    <span>{student.major}</span>
                    <span className="mx-2">•</span>
                    <span>{student.year}</span>
                  </div>
                </div>
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{student.gpa} GPA</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map(skill => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.interests.map(interest => (
                      <span
                        key={interest}
                        className="bg-scad-red/10 text-scad-red px-2 py-1 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{student.location}</span>
                  <span className="mx-2">•</span>
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span>Available: {student.availability}</span>
                </div>

                <div className="pt-4 border-t">
                  <Link
                    to="/login"
                    className="block w-full text-center bg-scad-red text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Partner with SCAD</h2>
          <p className="text-gray-600 mb-6">
            Get access to our full talent pool and start building your future team.
          </p>
          <Link
            to="/register"
            className="inline-block bg-scad-red text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
          >
            Become a Partner
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindTalent; 