
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface StudentDetailsProps {
  student: any;
  isOpen: boolean;
  onClose: () => void;
}

const StudentDetailsModal: React.FC<StudentDetailsProps> = ({
  student,
  isOpen,
  onClose
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#f3f3f3] max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900">{student.name}</DialogTitle>
          <DialogDescription className="text-lg text-gray-700">
            Student ID: {student.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{student.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Major</p>
              <p className="text-gray-900">{student.major}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="text-gray-900">{student.year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge className={
                student.status === 'active' 
                  ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
              }>
                {student.status}
              </Badge>
            </div>
          </div>
          
          {student.currentInternship && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Current Internship</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900">{student.currentInternship.title}</p>
                <p className="text-gray-700">{student.currentInternship.company}</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-gray-600">
                    {student.currentInternship.startDate} - {student.currentInternship.endDate}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {student.pastInternships && student.pastInternships.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Past Internships</h3>
              <div className="space-y-2">
                {student.pastInternships.map((internship, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">{internship.title}</p>
                    <p className="text-gray-700">{internship.company}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-600">
                        {internship.startDate} - {internship.endDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4 flex justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-gray-900 border-gray-300"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailsModal;