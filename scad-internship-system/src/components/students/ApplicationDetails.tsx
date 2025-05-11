import React from 'react';

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  description: string;
  status: 'pending' | 'finalized' | 'accepted' | 'rejected';
  startDate?: string;
  endDate?: string;
  contactEmail?: string;
  industry: string;
  location: string;
  duration: string;
  isPaid: boolean;
  salary: string | number;
  requirements: string[];
}

interface ApplicationDetailsProps {
  application: Application;
  onBack: () => void;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({ application, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-scad-dark">{application.jobTitle}</h2>
        <button
          onClick={onBack}
          className="text-sm text-scad-red hover:underline"
        >
          Back to Applications
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{application.companyName}</h3>
          <p className="text-gray-600 mt-1">{application.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Industry</h4>
            <p className="text-gray-600">{application.industry}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Location</h4>
            <p className="text-gray-600">{application.location}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Duration</h4>
            <p className="text-gray-600">{application.duration}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Compensation</h4>
            <p className="text-gray-600">
              {application.isPaid ? `Paid - $${application.salary}/hour` : 'Unpaid'}
            </p>
          </div>
        </div>

        {application.startDate && application.endDate && (
          <div>
            <h4 className="font-medium text-gray-900">Duration</h4>
            <p className="text-gray-600">
              {new Date(application.startDate).toLocaleDateString()} - {new Date(application.endDate).toLocaleDateString()}
            </p>
          </div>
        )}

        <div>
          <h4 className="font-medium text-gray-900">Required Skills</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {application.requirements.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-scad-red/10 text-scad-red rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900">Status</h4>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            application.status === 'accepted' ? 'bg-green-100 text-green-800' :
            application.status === 'rejected' ? 'bg-red-100 text-red-800' :
            application.status === 'finalized' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {application.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
