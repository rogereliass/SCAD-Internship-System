
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Edit, Plus, Trash2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { toast } from '../ui/sonner';

// Mock workshop data (same as in WorkshopList)
const mockWorkshops = [
  {
    id: '1',
    title: 'Resume Building Masterclass',
    shortDescription: 'Learn how to create a professional resume that stands out to employers.',
    startDate: new Date(2025, 5, 15, 10, 0), // June 15, 2025, 10:00 AM
    endDate: new Date(2025, 5, 15, 12, 0), // June 15, 2025, 12:00 PM
    speaker: {
      name: 'Dr. Sarah Johnson',
      bio: 'Career counselor with 15+ years of experience in helping students secure top positions.',
      avatarUrl: '/placeholder.svg'
    },
    agenda: [
      'Introduction to resume formats',
      'Highlighting your skills effectively',
      'Common mistakes to avoid',
      'Q&A session'
    ]
  },
  {
    id: '2',
    title: 'Interview Techniques Workshop',
    shortDescription: 'Master the art of interviewing with practical exercises and feedback.',
    startDate: new Date(2025, 5, 20, 14, 0), // June 20, 2025, 2:00 PM
    endDate: new Date(2025, 5, 20, 16, 30), // June 20, 2025, 4:30 PM
    speaker: {
      name: 'Ahmed Al-Mansoori',
      bio: 'HR Director at TechCorp with extensive experience in recruitment and talent acquisition.',
      avatarUrl: '/placeholder.svg'
    },
    agenda: [
      'First impressions and body language',
      'Answering difficult questions',
      'Mock interview practice',
      'Feedback and improvement strategies'
    ]
  },
  {
    id: '3',
    title: 'Networking for Career Success',
    shortDescription: 'Build meaningful professional connections to advance your career.',
    startDate: new Date(2025, 5, 25, 11, 0), // June 25, 2025, 11:00 AM
    endDate: new Date(2025, 5, 25, 13, 0), // June 25, 2025, 1:00 PM
    speaker: {
      name: 'Fatima Al-Balushi',
      bio: 'Professional networker and career coach with connections across multiple industries.',
      avatarUrl: '/placeholder.svg'
    },
    agenda: [
      'The importance of professional networking',
      'Building your personal brand',
      'Effective communication strategies',
      'Maintaining professional relationships'
    ]
  }
];

// Time slots for selecting start and end times
const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM'
];

interface WorkshopFormData {
  id?: string;
  title: string;
  shortDescription: string;
  speakerName: string;
  speakerBio: string;
  startDate: Date | undefined;
  startTime: string;
  endDate: Date | undefined;
  endTime: string;
  agenda: string;
}

const WorkshopManagement = () => {
  const [workshops, setWorkshops] = useState(mockWorkshops);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  
  const form = useForm<WorkshopFormData>({
    defaultValues: {
      title: '',
      shortDescription: '',
      speakerName: '',
      speakerBio: '',
      startDate: undefined,
      startTime: '',
      endDate: undefined,
      endTime: '',
      agenda: '',
    }
  });
  
  const handleAddWorkshop = () => {
    setIsEditMode(false);
    form.reset();
    setIsDialogOpen(true);
  };
  
  const handleEditWorkshop = (id: string) => {
    const workshop = workshops.find(w => w.id === id);
    if (!workshop) return;
    
    setIsEditMode(true);
    setSelectedWorkshopId(id);
    
    form.reset({
      id: workshop.id,
      title: workshop.title,
      shortDescription: workshop.shortDescription,
      speakerName: workshop.speaker.name,
      speakerBio: workshop.speaker.bio,
      startDate: workshop.startDate,
      startTime: format(workshop.startDate, 'hh:mm aa'),
      endDate: workshop.endDate,
      endTime: format(workshop.endDate, 'hh:mm aa'),
      agenda: workshop.agenda.join('\n'),
    });
    
    setIsDialogOpen(true);
  };
  
  const handleDeleteWorkshop = (id: string) => {
    setSelectedWorkshopId(id);
    setIsDeleteConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedWorkshopId) {
      setWorkshops(workshops.filter(workshop => workshop.id !== selectedWorkshopId));
      setIsDeleteConfirmOpen(false);
      setSelectedWorkshopId(null);
    }
  };
  
  const onSubmit = (data: WorkshopFormData) => {
    // Process the form data
    const agendaItems = data.agenda.split('\n').filter(item => item.trim() !== '');
    
    const formattedWorkshop = {
      id: isEditMode && selectedWorkshopId ? selectedWorkshopId : `${workshops.length + 1}`,
      title: data.title,
      shortDescription: data.shortDescription,
      startDate: data.startDate || new Date(),
      endDate: data.endDate || new Date(),
      speaker: {
        name: data.speakerName,
        bio: data.speakerBio,
        avatarUrl: '/placeholder.svg'
      },
      agenda: agendaItems
    };
    
    if (isEditMode && selectedWorkshopId) {
      setWorkshops(workshops.map(workshop => 
        workshop.id === selectedWorkshopId ? formattedWorkshop : workshop
      ));
    } else {
      setWorkshops([...workshops, formattedWorkshop]);
    }
    
    setIsDialogOpen(false);
    form.reset();
  };
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Manage Workshops</h2>
        <Button onClick={handleAddWorkshop} className="gap-2">
          <Plus size={16} />
          Add Workshop
        </Button>
      </div>
      
      {/* Workshops Table */}
      <Table>
        <TableHeader>
          <TableRow className='text-black'>
            <TableHead className='text-black'>Title</TableHead>
            <TableHead className='text-black'>Date & Time</TableHead>
            <TableHead className='text-black'>Speaker</TableHead>
            <TableHead className=" text-black w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workshops.map(workshop => (
            <TableRow key={workshop.id}>
              <TableCell>
                <div>
                  <div className="font-medium text-black">{workshop.title}</div>
                  <div className="text-sm text-gray-600 truncate max-w-[300px]">
                    {workshop.shortDescription}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-black">
                  {format(workshop.startDate, 'PPP')}
                  <br />
                  {format(workshop.startDate, 'p')} - {format(workshop.endDate, 'p')}
                </div>
              </TableCell>
              <TableCell className='text-black'>{workshop.speaker.name}</TableCell>
              <TableCell>
                <div className="flex space-x-2 text-black">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleEditWorkshop(workshop.id)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-500"
                    onClick={() => handleDeleteWorkshop(workshop.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          
          {workshops.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No workshops found. Add a workshop to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Workshop Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Workshop' : 'Add New Workshop'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to {isEditMode ? 'update' : 'create'} a workshop
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Workshop Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workshop Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workshop title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Workshop Description */}
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a brief description of the workshop"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Speaker Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="speakerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaker Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter speaker name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="speakerBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaker Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter speaker bio" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                
                {/* Start Time */}
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="relative top-[-10px]">
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-900 bg-white" />
                          <select
                            className="w-full pl-8 h-10 rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            {...field}
                          >
                            <option value="">Select time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* End Date */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                
                {/* End Time */}
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="relative top-[-10px]">
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <select
                            className="w-full pl-8 h-10 rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            {...field}
                          >
                            <option value="">Select time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Workshop Agenda */}
              <FormField
                control={form.control}
                name="agenda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agenda</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter workshop agenda (one item per line)"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit"onClick={() => toast.success(`Workshop edited`)}>
                  {isEditMode ? 'Update Workshop' : 'Add Workshop'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this workshop? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkshopManagement;
