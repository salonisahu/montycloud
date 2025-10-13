export type Status = "running" | "stopped" | "degraded" | "terminated" | "pending" | "maintenance";
export type ResourceType = "ec2" | "rds" | "eks-node" | "lambda" | "vm" | "storage" | "redis" | "kafka" | "container" | "app-service";
export type Severity = "critical" | "high" | "medium" | "low" | "info";

export interface TimeseriesPoint {
    ts: string;
    cpu: number;
    memory: number;
    disk: number;
    netIn: number;
    netOut: number;
}

export interface Metrics {
    current: {
        cpu: number;
        memory: number;
        disk: number;
        netIn: number;
        netOut: number;
    };
    timeseries: TimeseriesPoint[];
}

export interface Compliance {
    cis: "pass" | "fail";
    pci: "pass" | "fail";
    hipaa: "pass" | "n/a";
}

export interface Resource {
    resourceId: string;
    name: string;
    type: ResourceType;
    status: Status;
    accountId: string;
    accountName: string;
    region: string;
    platform: string;
    ip?: string | null;
    tags: Record<string, string>;
    cost: {
        hourly: number;
        monthly_estimate: number;
    };
    uptimeDays: number;
    lastChecked: string;
    compliance: Compliance;
    metrics: Metrics;
}

export interface Alert {
    alertId: string;
    resourceId: string;
    resourceName: string;
    accountId: string;
    accountName: string;
    region: string;
    category: "availability" | "cost" | "security" | "performance" | "compliance";
    severity: Severity;
    title: string;
    message: string;
    createdAt: string;
    status: "open" | "acknowledged" | "resolved";
}

export interface Incident {
    incidentId: string;
    title: string;
    severity: Severity;
    alerts: string[];
    affectedResources: string[];
    status: "investigating" | "mitigating" | "monitoring" | "resolved";
    createdAt: string;
    updatedAt: string;
    owner: "SRE" | "Security" | "FinOps";
}

export interface CloudMockData {
    metadata: {
        generatedAt: string;
        accounts: {
            accountId: string;
            accountName: string;
        }[];
        regions: string[];
    };
    resources: Resource[];
    alerts: Alert[];
    incidents: Incident[];
}

export interface ResourceQuery {
    text?: string;
    status?: string[];
    type?: string[];
    accountId?: string[];
    region?: string[];
    cpuOver?: number;
}

export interface ServiceCard {
    title: string;
    desc: string;
    active: number;
    status: "running" | "down";
}
