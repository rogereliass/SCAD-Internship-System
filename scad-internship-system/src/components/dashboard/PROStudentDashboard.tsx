import { useState } from 'react';
import NotificationsButton from './../DashboardEssentials/NotificationsButton';
import TabsLayout from './../DashboardEssentials/TabsLayout';
import { TabsContent } from '../ui/tabs';
import ApplicationsTab from '../students/ApplicationsTab';
import ApplicationDetails from '../students/ApplicationDetails';
import { Search, Filter, FileText, Users, GraduationCap, PlusCircle, ClipboardCheck, ChevronRight, Video, Upload, BriefcaseIcon, Calendar, BookOpen, Star, MessageSquare, Play, Pause, Square, Download, ThumbsUp, MessageCircle, X, Send, CheckCircle2, Clock, BarChart2, Share2, Lock, AlertCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import InternshipCard from '../internships/InternshipCard';
import AvailableInternships from '../internships/AvailableInternships';
import CompanyCard from '../companies/CompanyCard';
import MyInternshipsTab from '../students/MyInternshipsTab';
import Reports from '../reports/Reports';
import CompanyEvaluations from '../reports/CompanyEvaluations';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: 'New Workshop Available',
    description: 'Advanced Interview Preparation Workshop is now open for registration.',
    time: '2 hours ago',
    type: 'workshop' as const,
    read: false
  },
  {
    id: 2,
    title: 'Career Readiness Report',
    description: 'Your Career Readiness Assessment report is now available.',
    time: '1 day ago',
    type: 'report' as const,
    read: false
  },
  {
    id: 3,
    title: 'Appointment Confirmed',
    description: 'Your career counseling session with Dr. Smith is confirmed for tomorrow.',
    time: '2 days ago',
    type: 'appointment' as const,
    read: true
  }
];

const majorsList = [
  'Computer Science 6th Semester',
  'Computer Science 5th Semester',
  'Computer Science 4th Semester',
  'Computer Science 3rd Semester',
  'Computer Science 2nd Semester',
  'Computer Science 1st Semester',
  'Information Technology 6th Semester',
  'Information Technology 5th Semester',
  'Information Technology 4th Semester',
  'Information Technology 3rd Semester',
  'Information Technology 2nd Semester',
  'Information Technology 1st Semester'
];

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  description: string;
  status: 'pending' | 'finalized' | 'accepted' | 'rejected';
  startDate?: string;
  endDate?: string;
  contactEmail?: string;
  industry: string;
  location: string;
  duration: string;
  isPaid: boolean;
  salary: string;
  requirements: string[];
}

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    studentName: 'Ahmed Al-Farsi',
    studentId: 'S12345',
    date: '2023-11-25',
    time: '10:00 AM',
    reason: 'Career Guidance',
    status: 'confirmed'
  },
  {
    id: 2,
    studentName: 'Fatima Al-Balushi',
    studentId: 'S12346',
    date: '2023-11-24',
    time: '11:30 AM',
    reason: 'Internship Report Discussion',
    status: 'pending'
  },
  {
    id: 3,
    studentName: 'Omar Al-Habsi',
    studentId: 'S12349',
    date: '2023-11-26',
    time: '2:00 PM',
    reason: 'Career Guidance',
    status: 'confirmed'
  }
];

// Mock workshops data with more examples
const mockWorkshops = [
  {
    id: 1,
    title: 'Advanced Interview Techniques',
    description: 'Learn proven strategies for acing technical and behavioral interviews.',
    date: '2024-03-25',
    time: '10:00 AM',
    duration: '2 hours',
    type: 'live',
    instructor: 'Dr. Sarah Johnson',
    maxAttendees: 50,
    currentAttendees: 35,
    status: 'upcoming',
    isRegistered: false,
    category: 'Career Development',
    level: 'Intermediate',
    prerequisites: ['Basic Interview Skills'],
    materials: ['Interview Preparation Guide', 'Sample Questions'],
    recordingUrl: null,
    rating: null,
    feedback: null,
    notes: '',
    certificateUrl: null
  },
  {
    id: 2,
    title: 'Resume Writing Masterclass',
    description: 'Create a compelling resume that stands out to employers.',
    date: '2024-03-20',
    time: '2:00 PM',
    duration: '1.5 hours',
    type: 'recorded',
    instructor: 'Prof. Michael Chen',
    maxAttendees: 100,
    currentAttendees: 75,
    status: 'completed',
    isRegistered: true,
    category: 'Career Development',
    level: 'Beginner',
    prerequisites: [],
    materials: ['Resume Templates', 'Writing Guide'],
    recordingUrl: 'https://example.com/workshop-recording',
    rating: 4.5,
    feedback: 'Great workshop with practical tips!',
    notes: 'Focus on achievements and metrics',
    certificateUrl: 'https://example.com/certificate.pdf'
  },
  {
    id: 3,
    title: 'Networking Strategies',
    description: 'Build your professional network effectively.',
    date: '2024-04-01',
    time: '11:00 AM',
    duration: '1 hour',
    type: 'live',
    instructor: 'Dr. Emily Brown',
    maxAttendees: 40,
    currentAttendees: 20,
    status: 'upcoming',
    isRegistered: false,
    category: 'Career Development',
    level: 'Beginner',
    prerequisites: [],
    materials: ['Networking Guide'],
    recordingUrl: null,
    rating: null,
    feedback: null,
    notes: '',
    certificateUrl: null
  },
  {
    id: 4,
    title: 'AI in Software Development',
    description: 'Explore how AI is transforming software development practices.',
    date: '2024-03-28',
    time: '3:00 PM',
    duration: '2.5 hours',
    type: 'live',
    instructor: 'Dr. James Wilson',
    maxAttendees: 60,
    currentAttendees: 45,
    status: 'upcoming',
    isRegistered: false,
    category: 'Technology',
    level: 'Advanced',
    prerequisites: ['Basic Programming Knowledge'],
    materials: ['AI Tools Guide', 'Code Examples'],
    recordingUrl: null,
    rating: null,
    feedback: null,
    notes: '',
    certificateUrl: null
  }
];

