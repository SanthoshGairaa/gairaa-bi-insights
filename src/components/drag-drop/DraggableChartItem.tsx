import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartItem } from "../DashboardBuilder";
import { MoreHorizontal, Trash2, Copy, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartPreview } from "./ChartPreview";

interface DraggableChartItemProps {
  chart: ChartItem;
  onSelect: () => void;
  onUpdate: (chart: ChartItem) => void;
  onDelete: () => void;
}

export const DraggableChartItem = ({
  chart,
  onSelect,
  onUpdate,
  onDelete,
}: DraggableChartItemProps) => {
  const [isSelected, setIsSelected] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chart.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    left: chart.position.x,
    top: chart.position.y,
    width: chart.size.width,
    height: chart.size.height,
  };

  const handleSelect = () => {
    setIsSelected(true);
    onSelect();
  };

  const handleDuplicate = () => {
    const duplicatedChart: ChartItem = {
      ...chart,
      id: `chart_${Date.now()}`,
      title: `${chart.title} (Copy)`,
      position: { x: chart.position.x + 20, y: chart.position.y + 20 },
    };
    onUpdate(duplicatedChart);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`absolute cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? "ring-2 ring-primary shadow-lg" : ""
      } ${isDragging ? "opacity-50 z-50" : ""}`}
      onClick={handleSelect}
    >
      {/* Chart Header */}
      <div 
        className="flex items-center justify-between p-3 border-b border-border bg-card/50 rounded-t-lg"
        {...attributes}
        {...listeners}
      >
        <h4 className="text-sm font-medium text-foreground truncate">{chart.title}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSelect}>
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart Content */}
      <div className="p-4 h-full">
        <ChartPreview chart={chart} />
      </div>

      {/* Resize handles */}
      {isSelected && (
        <>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full cursor-se-resize" />
          <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-primary rounded-full cursor-s-resize transform -translate-x-1/2" />
          <div className="absolute -right-1 top-1/2 w-3 h-3 bg-primary rounded-full cursor-e-resize transform -translate-y-1/2" />
        </>
      )}
    </Card>
  );
};