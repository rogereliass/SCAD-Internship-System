import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
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
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
  onSubmit: (status: string, comment: string) => void;
}

const ReviewModal = ({ isOpen, onClose, report, onSubmit }: ReviewModalProps) => {
  if (!report) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const status = formData.get('status') as string;
    const comment = formData.get('comment') as string;

    if (!status || (status !== 'accepted' && !comment.trim())) {
      toast.error("Please provide a comment for flagged/rejected reports");
      return;
    }

    onSubmit(status, comment);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Internship Report</DialogTitle>
          <DialogDescription>
            Provide feedback for {report.studentName}'s report
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="status">
              Review Status
            </label>
            <select 
              id="status"
              name="status"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue={report.status}
              required
            >
              <option value="accepted">Accepted</option>
              <option value="flagged">Flagged (Needs Clarification)</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="comment">
              Feedback
            </label>
            <Textarea
              id="comment"
              name="comment"
              defaultValue={report.comment || ''}
              placeholder="Provide feedback on the internship report"
              rows={4}
              required
            />
            <p className="text-sm text-gray-500">
              Please provide a detailed explanation for your feedback.
            </p>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal; 