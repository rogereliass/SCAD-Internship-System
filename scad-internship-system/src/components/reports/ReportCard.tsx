import React from 'react';
import { MessageSquare, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Report } from './Reports';

interface ReportCardProps {
  report: Report;
  onView: () => void;
  onAppeal: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onView, onAppeal }) => {
  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'flagged':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
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
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-scad-red transition-colors">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{report.jobTitle}</h3>
            <p className="text-sm text-gray-600">{report.companyName}</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(report.status)}
            <span className={`text-sm font-medium ${getStatusColor(report.status)}`}>
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">{report.title}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{report.introduction}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {report.comments.length} {report.comments.length === 1 ? 'Comment' : 'Comments'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {(report.status === 'rejected' || report.status === 'flagged') && (
              <Button
                variant="outline"
                size="sm"
                onClick={onAppeal}
                className="text-scad-red hover:text-scad-red/80 hover:bg-transparent"
              >
                Appeal
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onView}
              className="text-scad-red hover:text-scad-red/80 hover:bg-transparent"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard; 