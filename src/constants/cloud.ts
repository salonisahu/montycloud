import type { CloudMockData, ServiceCard, Status } from "@/types/services";

// Service card data for the dashboard
export const SERVICE_CARDS: ServiceCard[] = [
    {
        title: "Web Applications",
        desc: "Frontend and backend services",
        active: 5,
        status: "running",
    },
    {
        title: "Database Services",
        desc: "Data storage and management",
        active: 3,
        status: "running",
    },
    {
        title: "API Services",
        desc: "Microservices and APIs",
        active: 0,
        status: "down",
    },
];

// Available status options for filtering
export const STATUS_OPTIONS: Status[] = [
    "running",
    "stopped",
    "degraded",
    "pending",
    "maintenance",
    "terminated"
];

// Sample cloud data for demonstration
export const SAMPLE_CLOUD_DATA: CloudMockData = {
    metadata: {
        generatedAt: new Date().toISOString(),
        accounts: [
            { accountId: "111111111111", accountName: "Prod-Account" },
            { accountId: "222222222222", accountName: "Staging-Account" },
            { accountId: "333333333333", accountName: "Dev-Account" },
        ],
        regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-south-1", "ap-southeast-1", "eu-central-1"],
    },
    resources: [
        {
            resourceId: "r-ec2-01",
            name: "ec2-prod-01",
            type: "ec2",
            status: "running",
            accountId: "111111111111",
            accountName: "Prod-Account",
            region: "ap-south-1",
            platform: "linux",
            ip: "10.12.34.56",
            tags: { env: "prod", owner: "payments", team: "alpha", "cost-center": "CC-1001" },
            cost: { hourly: 1.23, monthly_estimate: 885.6 },
            uptimeDays: 142.3,
            lastChecked: new Date().toISOString(),
            compliance: { cis: "pass", pci: "pass", hipaa: "pass" },
            metrics: {
                current: { cpu: 61.2, memory: 73.4, disk: 41.1, netIn: 4.2, netOut: 3.9 },
                timeseries: Array.from({ length: 20 })
                    .map((_, i) => ({
                        ts: new Date(Date.now() - i * 600000).toISOString(),
                        cpu: 40 + Math.random() * 40,
                        memory: 40 + Math.random() * 40,
                        disk: 30 + Math.random() * 40,
                        netIn: Math.random() * 10,
                        netOut: Math.random() * 10,
                    }))
                    .reverse(),
            },
        },
        {
            resourceId: "r-rds-01",
            name: "rds-staging-01",
            type: "rds",
            status: "degraded",
            accountId: "222222222222",
            accountName: "Staging-Account",
            region: "eu-west-1",
            platform: "postgres",
            ip: null,
            tags: { env: "staging", owner: "analytics", team: "bravo", "cost-center": "CC-2001" },
            cost: { hourly: 0.78, monthly_estimate: 561.6 },
            uptimeDays: 38.5,
            lastChecked: new Date().toISOString(),
            compliance: { cis: "fail", pci: "pass", hipaa: "n/a" },
            metrics: {
                current: { cpu: 82.5, memory: 66.7, disk: 70.1, netIn: 7.8, netOut: 6.2 },
                timeseries: Array.from({ length: 20 })
                    .map((_, i) => ({
                        ts: new Date(Date.now() - i * 600000).toISOString(),
                        cpu: 55 + Math.random() * 35,
                        memory: 40 + Math.random() * 40,
                        disk: 50 + Math.random() * 30,
                        netIn: Math.random() * 10,
                        netOut: Math.random() * 10,
                    }))
                    .reverse(),
            },
        },
    ],
    alerts: [
        {
            alertId: "a-001",
            resourceId: "r-rds-01",
            resourceName: "rds-staging-01",
            accountId: "222222222222",
            accountName: "Staging-Account",
            region: "eu-west-1",
            category: "performance",
            severity: "high",
            title: "High CPU utilization",
            message: "High CPU utilization on rds-staging-01 (rds) in eu-west-1",
            createdAt: new Date().toISOString(),
            status: "open",
        },
    ],
    incidents: [
        {
            incidentId: "inc-1001",
            title: "Incident #1001 - HIGH",
            severity: "high",
            alerts: ["a-001"],
            affectedResources: ["r-rds-01"],
            status: "investigating",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            owner: "SRE",
        },
    ],
};
