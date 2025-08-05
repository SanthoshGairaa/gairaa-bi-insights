import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { DraggableChartItem } from "./DraggableChartItem";
import { ChartItem } from "../DashboardBuilder";
import { cn } from "@/lib/utils";

interface DragCanvasProps {
  charts: ChartItem[];
  onChartSelect: (chart: ChartItem) => void;
  onChartUpdate: (chart: ChartItem) => void;
  onChartDelete: (chartId: string) => void;
  isDragging: boolean;
}

export const DragCanvas = ({
  charts,
  onChartSelect,
  onChartUpdate,
  onChartDelete,
  isDragging,
}: DragCanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative h-full bg-background/50 transition-colors",
        isOver && "bg-primary/5",
        isDragging && "bg-accent/20"
      )}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Drop zone indicator */}
      {charts.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-primary/40" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Start Building Your Dashboard</h3>
              <p className="text-muted-foreground">
                Drag chart types from the library to create your first visualization
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      <SortableContext items={charts.map(chart => chart.id)}>
        {charts.map((chart) => (
          <DraggableChartItem
            key={chart.id}
            chart={chart}
            onSelect={() => onChartSelect(chart)}
            onUpdate={onChartUpdate}
            onDelete={() => onChartDelete(chart.id)}
          />
        ))}
      </SortableContext>

      {/* Canvas overlay when dragging */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/5 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-primary">Drop here to add chart</p>
          </div>
        </div>
      )}
    </div>
  );
};