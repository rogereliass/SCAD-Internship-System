import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Filter, ChevronDown, Eye, FileCheck, Users, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import InternDetailsPopup from './InternDetailsPopup';
import EvaluationPopup, { EvaluationData } from './EvaluationPopUp';
import { toast } from 'sonner';

interface Intern {
  id: number;
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  evaluationStatus?: 'pending' | 'submitted';
  email: string;
  major?: string;
  year?: string;
  status?: 'active' | 'completed';
}

interface InternTabProps {
  interns: Intern[];
  onTabChange?: (tab: string) => void;
}


const InternTab: React.FC<InternTabProps> = ({ interns = [], onTabChange }) => {
  const [selectedInternId, setSelectedInternId] = useState<number | null>(null);
  const [detailsPopupOpen, setDetailsPopupOpen] = useState(false);

  const handleOpenInternDetails = (internId: number) => {
    setSelectedInternId(internId);
    setDetailsPopupOpen(true);
  };

  const selectedIntern = selectedInternId ? interns.find(intern => intern.id === selectedInternId) : null;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'position'>('name');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInterns, setSelectedInterns] = useState<number[]>([]);

  const [evaluationPopupOpen, setEvaluationPopupOpen] = useState(false);
  const [internToEvaluate, setInternToEvaluate] = useState<Intern | null>(null);
  const [existingEvaluationData, setExistingEvaluationData] = useState<EvaluationData | null>(null);

  const handleOpenEvaluation = (internId: number) => {
    const intern = interns.find(i => i.id === internId);
    if (intern) {
      setInternToEvaluate(intern);
      setEvaluationPopupOpen(true);
    }
  };

  const handleEndInternship = (internId: number) => {
    toast.success("Internship ended successfully!");
  };

  const handleSubmitEvaluation = async (evaluationData: EvaluationData) => {
    console.log('Evaluation submitted:', evaluationData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const isActive = (intern: Intern) => {
    return intern.status === 'active';
  };

  const getInternStatus = (intern: Intern) => {
    return intern.status === 'active'
      ? { 
          label: 'Active', 
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-3 w-3 mr-1" />
        }
      : { 
          label: 'Completed', 
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="h-3 w-3 mr-1" />
        };
  };

  const getEvaluationStatus = (status?: string) => {
    switch (status) {
      case 'submitted':
        return { 
          label: 'Evaluation Submitted', 
          color: 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer',
          icon: <CheckCircle className="h-3 w-3 mr-1" />,
          actionable: true,
          action: 'view'
        };
      case 'pending':
        return { 
          label: 'Evaluation Needed', 
          color: 'bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer',
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
          actionable: true,
          action: 'create'
        };
      default:
        return { 
          label: 'No Evaluation Required', 
          color: 'bg-gray-100 text-gray-800',
          icon: <Clock className="h-3 w-3 mr-1" />,
          actionable: false,
          action: null
        };
    }
  };

  const handleEvaluationBadgeClick = (intern: Intern) => {
    if (!intern.evaluationStatus) {
      toast.info("Evaluation is not required for this intern at this time.");
      return;
    }
    
    if (intern.evaluationStatus === 'pending') {
      // Open modal to create new evaluation (no existing data)
      setInternToEvaluate(intern);
      setExistingEvaluationData(null); // No existing evaluation
      setEvaluationPopupOpen(true);
    } else if (intern.evaluationStatus === 'submitted') {
      // Open modal with existing evaluation data
      setInternToEvaluate(intern);
      
      // Create mock evaluation data for interns with 'submitted' status
      const mockExistingEvaluation: EvaluationData = {
        id: intern.id,
        internId: intern.id,
        performance: 4,
        attendance: 4,
        initiative: 3,
        communication: 4,
        teamwork: 5,
        technicalSkills: 3,
        overallRating: 4,
        strengths: "Strong problem-solving abilities. Quick learner who adapts well to new technologies and processes.",
        improvements: "Could benefit from more proactive communication about project status and challenges.",
        additionalComments: "Showed significant improvement throughout the internship period.",
        recommendForHire: true,
        evaluatorName: "John Manager",
        evaluatorPosition: "Engineering Team Lead",
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
      };
      
      setExistingEvaluationData(mockExistingEvaluation);
      setEvaluationPopupOpen(true);
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
      return `Completed ${Math.abs(daysLeft)} days ago`;
    }
    if (daysLeft === 0) {
      return "Last day today";
    }
    return `${daysLeft} days remaining`;
  };

  const toggleInternSelection = (id: number) => {
    setSelectedInterns(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                  (end.getMonth() - start.getMonth());
    return months <= 0 ? "< 1 month" : `${months} ${months === 1 ? 'month' : 'months'}`;
  };

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = searchType === 'name' 
      ? intern.name.toLowerCase().includes(searchTerm.toLowerCase())
      : intern.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (statusFilter === 'active') {
      matchesFilter = intern.status === 'active';
    } else if (statusFilter === 'completed') {
      matchesFilter = intern.status === 'completed';
    } else if (statusFilter === 'evaluation_pending') {
      matchesFilter = intern.evaluationStatus === 'pending';
    } else {
      matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleBulkEvaluate = () => {
    alert(`Preparing to evaluate ${selectedInterns.length} interns`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-scad-dark">Current Interns</h2>
            {interns.length > 0 && (
              <Badge variant="outline" className="ml-2 bg-scad-red bg-opacity-10 text-scad-red">
                {interns.filter(i => isActive(i)).length} Active
              </Badge>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">Monitor and evaluate interns currently placed in your company</p>
        </div>
      </div>

      {interns.length > 0 && (
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:items-center justify-between">
            <div className="flex flex-wrap gap-1 items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`border ${statusFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
                onClick={() => {
                  console.log('Setting filter to: all');
                  setStatusFilter('all');
                }}
              >
                All
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`border ${statusFilter === 'active' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
                onClick={() => setStatusFilter('active')}
              >
                Current
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`border ${statusFilter === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
                onClick={() => setStatusFilter('completed')}
              >
                Completed
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`border ${statusFilter === 'evaluation_pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
                onClick={() => setStatusFilter('evaluation_pending')}
              >
                Evaluation Pending
              </Button>
            </div>
            
            <div className="flex items-center w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder={searchType === 'name' ? "Search by name..." : "Search by position..."}
                  className="pl-9 bg-white text-gray-900 border-gray-300 focus:border-gray-700 focus:ring-0 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative ml-2">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as 'name' | 'position')}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md pr-8 pl-3 py-1.5 focus:ring-scad-red focus:border-scad-red h-10"
                  aria-label="Search type"
                >
                  <option value="name">By Name</option>
                  <option value="position">By Position</option>
                </select>
              </div>
            </div>
          </div>
          
          {(statusFilter !== 'all' || searchTerm) && (
            <div className="flex items-center mt-3 flex-wrap gap-2">
              <span className="text-xs text-gray-500">Active filters:</span>
              
              {statusFilter !== 'all' && (
                <Badge variant="outline" className="text-xs flex items-center gap-1 bg-gray-50 text-gray-800">
                  Status: {statusFilter.replace('_', ' ').charAt(0).toUpperCase() + statusFilter.slice(1).replace('_', ' ')}
                  <button 
                    onClick={() => setStatusFilter('all')} 
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {searchTerm && (
                <Badge variant="outline" className="text-xs flex items-center gap-1 bg-gray-50 text-gray-800">
                  {searchType === 'name' ? 'Name' : 'Position'}: {searchTerm}
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {filteredInterns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInterns.map((intern) => {
            const status = getInternStatus(intern);
            const evaluationStatus = getEvaluationStatus(intern.evaluationStatus);
            
            return (
              <div key={intern.id} className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between bg-gray-50 border-b border-gray-100 p-3">
                  <h3 className="font-medium text-gray-900 truncate">{intern.name}</h3>
                  <Badge className={status.color}>{status.label}</Badge>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{intern.position}</p>
                  
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    <span>{intern.startDate} - {intern.endDate}</span>
                    <span className="mx-1.5">•</span>
                    <span>{calculateDuration(intern.startDate, intern.endDate)}</span>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {getDaysRemaining(intern.endDate)}
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    {evaluationStatus.actionable ? (
                      <button
                        onClick={() => handleEvaluationBadgeClick(intern)}
                        className={`text-xs flex items-center rounded-full px-2.5 py-1 font-medium transition-colors ${evaluationStatus.color} border border-transparent`}
                        title={evaluationStatus.action === 'create' ? "Click to create evaluation" : "Click to view evaluation"}
                      >
                        {evaluationStatus.icon}
                        {evaluationStatus.label}
                      </button>
                    ) : (
                      <Badge 
                        variant="outline" 
                        className={`text-xs flex items-center ${evaluationStatus.color}`}
                        title="No evaluation is required at this time"
                      >
                        {evaluationStatus.icon}
                        {evaluationStatus.label}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2">
                  <button 
                    onClick={() => handleOpenInternDetails(intern.id)}
                    className="text-sm text-scad-red hover:underline flex items-center bg-transparent border-0 p-0 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    View Details
                  </button>
                  
                  {intern.status === 'active' && (
                    <button 
                      onClick={() => handleEndInternship(intern.id)}
                      className="text-sm text-amber-600 hover:underline flex items-center bg-transparent border-0 p-0 cursor-pointer"
                    >
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      End Internship
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-50 rounded-full p-4 mb-4">
            <Users className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">You currently have no interns assigned</h3>
          <p className="text-gray-500 mb-6">To accept interns, review pending applications</p>
          {onTabChange ? (
            <Button 
              onClick={() => onTabChange('applicants')}
              className="bg-scad-red hover:bg-scad-red/90"
            >
              Review Applicants
            </Button>
          ) : (
            <Link to="/applicants">
              <Button className="bg-scad-red hover:bg-scad-red/90">
                Review Applicants
              </Button>
            </Link>
          )}
        </div>
      )}

      <EvaluationPopup
        intern={internToEvaluate}
        isOpen={evaluationPopupOpen}
        onClose={() => setEvaluationPopupOpen(false)}
        onSubmit={handleSubmitEvaluation}
        existingEvaluation={existingEvaluationData}
      />

      <InternDetailsPopup
        intern={selectedIntern}
        isOpen={detailsPopupOpen}
        onClose={() => setDetailsPopupOpen(false)}
      />
    </div>
  );
};

export default InternTab;