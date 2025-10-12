import { DollarSign, CreditCard, TrendingUp, Users } from "lucide-react";

// Dashboard statistics data - financial metrics and KPIs
export const dashboardStats = [
  {
    title: "Total Balance",
    value: "$12,345.67",
    icon: DollarSign,
    description: "+20.1% from last month",
    trend: "up",
  },
  {
    title: "Total Expenses",
    value: "$3,456.89",
    icon: CreditCard,
    description: "+12.5% from last month",
    trend: "up",
  },
  {
    title: "Total Income",
    value: "$8,901.23",
    icon: TrendingUp,
    description: "+8.2% from last month",
    trend: "up",
  },
  {
    title: "Active Accounts",
    value: "5",
    icon: Users,
    description: "2 savings, 3 checking",
    trend: "neutral",
  },
];

// Transaction categories for generating mock data
const transactionCategories = [
  "Food",
  "Income",
  "Entertainment",
  "Transportation",
  "Shopping",
  "Bills",
  "Healthcare",
  "Education",
  "Travel",
  "Investment",
];

const transactionNames = [
  "John Smith",
  "Sarah Johnson",
  "Mike Wilson",
  "Emily Davis",
  "David Brown",
  "Lisa Anderson",
  "Chris Taylor",
  "Amy Martinez",
  "Ryan Thompson",
  "Jessica Garcia",
  "Kevin Lee",
  "Michelle White",
  "Daniel Harris",
  "Jennifer Clark",
  "Robert Lewis",
  "Amanda Walker",
  "James Hall",
  "Stephanie Allen",
  "Michael Young",
  "Nicole King",
  "William Wright",
  "Ashley Lopez",
  "Christopher Hill",
  "Samantha Scott",
  "Matthew Green",
  "Rachel Adams",
  "Andrew Baker",
  "Lauren Nelson",
  "Joshua Carter",
  "Megan Mitchell",
  "Brandon Perez",
  "Kayla Roberts",
  "Tyler Turner",
  "Brittany Phillips",
  "Justin Campbell",
  "Heather Parker",
  "Zachary Evans",
  "Danielle Edwards",
  "Nathan Collins",
  "Katherine Stewart",
];

const transactionDescriptions = [
  "Grocery Shopping",
  "Salary Deposit",
  "Netflix Subscription",
  "Gas Station",
  "Amazon Purchase",
  "Electric Bill",
  "Doctor Visit",
  "Online Course",
  "Flight Booking",
  "Stock Purchase",
  "Restaurant Meal",
  "Uber Ride",
  "Phone Bill",
  "Gym Membership",
  "Coffee Shop",
  "Movie Ticket",
  "Book Purchase",
  "Parking Fee",
  "Insurance Payment",
  "Charity Donation",
];

// Generate 200 mock transactions
export const recentTransactions = Array.from({ length: 200 }, (_, index) => {
  const id = index + 1;
  const name = transactionNames[index % transactionNames.length]; // Cycle through names to ensure uniqueness
  const description =
    transactionDescriptions[
      Math.floor(Math.random() * transactionDescriptions.length)
    ];
  const category =
    transactionCategories[
      Math.floor(Math.random() * transactionCategories.length)
    ];
  const isIncome = Math.random() < 0.2; // 20% chance of income
  const amount = isIncome
    ? `+$${(Math.random() * 5000 + 1000).toFixed(2)}`
    : `-$${(Math.random() * 500 + 10).toFixed(2)}`;

  // Generate random dates in the last 6 months
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 180));
  const date = randomDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    id,
    name,
    description,
    amount,
    date,
    category,
  };
});
