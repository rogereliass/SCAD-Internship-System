import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Report } from './Reports';
import { Checkbox } from '../ui/checkbox';

interface CreateReportModalProps {
  onClose: () => void;
  onSubmit: (report: Omit<Report, 'id' | 'submittedAt' | 'comments'>) => void;
  initialData?: { jobTitle: string; companyName: string };
}

const courses = [
  'Web Development',
  'Database Management',
  'UI/UX Design',
  'Software Engineering',
  'Data Structures',
  'Algorithms',
  'Computer Networks',
  'Operating Systems',
  'Mobile App Development',
  'Cloud Computing'
];

const CreateReportModal: React.FC<CreateReportModalProps> = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    jobTitle: initialData?.jobTitle || '',
    companyName: initialData?.companyName || '',
    title: '',
    introduction: '',
    body: '',
    relevantCourses: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'pending'
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseChange = (course: string) => {
    setFormData(prev => ({
      ...prev,
      relevantCourses: prev.relevantCourses.includes(course)
        ? prev.relevantCourses.filter(c => c !== course)
        : [...prev.relevantCourses, course]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Create New Report</h2>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
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
                  value={formData.companyName}
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
                value={formData.title}
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
                value={formData.introduction}
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
                value={formData.body}
                onChange={handleChange}
                required
                className="w-full min-h-[200px] text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relevant University Courses
              </label>
              <div className="grid grid-cols-2 gap-2">
                {courses.map((course) => (
                  <div key={course} className="flex items-center space-x-2">
                    <Checkbox
                      id={course}
                      checked={formData.relevantCourses.includes(course)}
                      onCheckedChange={() => handleCourseChange(course)}
                    />
                    <label
                      htmlFor={course}
                      className="text-sm font-medium text-gray-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {course}
                    </label>
                  </div>
                ))}
              </div>
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
                Submit Report
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReportModal; 