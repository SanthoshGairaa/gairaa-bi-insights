import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Share, 
  RefreshCw,
  Calendar,
  Bell,
  User
} from "lucide-react";

interface ToolbarProps {
  activeView: "dashboard" | "data" | "reports";
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const Toolbar = ({ activeView, showFilters, onToggleFilters }: ToolbarProps) => {
  return (
    <div className="bg-toolbar border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search and filters */}
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search dashboards, reports, or data..."
              className="pl-10 bg-background"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className={showFilters ? "bg-primary text-primary-foreground" : ""}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {showFilters && <Badge variant="secondary" className="ml-2">3</Badge>}
          </Button>

          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
        </div>

        {/* Right side - Actions and user */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>

          <div className="w-px h-6 bg-border mx-2"></div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-2 h-2 p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};