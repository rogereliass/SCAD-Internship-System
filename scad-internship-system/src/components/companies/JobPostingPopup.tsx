import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar, Clock, DollarSign, Book, Briefcase, Users, PenLine, Trash2, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

// Update the props interface in JobPostingPopup.tsx
interface JobPostingPopupProps {
  jobPosting: JobPosting | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (id: number, data: Partial<JobPosting>) => void;
  onDelete?: (id: number) => void;
}

const JobPostingPopup: React.FC<JobPostingPopupProps> = ({
  jobPosting,
  isOpen,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<JobPosting>>({});

  // Initialize form data when job posting changes
  React.useEffect(() => {
    if (jobPosting) {
      setFormData({
        position: jobPosting.position,
        description: jobPosting.description,
        requirements: jobPosting.requirements,
        responsibilities: jobPosting.responsibilities,
        isPaid: jobPosting.isPaid,
        location: jobPosting.location,
        duration: jobPosting.duration,
        deadline: jobPosting.deadline,
        department: jobPosting.department,
        status: jobPosting.status
      });
    }
  }, [jobPosting]);

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleListChange = (field: 'requirements' | 'responsibilities', value: string) => {
    if (!value.trim()) return;
    
    setFormData({
      ...formData,
      [field]: [...(formData[field] || []), value.trim()]
    });
  };

  const handleRemoveListItem = (field: 'requirements' | 'responsibilities', index: number) => {
    const updatedList = [...(formData[field] || [])];
    updatedList.splice(index, 1);
    
    setFormData({
      ...formData,
      [field]: updatedList
    });
  };

  const handleSaveChanges = () => {
    if (!jobPosting || !onUpdate) return;
    
    try {
      onUpdate(jobPosting.id, formData);
      setIsEditing(false);
      toast.success("Job posting updated successfully!");
    } catch (error) {
      toast.error("Failed to update job posting");
      console.error(error);
    }
  };

  const handleDeletePosting = () => {
    if (!jobPosting || !onDelete) return;
    
    try {
      onDelete(jobPosting.id);
      setDeleteDialogOpen(false);
      onClose();
      toast.success("Job posting deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete job posting");
      console.error(error);
    }
  };

  if (!jobPosting) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-900 flex items-center justify-between">
              {isEditing ? (
                <Input 
                  value={formData.position || ''}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="text-xl font-semibold border-gray-300 bg-white"
                  placeholder="Job Position Title"
                />
              ) : (
                jobPosting.position
              )}
              {!isEditing && (
                <div>
                  <Badge className={jobPosting.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {jobPosting.status === 'active' ? 'Active' : 'Closed'}
                  </Badge>
                </div>
              )}
            </DialogTitle>
            {!isEditing && (
              <DialogDescription className="text-gray-600">
                Posted on {jobPosting.createdAt}
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {/* Job Details */}
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="department" className="text-sm font-medium text-gray-700 block mb-1">Department</Label>
                    <Input
                      id="department"
                      value={formData.department || ''}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Department or Team"
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700 block mb-1">Location</Label>
                    <Input
                      id="location"
                      value={formData.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Work Location"
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration" className="text-sm font-medium text-gray-700 block mb-1">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration || ''}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="Internship Duration"
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="deadline" className="text-sm font-medium text-gray-700 block mb-1">Application Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline || ''}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="isPaid" className="text-sm font-medium text-gray-700">Paid Position</Label>
                    <Switch
                      id="isPaid"
                      checked={formData.isPaid}
                      onCheckedChange={(checked) => handleInputChange('isPaid', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">Active Posting</Label>
                    <Switch
                      id="status"
                      checked={formData.status === 'active'}
                      onCheckedChange={(checked) => handleInputChange('status', checked ? 'active' : 'closed')}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    {jobPosting.department && (
                      <div className="flex items-start">
                        <Briefcase className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="text-sm font-medium text-gray-800">{jobPosting.department}</p>
                        </div>
                      </div>
                    )}
                    
                    {jobPosting.location && (
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm font-medium text-gray-800">{jobPosting.location}</p>
                        </div>
                      </div>
                    )}
                    
                    {jobPosting.duration && (
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-sm font-medium text-gray-800">{jobPosting.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Compensation</p>
                        <p className="text-sm font-medium text-gray-800">{jobPosting.isPaid ? 'Paid Position' : 'Unpaid Position'}</p>
                      </div>
                    </div>
                    
                    {jobPosting.deadline && (
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Application Deadline</p>
                          <p className="text-sm font-medium text-gray-800">{jobPosting.deadline}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Users className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Applicants</p>
                        <p className="text-sm font-medium text-gray-800">{jobPosting.applicants} Applicants</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              {isEditing ? (
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[100px] border-gray-300 bg-white"
                  placeholder="Job description..."
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-800 whitespace-pre-line">{jobPosting.description}</p>
                </div>
              )}
            </div>
            
            {/* Requirements */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Requirements</h3>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        id="newRequirement"
                        placeholder="Add a requirement"
                        className="border-gray-300 bg-white"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            handleListChange('requirements', input.value);
                            input.value = '';
                          }
                        }}
                      />
                    </div>
                    <Button 
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('newRequirement') as HTMLInputElement;
                        handleListChange('requirements', input.value);
                        input.value = '';
                      }}
                      className="bg-scad-red hover:bg-scad-red/90"
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    {formData.requirements && formData.requirements.length > 0 ? (
                      <ul className="space-y-2">
                        {formData.requirements.map((item, index) => (
                          <li key={index} className="flex justify-between items-center text-sm">
                            <span>{item}</span>
                            <button 
                              type="button"
                              onClick={() => handleRemoveListItem('requirements', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No requirements added yet</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  {jobPosting.requirements && jobPosting.requirements.length > 0 ? (
                    <ul className="space-y-2 list-disc list-inside">
                      {jobPosting.requirements.map((item, index) => (
                        <li key={index} className="text-sm text-gray-800">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No specific requirements</p>
                  )}
                </div>
              )}
            </div>
            
            {/* Responsibilities */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Responsibilities</h3>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        id="newResponsibility"
                        placeholder="Add a responsibility"
                        className="border-gray-300 bg-white"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            handleListChange('responsibilities', input.value);
                            input.value = '';
                          }
                        }}
                      />
                    </div>
                    <Button 
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('newResponsibility') as HTMLInputElement;
                        handleListChange('responsibilities', input.value);
                        input.value = '';
                      }}
                      className="bg-scad-red hover:bg-scad-red/90"
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    {formData.responsibilities && formData.responsibilities.length > 0 ? (
                      <ul className="space-y-2">
                        {formData.responsibilities.map((item, index) => (
                          <li key={index} className="flex justify-between items-center text-sm">
                            <span>{item}</span>
                            <button 
                              type="button"
                              onClick={() => handleRemoveListItem('responsibilities', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No responsibilities added yet</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  {jobPosting.responsibilities && jobPosting.responsibilities.length > 0 ? (
                    <ul className="space-y-2 list-disc list-inside">
                      {jobPosting.responsibilities.map((item, index) => (
                        <li key={index} className="text-sm text-gray-800">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No specific responsibilities</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="border-t pt-3 flex justify-between">
            {isEditing ? (
              <>
                <div>
                  <Button 
                    variant="outline" 
                    onClick={() => setDeleteDialogOpen(true)}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Delete Posting
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form data to original values
                      if (jobPosting) {
                        setFormData({
                          position: jobPosting.position,
                          description: jobPosting.description,
                          requirements: jobPosting.requirements,
                          responsibilities: jobPosting.responsibilities,
                          isPaid: jobPosting.isPaid,
                          location: jobPosting.location,
                          duration: jobPosting.duration,
                          deadline: jobPosting.deadline,
                          department: jobPosting.department,
                          status: jobPosting.status
                        });
                      }
                    }}
                    className="text-gray-700 border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveChanges}
                    className="bg-scad-red hover:bg-scad-red/90"
                  >
                    Save Changes
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  {jobPosting.status === 'active' && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Accepting Applications
                    </Badge>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="text-gray-700 border-gray-300"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-scad-red hover:bg-scad-red/90"
                  >
                    <PenLine className="h-4 w-4 mr-1.5" />
                    Edit Posting
                  </Button>
                </div>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-gray-900">
              <AlertCircle className="h-5 w-5 text-scad-red" /> 
              Delete Job Posting
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete this job posting? This action cannot be undone.
              {jobPosting.applicants > 0 && (
                <div className="mt-2 text-amber-600 bg-amber-50 p-2 rounded-md flex items-center gap-2 border border-amber-100">
                  <AlertCircle className="h-4 w-4" />
                  <span>This posting has {jobPosting.applicants} applicant(s). Deleting it may affect ongoing applications.</span>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t pt-3">
            <AlertDialogCancel className="text-gray-700 border-gray-300 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePosting} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobPostingPopup;