export type Status = "running" | "stopped" | "degraded" | "terminated" | "pending" | "maintenance";
export type ResourceType = "ec2" | "rds" | "eks-node" | "lambda" | "vm" | "storage" | "redis" | "kafka" | "container" | "app-service";

export interface Resource {
    id: string;
    name: string;
    type: ResourceType;
    status: Status;
    account: string;
    region: string;
    platform: string;
    ip?: string;
    tags: Record<string, string>;
    cost: number;
    lastChecked: string;
    cpu: number;
    memory: number;
}



export interface ResourceQuery {
    text?: string;
    status?: string[];
    type?: string[];
    account?: string[];
    region?: string[];
    cpuOver?: number;
}

export interface ServiceCard {
    title: string;
    desc: string;
    active: number;
    status: "running" | "down";
}
