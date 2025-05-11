import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface StatisticsGraphsProps {
  courseInternshipData: Array<{
    name: string;
    internships: number;
  }>;
  companyRatingData: Array<{
    name: string;
    rating: number;
  }>;
  companyInternshipData: Array<{
    name: string;
    count: number;
  }>;
}

const StatisticsGraphs = ({ 
  courseInternshipData, 
  companyRatingData, 
  companyInternshipData 
}: StatisticsGraphsProps) => {
  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Internship Distribution</CardTitle>
            <CardDescription>Number of internships per course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseInternshipData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="internships" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company Ratings</CardTitle>
            <CardDescription>Average student ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyRatingData}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company Internship Count</CardTitle>
            <CardDescription>Total internships hosted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyInternshipData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsGraphs; 