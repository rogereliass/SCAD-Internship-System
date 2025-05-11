import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Report } from './Reports';

interface AppealModalProps {
  report: Report;
  onClose: () => void;
  onSubmit: (reportId: string, message: string) => void;
}

const AppealModal: React.FC<AppealModalProps> = ({ report, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(report.id, message);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Submit Appeal</h2>
              <p className="text-sm text-gray-600 mt-1">
                Appeal for {report.jobTitle} at {report.companyName}
              </p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Appeal Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full min-h-[200px] text-gray-900"
                placeholder="Please explain why you believe this report should be reconsidered..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-scad-red hover:bg-scad-red/90 text-white"
              >
                Submit Appeal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppealModal; 