
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Activity 
} from 'lucide-react';
import type { FinancialMetrics, RevenueStream } from '@/types/missionControl';

export const RealTimeDashboard = () => {
  const [financialData, setFinancialData] = useState<FinancialMetrics | null>(null);
  const [revenueChart, setRevenueChart] = useState<any[]>([]);
  const [growthChart, setGrowthChart] = useState<any[]>([]);
  const [opportunitiesChart, setOpportunitiesChart] = useState<any[]>([]);

  useEffect(() => {
    // Mock real-time financial data
    const mockFinancials: FinancialMetrics = {
      totalRevenue: 2450000,
      monthlyRecurring: 185000,
      growthRate: 0.23,
      profitMargin: 0.34,
      cashFlow: 890000,
      projectedRevenue: 3200000,
      revenueStreams: [
        { id: '1', name: 'SaaS Subscriptions', amount: 1200000, growth: 0.18, forecast: [120, 125, 130, 135, 140], risk: 'low' },
        { id: '2', name: 'Enterprise Licenses', amount: 850000, growth: 0.35, forecast: [85, 92, 98, 105, 115], risk: 'medium' },
        { id: '3', name: 'Consulting Services', amount: 400000, growth: 0.12, forecast: [40, 42, 43, 45, 48], risk: 'low' }
      ],
      expenses: [
        { category: 'R&D', amount: 650000, trend: 'increasing', optimization: 0.15 },
        { category: 'Marketing', amount: 420000, trend: 'stable', optimization: 0.22 },
        { category: 'Operations', amount: 380000, trend: 'decreasing', optimization: 0.08 }
      ]
    };

    const mockRevenueChart = [
      { month: 'Jan', revenue: 180000, projection: 185000 },
      { month: 'Feb', revenue: 195000, projection: 192000 },
      { month: 'Mar', revenue: 210000, projection: 205000 },
      { month: 'Apr', revenue: 225000, projection: 220000 },
      { month: 'May', revenue: 240000, projection: 235000 },
      { month: 'Jun', revenue: 255000, projection: 250000 }
    ];

    const mockGrowthChart = [
      { category: 'New Customers', value: 1250, growth: 15 },
      { category: 'Product Revenue', value: 890000, growth: 23 },
      { category: 'Market Share', value: 12.5, growth: 8 },
      { category: 'Customer Satisfaction', value: 94, growth: 5 }
    ];

    const mockOpportunities = [
      { opportunity: 'AI Automation Tools', market: 'Enterprise', potential: 450000, probability: 0.78 },
      { opportunity: 'Mobile App Platform', market: 'SMB', potential: 280000, probability: 0.65 },
      { opportunity: 'Integration Services', market: 'Healthcare', potential: 320000, probability: 0.72 },
      { opportunity: 'Data Analytics Suite', market: 'Fintech', potential: 520000, probability: 0.84 }
    ];

    setFinancialData(mockFinancials);
    setRevenueChart(mockRevenueChart);
    setGrowthChart(mockGrowthChart);
    setOpportunitiesChart(mockOpportunities);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (!financialData) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Total Revenue</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(financialData.totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+{formatPercentage(financialData.growthRate)}</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Monthly Recurring</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(financialData.monthlyRecurring)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-blue-600" />
                  <span className="text-xs text-blue-600">+18% MoM</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Profit Margin</p>
                <p className="text-2xl font-bold text-purple-900">{formatPercentage(financialData.profitMargin)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                  <span className="text-xs text-purple-600">+2.1%</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Cash Flow</p>
                <p className="text-2xl font-bold text-orange-900">{formatCurrency(financialData.cashFlow)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-orange-600" />
                  <span className="text-xs text-orange-600">Healthy</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Projections</CardTitle>
            <CardDescription>Monthly performance against AI predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Actual Revenue", color: "#8b5cf6" },
                projection: { label: "AI Projection", color: "#06b6d4" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueChart}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projection" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#06b6d4", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Growth Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Identified Opportunities</CardTitle>
            <CardDescription>Market opportunities ranked by potential</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {opportunitiesChart.map((opp, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{opp.opportunity}</h4>
                    <p className="text-sm text-slate-600">{opp.market} Market</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(opp.potential)}</p>
                    <Badge className={`text-xs ${opp.probability > 0.7 ? 'bg-green-500' : opp.probability > 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                      {formatPercentage(opp.probability)} likely
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Streams */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Stream Analysis</CardTitle>
          <CardDescription>Performance and risk assessment by revenue source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {financialData.revenueStreams.map((stream) => (
              <div key={stream.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{stream.name}</h4>
                  <Badge className={stream.risk === 'low' ? 'bg-green-500' : stream.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}>
                    {stream.risk} risk
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(stream.amount)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">+{formatPercentage(stream.growth)} growth</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
