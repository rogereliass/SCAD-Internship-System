import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Briefcase, Building, Users, Calendar, DollarSign, MapPin } from 'lucide-react';

const PostInternship = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    duration: '',
    startDate: '',
    isPaid: true,
    salary: '',
    description: '',
    requirements: '',
    benefits: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data to the backend
    alert('This is a demo page. In a real application, this would submit the internship posting.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-scad-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Post an Internship</h1>
            <p className="text-xl text-gray-200">
              Share your opportunity with talented SCAD students
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Briefcase className="w-8 h-8 text-scad-red mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Quality Talent</h3>
              <p className="text-gray-600 text-sm">Access to SCAD's talented and creative student body</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Building className="w-8 h-8 text-scad-red mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-gray-600 text-sm">Simple posting and management of internship opportunities</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Users className="w-8 h-8 text-scad-red mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Full Support</h3>
              <p className="text-gray-600 text-sm">Guidance and assistance throughout the process</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Internship Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location and Type */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location and Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Internship Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Duration and Start Date */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration and Start Date</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 3 months"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Compensation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compensation</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPaid"
                      name="isPaid"
                      checked={formData.isPaid}
                      onChange={handleChange}
                      className="h-4 w-4 text-scad-red focus:ring-scad-red border-gray-300 rounded"
                    />
                    <label htmlFor="isPaid" className="ml-2 block text-sm text-gray-700">
                      This is a paid internship
                    </label>
                  </div>
                  {formData.isPaid && (
                    <div>
                      <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                        Salary/Stipend
                      </label>
                      <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="e.g., $20/hour or $3,000/month"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                        required={formData.isPaid}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                      Benefits
                    </label>
                    <textarea
                      id="benefits"
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-scad-red focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-scad-red text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
                >
                  Post Internship
                </button>
              </div>
            </div>
          </form>

          {/* Additional Information */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our team is here to assist you with posting your internship opportunity.
            </p>
            <div className="space-y-2 text-gray-600">
              <p>Email: info@scadcompass.edu</p>
              <p>Phone: +20 110 099 6345</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostInternship; 