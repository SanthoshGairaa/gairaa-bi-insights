import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown, 
  Maximize2,
  Download,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

interface ChartPanelProps {
  title: string;
  type: "line" | "bar" | "pie" | "area";
  className?: string;
}

// Sample data
const lineData = [
  { month: "Jan", value: 400000, target: 380000 },
  { month: "Feb", value: 450000, target: 420000 },
  { month: "Mar", value: 520000, target: 480000 },
  { month: "Apr", value: 480000, target: 500000 },
  { month: "May", value: 580000, target: 550000 },
  { month: "Jun", value: 620000, target: 580000 },
];

const barData = [
  { name: "Q1", value: 1200000, growth: 12 },
  { name: "Q2", value: 1400000, growth: 18 },
  { name: "Q3", value: 1100000, growth: -8 },
  { name: "Q4", value: 1600000, growth: 25 },
];

const pieData = [
  { name: "North America", value: 35, color: "hsl(210 100% 45%)" },
  { name: "Europe", value: 28, color: "hsl(25 95% 53%)" },
  { name: "Asia Pacific", value: 22, color: "hsl(142 76% 36%)" },
  { name: "Latin America", value: 15, color: "hsl(271 81% 56%)" },
];

const areaData = [
  { month: "Jan", new: 1200, returning: 2400 },
  { month: "Feb", new: 1400, returning: 2600 },
  { month: "Mar", new: 1600, returning: 2800 },
  { month: "Apr", new: 1300, returning: 2500 },
  { month: "May", new: 1800, returning: 3200 },
  { month: "Jun", new: 2000, returning: 3400 },
];

export const ChartPanel = ({ title, type, className }: ChartPanelProps) => {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="new" 
                stackId="1"
                stroke="hsl(var(--chart-1))" 
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="returning" 
                stackId="1"
                stroke="hsl(var(--chart-2))" 
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const getMetric = () => {
    switch (type) {
      case "line":
        return { value: "$620K", change: "+12.5%", positive: true };
      case "bar":
        return { value: "$5.3M", change: "+18.2%", positive: true };
      case "pie":
        return { value: "35%", change: "-2.1%", positive: false };
      case "area":
        return { value: "5,400", change: "+8.7%", positive: true };
      default:
        return { value: "N/A", change: "0%", positive: true };
    }
  };

  const metric = getMetric();

  return (
    <Card className={cn("shadow-card hover:shadow-panel transition-shadow", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-card-foreground">{metric.value}</span>
              <Badge 
                variant={metric.positive ? "secondary" : "destructive"} 
                className="flex items-center gap-1"
              >
                {metric.positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {metric.change}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};