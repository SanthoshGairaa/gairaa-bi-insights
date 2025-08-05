import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Table, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface DatabaseSelectorProps {
  selectedDatabase: string;
  selectedTable: string;
  onDatabaseChange: (database: string) => void;
  onTableChange: (table: string) => void;
}

// Mock data - replace with actual database connections
const mockDatabases = [
  { id: "db1", name: "Sales Database", type: "PostgreSQL" },
  { id: "db2", name: "Analytics DB", type: "PostgreSQL" },
  { id: "db3", name: "Customer Data", type: "PostgreSQL" },
];

const mockTables = {
  db1: [
    { name: "sales", columns: ["id", "amount", "date", "customer_id", "product"] },
    { name: "customers", columns: ["id", "name", "email", "created_at"] },
    { name: "products", columns: ["id", "name", "price", "category"] },
  ],
  db2: [
    { name: "user_events", columns: ["id", "user_id", "event_type", "timestamp"] },
    { name: "pageviews", columns: ["id", "page", "views", "date"] },
  ],
  db3: [
    { name: "profiles", columns: ["id", "name", "age", "location", "segment"] },
    { name: "interactions", columns: ["id", "user_id", "type", "value", "date"] },
  ],
};

export const DatabaseSelector = ({
  selectedDatabase,
  selectedTable,
  onDatabaseChange,
  onTableChange,
}: DatabaseSelectorProps) => {
  const [databases, setDatabases] = useState(mockDatabases);
  const [tables, setTables] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAddConnection, setShowAddConnection] = useState(false);

  useEffect(() => {
    if (selectedDatabase) {
      setTables(mockTables[selectedDatabase as keyof typeof mockTables] || []);
    } else {
      setTables([]);
    }
  }, [selectedDatabase]);

  const handleDatabaseConnect = async (databaseId: string) => {
    setIsConnecting(true);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    onDatabaseChange(databaseId);
    setIsConnecting(false);
    toast.success("Connected to database successfully");
  };

  const handleAddConnection = () => {
    setShowAddConnection(true);
  };

  const handleRefreshTables = async () => {
    if (!selectedDatabase) return;
    
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success("Tables refreshed");
  };

  if (showAddConnection) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Add Database Connection</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAddConnection(false)}
          >
            Cancel
          </Button>
        </div>
        
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="db-name">Database Name</Label>
              <Input id="db-name" placeholder="My Database" />
            </div>
            
            <div>
              <Label htmlFor="db-host">Host</Label>
              <Input id="db-host" placeholder="localhost" />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="db-port">Port</Label>
                <Input id="db-port" placeholder="5432" />
              </div>
              <div>
                <Label htmlFor="db-name-field">Database</Label>
                <Input id="db-name-field" placeholder="mydb" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="db-user">Username</Label>
              <Input id="db-user" placeholder="username" />
            </div>
            
            <div>
              <Label htmlFor="db-password">Password</Label>
              <Input id="db-password" type="password" placeholder="password" />
            </div>
            
            <Button className="w-full">
              Test & Save Connection
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Data Sources</h3>
        <Button size="sm" variant="outline" onClick={handleAddConnection}>
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      {/* Database Selection */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Database</Label>
        <Select value={selectedDatabase} onValueChange={handleDatabaseConnect}>
          <SelectTrigger>
            <SelectValue placeholder="Select database" />
          </SelectTrigger>
          <SelectContent>
            {databases.map((db) => (
              <SelectItem key={db.id} value={db.id}>
                <div className="flex items-center gap-2">
                  <Database className="w-3 h-3" />
                  <div>
                    <div className="text-sm">{db.name}</div>
                    <div className="text-xs text-muted-foreground">{db.type}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table Selection */}
      {selectedDatabase && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Table</Label>
            <Button size="sm" variant="ghost" onClick={handleRefreshTables}>
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
          <Select value={selectedTable} onValueChange={onTableChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select table" />
            </SelectTrigger>
            <SelectContent>
              {tables.map((table) => (
                <SelectItem key={table.name} value={table.name}>
                  <div className="flex items-center gap-2">
                    <Table className="w-3 h-3" />
                    <div>
                      <div className="text-sm">{table.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {table.columns.length} columns
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Table Info */}
      {selectedTable && (
        <Card className="p-3">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">
              Table: {selectedTable}
            </h4>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Columns:</p>
              <div className="grid gap-1">
                {tables
                  .find(t => t.name === selectedTable)
                  ?.columns.map((column: string) => (
                    <div 
                      key={column} 
                      className="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {column}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {isConnecting && (
        <div className="text-center py-4">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Connecting...</p>
        </div>
      )}
    </div>
  );
};