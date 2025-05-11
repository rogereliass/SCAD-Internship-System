import React, { useState } from 'react';
import { X, MessageSquare, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Report } from './Reports';

interface ReportDetailsModalProps {
  report: Report;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (report: Report) => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  report,
  onClose,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReport, setEditedReport] = useState(report);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedReport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedReport);
    setIsEditing(false);
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'flagged':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{report.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(report.status)}
                <span className="text-sm font-medium text-gray-600">
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={editedReport.jobTitle}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={editedReport.companyName}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Report Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={editedReport.title}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="introduction" className="block text-sm font-medium text-gray-700 mb-1">
                  Introduction
                </label>
                <Textarea
                  id="introduction"
                  name="introduction"
                  value={editedReport.introduction}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[100px] text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                  Report Body
                </label>
                <Textarea
                  id="body"
                  name="body"
                  value={editedReport.body}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[200px] text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-scad-red hover:bg-scad-red/90 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Job Title</h3>
                  <p className="text-gray-600">{report.jobTitle}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Company Name</h3>
                  <p className="text-gray-600">{report.companyName}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Introduction</h3>
                <p className="text-gray-600 mt-1">{report.introduction}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Report Body</h3>
                <p className="text-gray-600 mt-1 whitespace-pre-wrap">{report.body}</p>
              </div>

              {report.comments.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">SCAD Comments</h3>
                  <div className="space-y-3">
                    {report.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.appeal && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Appeal</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">Status: {report.appeal.status}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(report.appeal.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{report.appeal.message}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => onDelete(report.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Delete Report
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-scad-red hover:bg-scad-red/90 text-white"
                >
                  Edit Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal; 