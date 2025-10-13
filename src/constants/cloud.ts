import type { Resource, ServiceCard, Status } from "@/types/services";

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

export const STATUS_OPTIONS: Status[] = [
    "running",
    "stopped",
    "degraded",
    "pending",
    "maintenance",
    "terminated"
];

export const ACCOUNT_OPTIONS: string[] = [
    "Prod-Account",
    "Staging-Account",
    "Dev-Account"
];

export const REGION_OPTIONS: string[] = [
    "us-east-1",
    "us-west-2",
    "eu-west-1",
    "ap-south-1",
    "ap-southeast-1",
    "eu-central-1"
];

export const SAMPLE_CLOUD_DATA: Resource[] = [
    {
        id: "r-ec2-01",
        name: "ec2-prod-01",
        type: "ec2",
        status: "running",
        account: "Prod-Account",
        region: "ap-south-1",
        platform: "linux",
        ip: "10.12.34.56",
        tags: { env: "prod", owner: "payments", team: "alpha", "cost-center": "CC-1001" },
        cost: 1.23,
        lastChecked: new Date().toISOString(),
        cpu: 61.2,
        memory: 73.4,
    },
    {
        id: "r-rds-01",
        name: "rds-staging-01",
        type: "rds",
        status: "degraded",
        account: "Staging-Account",
        region: "eu-west-1",
        platform: "postgres",
        ip: "10.0.0.100",
        tags: { env: "staging", owner: "analytics", team: "bravo", "cost-center": "CC-2001" },
        cost: 0.78,
        lastChecked: new Date().toISOString(),
        cpu: 82.5,
        memory: 66.7,
    },
];
