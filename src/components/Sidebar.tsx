import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Database, 
  FileText, 
  Settings, 
  Home, 
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";

interface SidebarProps {
  activeView: "dashboard" | "data" | "reports";
  onViewChange: (view: "dashboard" | "data" | "reports") => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "data", label: "Data", icon: Database },
  { id: "reports", label: "Reports", icon: FileText },
];

const quickStats = [
  { label: "Total Revenue", value: "$2.4M", icon: DollarSign, change: "+12%" },
  { label: "Active Users", value: "45,230", icon: Users, change: "+8%" },
  { label: "Growth Rate", value: "23.5%", icon: TrendingUp, change: "+3%" },
];

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-sidebar-foreground">Gairaa BI</h2>
            <p className="text-xs text-sidebar-foreground/60">Analytics Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-4">
          Navigation
        </div>
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(item.id as any)}
              className={cn(
                "w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-foreground/10",
                activeView === item.id && "bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
              )}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border/20">
        <div className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-3">
          Quick Stats
        </div>
        <div className="space-y-3">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-sidebar-foreground/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3 h-3 text-primary" />
                  <span className="text-xs text-sidebar-foreground/60">{stat.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-sidebar-foreground">{stat.value}</span>
                  <span className="text-xs text-success">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-border/20">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-foreground/10"
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );
};