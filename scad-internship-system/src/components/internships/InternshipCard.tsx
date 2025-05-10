
import React from 'react';
import { Link } from 'react-router-dom';

interface InternshipProps {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  isPaid: boolean;
  salary?: string;
  postedDate: string;
  industry: string;
  logo?: string;
}

const InternshipCard: React.FC<InternshipProps> = ({
  id,
  title,
  company,
  location,
  duration,
  isPaid,
  salary,
  postedDate,
  industry,
  logo
}) => {
  // Calculate days since posting
  const daysAgo = (date: string): string => {
    const postedDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - postedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    if (differenceInDays === 0) return 'Today';
    if (differenceInDays === 1) return 'Yesterday';
    return `${differenceInDays} days ago`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start">
        {logo ? (
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-4">
            <img src={logo} alt={`${company} logo`} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 bg-scad-red rounded-md mr-4 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{company.charAt(0)}</span>
          </div>
        )}
        
        <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-700">{company}</p>
          
          <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
            <span className="mr-3">{location}</span>
            <span className="mr-3">•</span>
            <span className="mr-3">{duration}</span>
            <span className="mr-3">•</span>
            <span className={isPaid ? 'text-green-600 font-medium' : 'text-gray-500'}>
              {isPaid ? `Paid${salary ? ` - ${salary}` : ''}` : 'Unpaid'}
            </span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700 mr-2">
                {industry}
              </span>
              <span className="text-xs text-gray-500">Posted {daysAgo(postedDate)}</span>
            </div>
            
            <Link 
              to={`/internships/${id}`} 
              className="text-sm font-medium text-scad-red hover:underline"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
