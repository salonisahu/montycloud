import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { dashboardStats, recentTransactions } from "@/constants/dashboard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { AddNewTransaction } from "@/components/modals/AddNewTransaction";
import { toast } from "sonner";
import { Info, RefreshCw, Download, Share, AlertTriangle, XCircle, Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// Transaction type based on our data structure
type Transaction = {
  id: number;
  name: string;
  description: string;
  amount: string;
  date: string;
  category: string;
};

const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount") as string;
      return (
        <div className="text-right font-medium">
          <span className={amount.startsWith("+") ? "text-green-600" : "text-red-600"}>{amount}</span>
        </div>
      );
    },
  },
];

const Monitoring = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const handleOpenAddTransaction = () => {
    setIsAddTransactionOpen(true);
  };

  const handleCloseAddTransaction = () => {
    setIsAddTransactionOpen(false);
  };

  return (
    <div className="space-y-6 bg-background min-h-screen">
      {/* Page header */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-hero">Dashboard</h1>
            <p className="text-secondary">Overview of your financial status</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="btn-success"
              onClick={() => {
                toast.success("Dashboard data refreshed!");
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Success</span>
              <span className="sm:hidden">Success</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-accent hover:bg-accent/80 text-accent-foreground border-border hover:border-border/80"
              onClick={() => {
                toast.info("Exporting dashboard data...");
                setTimeout(() => {
                  toast.success("Dashboard exported successfully!");
                }, 1500);
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Info</span>
              <span className="sm:hidden">Info</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border hover:border-border/80"
              onClick={() => {
                toast("Dashboard shared with team members!");
              }}
            >
              <Share className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Default</span>
              <span className="sm:hidden">Default</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="btn-warning"
              onClick={() => {
                toast.warning("Low balance alert!", {
                  description: "Your account balance is below $1000",
                });
              }}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Warning</span>
              <span className="sm:hidden">Warning</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="btn-error"
              onClick={() => {
                toast.error("Transaction failed!", {
                  description: "Unable to process payment. Please try again.",
                });
              }}
            >
              <XCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Error</span>
              <span className="sm:hidden">Error</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Text Showcase Section */}
      <div className="space-y-4 p-6 bg-card rounded-lg border">
        <h2 className="text-primary">Text Utilities Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="text-hero-light">Hero Light</h3>
            <p className="text-primary">Primary Text</p>
            <p className="text-secondary">Secondary Text</p>
            <p className="text-muted">Muted Text</p>
          </div>
          <div className="space-y-2">
            <p className="text-accent">Accent Text</p>
            <p className="text-success">Success Text</p>
            <p className="text-warning">Warning Text</p>
            <p className="text-error">Error Text</p>
            <p className="text-info">Info Text</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs">Extra Small Text</p>
            <p className="text-sm">Small Text</p>
            <p className="text-base">Base Text</p>
            <p className="text-lg">Large Text</p>
            <p className="text-xl">Extra Large Text</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 rounded-lg">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle>{stat.title}</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {stat.title === "Total Balance" && "Your current account balance including all assets and liabilities"}
                        {stat.title === "Total Expenses" && "Total amount spent this month across all categories"}
                        {stat.title === "Total Income" && "Total income received this month from all sources"}
                        {stat.title === "Active Accounts" && "Number of active financial accounts linked to your profile"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent transactions section */}
      <Card className="gap-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Recent Transactions</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    View and manage your recent financial transactions. Use the search and pagination to find specific transactions.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Button size="sm" onClick={handleOpenAddTransaction}>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={transactionColumns} data={recentTransactions} />
        </CardContent>
      </Card>

      {/* Add New Transaction Dialog */}
      <AddNewTransaction isOpen={isAddTransactionOpen} onClose={handleCloseAddTransaction} />
    </div>
  );
};

export default Monitoring;
