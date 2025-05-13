import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Use the same JobPosting interface from JobPostingTab.tsx
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

// Update JobPostingData to match the JobPosting interface
export interface JobPostingData {
  position: string;
  description: string;
  requirements: string[] | string;
  responsibilities: string[] | string;
  status: 'active' | 'closed';
  isPaid: boolean;
  location: string;
  duration: string;
  deadline: string | Date;
  department?: string;
}

interface NewJobPostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: JobPostingData) => void;
  editData?: JobPostingData;
}

const NewJobPostingModal: React.FC<NewJobPostingModalProps> = ({ 
  isOpen, 
  onClose,
  onSubmit,
  editData
}) => {
  const [formData, setFormData] = useState<JobPostingData>({
    position: '',
    description: '',
    location: '',
    deadline: '',
    status: 'active',
    requirements: '',
    responsibilities: '',
    isPaid: true,
    duration: '3 months',
    department: ''
  });
  
  // Initialize with edit data or reset when the modal opens/closes or edit data changes
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else if (isOpen) {
      // Reset form when opening in create mode
      setFormData({
        position: '',
        description: '',
        location: '',
        deadline: '',
        status: 'active',
        requirements: '',
        responsibilities: '',
        isPaid: true,
        duration: '3 months',
        department: ''
      });
    }
  }, [isOpen, editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      deadline: date || ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...formData, status: 'active'});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-bold text-scad-gray">
            {editData ? 'Edit Job Posting' : 'Create New Job Posting'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-3 p-4 pt-1">
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1">
              <Label htmlFor="position">Position Title <span className="text-red-500">*</span></Label>
              <Input
                id="position"
                name="position"
                placeholder="e.g. Frontend Developer Intern"
                value={formData.position}
                onChange={handleChange}
                className="bg-white text-gray-900"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Remote, Hybrid, Office"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="deadline">Application Deadline <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white text-gray-900",
                        !formData.deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? 
                        (formData.deadline instanceof Date 
                          ? format(formData.deadline, "PPP") 
                          : formData.deadline) 
                        : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.deadline instanceof Date ? formData.deadline : undefined}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="duration">Duration</Label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-white px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900"
                >
                  <option value="1 month" className="text-gray-900">1 month</option>
                  <option value="2 months" className="text-gray-900">2 months</option>
                  <option value="3 months" className="text-gray-900">3 months</option>
                  <option value="6 months" className="text-gray-900">6 months</option>
                  <option value="1 year" className="text-gray-900">1 year</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  placeholder="e.g. Engineering, Design"
                  value={formData.department || ''}
                  onChange={handleChange}
                  className="bg-white text-gray-900"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the internship role and responsibilities"
                value={formData.description}
                onChange={handleChange}
                className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] text-gray-900"
                required
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="requirements">Requirements</Label>
              </div>
              <textarea
                id="requirements"
                name="requirements"
                placeholder="List the skills and qualifications required"
                value={typeof formData.requirements === 'string' ? formData.requirements : formData.requirements.join(', ')}
                onChange={handleChange}
                className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[60px] text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Separate requirements with commas</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="responsibilities">Responsibilities</Label>
              </div>
              <textarea
                id="responsibilities"
                name="responsibilities"
                placeholder="List the job responsibilities"
                value={typeof formData.responsibilities === 'string' ? formData.responsibilities : formData.responsibilities.join(', ')}
                onChange={handleChange}
                className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[60px] text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Separate responsibilities with commas</p>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="isPaid">Compensation</Label>
              <div className="flex items-center h-9 px-1 rounded-md ">
                <input
                  type="checkbox"
                  id="isPaid"
                  name="isPaid"
                  checked={formData.isPaid}
                  onChange={handleChange}
                  className="rounded text-scad-red focus:ring-scad-red h-4 w-4"
                />
                <Label htmlFor="isPaid" className="font-normal text-sm ml-2">
                  Paid internship
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-3 gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-scad-red hover:bg-scad-red/90"
            >
              {editData ? 'Save Changes' : 'Post Job'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewJobPostingModal;