import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronDown, Filter, Eye, Edit, Plus, Trash2, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface JobPosting {
  id: number;
  position: string;
  applicants: number;
  status: string;
  createdAt: string;
}

interface JobPostingTabProps {
  jobPostings: JobPosting[];
  onDeletePosting?: (id: number) => void; // New prop for delete functionality
}

const JobPostingTab: React.FC<JobPostingTabProps> = ({ 
  jobPostings = [], 
  onDeletePosting = () => {} // Default empty function if not provided
}) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postingToDelete, setPostingToDelete] = useState<number | null>(null);

  // Check if a posting is recent (less than 7 days old)
  const isRecent = (dateString: string) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  // Filter and sort job postings
  const filteredPostings = jobPostings
    .filter(post => statusFilter === 'all' ? true : post.status === statusFilter)
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

  // Function to handle delete confirmation
  const handleOpenDeleteDialog = (id: number) => {
    setPostingToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Function to handle actual deletion
  const handleDeleteConfirm = () => {
    if (postingToDelete !== null) {
      onDeletePosting(postingToDelete);
    }
    setDeleteDialogOpen(false);
    setPostingToDelete(null);
  };

  // Function to find posting title by ID
  const getPostingTitle = (id: number) => {
    const posting = jobPostings.find(p => p.id === id);
    return posting ? posting.position : "this job posting";
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-scad-dark">Job Postings</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and track your job openings</p>
        </div>
        <Button className="mt-3 sm:mt-0 bg-scad-red hover:bg-scad-red/90">
          <Plus className="mr-1 h-4 w-4" /> New Posting
        </Button>
      </div>

      {/* Filters Section - Updated to match other tabs */}
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
            <div className="relative">
              <select 
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md pr-8 pl-3 py-1.5 focus:ring-scad-red focus:border-scad-red"
              >
                <option value="newest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="applicants">Most Applicants</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Filter indicators - optional */}
        {statusFilter !== 'all' && (
          <div className="mt-2 flex items-center">
            <span className="text-xs text-gray-500 mr-2">Filtered by:</span>
            <div className="text-xs flex items-center gap-1 bg-gray-50 border rounded px-2 py-1 text-gray-800">
              Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              <button 
                onClick={() => setStatusFilter('all')} 
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Job Postings Table */}
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
                      <Link 
                        to={`/job-posts/${post.id}/applicants`}
                        className="text-sm text-gray-900 hover:text-scad-red"
                      >
                        {post.applicants} {post.applicants === 1 ? 'applicant' : 'applicants'}
                      </Link>
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
                      <div className="flex space-x-3">
                        <Link to={`/job-posts/${post.id}`} className="text-gray-600 hover:text-scad-red flex items-center">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Link>
                        <Link to={`/job-posts/${post.id}/edit`} className="text-gray-600 hover:text-blue-600 flex items-center">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Link>
                        <button 
                          onClick={() => handleOpenDeleteDialog(post.id)}
                          className="text-gray-600 hover:text-red-600 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-md shadow-sm border border-gray-200 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-50 rounded-full p-4 mb-4">
            <Calendar className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No job postings yet</h3>
          <p className="text-gray-500 mb-6">Create your first job posting to start receiving applications</p>
          <Button className="bg-scad-red hover:bg-scad-red/90">
            <Plus className="mr-1.5 h-4 w-4" /> Create New Posting
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete Job Posting
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-medium">{postingToDelete !== null ? getPostingTitle(postingToDelete) : ""}</span>? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete Job Posting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobPostingTab;