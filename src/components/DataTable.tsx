import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Download,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

interface DataRow {
  id: string;
  customer: string;
  product: string;
  revenue: number;
  date: string;
  status: "completed" | "pending" | "cancelled";
  region: string;
}

const sampleData: DataRow[] = [
  {
    id: "TXN-001",
    customer: "Acme Corp",
    product: "Enterprise License",
    revenue: 125000,
    date: "2024-01-15",
    status: "completed",
    region: "North America"
  },
  {
    id: "TXN-002",
    customer: "Global Tech Inc",
    product: "Professional Service",
    revenue: 85000,
    date: "2024-01-18",
    status: "pending",
    region: "Europe"
  },
  {
    id: "TXN-003",
    customer: "StartupXYZ",
    product: "Basic Package",
    revenue: 15000,
    date: "2024-01-20",
    status: "completed",
    region: "Asia Pacific"
  },
  {
    id: "TXN-004",
    customer: "MegaCorp Ltd",
    product: "Custom Solution",
    revenue: 250000,
    date: "2024-01-22",
    status: "cancelled",
    region: "Europe"
  },
  {
    id: "TXN-005",
    customer: "InnovateCo",
    product: "Enterprise License",
    revenue: 175000,
    date: "2024-01-25",
    status: "completed",
    region: "North America"
  },
];

export const DataTable = () => {
  const [data, setData] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof DataRow | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleSort = (field: keyof DataRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedData = data
    .filter(row => {
      const matchesSearch = Object.values(row)
        .some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = filterStatus === "all" || row.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      const aString = aValue.toString().toLowerCase();
      const bString = bValue.toString().toLowerCase();
      
      if (sortDirection === "asc") {
        return aString < bString ? -1 : aString > bString ? 1 : 0;
      } else {
        return aString > bString ? -1 : aString < bString ? 1 : 0;
      }
    });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "secondary" as const;
      case "pending":
        return "outline" as const;
      case "cancelled":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Sales Transactions</CardTitle>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("id")}
                    className="h-auto p-0 font-semibold"
                  >
                    ID
                    {sortField === "id" && (
                      sortDirection === "asc" ? 
                        <SortAsc className="w-4 h-4 ml-1" /> : 
                        <SortDesc className="w-4 h-4 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("customer")}
                    className="h-auto p-0 font-semibold"
                  >
                    Customer
                    {sortField === "customer" && (
                      sortDirection === "asc" ? 
                        <SortAsc className="w-4 h-4 ml-1" /> : 
                        <SortDesc className="w-4 h-4 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("revenue")}
                    className="h-auto p-0 font-semibold"
                  >
                    Revenue
                    {sortField === "revenue" && (
                      sortDirection === "asc" ? 
                        <SortAsc className="w-4 h-4 ml-1" /> : 
                        <SortDesc className="w-4 h-4 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("date")}
                    className="h-auto p-0 font-semibold"
                  >
                    Date
                    {sortField === "date" && (
                      sortDirection === "asc" ? 
                        <SortAsc className="w-4 h-4 ml-1" /> : 
                        <SortDesc className="w-4 h-4 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-sm">{row.id}</TableCell>
                  <TableCell className="font-medium">{row.customer}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(row.revenue)}</TableCell>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(row.status)}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div>
            Showing {filteredAndSortedData.length} of {data.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};