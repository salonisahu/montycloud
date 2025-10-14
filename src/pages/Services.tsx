import * as React from "react";
import { useMemo, useCallback } from "react";
import { RefreshCw, Search, ArrowUpDown } from "lucide-react";
import { capitalize } from "lodash";
import type { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { FilterDropdown } from "@/components/custom/FilterDropdown";

import type { Resource, ResourceQuery } from "@/types/services";
import { SERVICE_CARDS, STATUS_OPTIONS, ACCOUNT_OPTIONS, REGION_OPTIONS } from "@/constants/cloud";
import { useData } from "@/hooks/useData";
import { getStatusChip, formatPercentage, formatCurrency, formatDate } from "@/lib/utils";

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const className = getStatusChip(status as "running" | "stopped" | "degraded" | "terminated" | "pending" | "maintenance");
  return <span className={className}>{status}</span>;
};

const ServiceCard: React.FC<{
  title: string;
  desc: string;
  active: number;
  status: "running" | "down";
}> = ({ title, desc, active, status }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{desc}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Active Services</span>
          <span className="font-medium">{active}</span>
        </div>
        <div className="flex justify-between">
          <span>Status</span>
          <span className={status === "running" ? "text-green-600" : "text-red-600"}>{capitalize(status)}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FilterBar: React.FC = () => {
  const { state, setResourceQuery, resetResourceQuery } = useData();
  const { resources, resourceQuery } = state;

  const types = useMemo(() => Array.from(new Set(resources.map((r) => r.type))), [resources]);

  const handleFilterChange = useCallback(
    (key: keyof ResourceQuery, value: string | string[] | number) => {
      const newQuery = {
        ...resourceQuery,
        [key]: key === "text" ? value || undefined : value,
      };
      setResourceQuery(newQuery);
    },
    [resourceQuery, setResourceQuery]
  );

  const handleReset = useCallback(() => {
    resetResourceQuery();
  }, [resetResourceQuery]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
        <CardDescription>Search and slice resources by attributes</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-6">
        <div className="md:col-span-2">
          <InputGroup>
            <InputGroupInput placeholder="Search..." value={resourceQuery.text || ""} onChange={(e) => handleFilterChange("text", e.target.value)} />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <FilterDropdown
          label="Status"
          options={STATUS_OPTIONS}
          selectedValues={resourceQuery.status || []}
          onSelectionChange={(values) => handleFilterChange("status", values)}
        />
        <FilterDropdown
          label="Type"
          options={types}
          selectedValues={resourceQuery.type || []}
          onSelectionChange={(values) => handleFilterChange("type", values)}
        />
        <FilterDropdown
          label="Account"
          options={ACCOUNT_OPTIONS}
          selectedValues={resourceQuery.account || []}
          onSelectionChange={(values) => handleFilterChange("account", values)}
        />
        <FilterDropdown
          label="Region"
          options={REGION_OPTIONS}
          selectedValues={resourceQuery.region || []}
          onSelectionChange={(values) => handleFilterChange("region", values)}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-md border border-input bg-white px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring hover:bg-accent/50 flex items-center"
            onClick={handleReset}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ResourcesTable: React.FC<{ resources: Resource[] }> = ({ resources }) => {
  const columns = useMemo<ColumnDef<Resource>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <StatusChip status={row.original.status} />,
      },
      {
        accessorKey: "account",
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Account
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "region",
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Region
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "tags.env",
        header: "Environment",
        cell: ({ row }) => row.original.tags?.env || "-",
      },
      {
        accessorKey: "cpu",
        header: () => <div className="text-right">CPU</div>,
        cell: ({ row }) => <div className="text-right font-medium">{formatPercentage(row.original.cpu)}</div>,
      },
      {
        accessorKey: "memory",
        header: () => <div className="text-right">Memory</div>,
        cell: ({ row }) => <div className="text-right font-medium">{formatPercentage(row.original.memory)}</div>,
      },
      {
        accessorKey: "cost",
        header: () => <div className="text-right">Hourly Cost</div>,
        cell: ({ row }) => <div className="text-right font-medium">{formatCurrency(row.original.cost)}</div>,
      },
      {
        accessorKey: "lastChecked",
        header: "Last Checked",
        cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.lastChecked)}</span>,
      },
    ],
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Resources</CardTitle>
        <CardDescription>Inventory with metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={resources} showFilters={false} showPagination={true} showColumnVisibility={true} />
      </CardContent>
    </Card>
  );
};

const Services: React.FC = () => {
  const { state } = useData();
  const { filteredResources } = state;

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Cloud Operations</h1>
        <p className="text-muted-foreground">Searchable, filterable cloud inventory with alerts and trends</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 rounded-lg">
        {SERVICE_CARDS.map((card: any, index: number) => (
          <ServiceCard key={`${card.title}-${index}`} title={card.title} desc={card.desc} active={card.active} status={card.status} />
        ))}
      </div>
      <FilterBar />
      <ResourcesTable resources={filteredResources} />
    </div>
  );
};

export default Services;
