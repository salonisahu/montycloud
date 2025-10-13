import { useContext } from "react";
import { DataContext } from "@/contexts/data";
import type { DataContextType } from "@/types/data";

export const useData = (): DataContextType => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used within DataProvider");
    return ctx;
};
