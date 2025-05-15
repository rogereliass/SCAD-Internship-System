import React, { useState } from 'react';
import { Building2, Mail, Briefcase, Phone, Globe, MapPin, Calendar, X, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Badge } from '../ui/badge';

// Import company logos
import TechCorpLogo from '../assets/TechCorpLogo.png';
import DesignHubLogo from '../assets/DesignHubLogo.jpg';
import DataSystemsLogo from '../assets/DataSystemsLogo.png';

interface CompanyCardProps {
  name: string;
  industry: string;
  email: string;
  contactPerson?: string;
  phone?: string;
  website?: string;
  location?: string;
  joinDate?: string;
  about?: string;
  size: 'small' | 'medium' | 'large' | 'corporate';
}

const CompanyCard: React.FC<CompanyCardProps> = ({ 
  name, 
  industry, 
  email,
  contactPerson,
  phone,
  website,
  location,
  joinDate,
  about,
  size 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Function to get the appropriate logo based on company name
  const getCompanyLogo = (companyName: string) => {
    switch (companyName.toLowerCase()) {
      case 'techcorp':
        return TechCorpLogo;
      case 'designhub':
        return DesignHubLogo;
      case 'datasystems':
        return DataSystemsLogo;
      default:
        return null;
    }
  };

  const getCompanySizeText = (size: string): string => {
    switch (size) {
      case 'small': return 'Small (≤ 50 employees)';
      case 'medium': return 'Medium (51-100 employees)';
      case 'large': return 'Large (101-500 employees)';
      case 'corporate': return 'Corporate (500+ employees)';
      default: return size;
    }
  };

  const companyLogo = getCompanyLogo(name);

  return (
    <>
      <div className="border rounded-lg p-3 hover:border-scad-red transition-colors bg-white group">
        <div className="space-y-2">
          <div className="flex items-start">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white rounded-lg group-hover:bg-gray-50 transition-colors">
                {companyLogo ? (
                  <img 
                    src={companyLogo} 
                    alt={`${name} logo`} 
                    className="h-7 w-7 object-contain"
                  />
                ) : (
                  <Building2 className="h-7 w-7 text-scad-red" />
                )}
              </div>
              <div className="space-y-1.5">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-scad-red transition-colors">{name}</h3>
                  <div className="flex items-center text-gray-500 text-xs mt-0.5 gap-1.5">
                    <div className="flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" />
                      <span>{industry}</span>
                    </div>
                    {location && (
                      <>
                        <span className="text-gray-200">•</span>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{location}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                  <Mail className="h-3 w-3 mr-1" />
                  <span className="truncate">{email}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full text-xs text-scad-red hover:text-scad-red/80 hover:bg-scad-red/5 h-7"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Company Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-[#f3f3f3] max-w-3xl">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                <p className="text-gray-700">{industry}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {getCompanySizeText(size)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Contact Information</p>
                <div className="space-y-1">
                  {contactPerson && (
                    <p className="text-gray-900"><span className="font-medium">Contact Person:</span> {contactPerson}</p>
                  )}
                  <p className="text-gray-900"><span className="font-medium">Email:</span> {email}</p>
                  {phone && (
                    <p className="text-gray-900"><span className="font-medium">Phone:</span> {phone}</p>
                  )}
                  {website && (
                    <p className="text-gray-900">
                      <span className="font-medium">Website:</span>{' '}
                      <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
              
              {/* Company Details */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Company Details</p>
                <div className="space-y-1">
                  {location && (
                    <p className="text-gray-900"><span className="font-medium">Location:</span> {location}</p>
                  )}
                  {joinDate && (
                    <p className="text-gray-900">
                      <span className="font-medium">Joined:</span> {new Date(joinDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {about && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">About</p>
                <p className="text-gray-900">{about}</p>
              </div>
            )}
            
            <div className="border-t pt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDetails(false)} className="border-gray-300">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompanyCard;
