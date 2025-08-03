import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  X,
  Filter,
  RotateCcw
} from "lucide-react";

const regions = [
  "North America",
  "Europe", 
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa"
];

const products = [
  "Enterprise License",
  "Professional Service", 
  "Basic Package",
  "Custom Solution",
  "Consulting"
];

const statuses = [
  "Completed",
  "Pending", 
  "Cancelled",
  "Processing"
];

export const FilterPanel = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("last30days");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");

  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions([...selectedRegions, region]);
    } else {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    }
  };

  const handleProductChange = (product: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter(p => p !== product));
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    }
  };

  const clearAllFilters = () => {
    setSelectedRegions([]);
    setSelectedProducts([]);
    setSelectedStatuses([]);
    setDateRange("last30days");
    setMinRevenue("");
    setMaxRevenue("");
  };

  const getActiveFiltersCount = () => {
    return selectedRegions.length + selectedProducts.length + selectedStatuses.length + 
           (minRevenue ? 1 : 0) + (maxRevenue ? 1 : 0) + (dateRange !== "last30days" ? 1 : 0);
  };

  return (
    <div className="w-80 bg-panel border-l border-border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Date Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
              <SelectItem value="thisyear">This year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Revenue Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Revenue Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="minRevenue" className="text-xs">Minimum</Label>
            <Input
              id="minRevenue"
              placeholder="$0"
              value={minRevenue}
              onChange={(e) => setMinRevenue(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="maxRevenue" className="text-xs">Maximum</Label>
            <Input
              id="maxRevenue"
              placeholder="No limit"
              value={maxRevenue}
              onChange={(e) => setMaxRevenue(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Regions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Regions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox
                id={region}
                checked={selectedRegions.includes(region)}
                onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
              />
              <Label
                htmlFor={region}
                className="text-sm font-normal cursor-pointer"
              >
                {region}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {products.map((product) => (
            <div key={product} className="flex items-center space-x-2">
              <Checkbox
                id={product}
                checked={selectedProducts.includes(product)}
                onCheckedChange={(checked) => handleProductChange(product, checked as boolean)}
              />
              <Label
                htmlFor={product}
                className="text-sm font-normal cursor-pointer"
              >
                {product}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {statuses.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
              />
              <Label
                htmlFor={status}
                className="text-sm font-normal cursor-pointer"
              >
                {status}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Apply Filters */}
      <div className="space-y-2">
        <Button className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground">
          Apply Filters
        </Button>
        {getActiveFiltersCount() > 0 && (
          <Button variant="outline" className="w-full" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};