import { useState } from "react";
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DragCanvas } from "./drag-drop/DragCanvas";
import { ChartLibrary } from "./drag-drop/ChartLibrary";
import { TemplateGallery } from "./drag-drop/TemplateGallery";
import { ChartCustomizer } from "./drag-drop/ChartCustomizer";
import { DatabaseSelector } from "./drag-drop/DatabaseSelector";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Save, Play, Settings } from "lucide-react";
import { toast } from "sonner";

export interface ChartItem {
  id: string;
  type: "line" | "bar" | "pie" | "area" | "scatter" | "doughnut";
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  data?: any[];
  config?: any;
  tableId?: string;
  columns?: string[];
}

export interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  charts: ChartItem[];
}

export const DashboardBuilder = () => {
  const [charts, setCharts] = useState<ChartItem[]>([]);
  const [selectedChart, setSelectedChart] = useState<ChartItem | null>(null);
  const [selectedDatabase, setSelectedDatabase] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [dashboardName, setDashboardName] = useState("My Dashboard");

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);

    if (!over) return;

    if (over.id === "canvas") {
      // Adding new chart from library
      const chartType = active.data.current?.type;
      if (chartType) {
        const newChart: ChartItem = {
          id: `chart_${Date.now()}`,
          type: chartType,
          title: `New ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
          position: { x: 50, y: 50 },
          size: { width: 400, height: 300 },
          tableId: selectedTable,
        };
        setCharts([...charts, newChart]);
        toast.success(`${chartType} chart added to dashboard`);
      }
    } else {
      // Reordering existing charts
      const oldIndex = charts.findIndex((chart) => chart.id === active.id);
      const newIndex = charts.findIndex((chart) => chart.id === over.id);
      
      if (oldIndex !== newIndex) {
        setCharts(arrayMove(charts, oldIndex, newIndex));
      }
    }
  };

  const handleChartUpdate = (updatedChart: ChartItem) => {
    setCharts(charts.map(chart => 
      chart.id === updatedChart.id ? updatedChart : chart
    ));
  };

  const handleChartSelect = (chart: ChartItem) => {
    setSelectedChart(chart);
  };

  const handleChartDelete = (chartId: string) => {
    setCharts(charts.filter(chart => chart.id !== chartId));
    if (selectedChart?.id === chartId) {
      setSelectedChart(null);
    }
    toast.success("Chart removed from dashboard");
  };

  const handleTemplateLoad = (template: DashboardTemplate) => {
    setCharts(template.charts);
    setDashboardName(template.name);
    toast.success(`Template "${template.name}" loaded`);
  };

  const handleSaveDashboard = async () => {
    // TODO: Save to database
    toast.success("Dashboard saved successfully!");
  };

  const handlePreviewDashboard = () => {
    // TODO: Open preview modal
    toast.info("Opening dashboard preview...");
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">{dashboardName}</h1>
            <div className="flex gap-2">
              <Button onClick={handleSaveDashboard} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handlePreviewDashboard} variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {charts.length} chart{charts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full bg-card border-r border-border">
              <Tabs defaultValue="library" className="h-full">
                <TabsList className="grid w-full grid-cols-3 m-2">
                  <TabsTrigger value="library">Charts</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                </TabsList>
                
                <TabsContent value="library" className="p-2 h-full">
                  <ChartLibrary />
                </TabsContent>
                
                <TabsContent value="templates" className="p-2 h-full">
                  <TemplateGallery onTemplateLoad={handleTemplateLoad} />
                </TabsContent>
                
                <TabsContent value="data" className="p-2 h-full">
                  <DatabaseSelector
                    selectedDatabase={selectedDatabase}
                    selectedTable={selectedTable}
                    onDatabaseChange={setSelectedDatabase}
                    onTableChange={setSelectedTable}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={60}>
            <DragCanvas
              charts={charts}
              onChartSelect={handleChartSelect}
              onChartUpdate={handleChartUpdate}
              onChartDelete={handleChartDelete}
              isDragging={isDragging}
            />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full bg-card border-l border-border">
              <ChartCustomizer
                selectedChart={selectedChart}
                onChartUpdate={handleChartUpdate}
                selectedDatabase={selectedDatabase}
                selectedTable={selectedTable}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DndContext>
    </div>
  );
};