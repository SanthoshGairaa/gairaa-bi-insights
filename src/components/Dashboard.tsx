import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Toolbar } from "./Toolbar";
import { ChartPanel } from "./ChartPanel";
import { DataTable } from "./DataTable";
import { FilterPanel } from "./FilterPanel";
import { DashboardBuilder } from "./DashboardBuilder";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Layout, Table, Filter } from "lucide-react";

export const Dashboard = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "data" | "reports" | "builder">("dashboard");
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <div className="flex-1 flex flex-col">
          <Toolbar 
            activeView={activeView}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
          
          <div className="flex flex-1">
            <main className="flex-1 p-6">
              {activeView === "dashboard" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">Sales Analytics Dashboard</h1>
                      <p className="text-muted-foreground mt-1">Real-time business insights and performance metrics</p>
                    </div>
                    <Button className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Widget
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <ChartPanel 
                      title="Revenue Trend" 
                      type="line" 
                      className="xl:col-span-2"
                    />
                    <ChartPanel 
                      title="Sales by Region" 
                      type="pie"
                    />
                    <ChartPanel 
                      title="Monthly Performance" 
                      type="bar"
                    />
                    <ChartPanel 
                      title="Customer Growth" 
                      type="area" 
                      className="xl:col-span-2"
                    />
                  </div>
                </div>
              )}
              
              {activeView === "data" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">Data Explorer</h1>
                      <p className="text-muted-foreground mt-1">Browse and analyze your data sources</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Layout className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline">
                        <Table className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  <DataTable />
                </div>
              )}
              
              {activeView === "reports" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">Reports</h1>
                      <p className="text-muted-foreground mt-1">Generated reports and analytics</p>
                    </div>
                    <Button className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      New Report
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i} className="p-6 shadow-card hover:shadow-panel transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-card-foreground">Report {i + 1}</h3>
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Generated analytics report for Q{(i % 4) + 1} 2024
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Last updated: {new Date().toLocaleDateString()}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {activeView === "builder" && <DashboardBuilder />}
            </main>
            
            {showFilters && <FilterPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};