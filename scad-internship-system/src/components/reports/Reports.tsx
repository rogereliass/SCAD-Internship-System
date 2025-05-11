import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Plus, MessageSquare, AlertCircle } from 'lucide-react';
import ReportCard from './ReportCard';
import CreateReportModal from './CreateReportModal';
import ReportDetailsModal from './ReportDetailsModal';
import AppealModal from './AppealModal';

export interface Report {
  id: string;
  jobTitle: string;
  companyName: string;
  status: 'accepted' | 'rejected' | 'flagged' | 'pending';
  title: string;
  introduction: string;
  body: string;
  submittedAt: string;
  relevantCourses: string[];
  comments: {
    id: string;
    content: string;
    author: string;
    timestamp: string;
  }[];
  appeal?: {
    message: string;
    submittedAt: string;
    status: 'pending' | 'accepted' | 'rejected';
  };
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      jobTitle: 'Frontend Developer Intern',
      companyName: 'TechCorp',
      status: 'accepted',
      title: 'Summer 2024 Internship Report',
      introduction: 'This report details my experience as a Frontend Developer Intern at TechCorp during the summer of 2024.',
      body: 'During my internship at TechCorp, I worked on several key projects...',
      submittedAt: '2024-03-15',
      relevantCourses: ['CS101', 'CS102'],
      comments: [
        {
          id: '1',
          content: 'Great work on the report! Very detailed and well-structured.',
          author: 'SCAD Advisor',
          timestamp: '2024-03-16'
        }
      ]
    },
    {
      id: '2',
      jobTitle: 'UX Design Intern',
      companyName: 'DesignHub',
      status: 'flagged',
      title: 'UX Design Internship Report',
      introduction: 'A comprehensive report on my UX Design internship experience.',
      body: 'My time at DesignHub was focused on user research and interface design...',
      submittedAt: '2024-03-10',
      relevantCourses: ['CS101', 'CS102'],
      comments: [
        {
          id: '1',
          content: 'Please provide more details about your specific contributions to the projects.',
          author: 'SCAD Advisor',
          timestamp: '2024-03-11'
        }
      ]
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);

  const handleCreateReport = (newReport: Omit<Report, 'id' | 'submittedAt' | 'comments'>) => {
    const report: Report = {
      ...newReport,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      comments: [],
      status: 'pending'
    };
    setReports([...reports, report]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
    setSelectedReport(null);
  };

  const handleUpdateReport = (updatedReport: Report) => {
    setReports(reports.map(report => 
      report.id === updatedReport.id ? updatedReport : report
    ));
    setSelectedReport(null);
  };

  const handleAppeal = (reportId: string, appealMessage: string) => {
    setReports(reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          appeal: {
            message: appealMessage,
            submittedAt: new Date().toISOString(),
            status: 'pending'
          }
        };
      }
      return report;
    }));
    setIsAppealModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Internship Reports</h2>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-scad-red hover:bg-scad-red/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onView={() => setSelectedReport(report)}
            onAppeal={() => {
              setSelectedReport(report);
              setIsAppealModalOpen(true);
            }}
          />
        ))}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No reports submitted yet. Create your first report to get started!
        </div>
      )}

      {isCreateModalOpen && (
        <CreateReportModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateReport}
        />
      )}

      {selectedReport && !isAppealModalOpen && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onDelete={handleDeleteReport}
          onUpdate={handleUpdateReport}
        />
      )}

      {isAppealModalOpen && selectedReport && (
        <AppealModal
          report={selectedReport}
          onClose={() => {
            setIsAppealModalOpen(false);
            setSelectedReport(null);
          }}
          onSubmit={handleAppeal}
        />
      )}
    </div>
  );
};

export default Reports; 