import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQs = () => {
  const [openCategory, setOpenCategory] = useState<string | null>('students');
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const faqs = {
    students: [
      {
        id: 'student-1',
        question: 'How do I apply for an internship?',
        answer: 'To apply for an internship, first create a student account on our platform. Then, browse available internships, select the ones that interest you, and click the "Apply Now" button. Make sure your profile and resume are up to date before applying.'
      },
      {
        id: 'student-2',
        question: 'What are the eligibility requirements for internships?',
        answer: 'Eligibility requirements vary by internship, but generally include being a current SCAD student in good academic standing, having completed at least one year of study, and meeting any specific requirements set by the company offering the internship.'
      },
      {
        id: 'student-3',
        question: 'Can I get academic credit for my internship?',
        answer: 'Yes, many internships can be taken for academic credit. You\'ll need to coordinate with your academic advisor and the SCAD Internship Office to ensure proper documentation and credit assignment.'
      },
      {
        id: 'student-4',
        question: 'How long do internships typically last?',
        answer: 'Internship durations vary, but most opportunities range from 8 to 12 weeks during summer breaks, or 10 to 15 hours per week during academic terms. The specific duration will be listed in each internship posting.'
      }
    ],
    companies: [
      {
        id: 'company-1',
        question: 'How can my company post an internship?',
        answer: 'To post an internship, first register your company on our platform. Once approved, you can create and post internship opportunities through your company dashboard. Make sure to provide detailed information about the role, requirements, and benefits.'
      },
      {
        id: 'company-2',
        question: 'What are the benefits of partnering with SCAD?',
        answer: 'Partnering with SCAD gives you access to talented, creative students, helps build your talent pipeline, provides fresh perspectives, and strengthens your connection with the academic community. You\'ll also receive support from our internship office throughout the process.'
      },
      {
        id: 'company-3',
        question: 'How are students selected for internships?',
        answer: 'Companies can review student applications through our platform, conduct interviews, and make final selections based on their specific requirements. The SCAD Internship Office can assist with the selection process and provide guidance on best practices.'
      },
      {
        id: 'company-4',
        question: 'What support does SCAD provide to partner companies?',
        answer: 'SCAD provides comprehensive support including assistance with internship program development, access to our student talent pool, guidance on best practices, and ongoing communication throughout the internship period. We also help ensure compliance with relevant regulations.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-scad-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-200">
              Find answers to common questions about our internship program
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                openCategory === 'students'
                  ? 'bg-scad-red text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setOpenCategory('students')}
            >
              For Students
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                openCategory === 'companies'
                  ? 'bg-scad-red text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setOpenCategory('companies')}
            >
              For Companies
            </button>
          </div>
        </div>

        {/* FAQs List */}
        <div className="max-w-3xl mx-auto">
          {faqs[openCategory as keyof typeof faqs].map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm mb-4"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => toggleQuestion(faq.id)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openQuestions[faq.id] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openQuestions[faq.id] && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help. Contact us for more information about our internship program.
          </p>
          <div className="space-y-2 text-gray-600">
            <p>Email: info@scadcompass.edu</p>
            <p>Phone: +20 110 099 6345</p>
            <p>Address: New Cairo City. Main Entrance El-Tagamoa El-Khames</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQs; 