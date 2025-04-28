
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample data
const internshipApplications = [
  { id: 1, company: 'TechCorp', position: 'Frontend Developer', status: 'pending', appliedDate: '2023-11-15' },
  { id: 2, company: 'DesignHub', position: 'UX Design Intern', status: 'accepted', appliedDate: '2023-11-10' },
  { id: 3, company: 'DataSystems', position: 'Data Analyst', status: 'finalized', appliedDate: '2023-11-05' },
];

const recommendedInternships = [
  { id: 1, company: 'WebSolutions', position: 'Web Developer', location: 'Remote', duration: '3 months' },
  { id: 2, company: 'MarketingPro', position: 'Marketing Intern', location: 'New York', duration: '6 months' },
  { id: 3, company: 'SoftwareCo', position: 'Software Engineer', location: 'San Francisco', duration: '3 months' },
];

const upcomingDeadlines = [
  { id: 1, title: 'Internship Report Submission', date: '2023-12-15' },
  { id: 2, title: 'Online Assessment: Web Development', date: '2023-12-10' },
  { id: 3, title: 'Career Workshop Registration', date: '2023-12-05' },
];

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    name: 'Alex Johnson',
    major: 'Computer Science',
    semester: 6,
    completedInternships: 1,
    isPRO: false,
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-scad-dark mb-2">Welcome back, {student.name}!</h1>
        <p className="text-gray-600">
          {student.major} | Semester {student.semester} | {student.completedInternships} Completed Internship
          {student.isPRO && <span className="ml-2 bg-scad-yellow text-scad-dark px-2 py-0.5 rounded-full text-xs font-semibold">PRO</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-scad-dark">Recent Applications</h2>
              <Link to="/applications" className="text-sm text-scad-red hover:underline">View all</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {internshipApplications.map((app) => (
                    <tr key={app.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{app.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          app.status === 'finalized' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.appliedDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {internshipApplications.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">You haven't applied to any internships yet.</p>
                <Link to="/internships" className="mt-3 btn btn-primary inline-block">
                  Find Internships
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Deadlines */}
        <div className="lg:col-span-1">
          <div className="card h-full">
            <h2 className="text-lg font-semibold text-scad-dark mb-4">Upcoming Deadlines</h2>
            
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-scad-dark">{deadline.title}</p>
                  <p className="text-sm text-gray-500 mt-1">Due: {deadline.date}</p>
                </div>
              ))}
            </div>

            {upcomingDeadlines.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No upcoming deadlines.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Internships */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-scad-dark">Recommended for You</h2>
              <Link to="/internships" className="text-sm text-scad-red hover:underline">View all</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedInternships.map((internship) => (
                <div key={internship.id} className="border border-gray-200 rounded-lg p-4 hover:border-scad-red transition-colors">
                  <h3 className="font-medium text-scad-dark">{internship.position}</h3>
                  <p className="text-gray-600 text-sm mb-2">{internship.company}</p>
                  <div className="flex items-center text-gray-500 text-xs space-x-2 mb-3">
                    <span>{internship.location}</span>
                    <span>•</span>
                    <span>{internship.duration}</span>
                  </div>
                  <Link to={`/internships/${internship.id}`} className="text-scad-red text-sm hover:underline">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;