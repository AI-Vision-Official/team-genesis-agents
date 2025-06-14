
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Calendar, Award, Star, TrendingUp } from 'lucide-react';
import type { Milestone, Certificate } from '@/types/education';

interface MilestoneTrackerProps {
  milestones: Milestone[];
  certificates: Certificate[];
}

export const MilestoneTracker = ({ milestones, certificates }: MilestoneTrackerProps) => {
  const totalCertificates = certificates.length;
  
  const nextMilestones = [
    { target: 100, name: "Century Club" },
    { target: 250, name: "Quarter Master" },
    { target: 500, name: "Knowledge Warrior" },
    { target: 750, name: "Learning Legend" },
    { target: 1000, name: "Certification Master" },
    { target: 2500, name: "Educational Elite" },
    { target: 5000, name: "Knowledge Titan" },
    { target: 10000, name: "World Record Candidate" }
  ];

  const getNextMilestone = () => {
    return nextMilestones.find(milestone => milestone.target > totalCertificates);
  };

  const getCurrentProgress = () => {
    const nextMilestone = getNextMilestone();
    if (!nextMilestone) return 100;
    
    const previousTarget = nextMilestones
      .filter(m => m.target < nextMilestone.target)
      .pop()?.target || 0;
    
    const progressInRange = totalCertificates - previousTarget;
    const rangeSize = nextMilestone.target - previousTarget;
    
    return (progressInRange / rangeSize) * 100;
  };

  const getCategoryLeader = () => {
    const categoryCounts: Record<string, number> = {};
    certificates.forEach(cert => {
      categoryCounts[cert.category] = (categoryCounts[cert.category] || 0) + 1;
    });
    
    const [category, count] = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)[0] || ['', 0];
    
    return { category, count };
  };

  const getStreakInfo = () => {
    // Calculate current learning streak (certificates in consecutive months)
    const sortedCerts = certificates
      .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
    
    let streak = 0;
    let currentMonth = new Date();
    currentMonth.setDate(1); // Start of current month
    
    for (const cert of sortedCerts) {
      const certDate = new Date(cert.issueDate);
      const certMonth = new Date(certDate.getFullYear(), certDate.getMonth(), 1);
      
      if (certMonth.getTime() === currentMonth.getTime()) {
        streak++;
        currentMonth.setMonth(currentMonth.getMonth() - 1);
      } else if (certMonth.getTime() < currentMonth.getTime()) {
        break;
      }
    }
    
    return streak;
  };

  const nextMilestone = getNextMilestone();
  const categoryLeader = getCategoryLeader();
  const learningStreak = getStreakInfo();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Milestone Tracker
          </CardTitle>
          <CardDescription>
            Track your educational achievements and progress toward world-class recognition
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Current Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCertificates}</div>
            <p className="text-sm text-muted-foreground">
              {nextMilestone ? `${nextMilestone.target - totalCertificates} to ${nextMilestone.name}` : 'World Record Level!'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Category Leader</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{categoryLeader.count}</div>
            <p className="text-sm text-muted-foreground capitalize">
              {categoryLeader.category.replace('_', ' ')} certificates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{learningStreak}</div>
            <p className="text-sm text-muted-foreground">
              Month{learningStreak !== 1 ? 's' : ''} with new certificates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Next Milestone Progress */}
      {nextMilestone && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Next Milestone: {nextMilestone.name}
            </CardTitle>
            <CardDescription>
              {nextMilestone.target - totalCertificates} more certificates needed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{totalCertificates} certificates</span>
                <span>{nextMilestone.target} target</span>
              </div>
              <Progress value={getCurrentProgress()} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {getCurrentProgress().toFixed(1)}% complete
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achieved Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achieved Milestones
          </CardTitle>
          <CardDescription>
            Your educational accomplishments and recognition-worthy achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No milestones yet</h3>
                <p className="text-muted-foreground">
                  Keep adding certificates to unlock your first milestone!
                </p>
              </div>
            ) : (
              milestones
                .sort((a, b) => new Date(b.achievedDate).getTime() - new Date(a.achievedDate).getTime())
                .map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        {milestone.title}
                        {milestone.isGuinnessWorthy && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Guinness-Worthy
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(milestone.achievedDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {milestone.certificateCount} certificates
                        </span>
                        {milestone.category && (
                          <Badge variant="outline" className="text-xs">
                            {milestone.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* World Record Preparation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            World Record Preparation
          </CardTitle>
          <CardDescription>
            Strategies and requirements for Guinness World Record recognition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Documentation Quality</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Ensure all certificates are properly verified and documented
                </p>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">85% verified</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Category Diversity</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Breadth across multiple educational categories
                </p>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">7 of 10 categories</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">World Record Preparation Tips</h4>
              <ul className="text-sm space-y-1">
                <li>• Maintain detailed records with verification numbers</li>
                <li>• Document the source and authenticity of each certificate</li>
                <li>• Keep digital and physical copies organized</li>
                <li>• Track learning hours and assessment scores where available</li>
                <li>• Consider having achievements independently verified</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
