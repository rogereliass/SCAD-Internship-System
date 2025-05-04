import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Users } from 'lucide-react';

interface CompanyProps {
  id: number;
  name: string;
  industry: string;
  size: string;
  location: string;
  logo?: string;
  openPositions: number;
  rating?: number;
}

const CompanyCard: React.FC<CompanyProps> = ({
  id,
  name,
  industry,
  size,
  location,
  logo,
  openPositions,
  rating
}) => {
  const formatCompanySize = (size: string): string => {
    switch (size) {
      case 'small': return 'Small (≤ 50)';
      case 'medium': return 'Medium (51–100)';
      case 'large': return 'Large (101-500)';
      case 'corporate': return '500+ employees';
      default: return size;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start">
        {logo ? (
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-4">
            <img src={logo} alt={`${name} logo`} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 bg-scad-red rounded-md mr-4 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-scad-dark">{name}</h3>
          <p className="text-gray-700">{industry}</p>
          
          <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
            <span className="mr-3">{location}</span>
            <span className="mr-3">•</span>
            <span className="mr-3">{formatCompanySize(size)}</span>
            <span className="mr-3">•</span>
            <span className={openPositions > 0 ? 'text-green-600 font-medium' : 'text-gray-500'}>
              {openPositions > 0 ? `${openPositions} open position${openPositions !== 1 ? 's' : ''}` : 'No open positions'}
            </span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div>
              {rating && (
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-xs ${star <= Math.round(rating) ? 'text-scad-yellow' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
                </div>
              )}
            </div>
            
            <Link 
              to={`/companies/${id}`} 
              className="text-sm font-medium text-scad-red hover:underline"
            >
              View Company
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
