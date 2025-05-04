import * as React from 'react';
import { Link } from 'react-router-dom';

interface InternshipApplicantProps {
  id: number;
  name: string;
  semester: string;
  faculty: string;
  appliedAt: string;
  gpa: number;
  profilePhoto?: string;
}

const InternshipApplicantCard: React.FC<InternshipApplicantProps> = ({
  id,
  name,
  semester,
  faculty,
  appliedAt,
  gpa,
  profilePhoto
}) => {
  // Calculate days since application
  const daysAgo = (date: string): string => {
    const applicationDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - applicationDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    if (differenceInDays === 0) return 'Today';
    if (differenceInDays === 1) return 'Yesterday';
    return `${differenceInDays} days ago`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start">
        {profilePhoto ? (
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-4">
            <img src={profilePhoto} alt={`${name}'s profile`} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 bg-scad-red rounded-md mr-4 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-scad-dark">{name}</h3>
          <p className="text-gray-700">{faculty}</p>
          
          <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
            <span className="mr-3">{semester}</span>
            <span className="mr-3">•</span>
            <span className="mr-3">GPA: {gpa}</span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">Applied {daysAgo(appliedAt)}</span>
            </div>
            
            <Link 
              to={`/applicants/${id}`} 
              className="text-sm font-medium text-scad-red hover:underline"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipApplicantCard;
