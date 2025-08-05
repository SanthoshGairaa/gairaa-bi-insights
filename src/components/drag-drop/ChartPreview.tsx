import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartItem } from "../DashboardBuilder";

interface ChartPreviewProps {
  chart: ChartItem;
}

// Sample data for preview
const sampleLineData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
];

const sampleBarData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 600 },
  { name: 'D', value: 200 },
];

const samplePieData = [
  { name: 'Desktop', value: 400, fill: 'hsl(var(--primary))' },
  { name: 'Mobile', value: 300, fill: 'hsl(var(--secondary))' },
  { name: 'Tablet', value: 200, fill: 'hsl(var(--accent))' },
];

const sampleScatterData = [
  { x: 100, y: 200 },
  { x: 120, y: 100 },
  { x: 170, y: 300 },
  { x: 140, y: 250 },
  { x: 150, y: 400 },
];

export const ChartPreview = ({ chart }: ChartPreviewProps) => {
  const data = chart.data || getSampleData(chart.type);

  function getSampleData(type: string) {
    switch (type) {
      case 'line':
      case 'area':
        return sampleLineData;
      case 'bar':
        return sampleBarData;
      case 'pie':
      case 'doughnut':
        return samplePieData;
      case 'scatter':
        return sampleScatterData;
      default:
        return sampleLineData;
    }
  }

  const renderChart = () => {
    switch (chart.type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={60}
              dataKey="value"
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill || `hsl(var(--primary))`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );

      case 'doughnut':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              dataKey="value"
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill || `hsl(var(--primary))`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary) / 0.3)"
              strokeWidth={2}
            />
          </AreaChart>
        );

      case 'scatter':
        return (
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
            <XAxis dataKey="x" type="number" stroke="hsl(var(--muted-foreground))" />
            <YAxis dataKey="y" type="number" stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Scatter dataKey="y" fill="hsl(var(--primary))" />
          </ScatterChart>
        );

      default:
        return <div className="flex items-center justify-center h-full text-muted-foreground">Preview not available</div>;
    }
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};