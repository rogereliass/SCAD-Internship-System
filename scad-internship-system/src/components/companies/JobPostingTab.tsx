import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronDown, Filter, Eye, Edit, Plus, Trash2, AlertCircle, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import NewJobPostingModal, { JobPostingData } from './NewJobPostingPopup';
import JobPostingPopup from './JobPostingPopup';

interface JobPosting {
  id: number;
  position: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: 'active' | 'closed';
  isPaid: boolean;
  location: string;
  duration: string;
  applicants: number;
  createdAt: string;
  deadline: string;
  department: string;
}

interface JobPostingTabProps {
  jobPostings: JobPosting[];
  onDeletePosting?: (id: number) => void;
  onAddPosting?: (posting: JobPosting) => void;
  onUpdatePosting?: (id: number, posting: Partial<JobPosting>) => void;
}

const JobPostingTab: React.FC<JobPostingTabProps> = ({ 
  jobPostings = [], 
  onDeletePosting = () => {},
  onAddPosting,
  onUpdatePosting
}) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postingToDelete, setPostingToDelete] = useState<number | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentJobData, setCurrentJobData] = useState<JobPostingData | null>(null);
  const [jobToEditId, setJobToEditId] = useState<number | null>(null);
  const [localJobPostings, setLocalJobPostings] = useState<JobPosting[]>(jobPostings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosting, setSelectedPosting] = useState<JobPosting | null>(null);
  const [detailsPopupOpen, setDetailsPopupOpen] = useState(false);

  useEffect(() => {
    setLocalJobPostings(jobPostings);
  }, [jobPostings]);

  const isRecent = (dateString: string) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const filteredPostings = localJobPostings
    .filter(post => {
      const statusMatch = statusFilter === 'all' ? true : post.status === statusFilter;
      const searchMatch = !searchTerm || post.position.toLowerCase().includes(searchTerm.toLowerCase());
      return statusMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'applicants') {
        return b.applicants - a.applicants;
      }
      return 0;
    });

  const handleOpenEditModal = (id: number) => {
  const jobToEdit = localJobPostings.find(job => job.id === id);
  if (jobToEdit) {
    setCurrentJobData({
      position: jobToEdit.position,
      description: jobToEdit.description || '',
      location: jobToEdit.location || '',
      deadline: jobToEdit.deadline,
      status: jobToEdit.status as 'active' | 'closed',
      requirements: Array.isArray(jobToEdit.requirements) 
        ? jobToEdit.requirements 
        : [],
      responsibilities: Array.isArray(jobToEdit.responsibilities) 
        ? jobToEdit.responsibilities 
        : [],
      isPaid: jobToEdit.isPaid !== undefined ? jobToEdit.isPaid : true,
      duration: jobToEdit.duration || '3 months',
      department: jobToEdit.department || ''
      // industry removed as it's not in the interface
    });
    setJobToEditId(id);
    setEditMode(true);
    setJobModalOpen(true);
  }
};

  const handleOpenAddModal = () => {
    setCurrentJobData(null);
    setJobToEditId(null);
    setEditMode(false);
    setJobModalOpen(true);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setPostingToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postingToDelete !== null) {
      onDeletePosting(postingToDelete);
      setLocalJobPostings(prev => prev.filter(post => post.id !== postingToDelete));
    }
    setDeleteDialogOpen(false);
    setPostingToDelete(null);
  };

  const handleJobSubmit = (jobData: JobPostingData) => {
  if (editMode && jobToEditId !== null) {
    const existingPosting = localJobPostings.find(job => job.id === jobToEditId);
    if (!existingPosting) return;

    const updatedPosting: JobPosting = {
      ...existingPosting,
      position: jobData.position,
      description: jobData.description,
      location: jobData.location,
      // Handle the deadline properly
      deadline: typeof jobData.deadline === 'string' 
        ? jobData.deadline 
        : jobData.deadline instanceof Date 
          ? jobData.deadline.toISOString().split('T')[0] 
          : existingPosting.deadline,
      status: jobData.status,
      requirements: Array.isArray(jobData.requirements) 
        ? jobData.requirements 
        : typeof jobData.requirements === 'string'
          ? jobData.requirements.split(',').map(item => item.trim())
          : [],
      responsibilities: Array.isArray(jobData.responsibilities) 
        ? jobData.responsibilities 
        : typeof jobData.responsibilities === 'string'
          ? jobData.responsibilities.split(',').map(item => item.trim())
          : [],
      isPaid: jobData.isPaid,
      duration: jobData.duration,
      department: jobData.department || existingPosting.department
    };
    
    setLocalJobPostings(prev => 
      prev.map(job => job.id === jobToEditId ? updatedPosting : job)
    );
    
    if (onUpdatePosting) {
      onUpdatePosting(jobToEditId, updatedPosting);
    }
  } else {
    const newPosting: JobPosting = {
      id: Date.now(),
      position: jobData.position,
      applicants: 0,
      status: jobData.status,
      createdAt: new Date().toISOString().split('T')[0],
      description: jobData.description,
      location: jobData.location,
      // Fix the deadline here - ensure it's a string
      deadline: typeof jobData.deadline === 'string' 
        ? jobData.deadline 
        : jobData.deadline instanceof Date 
          ? jobData.deadline.toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0], // Default to today if undefined
      requirements: Array.isArray(jobData.requirements) 
        ? jobData.requirements 
        : typeof jobData.requirements === 'string'
          ? jobData.requirements.split(',').map(item => item.trim())
          : [],
      responsibilities: Array.isArray(jobData.responsibilities) 
        ? jobData.responsibilities 
        : typeof jobData.responsibilities === 'string'
          ? jobData.responsibilities.split(',').map(item => item.trim())
          : [],
      isPaid: jobData.isPaid,
      duration: jobData.duration,
      department: jobData.department || 'General'
    };
    
    setLocalJobPostings(prev => [newPosting, ...prev]);
    
    if (onAddPosting) {
      onAddPosting(newPosting);
    }
  }
  
  setJobModalOpen(false);
};

  const getPostingTitle = (id: number) => {
    const posting = localJobPostings.find(p => p.id === id);
    return posting ? posting.position : "this job posting";
  };

  const handleViewPosting = (postingId: number) => {
  const posting = localJobPostings.find(p => p.id === postingId);
  if (posting) {
    setSelectedPosting(posting);
    setDetailsPopupOpen(true);
  }
};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-scad-dark">Job Postings</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and track your job openings</p>
        </div>
        <Button 
          className="mt-3 sm:mt-0 bg-scad-red hover:bg-scad-red/90"
          onClick={handleOpenAddModal}
        >
          <Plus className="mr-1 h-4 w-4" /> New Posting
        </Button>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:items-center justify-between">
          <div className="flex flex-wrap gap-1 items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`border ${statusFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`border ${statusFilter === 'active' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
              onClick={() => setStatusFilter('active')}
            >
              Active
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`border ${statusFilter === 'closed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 border-gray-200'}`}
              onClick={() => setStatusFilter('closed')}
            >
              Closed
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 ml-auto">
            <div className="relative md:w-64">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search job titles..." 
                className="pl-9 bg-white text-gray-900 border-gray-300 rounded-md focus:border-gray-700 focus:ring-0 focus:outline-none h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select 
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md pr-8 pl-3 py-2 focus:ring-scad-red focus:border-scad-red h-10"
              >
                <option value="newest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="applicants">Most Applicants</option>
              </select>
            </div>
          </div>
        </div>
        
        {(statusFilter !== 'all' || searchTerm) && (
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <span className="text-xs text-gray-500 mr-1">Filtered by:</span>
            
            {statusFilter !== 'all' && (
              <div className="text-xs flex items-center gap-1 bg-gray-50 border rounded px-2 py-1 text-gray-800">
                Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                <button 
                  onClick={() => setStatusFilter('all')} 
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {searchTerm && (
              <div className="text-xs flex items-center gap-1 bg-gray-50 border rounded px-2 py-1 text-gray-800">
                Search: "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {filteredPostings.length > 0 ? (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPostings.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {post.position}
                          {isRecent(post.createdAt) && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        
                        className="text-sm text-gray-900 hover:text-gray-400"
                      >
                        {post.applicants} {post.applicants === 1 ? 'applicant' : 'applicants'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="group relative">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                        <div className="hidden group-hover:block absolute z-10 p-2 bg-black text-white text-xs rounded w-40 top-full left-0 mt-1">
                          {post.status === 'active' ? 'Visible to students' : 'Not visible to students'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                        {post.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-xs flex items-center text-scad-red hover:bg-red-50 hover:border-scad-red"
                        onClick={() => handleViewPosting(post.id)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-50 rounded-full p-4 mb-4">
            <Calendar className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No job postings yet</h3>
          <p className="text-gray-500 mb-6">Create your first job posting to start receiving applications</p>
          <Button 
            className="bg-scad-red hover:bg-scad-red/90"
            onClick={handleOpenAddModal}
          >
            <Plus className="mr-1.5 h-4 w-4" /> Create New Posting
          </Button>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white max-w-md p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2 bg-white">
            <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-scad-red" />
              Delete Job Posting
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              Are you sure you want to delete <span className="font-medium text-gray-900">{postingToDelete !== null ? getPostingTitle(postingToDelete) : ""}</span>? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 p-4 pt-2 border-t bg-white">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="text-gray-700 border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Job Posting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <NewJobPostingModal 
        isOpen={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        onSubmit={handleJobSubmit}
        editData={currentJobData || undefined}
      />

      <JobPostingPopup
        jobPosting={selectedPosting}
        isOpen={detailsPopupOpen}
        onClose={() => setDetailsPopupOpen(false)}
        onUpdate={onUpdatePosting}
        onDelete={onDeletePosting}
      />
    </div>
  );
};

export default JobPostingTab;