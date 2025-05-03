
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

// Sample data
const companyApplications = [
  { id: 1, companyName: 'TechSolutions Inc.', industry: 'Information Technology', appliedDate: '2023-11-15', status: 'pending' },
  { id: 2, companyName: 'DesignHub Co.', industry: 'Design', appliedDate: '2023-11-14', status: 'pending' },
  { id: 3, companyName: 'MarketingPro Ltd.', industry: 'Marketing', appliedDate: '2023-11-10', status: 'pending' },
];

const studentReports = [
  { id: 1, studentName: 'Emily Johnson', title: 'Web Development at TechCorp', submittedDate: '2023-11-15', status: 'pending' },
  { id: 2, studentName: 'Michael Brown', title: 'UX Research Internship Report', submittedDate: '2023-11-12', status: 'pending' },
  { id: 3, studentName: 'Sarah Wilson', title: 'Marketing Strategy Development', submittedDate: '2023-11-10', status: 'flagged' },
  { id: 4, studentName: 'David Garcia', title: 'Software Engineering at DataSystems', submittedDate: '2023-11-05', status: 'accepted' },
];

const ScadOfficeDashboard = () => {
  const [currentCycle, setCurrentCycle] = useState({
    name: 'Fall 2023',
    status: 'active',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    remainingDays: 28,
  });

  const [statistics, setStatistics] = useState({
    totalStudents: 256,
    activeInternships: 87,
    pendingReports: 32,
    companyApplications: 7,
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-scad-dark mb-2">SCAD Office Dashboard</h1>
        <div className="flex items-center text-gray-600">
          <Calendar className="mr-2 h-5 w-5" />
          <span>
            Current Cycle: <strong>{currentCycle.name}</strong> (Ends in {currentCycle.remainingDays} days)
          </span>
          <Link to="/cycles/edit" className="ml-3 text-scad-red text-sm hover:underline">
            Manage Cycles
          </Link>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card bg-blue-50 border-l-4 border-blue-500">
          <p className="text-sm text-blue-600 mb-1">Total Students</p>
          <h3 className="text-2xl font-bold text-gray-800">{statistics.totalStudents}</h3>
          <Link to="/students" className="inline-block mt-2 text-xs text-blue-600 hover:underline">View all students →</Link>
        </div>
        
        <div className="card bg-green-50 border-l-4 border-green-500">
          <p className="text-sm text-green-600 mb-1">Active Internships</p>
          <h3 className="text-2xl font-bold text-gray-800">{statistics.activeInternships}</h3>
          <Link to="/internships" className="inline-block mt-2 text-xs text-green-600 hover:underline">View all internships →</Link>
        </div>
        
        <div className="card bg-amber-50 border-l-4 border-amber-500">
          <p className="text-sm text-amber-600 mb-1">Pending Reports</p>
          <h3 className="text-2xl font-bold text-gray-800">{statistics.pendingReports}</h3>
          <Link to="/reports" className="inline-block mt-2 text-xs text-amber-600 hover:underline">Review reports →</Link>
        </div>
        
        <div className="card bg-purple-50 border-l-4 border-purple-500">
          <p className="text-sm text-purple-600 mb-1">Company Applications</p>
          <h3 className="text-2xl font-bold text-gray-800">{statistics.companyApplications}</h3>
          <Link to="/company-applications" className="inline-block mt-2 text-xs text-purple-600 hover:underline">Review applications →</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Applications */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-scad-dark">Company Applications</h2>
            <Link to="/company-applications" className="text-sm text-scad-red hover:underline">View all</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companyApplications.map((company) => (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{company.industry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.appliedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link to={`/company-applications/${company.id}`} className="text-scad-red hover:underline mr-3">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {companyApplications.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No pending company applications.</p>
            </div>
          )}
        </div>

        {/* Student Reports */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-scad-dark">Student Reports</h2>
            <Link to="/reports" className="text-sm text-scad-red hover:underline">View all</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.studentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        report.status === 'flagged' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link to={`/reports/${report.id}`} className="text-scad-red hover:underline">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics and Reports */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-scad-dark">Analytics Overview</h2>
              <Link to="/statistics" className="btn btn-outline text-sm">Generate Report</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Top Companies</h3>
                <ol className="list-decimal pl-5 text-sm">
                  <li className="mb-1">TechCorp (18 interns)</li>
                  <li className="mb-1">DataSystems (12 interns)</li>
                  <li className="mb-1">WebSolutions (9 interns)</li>
                </ol>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Top Majors</h3>
                <ol className="list-decimal pl-5 text-sm">
                  <li className="mb-1">Computer Science (34%)</li>
                  <li className="mb-1">Business Admin (22%)</li>
                  <li className="mb-1">Graphic Design (15%)</li>
                </ol>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Report Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">45% Accepted</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">30% Pending</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">15% Rejected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">10% Flagged</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScadOfficeDashboard;
