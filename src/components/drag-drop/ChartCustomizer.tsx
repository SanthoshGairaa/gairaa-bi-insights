import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChartItem } from "../DashboardBuilder";
import { Palette, Settings, BarChart3 } from "lucide-react";

interface ChartCustomizerProps {
  selectedChart: ChartItem | null;
  onChartUpdate: (chart: ChartItem) => void;
  selectedDatabase: string;
  selectedTable: string;
}

const colorPresets = [
  { name: "Primary", value: "hsl(var(--primary))" },
  { name: "Secondary", value: "hsl(var(--secondary))" },
  { name: "Accent", value: "hsl(var(--accent))" },
  { name: "Success", value: "hsl(var(--success))" },
  { name: "Warning", value: "hsl(var(--warning))" },
  { name: "Destructive", value: "hsl(var(--destructive))" },
];

export const ChartCustomizer = ({
  selectedChart,
  onChartUpdate,
  selectedDatabase,
  selectedTable,
}: ChartCustomizerProps) => {
  const [activeTab, setActiveTab] = useState("general");

  if (!selectedChart) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Settings className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">No Chart Selected</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Select a chart from the canvas to customize it
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleTitleChange = (title: string) => {
    onChartUpdate({ ...selectedChart, title });
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    onChartUpdate({
      ...selectedChart,
      size: { ...selectedChart.size, [dimension]: value },
    });
  };

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    onChartUpdate({
      ...selectedChart,
      position: { ...selectedChart.position, [axis]: value },
    });
  };

  return (
    <div className="h-full bg-card border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Chart Settings
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {selectedChart.title}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <div className="p-4 overflow-y-auto">
          <TabsContent value="general" className="space-y-6 mt-0">
            {/* Basic Settings */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="chart-title" className="text-xs">Chart Title</Label>
                <Input
                  id="chart-title"
                  value={selectedChart.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Chart Type</Label>
                <Select
                  value={selectedChart.type}
                  onValueChange={(type) => onChartUpdate({ ...selectedChart, type: type as any })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="scatter">Scatter Plot</SelectItem>
                    <SelectItem value="doughnut">Doughnut Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Size & Position */}
            <div className="space-y-4">
              <h4 className="text-xs font-medium text-foreground">Size & Position</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Width</Label>
                  <div className="mt-1 space-y-2">
                    <Slider
                      value={[selectedChart.size.width]}
                      onValueChange={([value]) => handleSizeChange('width', value)}
                      max={1200}
                      min={200}
                      step={20}
                    />
                    <Input
                      type="number"
                      value={selectedChart.size.width}
                      onChange={(e) => handleSizeChange('width', parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs">Height</Label>
                  <div className="mt-1 space-y-2">
                    <Slider
                      value={[selectedChart.size.height]}
                      onValueChange={([value]) => handleSizeChange('height', value)}
                      max={800}
                      min={200}
                      step={20}
                    />
                    <Input
                      type="number"
                      value={selectedChart.size.height}
                      onChange={(e) => handleSizeChange('height', parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">X Position</Label>
                  <Input
                    type="number"
                    value={selectedChart.position.x}
                    onChange={(e) => handlePositionChange('x', parseInt(e.target.value))}
                    className="mt-1 h-8"
                  />
                </div>
                
                <div>
                  <Label className="text-xs">Y Position</Label>
                  <Input
                    type="number"
                    value={selectedChart.position.y}
                    onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
                    className="mt-1 h-8"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6 mt-0">
            <div className="space-y-4">
              <h4 className="text-xs font-medium text-foreground">Data Source</h4>
              
              {selectedDatabase && selectedTable ? (
                <Card className="p-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Database:</span>
                      <span className="text-xs font-medium">{selectedDatabase}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Table:</span>
                      <span className="text-xs font-medium">{selectedTable}</span>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs text-muted-foreground">
                    Select a database and table from the Data tab
                  </p>
                </div>
              )}

              {selectedTable && (
                <>
                  <div>
                    <Label className="text-xs">X-Axis Column</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">date</SelectItem>
                        <SelectItem value="category">category</SelectItem>
                        <SelectItem value="name">name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs">Y-Axis Column</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amount">amount</SelectItem>
                        <SelectItem value="count">count</SelectItem>
                        <SelectItem value="value">value</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Auto-refresh data</Label>
                    <Switch />
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-6 mt-0">
            <div className="space-y-4">
              <h4 className="text-xs font-medium text-foreground">Appearance</h4>
              
              <div>
                <Label className="text-xs">Color Scheme</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {colorPresets.map((color) => (
                    <Button
                      key={color.name}
                      variant="outline"
                      size="sm"
                      className="justify-start gap-2 h-8"
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs">{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs">Show Grid</Label>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs">Show Legend</Label>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs">Show Tooltip</Label>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs">Animated</Label>
                <Switch />
              </div>

              <div>
                <Label className="text-xs">Border Radius</Label>
                <Slider
                  defaultValue={[8]}
                  max={20}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};