import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle, Loader2, Pencil, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface EvaluationPopupProps {
  intern: {
    id: number;
    name: string;
    position: string;
    startDate: string;
    endDate: string;
    evaluationStatus?: 'pending' | 'submitted';
  } | null;
  existingEvaluation?: EvaluationData | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (evaluationData: EvaluationData) => void;
  onDelete?: (internId: number) => void;
}

export interface EvaluationData {
  id?: number;
  internId: number;
  performance: number;
  attendance: number;
  initiative: number;
  communication: number;
  teamwork: number;
  technicalSkills: number;
  overallRating: 1 | 2 | 3 | 4 | 5;
  strengths: string;
  improvements: string;
  additionalComments: string;
  recommendForHire: boolean;
  evaluatorName: string;
  evaluatorPosition: string;
  submittedAt?: string;
}

type Mode = 'create' | 'edit' | 'view';

const EvaluationPopup: React.FC<EvaluationPopupProps> = ({
  intern,
  existingEvaluation,
  isOpen,
  onClose,
  onSubmit,
  onDelete
}) => {
  const [mode, setMode] = useState<Mode>('create');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [evaluationData, setEvaluationData] = useState<Partial<EvaluationData>>({
    performance: 3,
    attendance: 3,
    initiative: 3,
    communication: 3,
    teamwork: 3,
    technicalSkills: 3,
    overallRating: 3,
    recommendForHire: true,
    strengths: '',
    improvements: '',
    additionalComments: '',
    evaluatorName: '',
    evaluatorPosition: ''
  });

  // Determine the mode and initialize form data when component mounts or props change
  useEffect(() => {
    if (existingEvaluation) {
      setMode('view'); // Start in view mode for existing evaluations
      setEvaluationData({...existingEvaluation});
    } else {
      setMode('create');
      // Reset to default values for new evaluations
      setEvaluationData({
        performance: 3,
        attendance: 3,
        initiative: 3,
        communication: 3,
        teamwork: 3,
        technicalSkills: 3,
        overallRating: 3,
        recommendForHire: true,
        strengths: '',
        improvements: '',
        additionalComments: '',
        evaluatorName: '',
        evaluatorPosition: ''
      });
    }
    // Reset submission status when dialog opens
    setSubmissionStatus('idle');
  }, [existingEvaluation, isOpen]);

  const handleChange = (field: keyof EvaluationData, value: any) => {
    setEvaluationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof EvaluationData) => {
    handleChange(field, parseInt(e.target.value));
  };

  const handleSubmit = async () => {
    if (!intern) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      // Prepare the complete evaluation data
      const completeEvaluation: EvaluationData = {
        ...evaluationData as EvaluationData,
        internId: intern.id,
        // Keep the original ID if this is an edit
        ...(existingEvaluation?.id ? { id: existingEvaluation.id } : {}),
        // Add submission timestamp
        submittedAt: new Date().toISOString()
      };

      // Submit the evaluation
      await onSubmit(completeEvaluation);
      
      setSubmissionStatus('success');
      setTimeout(() => {
        onClose();
        // Reset form and mode after successful submission
        setEvaluationData({
          performance: 3,
          attendance: 3,
          initiative: 3,
          communication: 3,
          teamwork: 3,
          technicalSkills: 3,
          overallRating: 3,
          recommendForHire: true,
          strengths: '',
          improvements: '',
          additionalComments: '',
          evaluatorName: '',
          evaluatorPosition: ''
        });
        setSubmissionStatus('idle');
        setMode('create');
      }, 1500);
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!intern || !onDelete) return;
    
    try {
      await onDelete(intern.id);
      // First close the delete dialog
      setDeleteDialogOpen(false);
      
      // Then use a small timeout to ensure state updates properly before closing the main dialog
      setTimeout(() => {
        onClose(); // Close the main evaluation popup
        toast.success("Evaluation deleted successfully");
      }, 100);
    } catch (error) {
      console.error("Error deleting evaluation:", error);
      setDeleteDialogOpen(false); // Close the delete dialog even on error
      toast.error("Failed to delete evaluation");
    }
  };

  const toggleEditMode = () => {
    setMode(mode === 'view' ? 'edit' : 'view');
  };

  if (!intern) return null;

  const formIsValid = evaluationData.evaluatorName && 
                      evaluationData.evaluatorPosition && 
                      evaluationData.strengths && 
                      evaluationData.improvements;

  const isReadOnly = mode === 'view';

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {
        if (!isSubmitting) onClose();
      }}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-xl text-gray-900">
                {mode === 'create' ? 'New Intern Evaluation' : 
                 mode === 'edit' ? 'Edit Evaluation' : 'Evaluation Details'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {intern.name} - {intern.position}
              </DialogDescription>
            </div>
            
            {existingEvaluation && (
              <div className="flex gap-2">
                {mode === 'view' ? (
                  <Button 
                    onClick={toggleEditMode} 
                    variant="outline"
                    className="text-xs flex items-center text-scad-red hover:bg-red-50 hover:border-scad-red"
                    size="sm"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Button>
                ) : (
                  <Button 
                    onClick={toggleEditMode} 
                    variant="outline"
                    className="text-xs flex items-center text-gray-600 hover:bg-gray-50"
                    size="sm"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    View
                  </Button>
                )}
                <Button 
                  onClick={() => setDeleteDialogOpen(true)}
                  variant="outline"
                  className="text-xs flex items-center text-red-600 hover:bg-red-50 hover:border-red-200"
                  size="sm"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete
                </Button>
              </div>
            )}
          </DialogHeader>

          {submissionStatus === 'success' ? (
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Evaluation Submitted</h3>
              <p className="text-center text-gray-600 mb-4">
                Thank you for providing feedback on {intern.name}'s internship performance.
              </p>
            </div>
          ) : submissionStatus === 'error' ? (
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="bg-red-100 rounded-full p-3 mb-4">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Submission Failed</h3>
              <p className="text-center text-gray-600 mb-4">
                There was an error submitting your evaluation. Please try again.
              </p>
              <Button 
                onClick={() => setSubmissionStatus('idle')}
                className="bg-scad-red hover:bg-scad-red/90"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {existingEvaluation?.submittedAt && mode === 'view' && (
                <div className="bg-gray-50 p-2 mb-4 rounded-md text-xs text-gray-500 flex items-center">
                  <span>Submitted: {new Date(existingEvaluation.submittedAt).toLocaleDateString()} at {new Date(existingEvaluation.submittedAt).toLocaleTimeString()}</span>
                </div>
              )}
              
              <div className="py-2 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                {/* Intern Details */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Intern:</span>
                      <span className="ml-2 font-medium text-gray-700">{intern.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Position:</span>
                      <span className="ml-2 font-medium text-gray-700">{intern.position}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Start Date:</span>
                      <span className="ml-2 font-medium text-gray-700">{intern.startDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">End Date:</span>
                      <span className="ml-2 font-medium text-gray-700">{intern.endDate}</span>
                    </div>
                  </div>
                </div>
                
                {/* Evaluator Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-0">Evaluator Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-0">
                      <Label htmlFor="evaluatorName">Your Name {!isReadOnly && '*'}</Label>
                      <Input
                        id="evaluatorName"
                        value={evaluationData.evaluatorName}
                        onChange={(e) => handleChange('evaluatorName', e.target.value)}
                        placeholder="Enter your full name"
                        className="border-gray-300 focus:border-gray-700 bg-white"
                        readOnly={isReadOnly}
                        required={!isReadOnly}
                      />
                    </div>
                    <div className="space-y-0">
                      <Label htmlFor="evaluatorPosition">Your Position {!isReadOnly && '*'}</Label>
                      <Input
                        id="evaluatorPosition"
                        value={evaluationData.evaluatorPosition}
                        onChange={(e) => handleChange('evaluatorPosition', e.target.value)}
                        placeholder="Enter your job title"
                        className="border-gray-300 focus:border-gray-700 bg-white"
                        readOnly={isReadOnly}
                        required={!isReadOnly}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Performance Ratings */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Performance Rating</h3>
                  <p className="text-xs text-gray-500 mb-4">Rate the intern on a scale of 1-5 for each category.</p>
                  
                  <div className="space-y-6">
                    {/* Performance */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-800">Overall Performance</h4>
                      <p className="text-xs text-gray-500">How well did the intern perform across all aspects of their role?</p>
                      <div className="flex justify-between mt-2">
                        <Label htmlFor="performance">Rating</Label>
                        <span className="font-medium text-gray-700">{evaluationData.performance}/5</span>
                      </div>
                      <input
                        type="range"
                        id="performance"
                        min="1"
                        max="5"
                        value={evaluationData.performance}
                        onChange={(e) => handleSliderChange(e, 'performance')}
                        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${isReadOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} accent-scad-red`}
                        disabled={isReadOnly}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                    
                    {/* Attendance */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-800">Attendance & Punctuality</h4>
                      <p className="text-xs text-gray-500">How reliable was the intern regarding attendance and timeliness?</p>
                      <div className="flex justify-between mt-2">
                        <Label htmlFor="attendance">Rating</Label>
                        <span className="font-medium text-gray-700">{evaluationData.attendance}/5</span>
                      </div>
                      <input
                        type="range"
                        id="attendance"
                        min="1"
                        max="5"
                        value={evaluationData.attendance}
                        onChange={(e) => handleSliderChange(e, 'attendance')}
                        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${isReadOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} accent-scad-red`}
                        disabled={isReadOnly}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Unreliable</span>
                        <span>Very Reliable</span>
                      </div>
                    </div>
                    
                    {/* Rest of the sliders with similar changes */}
                    {/* Initiative */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-800">Initiative & Proactivity</h4>
                      <p className="text-xs text-gray-500">How well did the intern take initiative and demonstrate proactive behavior?</p>
                      <div className="flex justify-between mt-2">
                        <Label htmlFor="initiative">Rating</Label>
                        <span className="font-medium text-gray-700">{evaluationData.initiative}/5</span>
                      </div>
                      <input
                        type="range"
                        id="initiative"
                        min="1"
                        max="5"
                        value={evaluationData.initiative}
                        onChange={(e) => handleSliderChange(e, 'initiative')}
                        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${isReadOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} accent-scad-red`}
                        disabled={isReadOnly}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Passive</span>
                        <span>Self-Starter</span>
                      </div>
                    </div>
                    
                    {/* Communication */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-800">Communication Skills</h4>
                      <p className="text-xs text-gray-500">How effectively did the intern communicate with team members and stakeholders?</p>
                      <div className="flex justify-between mt-2">
                        <Label htmlFor="communication">Rating</Label>
                        <span className="font-medium text-gray-700">{evaluationData.communication}/5</span>
                      </div>
                      <input
                        type="range"
                        id="communication"
                        min="1"
                        max="5"
                        value={evaluationData.communication}
                        onChange={(e) => handleSliderChange(e, 'communication')}
                        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${isReadOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} accent-scad-red`}
                        disabled={isReadOnly}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                    
                    {/* Teamwork */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-800">Teamwork & Collaboration</h4>
                      <p className="text-xs text-gray-500">How well did the intern work with others and contribute to team objectives?</p>
                      <div className="flex justify-between mt-2">
                        <Label htmlFor="teamwork">Rating</Label>
                        <span className="font-medium text-gray-700">{evaluationData.teamwork}/5</span>
                      </div>
                      <input
                        type="range"
                        id="teamwork"
                        min="1"
                        max="5"
                        value={evaluationData.teamwork}
                        onChange={(e) => handleSliderChange(e, 'teamwork')}
                        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${isReadOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} accent-scad-red`}
                        disabled={isReadOnly}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Struggles</span>
                        <span>Highly Collaborative</span>
                      </div>
                    </div>
                    
                    {/* Technical Skills */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-800">Technical Skills</h4>
                      <p className="text-xs text-gray-500">How proficient was the intern with the technical skills required for their role?</p>
                      <div className="flex justify-between mt-2">
                        <Label htmlFor="technicalSkills">Rating</Label>
                        <span className="font-medium text-gray-700">{evaluationData.technicalSkills}/5</span>
                      </div>
                      <input
                        type="range"
                        id="technicalSkills"
                        min="1"
                        max="5"
                        value={evaluationData.technicalSkills}
                        onChange={(e) => handleSliderChange(e, 'technicalSkills')}
                        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${isReadOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} accent-scad-red`}
                        disabled={isReadOnly}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Limited</span>
                        <span>Advanced</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Overall Rating */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 block mb-3">Overall Rating {!isReadOnly && '*'}</Label>
                  <RadioGroup 
                    value={evaluationData.overallRating?.toString()} 
                    onValueChange={(value) => !isReadOnly && handleChange('overallRating', parseInt(value) as 1|2|3|4|5)}
                    className="flex space-x-2"
                    disabled={isReadOnly}
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div key={rating} className={`flex items-center space-x-1 ${isReadOnly && evaluationData.overallRating === rating ? 'opacity-100' : isReadOnly ? 'opacity-50' : ''}`}>
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} disabled={isReadOnly} />
                        <Label htmlFor={`rating-${rating}`} className="text-sm">{rating}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Unsatisfactory</span>
                    <span>Excellent</span>
                  </div>
                </div>
                
                {/* Feedback Text Areas */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="strengths" className="text-sm font-medium text-gray-700">
                      Strengths Demonstrated {!isReadOnly && '*'}
                    </Label>
                    <Textarea
                      id="strengths"
                      value={evaluationData.strengths}
                      onChange={(e) => handleChange('strengths', e.target.value)}
                      placeholder="List key strengths and accomplishments"
                      className={`min-h-[80px] border-gray-300 focus:border-gray-700 bg-white ${isReadOnly ? 'cursor-not-allowed' : ''}`}
                      readOnly={isReadOnly}
                      required={!isReadOnly}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="improvements" className="text-sm font-medium text-gray-700">
                      Areas for Improvement {!isReadOnly && '*'}
                    </Label>
                    <Textarea
                      id="improvements"
                      value={evaluationData.improvements}
                      onChange={(e) => handleChange('improvements', e.target.value)}
                      placeholder="Suggest skills or areas that need development"
                      className={`min-h-[80px] border-gray-300 focus:border-gray-700 bg-white ${isReadOnly ? 'cursor-not-allowed' : ''}`}
                      readOnly={isReadOnly}
                      required={!isReadOnly}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalComments" className="text-sm font-medium text-gray-700">
                      Additional Comments
                    </Label>
                    <Textarea
                      id="additionalComments"
                      value={evaluationData.additionalComments}
                      onChange={(e) => handleChange('additionalComments', e.target.value)}
                      placeholder="Any other feedback or comments"
                      className={`min-h-[80px] border-gray-300 focus:border-gray-700 bg-white ${isReadOnly ? 'cursor-not-allowed' : ''}`}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
                
                {/* Recommendation */}
                <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
                  <Label className="text-sm font-bold text-gray-800 block mb-2">
                    Future Employment Recommendation
                  </Label>
                  <p className="text-xs text-gray-600 mb-3">Based on this internship, would you consider hiring this person for a future role?</p>
                  <RadioGroup 
                    value={evaluationData.recommendForHire ? 'yes' : 'no'} 
                    onValueChange={(value) => !isReadOnly && handleChange('recommendForHire', value === 'yes')}
                    className="flex space-x-4 text-gray-700"
                    disabled={isReadOnly}
                  >
                    <div className={`flex items-center space-x-2 ${isReadOnly && evaluationData.recommendForHire ? 'opacity-100' : isReadOnly ? 'opacity-50' : ''}`}>
                      <RadioGroupItem value="yes" id="recommend-yes" disabled={isReadOnly} />
                      <Label htmlFor="recommend-yes" className="font-medium">Yes</Label>
                    </div>
                    <div className={`flex items-center space-x-2 ${isReadOnly && !evaluationData.recommendForHire ? 'opacity-100' : isReadOnly ? 'opacity-50' : ''}`}>
                      <RadioGroupItem value="no" id="recommend-no" disabled={isReadOnly} />
                      <Label htmlFor="recommend-no" className="font-medium">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            
              <DialogFooter className="border-t pt-4">
                {!isReadOnly && <div className="text-xs text-gray-500 mr-auto">* Required fields</div>}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="text-gray-700 border-gray-300"
                >
                  {isReadOnly ? 'Close' : 'Cancel'}
                </Button>
                
                {!isReadOnly && (
                  <Button 
                    type="button" 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formIsValid}
                    className="bg-scad-red hover:bg-scad-red/90 ml-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : existingEvaluation ? 'Update Evaluation' : 'Submit Evaluation'}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-gray-900">
              <AlertCircle className="h-5 w-5 text-scad-red" /> 
              Delete Evaluation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete this evaluation? This action cannot be undone.
              <div className="mt-2 text-amber-600 bg-amber-50 p-2 rounded-md flex items-center gap-2 border border-amber-100">
                <AlertTriangle className="h-4 w-4" />
                <span>This will remove the evaluation record permanently.</span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t pt-3">
            <AlertDialogCancel className="text-gray-700 border-gray-300 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EvaluationPopup;