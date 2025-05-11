import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner';

interface Report {
  id: number;
  studentName: string;
  studentId: string;
  major: string;
  company: string;
  position: string;
  submissionDate: string;
  status: string;
  reviewedBy: string | null;
  comment: string | null;
  skills: string[];
  learningOutcomes: string[];
}

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
  onReview: (report: Report) => void;
}

const ReportDetailsModal = ({ isOpen, onClose, report, onReview }: ReportDetailsModalProps) => {
  if (!report) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Internship Report</DialogTitle>
          <DialogDescription>
            Report submitted by {report.studentName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Report Header */}
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">{report.studentName}</h3>
              <p className="text-gray-500">{report.studentId} | {report.major}</p>
            </div>
            <div className="mt-3 md:mt-0 flex items-center">
              <Badge className={`${getStatusColor(report.status)}`}>
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </Badge>
            </div>
          </div>
          
          {/* Report Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Internship Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-gray-500">Company</dt>
                    <dd className="font-medium">{report.company}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Position</dt>
                    <dd className="font-medium">{report.position}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Submission Date</dt>
                    <dd className="font-medium">{report.submissionDate}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills & Competencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Skills Developed</h4>
                  <div className="flex flex-wrap gap-2">
                    {report.skills?.map((skill, i) => (
                      <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Learning Outcomes</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {report.learningOutcomes?.map((outcome, i) => (
                      <li key={i} className="text-gray-400">{outcome}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Review Comments */}
          {report.comment && (
            <Card className={report.status === 'rejected' ? 'border-red-200' : report.status === 'flagged' ? 'border-orange-200' : 'border-green-200'}>
              <CardHeader className={report.status === 'rejected' ? 'bg-red-50' : report.status === 'flagged' ? 'bg-orange-50' : 'bg-green-50'}>
                <CardTitle className="text-lg text-black">Reviewer Comments</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-900">{report.comment}</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <DialogFooter className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={() => toast.success(`Report downloaded`)}
          >
            <Download size={16} />
            <span>Download Report</span>
          </Button>
          <Button 
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            onClick={() => onReview(report)}
          >
            Review Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsModal; 