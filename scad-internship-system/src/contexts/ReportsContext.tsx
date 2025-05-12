import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';

// Types
export interface Report {
  id: number;
  studentName: string;
  studentId: string;
  major: string;
  company: string;
  position: string;
  submissionDate: string;
  reviewDate: string | null;
  status: 'pending' | 'accepted' | 'flagged' | 'rejected';
  reviewedBy: string | null;
  comment: string | null;
  skills: string[];
  learningOutcomes: string[];
}

interface ReportsContextType {
  reports: Report[];
  updateReport: (reportId: number, updates: Partial<Report>) => void;
  addReport: (report: Omit<Report, 'id'>) => void;
  deleteReport: (reportId: number) => void;
  getReportById: (reportId: number) => Report | undefined;
  getReportsByStatus: (status: Report['status']) => Report[];
  getReportsByMajor: (major: string) => Report[];
  getReportsByCompany: (company: string) => Report[];
}

// Initial mock data
const initialReports: Report[] = [
  {
    id: 1,
    studentName: "Ahmed Al-Farsi",
    studentId: "S12345",
    major: "Computer Science",
    company: "TechSolutions Inc.",
    position: "Frontend Developer Intern",
    submissionDate: "2023-11-10",
    reviewDate: null,
    status: "pending",
    reviewedBy: null,
    comment: null,
    skills: ["React", "JavaScript", "HTML/CSS"],
    learningOutcomes: [
      "Developed responsive web interfaces using React",
      "Collaborated with a team using Git version control",
      "Implemented REST API integration with backend services"
    ]
  },
  {
    id: 2,
    studentName: "Fatima Al-Balushi",
    studentId: "S12346",
    major: "Marketing",
    company: "MarketingPro Ltd.",
    position: "Marketing Assistant",
    submissionDate: "2023-11-08",
    reviewDate: "2023-11-12",
    status: "accepted",
    reviewedBy: "Dr. Mohammed",
    comment: "Excellent report with detailed learning outcomes and evidence of practical skills acquired.",
    skills: ["Social Media", "Content Creation", "Analytics"],
    learningOutcomes: [
      "Managed social media campaigns for multiple clients",
      "Created content calendars and marketing materials",
      "Analyzed campaign performance metrics and prepared reports"
    ]
  },
  {
    id: 3,
    studentName: "Omar Al-Habsi",
    studentId: "S12349",
    major: "Design",
    company: "DesignHub Co.",
    position: "UI/UX Design Intern",
    submissionDate: "2023-11-05",
    reviewDate: "2023-11-14",
    status: "flagged",
    reviewedBy: "Dr. Aisha",
    comment: "The report is well-structured but lacks sufficient detail about the specific design methodologies used. Please elaborate on the design process and user research methodology.",
    skills: ["Figma", "UI/UX", "User Research"],
    learningOutcomes: [
      "Designed user interfaces for mobile applications",
      "Conducted user testing sessions",
      "Created wireframes and prototypes"
    ]
  }
];

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>(initialReports);

  const updateReport = useCallback((reportId: number, updates: Partial<Report>) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId ? { ...report, ...updates } : report
      )
    );
    toast.success('Report updated successfully');
  }, []);

  const addReport = useCallback((report: Omit<Report, 'id'>) => {
    const newReport: Report = {
      ...report,
      id: Date.now(),
    };
    setReports(prevReports => [...prevReports, newReport]);
    toast.success('Report added successfully');
  }, []);

  const deleteReport = useCallback((reportId: number) => {
    setReports(prevReports => prevReports.filter(report => report.id !== reportId));
    toast.success('Report deleted successfully');
  }, []);

  const getReportById = useCallback((reportId: number) => {
    return reports.find(report => report.id === reportId);
  }, [reports]);

  const getReportsByStatus = useCallback((status: Report['status']) => {
    return reports.filter(report => report.status === status);
  }, [reports]);

  const getReportsByMajor = useCallback((major: string) => {
    return reports.filter(report => report.major === major);
  }, [reports]);

  const getReportsByCompany = useCallback((company: string) => {
    return reports.filter(report => report.company === company);
  }, [reports]);

  const value = {
    reports,
    updateReport,
    addReport,
    deleteReport,
    getReportById,
    getReportsByStatus,
    getReportsByMajor,
    getReportsByCompany,
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
}; 