import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CsvRow, ExecutiveMetrics } from "@/types/csv";
import { computeExecutiveMetrics, parseCsv } from "@/utils/csv";

interface DataContextValue {
  rows: CsvRow[];
  metrics: ExecutiveMetrics;
  rawCsv: string;
  setCsv: (csv: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const emptyMetrics: ExecutiveMetrics = {
  investimentoMidia: 0,
  receitaProgramas: 0,
  leadsTotais: 0,
  vendasTotais: 0,
  cplMedio: 0,
  ticketMedio: 0,
  roiMedio: 0,
  impactoIcia: 0,
  impactoCopa: 0,
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [rawCsv, setRawCsv] = useState<string>("");

  const rows = useMemo(() => {
    if (!rawCsv.trim()) return [];
    return parseCsv(rawCsv);
  }, [rawCsv]);

  const metrics = useMemo(
    () => (rows.length > 0 ? computeExecutiveMetrics(rows) : emptyMetrics),
    [rows],
  );

  const value: DataContextValue = {
    rows,
    metrics,
    rawCsv,
    setCsv: setRawCsv,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useDataContext must be used within DataProvider");
  }
  return ctx;
}