import React, { useMemo, useState, useCallback } from "react";
import { RefreshCw, Search } from "lucide-react";
import { capitalize } from "lodash";
import type { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FilterDropdown } from "@/components/custom/FilterDropdown";

import type { Resource, ResourceQuery, CloudMockData } from "@/types/services";
import { SERVICE_CARDS, STATUS_OPTIONS, SAMPLE_CLOUD_DATA } from "@/constants/cloud";

import { filterResources, getStatusChip, formatPercentage, formatCurrency, formatDate } from "@/lib/utils";

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

const FilterBar: React.FC<{
  data: CloudMockData;
  query: ResourceQuery;
  setQuery: (query: ResourceQuery) => void;
}> = ({ data, query, setQuery }) => {
  const accounts = data.metadata.accounts;
  const regions = data.metadata.regions;
  const types = Array.from(new Set(data.resources.map((r) => r.type)));

  const handleFilterChange = useCallback(
    (key: keyof ResourceQuery, value: string | string[] | number) => {
      setQuery({ ...query, [key]: value });
    },
    [query, setQuery]
  );

  const handleReset = useCallback(() => {
    setQuery({});
  }, [setQuery]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
        <CardDescription>Search and slice resources by attributes</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-6">
        <div className="md:col-span-2">
          <InputGroup>
            <InputGroupInput placeholder="Search..." value={query.text || ""} onChange={(e) => handleFilterChange("text", e.target.value)} />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <FilterDropdown
          label="Status"
          options={STATUS_OPTIONS}
          selectedValues={query.status || []}
          onSelectionChange={(values) => handleFilterChange("status", values)}
        />
        <FilterDropdown
          label="Type"
          options={types}
          selectedValues={query.type || []}
          onSelectionChange={(values) => handleFilterChange("type", values)}
        />
        <FilterDropdown
          label="Account"
          options={accounts.map((a) => a.accountName)}
          selectedValues={query.accountId || []}
          onSelectionChange={(values) => {
            const accountIds = values.map((name) => accounts.find((a) => a.accountName === name)?.accountId).filter(Boolean) as string[];
            handleFilterChange("accountId", accountIds);
          }}
        />
        <FilterDropdown
          label="Region"
          options={regions}
          selectedValues={query.region || []}
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
        accessorKey: "accountName",
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
        accessorKey: "metrics.current.cpu",
        header: () => <div className="text-right">CPU</div>,
        cell: ({ row }) => {
          const cpu = row.original.metrics?.current?.cpu ?? 0;
          return <div className="text-right font-medium">{formatPercentage(cpu)}</div>;
        },
      },
      {
        accessorKey: "metrics.current.memory",
        header: () => <div className="text-right">Memory</div>,
        cell: ({ row }) => {
          const memory = row.original.metrics?.current?.memory ?? 0;
          return <div className="text-right font-medium">{formatPercentage(memory)}</div>;
        },
      },
      {
        accessorKey: "cost.hourly",
        header: () => <div className="text-right">Hourly Cost</div>,
        cell: ({ row }) => {
          const cost = row.original.cost?.hourly ?? 0;
          return <div className="text-right font-medium">{formatCurrency(cost)}</div>;
        },
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
        <CardDescription>Inventory with live metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={resources} showFilters={false} showPagination={true} showColumnVisibility={true} />
      </CardContent>
    </Card>
  );
};

const Services: React.FC = () => {
  const [data] = useState<CloudMockData>(SAMPLE_CLOUD_DATA);
  const [query, setQuery] = useState<ResourceQuery>({});

  const filteredResources = useMemo(() => filterResources(data.resources, query), [data.resources, query]);

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Cloud Operations</h1>
        <p className="text-muted-foreground">Searchable, filterable cloud inventory with alerts and trends</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 rounded-lg">
        {SERVICE_CARDS.map((card, index) => (
          <ServiceCard key={`${card.title}-${index}`} title={card.title} desc={card.desc} active={card.active} status={card.status} />
        ))}
      </div>
      <FilterBar data={data} query={query} setQuery={setQuery} />
      <ResourcesTable resources={filteredResources} />
    </div>
  );
};

export default Services;
