
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MessageSquare, Calendar, TrendingUp } from 'lucide-react';

export const ReviewHistory = () => {
  // Mock review history data
  const reviewHistory = [
    {
      id: '1',
      reviewer: 'CodeReviewer-Beta',
      reviewee: 'DataAnalyst-Alpha',
      task: 'Q4 Sales Analysis',
      date: new Date('2024-01-15'),
      overallRating: 8.5,
      status: 'completed',
      keyFeedback: 'Excellent data visualization skills, could improve report summarization'
    },
    {
      id: '2',
      reviewer: 'DataAnalyst-Alpha',
      reviewee: 'ProjectManager-Gamma',
      task: 'Team Coordination',
      date: new Date('2024-01-12'),
      overallRating: 9.2,
      status: 'completed',
      keyFeedback: 'Outstanding leadership and communication, very effective at keeping team aligned'
    },
    {
      id: '3',
      reviewer: 'ProjectManager-Gamma',
      reviewee: 'CodeReviewer-Beta',
      task: 'Code Quality Assessment',
      date: new Date('2024-01-10'),
      overallRating: 7.8,
      status: 'completed',
      keyFeedback: 'Thorough analysis but could provide more actionable recommendations'
    }
  ];

  const getStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{reviewHistory.length}</div>
            <p className="text-xs text-blue-600">Completed evaluations</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {(reviewHistory.reduce((sum, review) => sum + review.overallRating, 0) / reviewHistory.length).toFixed(1)}
            </div>
            <p className="text-xs text-green-600">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Improvement Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">+12%</div>
            <p className="text-xs text-purple-600">Rating increase this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Review History List */}
      <Card>
        <CardHeader>
          <CardTitle>Review History</CardTitle>
          <CardDescription>Complete history of peer evaluations and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewHistory.map((review) => (
              <div key={review.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-500 text-white text-xs">
                          {review.reviewer.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{review.reviewer}</span>
                    </div>
                    <span className="text-slate-400">→</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-purple-500 text-white text-xs">
                          {review.reviewee.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{review.reviewee}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      {review.date.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-sm">Task: {review.task}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {getStarRating(review.overallRating)}
                      </div>
                      <span className="text-sm font-medium">{review.overallRating}/10</span>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    {review.status}
                  </Badge>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Key Feedback</h4>
                  <p className="text-sm text-slate-700">{review.keyFeedback}</p>
                </div>

                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline">
                    View Full Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