// Mock chat messages for live workshops
const mockChatMessages = [
  { id: 1, user: 'Ahmed', message: 'Hello everyone!', timestamp: '10:00 AM' },
  { id: 2, user: 'Fatima', message: 'Hi Ahmed, excited for this workshop!', timestamp: '10:01 AM' },
  { id: 3, user: 'Omar', message: 'The instructor is great!', timestamp: '10:05 AM' }
];

interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  duration: string;
  totalQuestions: number;
  category: string;
  difficulty: string;
  status: 'available' | 'in-progress' | 'completed';
  score: number | null;
  completedAt: string | null;
  isPublic: boolean;
  assessmentQuestions: AssessmentQuestion[];
}

// Mock data
const mockAssessments: Assessment[] = [
  {
    id: 1,
    title: 'Technical Skills Assessment',
    description: 'Evaluate your programming and technical problem-solving abilities.',
    duration: '60 minutes',
    totalQuestions: 30,
    category: 'Technical',
    difficulty: 'Intermediate',
    status: 'available',
    score: null,
    completedAt: null,
    isPublic: false,
    assessmentQuestions: [
      {
        id: 1,
        question: 'What is the time complexity of binary search?',
        options: [
          'O(1)',
          'O(log n)',
          'O(n)',
          'O(n log n)'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: 'Soft Skills Evaluation',
    description: 'Assess your communication, teamwork, and problem-solving skills.',
    duration: '45 minutes',
    totalQuestions: 25,
    category: 'Soft Skills',
    difficulty: 'Beginner',
    status: 'completed',
    score: 85,
    completedAt: '2024-03-15',
    isPublic: true,
    assessmentQuestions: [
      {
        id: 1,
        question: 'How do you handle conflicts in a team setting?',
        options: [
          'Avoid the conflict',
          'Address it directly and professionally',
          'Complain to management',
          'Ignore it and focus on work'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: 'Career Readiness Assessment',
    description: 'Evaluate your career preparation and professional development.',
    duration: '90 minutes',
    totalQuestions: 40,
    category: 'Career Development',
    difficulty: 'Advanced',
    status: 'in-progress',
    score: null,
    completedAt: null,
    isPublic: false,
    assessmentQuestions: [
      {
        id: 1,
        question: 'What is the most important aspect of a professional resume?',
        options: [
          'Length',
          'Design',
          'Relevance and achievements',
          'References'
        ],
        correctAnswer: 2
      }
    ]
  }
];

const PROStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 987-6543',
    major: 'Computer Science 6th Semester',
    jobInterests: ['Frontend Development', 'UI/UX Design'],
    previousJobs: [
      { jobTitle: 'Part-time Web Developer', company: 'Webify', duration: '6 months' }
    ],
    collegeActivities: ['Coding Club', 'Student Council'],
    documents: [] as { name: string; url: string }[],
  });
  const [newJobInterest, setNewJobInterest] = useState('');
  const [newActivity, setNewActivity] = useState('');
  const [newJob, setNewJob] = useState({ jobTitle: '', company: '', duration: '' });
  const [newDocument, setNewDocument] = useState<File | null>(null);
  const [createReportData, setCreateReportData] = useState<{ jobTitle: string; companyName: string } | null>(null);
  const [reportsSubTab, setReportsSubTab] = useState<'reports' | 'evaluations'>('reports');
  const [companyEvaluations, setCompanyEvaluations] = useState<{
    id: string;
    companyName: string;
    recommended: boolean;
    comments: string;
    submittedAt: string;
  }[]>([]);
  const [workshops, setWorkshops] = useState(mockWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState<typeof mockWorkshops[0] | null>(null);
  const [workshopNotes, setWorkshopNotes] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [isPlaying, setIsPlaying] = useState(false);
  const [workshopFilter, setWorkshopFilter] = useState('all');
  const [workshopSearchTerm, setWorkshopSearchTerm] = useState('');
  const [workshopRating, setWorkshopRating] = useState(0);
  const [workshopFeedback, setWorkshopFeedback] = useState('');
  const [isLiveWorkshopOpen, setIsLiveWorkshopOpen] = useState(false);
  const [liveWorkshop, setLiveWorkshop] = useState<typeof mockWorkshops[0] | null>(null);
  const [liveChatMessages, setLiveChatMessages] = useState<Array<{
    id: number;
    user: string;
    message: string;
    timestamp: string;
  }>>([
    { id: 1, user: 'Instructor', message: 'Welcome to the workshop!', timestamp: '10:00 AM' },
    { id: 2, user: 'Ahmed', message: 'Hello everyone!', timestamp: '10:01 AM' },
    { id: 3, user: 'Fatima', message: 'Excited to learn!', timestamp: '10:02 AM' }
  ]);
  const [liveChatMessage, setLiveChatMessage] = useState('');
  const [workshopRatings, setWorkshopRatings] = useState<{
    [key: number]: {
      rating: number;
      feedback: string;
      timestamp: string;
    }
  }>({});
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [assessmentTimeLeft, setAssessmentTimeLeft] = useState<number | null>(null);
  const [assessmentFilter, setAssessmentFilter] = useState('all');
  const [assessmentSearchTerm, setAssessmentSearchTerm] = useState('');
  const [student, setStudent] = useState({
    name: 'Alex Johnson',
    major: 'Computer Science',
    semester: 6,
    completedInternships: 1,
    isPRO: true,
    proStatus: 'active',
    proExpiryDate: '2024-12-31',
    workshopsCompleted: 3,
    assessmentsCompleted: 2,
    upcomingAppointments: 1
  });

  const proTabs = [
    { value: "overview", label: "Overview" },
    { value: "internships", label: "Internships" },
    { value: "reports", label: "Reports & Evaluations" },
    { value: "appointments", label: "Appointments" },
    { value: "workshops", label: "Workshops" },
    { value: "assessments", label: "Assessments" },
    { value: "profile", label: "Profile" }
  ];

  const applications = [
    {
      id: '1',
      jobTitle: 'Frontend Developer Intern',
      companyName: 'TechCorp',
      description: 'A 3-month internship focused on React development',
      status: 'finalized' as const,
      startDate: '2024-06-01',
      endDate: '2024-09-01',
      contactEmail: 'hr@techcorp.com',
      industry: 'Information Technology',
      location: 'San Francisco, CA',
      duration: '3 months',
      isPaid: true,
      salary: '20',
      requirements: ['React', 'JavaScript', 'HTML', 'CSS']
    },
    {
      id: '2',
      jobTitle: 'UX Design Intern',
      companyName: 'DesignHub',
      description: 'Work on user interface design and user experience',
      status: 'pending' as const,
      industry: 'Design',
      location: 'New York, NY',
      duration: '6 months',
      isPaid: true,
      salary: '22',
      requirements: ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping']
    }
  ];

  const recommendedCompanies = [
    { 
      name: 'TechCorp', 
      industry: 'Information Technology', 
      email: 'careers@techcorp.com',
      contactPerson: 'John Smith',
      phone: '+1 (555) 123-4567',
      website: 'https://techcorp.com',
      location: 'San Francisco, CA',
      joinDate: '2023-01-15',
      about: 'TechCorp is a leading technology company specializing in innovative software solutions.',
      size: 'large' as const
    },
    { 
      name: 'DesignHub', 
      industry: 'Design', 
      email: 'jobs@designhub.com',
      contactPerson: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      website: 'https://designhub.com',
      location: 'New York, NY',
      joinDate: '2023-03-20',
      about: 'DesignHub is a creative design agency that helps brands establish their visual identity.',
      size: 'medium' as const
    },
    { 
      name: 'DataSystems', 
      industry: 'Data Analytics', 
      email: 'recruiting@datasystems.com',
      contactPerson: 'Michael Chen',
      phone: '+1 (555) 345-6789',
      website: 'https://datasystems.com',
      location: 'Boston, MA',
      joinDate: '2023-06-10',
      about: 'DataSystems is a data analytics company that helps organizations make data-driven decisions.',
      size: 'corporate' as const
    }
  ];

  const myInternships = [
    { id: '1', company: 'TechCorp', title: 'Frontend Developer', status: 'current', startDate: '2024-01-01', endDate: '2024-04-01' },
    { id: '2', company: 'DesignHub', title: 'UX Designer', status: 'completed', startDate: '2023-06-01', endDate: '2023-09-01' }
  ];

  const allCompanies = [
    'TechCorp',
    'DesignHub',
    'DataSystems',
    'MarketingPro',
    'FinanceFirst',
    'HealthTech',
    'EduTech',
    'GreenEnergy',
    'E-finance',
  ];

  const applicationStatusData = [
    { name: 'Accepted', value: 2, color: '#22c55e' },
    { name: 'Rejected', value: 1, color: '#ef4444' },
    { name: 'Pending', value: 3, color: '#eab308' },
    { name: 'Finalized', value: 1, color: '#3b82f6' },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplicationClick = (id: string) => {
    const application = applications.find(app => app.id === id);
    if (application) {
      setSelectedApplication(application);
    }
  };

  const handleInternshipClick = (id: string) => {
    const internship = myInternships.find(intern => intern.id === id);
    if (internship) {
      console.log('Internship clicked:', internship);
    }
  };

  const handleBack = () => {
    setSelectedApplication(null);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAddJobInterest = () => {
    if (newJobInterest.trim()) {
      setProfile(prev => ({ ...prev, jobInterests: [...prev.jobInterests, newJobInterest.trim()] }));
      setNewJobInterest('');
    }
  };

  const handleRemoveJobInterest = (index: number) => {
    setProfile(prev => ({ ...prev, jobInterests: prev.jobInterests.filter((_, i) => i !== index) }));
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setProfile(prev => ({ ...prev, collegeActivities: [...prev.collegeActivities, newActivity.trim()] }));
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (index: number) => {
    setProfile(prev => ({ ...prev, collegeActivities: prev.collegeActivities.filter((_, i) => i !== index) }));
  };

  const handleAddJob = () => {
    if (newJob.jobTitle && newJob.company && newJob.duration) {
      setProfile(prev => ({ ...prev, previousJobs: [...prev.previousJobs, newJob] }));
      setNewJob({ jobTitle: '', company: '', duration: '' });
    }
  };

  const handleRemoveJob = (index: number) => {
    setProfile(prev => ({ ...prev, previousJobs: prev.previousJobs.filter((_, i) => i !== index) }));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewDocument(file);
    }
  };

  const handleAddDocument = () => {
    if (newDocument) {
      const url = URL.createObjectURL(newDocument);
      setProfile(prev => ({ ...prev, documents: [...prev.documents, { name: newDocument.name, url }] }));
      setNewDocument(null);
    }
  };

  const handleCreateReportFromInternship = (internship) => {
    setActiveTab('reports');
    setCreateReportData({
      jobTitle: internship.title,
      companyName: internship.company,
    });
  };

  const handleCreateReport = () => {
    setActiveTab('reports');
    setReportsSubTab('reports');
    setCreateReportData({ jobTitle: '', companyName: '' });
  };

  const handleEvaluateCompany = () => {
    setActiveTab('reports');
    setReportsSubTab('evaluations');
    setTimeout(() => {
      const createEvaluationButton = document.querySelector('[data-testid="create-evaluation-button"]');
      if (createEvaluationButton instanceof HTMLElement) {
        createEvaluationButton.click();
      }
    }, 100);
  };

  const handleViewInternships = () => {
    setActiveTab('internships');
    setTimeout(() => {
      const element = document.getElementById('available-internships');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleUploadDocument = () => {
    setActiveTab('profile');
    setProfileEditMode(true);
    setTimeout(() => {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput instanceof HTMLElement) {
        fileInput.click();
      }
    }, 100);
  };

  const handleAppointmentAction = (id: number, action: 'accept' | 'reject') => {
    toast.success(`Appointment ${action === 'accept' ? 'accepted' : 'rejected'}`);
  };

  // Filter and search workshops
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(workshopSearchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(workshopSearchTerm.toLowerCase());
    
    const matchesFilter = workshopFilter === 'all' ||
                         (workshopFilter === 'upcoming' && workshop.status === 'upcoming') ||
                         (workshopFilter === 'registered' && workshop.isRegistered) ||
                         (workshopFilter === 'completed' && workshop.status === 'completed');

    return matchesSearch && matchesFilter;
  });

  const handleWorkshopRegister = (workshopId: number) => {
    setWorkshops(prevWorkshops => 
      prevWorkshops.map(workshop => 
        workshop.id === workshopId 
          ? { ...workshop, isRegistered: true, currentAttendees: workshop.currentAttendees + 1 }
          : workshop
      )
    );
    toast.success(`Successfully registered for workshop`);
  };

  const handleWorkshopUnregister = (workshopId: number) => {
    setWorkshops(prevWorkshops => 
      prevWorkshops.map(workshop => 
        workshop.id === workshopId 
          ? { ...workshop, isRegistered: false, currentAttendees: workshop.currentAttendees - 1 }
          : workshop
      )
    );
    toast.success(`Successfully unregistered from workshop`);
  };

  const handleWorkshopRating = (workshopId: number, rating: number, feedback: string) => {
    if (rating < 1 || rating > 5) {
      toast.error('Please select a rating between 1 and 5 stars');
      return;
    }

    if (!feedback.trim()) {
      toast.error('Please provide feedback');
      return;
    }

    const newRating = {
      rating,
      feedback: feedback.trim(),
      timestamp: new Date().toISOString()
    };

    setWorkshopRatings(prev => ({
      ...prev,
      [workshopId]: newRating
    }));

    // Update the workshop in the workshops list
    setWorkshops(prevWorkshops =>
      prevWorkshops.map(workshop =>
        workshop.id === workshopId
          ? {
              ...workshop,
              rating: newRating.rating,
              feedback: newRating.feedback,
              status: 'completed'
            }
          : workshop
      )
    );

    // Reset the form
    setWorkshopRating(0);
    setWorkshopFeedback('');
    toast.success('Thank you for your feedback!');
  };

  const handleSendChatMessage = (message: string) => {
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: 'You',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
    }
  };

  const handleDownloadCertificate = (workshopId: number) => {
    const workshop = mockWorkshops.find(w => w.id === workshopId);
    if (workshop?.certificateUrl) {
      window.open(workshop.certificateUrl, '_blank');
    }
  };

  const handleJoinLiveWorkshop = (workshop: typeof mockWorkshops[0]) => {
    setLiveWorkshop(workshop);
    setIsLiveWorkshopOpen(true);
  };

  const handleSendLiveChatMessage = (message: string) => {
    if (message.trim()) {
      const newMessage = {
        id: liveChatMessages.length + 1,
        user: 'You',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setLiveChatMessages(prev => [...prev, newMessage]);
      setLiveChatMessage('');

      // Simulate receiving a message after 1-3 seconds
      setTimeout(() => {
        const responses = [
          'Great question!',
          'That\'s a good point!',
          'Let me explain that...',
          'Thanks for sharing!',
          'I agree with you!'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const randomUser = ['Ahmed', 'Fatima', 'Omar', 'Sarah'][Math.floor(Math.random() * 4)];
        
        const responseMessage = {
          id: liveChatMessages.length + 2,
          user: randomUser,
          message: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setLiveChatMessages(prev => [...prev, responseMessage]);
      }, Math.random() * 2000 + 1000);
    }
  };

  const handleStartAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(assessment.assessmentQuestions.length).fill(-1));
    setAssessmentTimeLeft(parseInt(assessment.duration));
    setIsAssessmentModalOpen(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedAssessment!.assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitAssessment = () => {
    if (!selectedAssessment) return;

    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === selectedAssessment.assessmentQuestions[index].correctAnswer ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / selectedAssessment.assessmentQuestions.length) * 100);

    setAssessments(prevAssessments =>
      prevAssessments.map(assessment =>
        assessment.id === selectedAssessment.id
          ? {
              ...assessment,
              status: 'completed',
              score: percentage,
              completedAt: new Date().toISOString(),
              isPublic: false
            }
          : assessment
      )
    );

    setIsAssessmentModalOpen(false);
    toast.success(`Assessment completed! Your score: ${percentage}%`);
  };

  const handleTogglePublicScore = (assessmentId: number) => {
    setAssessments(prevAssessments =>
      prevAssessments.map(assessment =>
        assessment.id === assessmentId
          ? { ...assessment, isPublic: !assessment.isPublic }
          : assessment
      )
    );
    toast.success('Score visibility updated');
  };

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(assessmentSearchTerm.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(assessmentSearchTerm.toLowerCase());
    
    const matchesFilter = assessmentFilter === 'all' ||
                         (assessmentFilter === 'available' && assessment.status === 'available') ||
                         (assessmentFilter === 'in-progress' && assessment.status === 'in-progress') ||
                         (assessmentFilter === 'completed' && assessment.status === 'completed');

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-scad-dark mb-2">Welcome back, {student.name}!</h1>
            <span className="px-2 py-1 bg-scad-red text-white text-sm rounded-full">PRO</span>
          </div>
          <p className="text-gray-600">{student.major} | Semester {student.semester}</p>
          <p className="text-sm text-gray-500">PRO Status: Active until {student.proExpiryDate}</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <NotificationsButton notifications={mockNotifications} notificationsPagePath="/notifications/1" />
        </div>
      </div>

      {/* Tabs section */}
      <TabsLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={proTabs}
        className="mb-6"
      >
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-scad-dark mb-4 flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-scad-red" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                {/* Quick actions will be added here */}
                <p className="text-gray-500 text-sm">Quick actions coming soon...</p>
              </div>
            </div>

            {/* PRO Benefits Card */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-scad-dark mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-scad-red" />
                PRO Benefits
              </h2>
              <div className="space-y-3">
                {/* PRO benefits will be added here */}
                <p className="text-gray-500 text-sm">PRO benefits coming soon...</p>
              </div>
            </div>

            {/* Progress Overview Card */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-scad-dark mb-4 flex items-center">
                <ClipboardCheck className="h-5 w-5 mr-2 text-scad-red" />
                Progress Overview
              </h2>
              <div className="space-y-3">
                {/* Progress overview will be added here */}
                <p className="text-gray-500 text-sm">Progress overview coming soon...</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="internships">
          <div className="space-y-6">
            {/* Recommended Companies Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedCompanies.map((company, index) => (
                  <CompanyCard
                    key={index}
                    name={company.name}
                    industry={company.industry}
                    email={company.email}
                    size={company.size}
                    contactPerson={company.contactPerson}
                    phone={company.phone}
                    website={company.website}
                    location={company.location}
                    joinDate={company.joinDate}
                    about={company.about}
                  />
                ))}
              </div>
            </div>

            {/* Available Internships Section */}
            <div id="available-internships" className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-900">Available Internships</h2>
              </div>
              <div className="flex justify-end items-center mb-6">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search internships..."
                    className="pl-9 bg-white text-gray-900 border-gray-200 focus:border-scad-red focus:ring-scad-red/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-500 ml-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={industryFilter} onValueChange={setIndustryFilter}>
                      <SelectTrigger className="bg-white border-gray-200 text-gray-500 focus:border-scad-red focus:ring-scad-red/20">
                        <SelectValue placeholder="Filter by industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-gray-500">All Industries</SelectItem>
                        <SelectItem value="technology" className="text-gray-500">Technology</SelectItem>
                        <SelectItem value="design" className="text-gray-500">Design</SelectItem>
                        <SelectItem value="marketing" className="text-gray-500">Marketing</SelectItem>
                        <SelectItem value="finance" className="text-gray-500">Finance</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger className="bg-white border-gray-200 text-gray-500 focus:border-scad-red focus:ring-scad-red/20">
                        <SelectValue placeholder="Filter by duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-gray-500">All Durations</SelectItem>
                        <SelectItem value="1-3" className="text-gray-500">1-3 months</SelectItem>
                        <SelectItem value="3-6" className="text-gray-500">3-6 months</SelectItem>
                        <SelectItem value="6+" className="text-gray-500">6+ months</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                      <SelectTrigger className="bg-white border-gray-200 text-gray-500 focus:border-scad-red focus:ring-scad-red/20">
                        <SelectValue placeholder="Filter by payment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-gray-500">All Payment Types</SelectItem>
                        <SelectItem value="paid" className="text-gray-500">Paid</SelectItem>
                        <SelectItem value="unpaid" className="text-gray-500">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <AvailableInternships 
                onInternshipClick={handleInternshipClick} 
                searchTerm={searchTerm} 
                dateFilter={dateFilter}
                industryFilter={industryFilter}
                durationFilter={durationFilter}
                paymentFilter={paymentFilter}
              />
            </div>

            {/* My Applications Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search applications..."
                    className="pl-9 bg-white text-gray-900 border-gray-200 focus:border-scad-red focus:ring-scad-red/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <ApplicationsTab 
                applications={applications}
              />
            </div>

            {/* My Internships Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                  <h2 className="text-xl font-bold text-gray-900">My Internships</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      type="text"
                      placeholder="Search internships..."
                      className="pl-9 bg-white text-gray-900 border-gray-200 focus:border-scad-red focus:ring-scad-red/20"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px] bg-white text-gray-500 border-gray-200 focus:border-scad-red focus:ring-scad-red/20">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-gray-500">All Dates</SelectItem>
                      <SelectItem value="current" className="text-gray-500">Current</SelectItem>
                      <SelectItem value="completed" className="text-gray-500">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <MyInternshipsTab 
                onInternshipClick={handleInternshipClick} 
                onCreateReport={handleCreateReportFromInternship}
                searchTerm={searchTerm} 
                dateFilter={dateFilter} 
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Reports createReportData={createReportData} setCreateReportData={setCreateReportData} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <CompanyEvaluations
                evaluations={companyEvaluations}
                setEvaluations={setCompanyEvaluations}
                allCompanies={allCompanies}
                createButtonProps={{ 'data-testid': 'create-evaluation-button' }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          {/* Appointments Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Video Appointments</CardTitle>
                <CardDescription>Scheduled sessions with SCAD Office</CardDescription>
              </CardHeader>
              <CardContent>
                {mockAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {mockAppointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appointment.studentName}</p>
                            <p className="text-sm text-gray-500">{appointment.studentId}</p>
                          </div>
                          <Badge 
                            className={appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Reason:</span> {appointment.reason}
                          </p>
                          <p className="text-sm flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-500" />
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {appointment.status === 'confirmed' ? (
                            <Link to={'/appointments'}>
                              <Button 
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/90"
                              >
                                <Video size={16} />
                                <span>Join Call</span>
                              </Button>
                            </Link>
                          ) : (
                            <>
                              <Button 
                                variant="outline" 
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
                                onClick={() => handleAppointmentAction(appointment.id, 'reject')}
                              >
                                Reject
                              </Button>
                              <Button 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                              >
                                Accept
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No upcoming appointments
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link to="/appointments" className="w-full">
                  <Button variant="default" size="sm" className="w-full">
                    Manage Your Appointments
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className='max-h-[450px]'>
              <CardHeader>
                <CardTitle className="text-lg">Call Statistics</CardTitle>
                <CardDescription>Recent video call activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-black">This Week</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Total Calls</p>
                        <p className="font-medium text-black">8</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Avg. Duration</p>
                        <p className="font-medium text-black">24 mins</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Career Guidance</p>
                        <p className="font-medium text-black">5</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Report Discussion</p>
                        <p className="font-medium text-black">3</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-black">Pending Requests</p>
                    <div className="mt-2">
                      <p className="text-2xl font-bold text-black">3</p>
                      <p className="text-sm text-gray-600">Awaiting your response</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workshops">
          <div className="space-y-6">
            {/* Workshop Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-900">Workshops & Assessments</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      type="text"
                      placeholder="Search workshops..."
                      className="pl-9 text-gray-900"
                      value={workshopSearchTerm}
                      onChange={(e) => setWorkshopSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={workshopFilter} onValueChange={setWorkshopFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter workshops" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Workshops</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="registered">My Registrations</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Workshops Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkshops.map(workshop => (
                  <Card key={workshop.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{workshop.title}</CardTitle>
                          <CardDescription>{workshop.category} • {workshop.level}</CardDescription>
                        </div>
                        <Badge className={workshop.type === 'live' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                          {workshop.type === 'live' ? 'Live' : 'Recorded'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">{workshop.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>{workshop.date} at {workshop.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users size={14} />
                          <span>{workshop.currentAttendees}/{workshop.maxAttendees} registered</span>
                        </div>
                        {workshop.prerequisites.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">Prerequisites: </span>
                            {workshop.prerequisites.join(', ')}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      {workshop.status === 'upcoming' ? (
                        workshop.isRegistered ? (
                          <>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleWorkshopUnregister(workshop.id)}
                            >
                              Unregister
                            </Button>
                            {workshop.type === 'live' && (
                              <Button 
                                className="w-full bg-green-600 hover:bg-green-700"
                                onClick={() => handleJoinLiveWorkshop(workshop)}
                              >
                                <Video className="mr-2 h-4 w-4" />
                                Join Live
                              </Button>
                            )}
                          </>
                        ) : (
                          <Button 
                            className="w-full bg-scad-red hover:bg-scad-red/90 text-white"
                            onClick={() => handleWorkshopRegister(workshop.id)}
                          >
                            Register Now
                          </Button>
                        )
                      ) : (
                        <>
                          {workshop.recordingUrl && (
                            <Button 
                              className="w-full bg-scad-red hover:bg-scad-red/90 text-white"
                              onClick={() => setSelectedWorkshop(workshop)}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Watch Recording
                            </Button>
                          )}
                          {workshop.certificateUrl && (
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleDownloadCertificate(workshop.id)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Certificate
                            </Button>
                          )}
                        </>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Workshop Details Modal (Watch Recording) */}
            {selectedWorkshop && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <CardHeader className="flex flex-row items-center justify-between border-b">
                    <div>
                      <CardTitle className="text-gray-900">{selectedWorkshop.title}</CardTitle>
                      <CardDescription className="text-gray-500">
                        {selectedWorkshop.instructor} • {selectedWorkshop.duration}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      onClick={() => setSelectedWorkshop(null)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Workshop Video/Content */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                        {selectedWorkshop.type === 'live' ? (
                          <div className="text-white text-center">
                            <Video className="mx-auto h-12 w-12 mb-2" />
                            <p>Live Workshop</p>
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            {/* Video player would go here */}
                            <div className="absolute bottom-4 left-4 flex gap-2">
                              <Button 
                                size="icon" 
                                variant="secondary"
                                onClick={() => setIsPlaying(!isPlaying)}
                              >
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              </Button>
                              <Button size="icon" variant="secondary">
                                <Square className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Workshop Notes */}
                      <div className="space-y-2">
                        <h3 className="font-medium">Notes</h3>
                        <Textarea
                          placeholder="Take notes during the workshop..."
                          value={workshopNotes}
                          onChange={(e) => setWorkshopNotes(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>

                      {/* Workshop Materials */}
                      <div className="space-y-2">
                        <h3 className="font-medium">Materials</h3>
                        <div className="space-y-2">
                          {selectedWorkshop.materials.map((material, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span>{material}</span>
                              <Button variant="ghost" size="sm">Download</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Workshop Chat/Sidebar */}
                    <div className="space-y-4">
                      {/* Chat Section */}
                      {selectedWorkshop.type === 'live' && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Live Chat</h3>
                          <ScrollArea className="h-[300px] border rounded-lg p-4">
                            <div className="space-y-4">
                              {chatMessages.map(msg => (
                                <div key={msg.id} className="flex gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{msg.user[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-sm">{msg.user}</span>
                                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                    </div>
                                    <p className="text-sm">{msg.message}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Type a message..."
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage(chatMessage)}
                            />
                            <Button onClick={() => handleSendChatMessage(chatMessage)}>
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Workshop Rating */}
                      {selectedWorkshop.status === 'completed' && (
                        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium text-lg">Workshop Feedback</h3>
                          {workshopRatings[selectedWorkshop.id] ? (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-5 w-5 ${
                                        star <= workshopRatings[selectedWorkshop.id].rating
                                          ? 'text-yellow-400 fill-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {workshopRatings[selectedWorkshop.id].rating}/5
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(workshopRatings[selectedWorkshop.id].timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="bg-white p-3 rounded-md border">
                                <p className="text-sm text-gray-700">
                                  {workshopRatings[selectedWorkshop.id].feedback}
                                </p>
                              </div>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => {
                                  setWorkshopRating(workshopRatings[selectedWorkshop.id].rating);
                                  setWorkshopFeedback(workshopRatings[selectedWorkshop.id].feedback);
                                  // Remove the rating to show the form again
                                  setWorkshopRatings(prev => {
                                    const newRatings = { ...prev };
                                    delete newRatings[selectedWorkshop.id];
                                    return newRatings;
                                  });
                                }}
                              >
                                Edit Feedback
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Rate this workshop</label>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Button
                                      key={star}
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => setWorkshopRating(star)}
                                      className={`hover:bg-yellow-50 ${
                                        star <= workshopRating ? 'text-yellow-400' : 'text-gray-300'
                                      }`}
                                    >
                                      <Star
                                        className="h-6 w-6"
                                        fill={star <= workshopRating ? 'currentColor' : 'none'}
                                      />
                                    </Button>
                                  ))}
                                </div>
                                {workshopRating > 0 && (
                                  <p className="text-sm text-gray-600">
                                    {workshopRating === 1 && 'Poor'}
                                    {workshopRating === 2 && 'Fair'}
                                    {workshopRating === 3 && 'Good'}
                                    {workshopRating === 4 && 'Very Good'}
                                    {workshopRating === 5 && 'Excellent'}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Your Feedback</label>
                                <Textarea
                                  placeholder="Share your experience with this workshop..."
                                  value={workshopFeedback}
                                  onChange={(e) => setWorkshopFeedback(e.target.value)}
                                  className="min-h-[100px] resize-none"
                                />
                              </div>
                              <Button 
                                className="w-full bg-scad-red hover:bg-scad-red/90"
                                onClick={() => handleWorkshopRating(selectedWorkshop.id, workshopRating, workshopFeedback)}
                                disabled={workshopRating === 0 || !workshopFeedback.trim()}
                              >
                                Submit Feedback
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Workshop Progress */}
                      {selectedWorkshop.isRegistered && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Your Progress</h3>
                          <Progress value={selectedWorkshop.status === 'completed' ? 100 : 0} />
                          <p className="text-sm text-gray-500">
                            {selectedWorkshop.status === 'completed' ? 'Completed' : 'Not started'}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="assessments">
          <div className="space-y-6">
            {/* Assessments Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-scad-red rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-900">Online Assessments</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      type="text"
                      placeholder="Search assessments..."
                      className="pl-9 text-gray-900"
                      value={assessmentSearchTerm}
                      onChange={(e) => setAssessmentSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={assessmentFilter} onValueChange={setAssessmentFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter assessments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assessments</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Assessments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssessments.map(assessment => (
                  <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{assessment.title}</CardTitle>
                          <CardDescription>{assessment.category} • {assessment.difficulty}</CardDescription>
                        </div>
                        <Badge className={
                          assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          assessment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {assessment.status === 'completed' ? 'Completed' :
                           assessment.status === 'in-progress' ? 'In Progress' :
                           'Available'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">{assessment.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{assessment.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <BarChart2 size={14} />
                          <span>{assessment.totalQuestions} questions</span>
                        </div>
                        {assessment.status === 'completed' && (
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              <span className="font-medium">Score: {assessment.score}%</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTogglePublicScore(assessment.id)}
                              className={assessment.isPublic ? 'text-green-600' : 'text-gray-500'}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              {assessment.isPublic ? 'Public' : 'Private'}
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {assessment.status === 'available' && (
                        <Button 
                          className="w-full bg-scad-red hover:bg-scad-red/90 text-white"
                          onClick={() => handleStartAssessment(assessment)}
                        >
                          Start Assessment
                        </Button>
                      )}
                      {assessment.status === 'in-progress' && (
                        <Button 
                          className="w-full bg-scad-red hover:bg-scad-red/90 text-white"
                          onClick={() => handleStartAssessment(assessment)}
                        >
                          Continue Assessment
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Assessment Modal */}
          <Dialog open={isAssessmentModalOpen} onOpenChange={setIsAssessmentModalOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedAssessment?.title}</DialogTitle>
                <DialogDescription>
                  {selectedAssessment?.description}
                </DialogDescription>
              </DialogHeader>

              {selectedAssessment && (
                <div className="space-y-6">
                  {/* Progress and Timer */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(currentQuestion + 1) / selectedAssessment.assessmentQuestions.length * 100} 
                        className="w-48"
                      />
                      <span className="text-sm text-gray-500">
                        Question {currentQuestion + 1} of {selectedAssessment.assessmentQuestions.length}
                      </span>
                    </div>
                    {assessmentTimeLeft !== null && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{Math.floor(assessmentTimeLeft / 60)}:{(assessmentTimeLeft % 60).toString().padStart(2, '0')}</span>
                      </div>
                    )}
                  </div>

                  {/* Current Question */}
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      {selectedAssessment.assessmentQuestions[currentQuestion].question}
                    </h3>
                    <RadioGroup
                      value={selectedAnswers[currentQuestion].toString()}
                      onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                      className="space-y-3"
                    >
                      {selectedAssessment.assessmentQuestions[currentQuestion].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="text-sm">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    {currentQuestion === selectedAssessment.assessmentQuestions.length - 1 ? (
                      <Button
                        className="bg-scad-red hover:bg-scad-red/90 text-white"
                        onClick={handleSubmitAssessment}
                        disabled={selectedAnswers.includes(-1)}
                      >
                        Submit Assessment
                      </Button>
                    ) : (
                      <Button
                        className="bg-scad-red hover:bg-scad-red/90 text-white"
                        onClick={handleNextQuestion}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="profile">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            {!profileEditMode ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{profile.name}</h3>
                    <p className="text-gray-600">{profile.email} | {profile.phone}</p>
                    <p className="text-gray-600">Major: {profile.major}</p>
                  </div>
                  <Button onClick={() => setProfileEditMode(true)} className="bg-scad-red text-white">Edit Profile</Button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Job Interests</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {profile.jobInterests.map((interest, idx) => (
                      <li key={idx}>{interest}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Previous Internships / Part-time Jobs</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {profile.previousJobs.map((job, idx) => (
                      <li key={idx}>{job.jobTitle} at {job.company} ({job.duration})</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">College Activities</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {profile.collegeActivities.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Documents</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {profile.documents.map((doc, idx) => (
                      <li key={idx}><a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-scad-red underline">{doc.name}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); setProfileEditMode(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Major & Semester</label>
                    <select name="major" value={profile.major} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 text-gray-900">
                      {majorsList.map((major, idx) => (
                        <option key={idx} value={major}>{major}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Interests</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={newJobInterest} onChange={e => setNewJobInterest(e.target.value)} className="border rounded px-3 py-2 flex-1 text-gray-900" placeholder="Add job interest" />
                    <Button type="button" onClick={handleAddJobInterest}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.jobInterests.map((interest, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        {interest}
                        <button type="button" onClick={() => handleRemoveJobInterest(idx)} className="text-red-500 ml-1">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Internships / Part-time Jobs</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <input type="text" placeholder="Job Title" value={newJob.jobTitle} onChange={e => setNewJob(j => ({ ...j, jobTitle: e.target.value }))} className="border rounded px-3 py-2 text-gray-900" />
                    <input type="text" placeholder="Company Name" value={newJob.company} onChange={e => setNewJob(j => ({ ...j, company: e.target.value }))} className="border rounded px-3 py-2 text-gray-900" />
                    <input type="text" placeholder="Duration" value={newJob.duration} onChange={e => setNewJob(j => ({ ...j, duration: e.target.value }))} className="border rounded px-3 py-2 text-gray-900" />
                  </div>
                  <Button type="button" onClick={handleAddJob}>Add</Button>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.previousJobs.map((job, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        {job.jobTitle} at {job.company} ({job.duration})
                        <button type="button" onClick={() => handleRemoveJob(idx)} className="text-red-500 ml-1">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Activities</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={newActivity} onChange={e => setNewActivity(e.target.value)} className="border rounded px-3 py-2 flex-1 text-gray-900" placeholder="Add activity" />
                    <Button type="button" onClick={handleAddActivity}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.collegeActivities.map((act, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        {act}
                        <button type="button" onClick={() => handleRemoveActivity(idx)} className="text-red-500 ml-1">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Documents (CV, Cover Letter, Certificates)</label>
                  <div className="flex gap-2 mb-2">
                    <input type="file" onChange={handleDocumentUpload} />
                    <Button type="button" onClick={handleAddDocument} disabled={!newDocument}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.documents.map((doc, idx) => (
                      <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-scad-red underline">{doc.name}</a>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="submit" className="bg-scad-red text-white">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setProfileEditMode(false)}>Cancel</Button>
                </div>
              </form>
            )}
          </div>
        </TabsContent>
      </TabsLayout>

      {/* Live Workshop Popup */}
      {isLiveWorkshopOpen && liveWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[100vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <div>
                <CardTitle className="text-gray-900">{liveWorkshop.title}</CardTitle>
                <CardDescription className="text-gray-500">
                  {liveWorkshop.instructor} • {liveWorkshop.duration}
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => setIsLiveWorkshopOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-0">
              {/* Video Section */}
              <div className="md:col-span-2 space-y-4 p-6">
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg">Live Workshop in Progress</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {liveWorkshop.date} at {liveWorkshop.time}
                    </p>
                  </div>
                </div>

                {/* Workshop Materials */}
                <div className="space-y-2">
                  <h3 className="font-medium">Materials</h3>
                  <div className="space-y-2">
                    {liveWorkshop.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span>{material}</span>
                        <Button variant="ghost" size="sm" onClick={() => toast.success('Download Started!')}>Download</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Section */}
              <div className="bg-gray-50 p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Live Chat</h3>
                  <p className="text-sm text-gray-500">{liveWorkshop.currentAttendees} participants</p>
                </div>

                {/* Chat Messages */}
                <ScrollArea className="h-[400px] border rounded-lg p-4 bg-white">
                  <div className="space-y-4">
                    {liveChatMessages.map(msg => (
                      <div key={msg.id} className="flex gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-100 text-gray-700">
                            {msg.user[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {msg.user}
                            </span>
                            <span className="text-xs text-gray-500">
                              {msg.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={liveChatMessage}
                    onChange={(e) => setLiveChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendLiveChatMessage(liveChatMessage)}
                    className="bg-white"
                  />
                  <Button
                    onClick={() => handleSendLiveChatMessage(liveChatMessage)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PROStudentDashboard;
