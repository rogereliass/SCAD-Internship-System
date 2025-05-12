import { Link } from 'react-router-dom';
import { FileText, ChevronRight, Download, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from "../ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { toast } from 'sonner';

interface OverviewCardsProps {
  mockStatistics: {
    unreviewedReports: number;
    averageReviewTime: string;
    topCourses: string[];
    topRatedCompanies: string[];
    topCompaniesByInternshipCount: string[];
  };
  reportStatusData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  onTabChange?: (tab: string) => void;
}

const OverviewCards = ({ mockStatistics, reportStatusData, onTabChange }: OverviewCardsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="w-full">
          <Card 
            className="hover:shadow-md transition-all duration-200 cursor-pointer w-full hover:bg-gray-100"
            onClick={() => onTabChange?.('reports')}
          >
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <FileText size={24} className="text-primary mb-2" />
                <h3 className="font-medium">Review Reports</h3>
                <p className="text-sm text-gray-500">{mockStatistics.unreviewedReports} reports pending review</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </CardContent>
          </Card>
        </div>

        <Link to="/companies-evaluations" state={{ from: 'faculty' }} className="w-full">
          <Card className="hover:shadow-md transition-all duration-200 cursor-pointer w-full hover:bg-gray-100">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <Building2 size={24} className="text-primary mb-2" />
                <h3 className="font-medium">View Companies' Evaluations</h3>
                <p className="text-sm text-gray-500">Access company performance metrics</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Review Time</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-3xl font-bold text-scad-dark">{mockStatistics.averageReviewTime}</div>
            <p className="text-sm text-gray-500">Time to review reports</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Status</CardTitle>
            <CardDescription>Current cycle reports by status</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-60 w-full max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {reportStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Courses</CardTitle>
            <CardDescription>Most active in internships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockStatistics.topCourses.map(course => (
                <div key={course} className="flex items-center justify-between">
                  <span className="text-sm">{course}</span>
                  <Badge variant="secondary" className="bg-scad-light text-scad-dark">{course}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Rated Companies</CardTitle>
            <CardDescription>Highest rated by students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockStatistics.topRatedCompanies.map(company => (
                <div key={company} className="flex items-center justify-between">
                  <span className="text-sm">{company}</span>
                  <Badge variant="secondary" className="bg-scad-light text-scad-dark">{company}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Companies</CardTitle>
            <CardDescription>By internship count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockStatistics.topCompaniesByInternshipCount.map(company => (
                <div key={company} className="flex items-center justify-between">
                  <span className="text-sm">{company}</span>
                  <Badge variant="secondary" className="bg-scad-light text-scad-dark">{company}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => toast.success('Report generation started')}
          className="flex items-center gap-2 bg-scad-dark hover:bg-scad-dark/90"
        >
          <Download size={16} />
          <span>Generate Report</span>
        </Button>
      </div>
    </>
  );
};

export default OverviewCards; 