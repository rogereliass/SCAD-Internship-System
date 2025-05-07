
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, AlertCircle, Users, FileText, Download } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

// Mock cycles data
const mockCycles = [
  {
    id: 1,
    name: 'Fall 2023',
    status: 'active',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    totalStudents: 128,
    completedInternships: 0,
    pendingReports: 0
  },
  {
    id: 2,
    name: 'Summer 2023',
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-08-15',
    totalStudents: 156,
    completedInternships: 143,
    pendingReports: 13
  },
  {
    id: 3,
    name: 'Spring 2023',
    status: 'completed',
    startDate: '2023-01-15',
    endDate: '2023-05-15', 
    totalStudents: 142,
    completedInternships: 142,
    pendingReports: 0
  },
  {
    id: 4,
    name: 'Winter 2022',
    status: 'completed',
    startDate: '2022-11-01',
    endDate: '2023-01-10',
    totalStudents: 68,
    completedInternships: 68,
    pendingReports: 0
  }
];

const InternshipCycles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [newCycle, setNewCycle] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });
  
  const handleOpenModal = (cycle = null) => {
    if (cycle) {
      setSelectedCycle(cycle);
      setNewCycle({
        name: cycle.name,
        startDate: cycle.startDate,
        endDate: cycle.endDate
      });
    } else {
      setSelectedCycle(null);
      setNewCycle({
        name: '',
        startDate: '',
        endDate: ''
      });
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCycle(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCycle(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newCycle.name.trim() || !newCycle.startDate || !newCycle.endDate) {
      toast.error("Please fill out all fields");
      return;
    }
    
    if (new Date(newCycle.endDate) <= new Date(newCycle.startDate)) {
      toast.error("End date must be after start date");
      return;
    }
    
    // Show success message (in a real app, this would save to the database)
    if (selectedCycle) {
      toast.success(`Cycle "${newCycle.name}" has been updated`);
    } else {
      toast.success(`New cycle "${newCycle.name}" has been created`);
    }
    
    handleCloseModal();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'upcoming':
        return <Clock size={16} className="text-blue-600" />;
      case 'completed':
        return <CheckCircle size={16} className="text-gray-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fix: Calculate days remaining properly
  const calculateDaysRemaining = (endDateString) => {
    const endDate = new Date(endDateString).getTime();
    const today = new Date().getTime();
    const diffTime = endDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="scadOffice" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Internship Cycles</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
            <Button 
              className="sm:ml-4 bg-primary hover:bg-primary/90"
              onClick={() => handleOpenModal()}
            >
              Create New Cycle
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Active Cycle Card */}
          {mockCycles.filter(cycle => cycle.status === 'active').map(cycle => (
            <Card key={cycle.id} className="border-green-200 shadow-sm">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center">
                      {cycle.name}
                      <span className="ml-2 px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                        Active
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Current active internship cycle
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenModal(cycle)}
                  >
                    Edit Cycle
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Start Date</span>
                    <span className="font-medium flex items-center mt-1">
                      <Calendar size={16} className="mr-1 text-gray-500" />
                      {formatDate(cycle.startDate)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">End Date</span>
                    <span className="font-medium flex items-center mt-1">
                      <Calendar size={16} className="mr-1 text-gray-500" />
                      {formatDate(cycle.endDate)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Days Remaining</span>
                    <span className="font-medium mt-1">
                         {calculateDaysRemaining(cycle.endDate)} days
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-gray-50 border shadow-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{cycle.totalStudents}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Users size={15} className="mr-1" /> Total Students
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 border shadow-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{cycle.completedInternships}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <CheckCircle size={15} className="mr-1" /> Completed Internships
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 border shadow-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{cycle.pendingReports}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FileText size={15} className="mr-1" /> Pending Reports
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3 border-t pt-4 bg-gray-50">
                <Link to="/students">
                  <Button variant="outline" size="sm">View Students</Button>
                </Link>
                <Link to="/internship-reports">
                  <Button variant="outline" size="sm">View Reports</Button>
                </Link>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download size={14} />
                  <span>Export Data</span>
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Past Cycles */}
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Past Cycles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockCycles.filter(cycle => cycle.status === 'completed').map(cycle => (
              <Card key={cycle.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{cycle.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
                      </CardDescription>
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-800">
                      Completed
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Students</p>
                      <p className="font-medium">{cycle.totalStudents}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Completed</p>
                      <p className="font-medium">{cycle.completedInternships}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pending</p>
                      <p className="font-medium">{cycle.pendingReports}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                    <Download size={14} />
                    <span>Export</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Create/Edit Cycle Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedCycle ? 'Edit Internship Cycle' : 'Create New Internship Cycle'}
              </DialogTitle>
              <DialogDescription>
                {selectedCycle 
                  ? 'Update the details of this internship cycle.'
                  : 'Set up a new internship cycle with start and end dates.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Cycle Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={newCycle.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Spring 2024"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="startDate">
                    Start Date
                  </label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={newCycle.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="endDate">
                    End Date
                  </label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={newCycle.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                >
                  {selectedCycle ? 'Update Cycle' : 'Create Cycle'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InternshipCycles;