import { z } from "zod";

export type AppConfigProps = {
  env: {
    SITE_URL: string;
    APP_NAME: string;
    APP_VERSION: string;
    database: {
      DATABASE_URL: string;
    };
    JWT_SECRET: string;
  };
};

const envSchema = z.object({
  SITE_URL: z.string().url(),
  APP_NAME: z.string(),
  APP_VERSION: z.string(),
  database: z.object({
    DATABASE_URL: z.string(),
  }),
  JWT_SECRET: z.string(),
});

const config: AppConfigProps = {
  env: {
    SITE_URL: import.meta.env.VITE_APP_URL || "http://localhost:5173",
    APP_NAME: import.meta.env.VITE_APP_NAME || "MontyCloud",
    APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
    database: {
      DATABASE_URL: import.meta.env.VITE_DATABASE_URL || "",
    },
    JWT_SECRET: import.meta.env.VITE_JWT_SECRET || "",
  },
};

export const validateEnv = () => {
  return envSchema.safeParse(config.env);
};

export const getEnvConfig = () => {
  return config.env;
};

export default config;
