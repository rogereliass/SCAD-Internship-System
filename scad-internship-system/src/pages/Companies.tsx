
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from '@/components/layout/Navbar';

// Sample company data
const companies = [
  { 
    id: 1, 
    name: 'TechSolutions Inc.', 
    industry: 'Information Technology', 
    size: 'Medium (50-250)', 
    email: 'contact@techsolutions.com',
    description: 'A leading technology company specializing in enterprise solutions and digital transformation services.',
    location: 'New York, NY',
    website: 'https://techsolutions.com',
    contactPerson: 'John Smith',
    phone: '(123) 456-7890',
    joinDate: '2023-07-15'
  },
  { 
    id: 2, 
    name: 'DesignHub Co.', 
    industry: 'Design', 
    size: 'Small (10-49)', 
    email: 'hello@designhub.co',
    description: 'Creative design agency focused on branding, UX/UI, and digital products.',
    location: 'San Francisco, CA',
    website: 'https://designhub.co',
    contactPerson: 'Emily Johnson',
    phone: '(415) 555-9876',
    joinDate: '2023-08-22'
  },
  { 
    id: 3, 
    name: 'GlobalFinance', 
    industry: 'Finance', 
    size: 'Large (250+)', 
    email: 'info@globalfinance.com',
    description: 'International financial services provider specializing in investment banking and asset management.',
    location: 'Chicago, IL',
    website: 'https://globalfinance.com',
    contactPerson: 'Michael Brown',
    phone: '(312) 777-8888',
    joinDate: '2023-05-10'
  },
  { 
    id: 4, 
    name: 'EcoSustain', 
    industry: 'Environmental', 
    size: 'Small (10-49)', 
    email: 'connect@ecosustain.org',
    description: 'Organization dedicated to promoting sustainable practices and green technologies.',
    location: 'Portland, OR',
    website: 'https://ecosustain.org',
    contactPerson: 'Sarah Wilson',
    phone: '(503) 222-3333',
    joinDate: '2023-09-05'
  },
  { 
    id: 5, 
    name: 'MediaPulse', 
    industry: 'Media', 
    size: 'Medium (50-250)', 
    email: 'media@mediapulse.net',
    description: 'Digital media company focused on content creation, marketing, and distribution.',
    location: 'Los Angeles, CA',
    website: 'https://mediapulse.net',
    contactPerson: 'David Garcia',
    phone: '(213) 444-5555',
    joinDate: '2023-06-18'
  },
];

const industries = ['All Industries', 'Information Technology', 'Design', 'Finance', 'Environmental', 'Media'];
const companySizes = ['All Sizes', 'Small (10-49)', 'Medium (50-250)', 'Large (250+)'];

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All Industries' || company.industry === selectedIndustry;
    const matchesSize = selectedSize === 'All Sizes' || company.size === selectedSize;
    
    return matchesSearch && matchesIndustry && matchesSize;
  });

  return (
    <div className="bg-white">
    <Navbar />
    <div className="container mx-auto py-8 px-4 bg-white">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-black font-bold">Registered Companies</h1>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Company
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search companies..."
                className="pl-10 input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Filter by company size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map(size => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCompanies.map(company => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.industry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button 
                      variant="ghost" 
                      className="text-scad-red hover:text-scad-red/80 p-0 h-auto font-medium"
                      onClick={() => setSelectedCompany(company)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCompanies.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No companies found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Company Details Modal */}
      <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
        <DialogContent className="bg-[#f3f3f3] max-w-3xl">
          {selectedCompany && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
                  <p className="text-gray-700">{selectedCompany.industry}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {selectedCompany.size}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Contact Information</p>
                  <div className="space-y-1">
                    <p className="text-gray-900"><span className="font-medium">Contact Person:</span> {selectedCompany.contactPerson}</p>
                    <p className="text-gray-900"><span className="font-medium">Email:</span> {selectedCompany.email}</p>
                    <p className="text-gray-900"><span className="font-medium">Phone:</span> {selectedCompany.phone}</p>
                    <p className="text-gray-900"><span className="font-medium">Website:</span> <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedCompany.website}</a></p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Company Details</p>
                  <div className="space-y-1">
                    <p className="text-gray-900"><span className="font-medium">Location:</span> {selectedCompany.location}</p>
                    <p className="text-gray-900"><span className="font-medium">Joined:</span> {new Date(selectedCompany.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-500">About</p>
                <p className="text-gray-900">{selectedCompany.description}</p>
              </div>
              
              <div className="border-t pt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedCompany(null)} className="border-gray-300 text-gray-900">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
};

export default Companies;