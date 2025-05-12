import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Plus, ThumbsUp, ThumbsDown, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface CompanyEvaluation {
  id: string;
  companyName: string;
  recommended: boolean;
  comments: string;
  submittedAt: string;
}

interface CompanyEvaluationsProps {
  evaluations: CompanyEvaluation[];
  setEvaluations: (evaluations: CompanyEvaluation[]) => void;
  allCompanies: string[];
}

const CompanyEvaluations: React.FC<CompanyEvaluationsProps> = ({
  evaluations,
  setEvaluations,
  allCompanies
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isRecommended, setIsRecommended] = useState<boolean | null>(null);
  const [comments, setComments] = useState('');
  const [editingEvaluation, setEditingEvaluation] = useState<CompanyEvaluation | null>(null);

  // Get companies that haven't been evaluated yet
  const availableCompanies = allCompanies.filter(
    company => !evaluations.some(evaluation => evaluation.companyName === company)
  );

  const handleCreateEvaluation = () => {
    if (selectedCompany && isRecommended !== null) {
      const newEvaluation: CompanyEvaluation = {
        id: Date.now().toString(),
        companyName: selectedCompany,
        recommended: isRecommended,
        comments,
        submittedAt: new Date().toISOString()
      };
      setEvaluations([...evaluations, newEvaluation]);
      setIsCreateModalOpen(false);
      setSelectedCompany('');
      setIsRecommended(null);
      setComments('');
    }
  };

  const handleUpdateEvaluation = () => {
    if (editingEvaluation && isRecommended !== null) {
      const updatedEvaluation: CompanyEvaluation = {
        ...editingEvaluation,
        recommended: isRecommended,
        comments,
        submittedAt: new Date().toISOString()
      };
      setEvaluations(evaluations.map(evaluation => 
        evaluation.id === editingEvaluation.id ? updatedEvaluation : evaluation
      ));
      setIsUpdateModalOpen(false);
      setEditingEvaluation(null);
      setIsRecommended(null);
      setComments('');
    }
  };

  const handleDeleteEvaluation = (id: string) => {
    setEvaluations(evaluations.filter(evaluation => evaluation.id !== id));
  };

  const handleEditClick = (evaluation: CompanyEvaluation) => {
    setEditingEvaluation(evaluation);
    setIsRecommended(evaluation.recommended);
    setComments(evaluation.comments);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Company Evaluations</h2>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-scad-red hover:bg-scad-red/90 text-white"
          disabled={availableCompanies.length === 0}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Evaluation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evaluations.map((evaluation) => (
          <div
            key={evaluation.id}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{evaluation.companyName}</h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  evaluation.recommended
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {evaluation.recommended ? 'Recommended' : 'Not Recommended'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{evaluation.comments}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Submitted: {new Date(evaluation.submittedAt).toLocaleDateString()}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="text-blue-500 hover:text-blue-700 hover:bg-transparent"
                  onClick={() => handleEditClick(evaluation)}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 hover:bg-transparent"
                  onClick={() => handleDeleteEvaluation(evaluation.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {evaluations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No company evaluations submitted yet. Create your first evaluation to get started!
        </div>
      )}

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Company Evaluation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Company
              </label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a company" />
                </SelectTrigger>
                <SelectContent>
                  {availableCompanies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Would you recommend this company?
              </label>
              <div className="flex gap-4">
                <Button
                  variant={isRecommended === true ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setIsRecommended(true)}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes
                </Button>
                <Button
                  variant={isRecommended === false ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setIsRecommended(false)}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comments
              </label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your experience with this company..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateEvaluation}
              disabled={!selectedCompany || isRecommended === null}
              className="bg-scad-red hover:bg-scad-red/90 text-white"
            >
              Submit Evaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Company Evaluation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <p className="text-gray-900 font-medium">{editingEvaluation?.companyName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Would you recommend this company?
              </label>
              <div className="flex gap-4">
                <Button
                  variant={isRecommended === true ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setIsRecommended(true)}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes
                </Button>
                <Button
                  variant={isRecommended === false ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setIsRecommended(false)}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comments
              </label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your experience with this company..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateEvaluation}
              disabled={isRecommended === null}
              className="bg-scad-red hover:bg-scad-red/90 text-white"
            >
              Update Evaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyEvaluations; 