import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  AreaChart, 
  ScatterChart,
  Circle
} from "lucide-react";

const chartTypes = [
  { type: "line", icon: LineChart, label: "Line Chart", description: "Show trends over time" },
  { type: "bar", icon: BarChart3, label: "Bar Chart", description: "Compare categories" },
  { type: "pie", icon: PieChart, label: "Pie Chart", description: "Show proportions" },
  { type: "area", icon: AreaChart, label: "Area Chart", description: "Show cumulative data" },
  { type: "scatter", icon: ScatterChart, label: "Scatter Plot", description: "Show correlations" },
  { type: "doughnut", icon: Circle, label: "Doughnut Chart", description: "Modern pie chart" },
];

interface DraggableChartProps {
  type: string;
  icon: React.ComponentType<any>;
  label: string;
  description: string;
}

const DraggableChart = ({ type, icon: Icon, label, description }: DraggableChartProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `chart-${type}`,
    data: { type },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col items-center text-center gap-2">
        <Icon className="w-8 h-8 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export const ChartLibrary = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Chart Types</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Drag charts to the canvas to add them to your dashboard
        </p>
      </div>
      
      <div className="grid gap-3">
        {chartTypes.map((chart) => (
          <DraggableChart
            key={chart.type}
            type={chart.type}
            icon={chart.icon}
            label={chart.label}
            description={chart.description}
          />
        ))}
      </div>
    </div>
  );
};