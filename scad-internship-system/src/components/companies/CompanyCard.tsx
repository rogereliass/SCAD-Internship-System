
import React from 'react';
import { Link } from 'react-router-dom';

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
  // Convert company size to display format
  const formatCompanySize = (size: string): string => {
    switch (size) {
      case 'small': return 'Small (≤ 50 employees)';
      case 'medium': return 'Medium (51-100 employees)';
      case 'large': return 'Large (101-500 employees)';
      case 'corporate': return 'Corporate (500+ employees)';
      default: return size;
    }
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStar = "★";
    const emptyStar = "☆";
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-scad-yellow">{fullStar}</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">{emptyStar}</span>);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-center">
        {logo ? (
          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
            <img src={logo} alt={`${name} logo`} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="flex-shrink-0 w-16 h-16 bg-scad-red rounded-md mr-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-scad-dark">{name}</h3>
          <p className="text-gray-600">{industry}</p>
          
          <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600">
            <span className="mr-3">{location}</span>
            <span className="mr-3">•</span>
            <span>{formatCompanySize(size)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div>
          {rating && (
            <div className="flex items-center">
              {renderStars(rating)}
              <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          {openPositions > 0 ? (
            <span className="text-sm font-medium text-green-600">
              {openPositions} open position{openPositions !== 1 ? 's' : ''}
            </span>
          ) : (
            <span className="text-sm text-gray-500">No open positions</span>
          )}
          
          <div className="mt-2">
            <Link 
              to={`/companies/${id}`} 
              className="inline-block text-sm font-medium bg-scad-red text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
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
