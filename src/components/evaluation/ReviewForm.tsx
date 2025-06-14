
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';
import { DEFAULT_REVIEW_CRITERIA } from '@/data/evaluationCriteria';
import { ReviewCriteria, ReviewScore, ReviewFeedback } from '@/types/evaluation';

interface ReviewFormProps {
  agents: any[];
  tasks: any[];
}

export const ReviewForm = ({ agents, tasks }: ReviewFormProps) => {
  const [selectedReviewee, setSelectedReviewee] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [scores, setScores] = useState<ReviewScore[]>([]);
  const [feedback, setFeedback] = useState<ReviewFeedback>({
    strengths: [],
    improvements: [],
    specificSuggestions: [],
    collaborationNotes: '',
    overallRating: 5
  });
  const [currentStrength, setCurrentStrength] = useState('');
  const [currentImprovement, setCurrentImprovement] = useState('');
  const [currentSuggestion, setCurrentSuggestion] = useState('');

  const handleScoreChange = (criteriaId: string, pointId: string, value: number[]) => {
    setScores(prev => {
      const existing = prev.find(s => s.criteriaId === criteriaId && s.evaluationPointId === pointId);
      if (existing) {
        return prev.map(s => 
          s.criteriaId === criteriaId && s.evaluationPointId === pointId 
            ? { ...s, score: value[0] }
            : s
        );
      } else {
        return [...prev, {
          criteriaId,
          evaluationPointId: pointId,
          score: value[0],
          justification: ''
        }];
      }
    });
  };

  const addStrength = () => {
    if (currentStrength.trim()) {
      setFeedback(prev => ({
        ...prev,
        strengths: [...prev.strengths, currentStrength.trim()]
      }));
      setCurrentStrength('');
    }
  };

  const addImprovement = () => {
    if (currentImprovement.trim()) {
      setFeedback(prev => ({
        ...prev,
        improvements: [...prev.improvements, currentImprovement.trim()]
      }));
      setCurrentImprovement('');
    }
  };

  const addSuggestion = () => {
    if (currentSuggestion.trim()) {
      setFeedback(prev => ({
        ...prev,
        specificSuggestions: [...prev.specificSuggestions, currentSuggestion.trim()]
      }));
      setCurrentSuggestion('');
    }
  };

  const removeItem = (type: 'strengths' | 'improvements' | 'specificSuggestions', index: number) => {
    setFeedback(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const getScoreForPoint = (criteriaId: string, pointId: string) => {
    const score = scores.find(s => s.criteriaId === criteriaId && s.evaluationPointId === pointId);
    return score ? score.score : 5;
  };

  const submitReview = () => {
    console.log('Submitting review:', {
      reviewee: selectedReviewee,
      task: selectedTask,
      scores,
      feedback
    });
    // Here you would typically send this to your backend
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Peer Review</CardTitle>
          <CardDescription>Provide constructive feedback to help your teammate improve</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Agent and Task Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Agent to Review</label>
              <Select value={selectedReviewee} onValueChange={setSelectedReviewee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.name}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Task Context</label>
              <Select value={selectedTask} onValueChange={setSelectedTask}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Review Criteria */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Evaluation Criteria</h3>
            {DEFAULT_REVIEW_CRITERIA.map((criteria) => (
              <Card key={criteria.id} className="border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{criteria.name}</CardTitle>
                    <Badge variant="outline">Weight: {Math.round(criteria.weight * 100)}%</Badge>
                  </div>
                  <CardDescription>{criteria.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {criteria.evaluationPoints.map((point) => (
                    <div key={point.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">{point.description}</label>
                        <span className="text-sm text-slate-600">
                          Score: {getScoreForPoint(criteria.id, point.id)}/10
                        </span>
                      </div>
                      <Slider
                        value={[getScoreForPoint(criteria.id, point.id)]}
                        onValueChange={(value) => handleScoreChange(criteria.id, point.id, value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feedback Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detailed Feedback</h3>
            
            {/* Strengths */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="What did this agent do particularly well?"
                    value={currentStrength}
                    onChange={(e) => setCurrentStrength(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addStrength} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feedback.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {strength}
                      <button
                        onClick={() => removeItem('strengths', index)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="What areas could be improved? (be constructive and specific)"
                    value={currentImprovement}
                    onChange={(e) => setCurrentImprovement(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addImprovement} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feedback.improvements.map((improvement, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {improvement}
                      <button
                        onClick={() => removeItem('improvements', index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specific Suggestions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  Specific Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Provide actionable suggestions for improvement"
                    value={currentSuggestion}
                    onChange={(e) => setCurrentSuggestion(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addSuggestion} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feedback.specificSuggestions.map((suggestion, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                      {suggestion}
                      <button
                        onClick={() => removeItem('specificSuggestions', index)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Collaboration Notes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Collaboration Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="How well did this agent collaborate with the team? Any observations about their communication style or teamwork?"
                  value={feedback.collaborationNotes}
                  onChange={(e) => setFeedback(prev => ({ ...prev, collaborationNotes: e.target.value }))}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Overall Rating */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Overall Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall performance rating</span>
                    <span className="text-lg font-semibold">{feedback.overallRating}/10</span>
                  </div>
                  <Slider
                    value={[feedback.overallRating]}
                    onValueChange={(value) => setFeedback(prev => ({ ...prev, overallRating: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              onClick={submitReview}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={!selectedReviewee || !selectedTask}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
