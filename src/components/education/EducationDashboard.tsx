
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Award, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Target,
  Trophy,
  Clock
} from 'lucide-react';
import type { CertificateSummary } from '@/types/education';

interface EducationDashboardProps {
  summary: CertificateSummary;
}

export const EducationDashboard = ({ summary }: EducationDashboardProps) => {
  const expirationRate = summary.totalCertificates > 0 
    ? (summary.expiringSoon / summary.totalCertificates) * 100 
    : 0;

  const activeRate = summary.totalCertificates > 0 
    ? (summary.activeCertificates / summary.totalCertificates) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalCertificates}</div>
            <p className="text-xs text-muted-foreground">
              +{summary.recentAchievements.length} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Certificates</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.activeCertificates}</div>
            <Progress value={activeRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.expiringSoon}</div>
            <p className="text-xs text-muted-foreground">
              Next 90 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestones</CardTitle>
            <Trophy className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.milestones.length}</div>
            <p className="text-xs text-muted-foreground">
              {summary.milestones.filter(m => m.isGuinnessWorthy).length} Guinness-worthy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Certificates by Category</CardTitle>
          <CardDescription>Distribution of your educational achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.entries(summary.categoryCounts).map(([category, count]) => (
              <div key={category} className="text-center">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {category.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Your latest certificates and accomplishments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.recentAchievements.slice(0, 5).map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{cert.title}</p>
                    <p className="text-sm text-muted-foreground">{cert.issuingOrganization}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {cert.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* World Record Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            World Record Progress
          </CardTitle>
          <CardDescription>Track your journey toward Guinness World Record recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Total Certificates</span>
              <span className="font-bold">{summary.totalCertificates}</span>
            </div>
            <Progress value={Math.min((summary.totalCertificates / 10000) * 100, 100)} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {10000 - summary.totalCertificates > 0 
                ? `${10000 - summary.totalCertificates} more certificates needed for 10K milestone`
                : "Congratulations! You've reached the 10K milestone!"
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
