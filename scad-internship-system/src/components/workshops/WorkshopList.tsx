import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Mock workshop data
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

const WorkshopList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [workshops, setWorkshops] = useState(mockWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState<typeof mockWorkshops[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredWorkshops = workshops.filter(workshop => 
    workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    workshop.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workshop.speaker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleRegister = (workshopId: string) => {
    console.log(`Registered for workshop: ${workshopId}`);
    // In a real app, we would call an API to register the user
    setIsDialogOpen(false);
  };
  
  const handleViewDetails = (workshop: typeof mockWorkshops[0]) => {
    setSelectedWorkshop(workshop);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="mt-6">
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search workshops by title, description, or speaker..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>
      
      {filteredWorkshops.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No workshops found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkshops.map(workshop => (
            <Card key={workshop.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">{workshop.title}</CardTitle>
                    <CardDescription className="mt-1">{workshop.shortDescription}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {format(workshop.startDate, 'PPP')}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <Clock size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {format(workshop.startDate, 'p')} - {format(workshop.endDate, 'p')}
                  </span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{workshop.speaker.name}</span>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between items-center">
                <Button 
                  variant="default" 
                  className='mt-3'
                  onClick={() => handleViewDetails(workshop)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Workshop Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedWorkshop && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedWorkshop.title}</DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedWorkshop.shortDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Workshop Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar size={18} className="mr-2 text-gray-600" />
                        <span className="text-gray-700">
                          {format(selectedWorkshop.startDate, 'PPP')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={18} className="mr-2 text-gray-600" />
                        <span className="text-gray-700">
                          {format(selectedWorkshop.startDate, 'p')} - {format(selectedWorkshop.endDate, 'p')}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Agenda:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedWorkshop.agenda.map((item, index) => (
                            <li key={index} className="text-gray-700">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Speaker</h3>
                    <div className="flex items-start">
                      <div className="bg-gray-200 w-12 h-12 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium">{selectedWorkshop.speaker.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{selectedWorkshop.speaker.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="mr-2"
                >
                  Close
                </Button>
                
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkshopList;
