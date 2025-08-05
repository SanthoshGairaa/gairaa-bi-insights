import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardTemplate } from "../DashboardBuilder";
import { Eye, Download } from "lucide-react";

const predefinedTemplates: DashboardTemplate[] = [
  {
    id: "sales-overview",
    name: "Sales Overview",
    description: "Complete sales analytics dashboard",
    preview: "📊",
    charts: [
      {
        id: "sales-trend",
        type: "line",
        title: "Sales Trend",
        position: { x: 20, y: 20 },
        size: { width: 500, height: 300 },
      },
      {
        id: "revenue-by-region",
        type: "pie",
        title: "Revenue by Region",
        position: { x: 540, y: 20 },
        size: { width: 350, height: 300 },
      },
      {
        id: "monthly-performance",
        type: "bar",
        title: "Monthly Performance",
        position: { x: 20, y: 340 },
        size: { width: 400, height: 280 },
      },
      {
        id: "growth-metrics",
        type: "area",
        title: "Growth Metrics",
        position: { x: 440, y: 340 },
        size: { width: 450, height: 280 },
      },
    ],
  },
  {
    id: "financial-reporting",
    name: "Financial Reports",
    description: "Financial KPIs and metrics",
    preview: "💰",
    charts: [
      {
        id: "profit-loss",
        type: "line",
        title: "Profit & Loss",
        position: { x: 20, y: 20 },
        size: { width: 600, height: 350 },
      },
      {
        id: "expense-breakdown",
        type: "doughnut",
        title: "Expense Breakdown",
        position: { x: 640, y: 20 },
        size: { width: 300, height: 350 },
      },
      {
        id: "cash-flow",
        type: "area",
        title: "Cash Flow",
        position: { x: 20, y: 390 },
        size: { width: 920, height: 250 },
      },
    ],
  },
  {
    id: "customer-analytics",
    name: "Customer Analytics",
    description: "Customer behavior and demographics",
    preview: "👥",
    charts: [
      {
        id: "customer-acquisition",
        type: "bar",
        title: "Customer Acquisition",
        position: { x: 20, y: 20 },
        size: { width: 450, height: 300 },
      },
      {
        id: "demographics",
        type: "pie",
        title: "Customer Demographics",
        position: { x: 490, y: 20 },
        size: { width: 350, height: 300 },
      },
      {
        id: "retention-rate",
        type: "line",
        title: "Retention Rate",
        position: { x: 20, y: 340 },
        size: { width: 820, height: 280 },
      },
    ],
  },
  {
    id: "operational-metrics",
    name: "Operations Dashboard",
    description: "Operational KPIs and performance",
    preview: "⚙️",
    charts: [
      {
        id: "efficiency-metrics",
        type: "bar",
        title: "Efficiency Metrics",
        position: { x: 20, y: 20 },
        size: { width: 400, height: 280 },
      },
      {
        id: "resource-utilization",
        type: "doughnut",
        title: "Resource Utilization",
        position: { x: 440, y: 20 },
        size: { width: 280, height: 280 },
      },
      {
        id: "quality-scores",
        type: "line",
        title: "Quality Scores",
        position: { x: 740, y: 20 },
        size: { width: 400, height: 280 },
      },
      {
        id: "production-volume",
        type: "area",
        title: "Production Volume",
        position: { x: 20, y: 320 },
        size: { width: 1120, height: 300 },
      },
    ],
  },
];

interface TemplateGalleryProps {
  onTemplateLoad: (template: DashboardTemplate) => void;
}

export const TemplateGallery = ({ onTemplateLoad }: TemplateGalleryProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Dashboard Templates</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Start with a pre-built dashboard template
        </p>
      </div>

      <div className="space-y-3">
        {predefinedTemplates.map((template) => (
          <Card key={template.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{template.preview}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {template.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {template.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {template.charts.length} charts
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onTemplateLoad(template)}
                  className="flex-1"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Use Template
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          More templates coming soon
        </p>
      </div>
    </div>
  );
};