import { CsvRow, CsvRowRaw, ExecutiveMetrics } from "@/types/csv";

function toNumberSafe(value: string | null | undefined): number {
  if (!value) return 0;
  const trimmed = value.trim();
  if (!trimmed) return 0;

  // Remove símbolos de moeda, espaços e separadores de milhares comuns.
  const normalized = trimmed
    .replace(/[R$\s]/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");

  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export function parseCsv(text: string): CsvRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length <= 1) return [];

  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const raw: Partial<CsvRowRaw> = {};

    header.forEach((h, idx) => {
      (raw as any)[h] = cols[idx] ?? "";
    });

    const row: CsvRow = {
      data: raw.data ?? "",
      categoria: raw.categoria ?? "",
      subcategoria: raw.subcategoria ?? "",
      criativo: raw.criativo ?? "",
      descricao: raw.descricao ?? "",
      investimento: toNumberSafe(raw.investimento),
      receita: toNumberSafe(raw.receita),
      impressoes: toNumberSafe(raw.impressoes),
      cliques: toNumberSafe(raw.cliques),
      visitas_lp: toNumberSafe(raw.visitas_lp),
      leads: toNumberSafe(raw.leads),
      conversoes_whatsapp: toNumberSafe(raw.conversoes_whatsapp),
      conversoes_formulario: toNumberSafe(raw.conversoes_formulario),
      vendas: toNumberSafe(raw.vendas),
      cpc: toNumberSafe(raw.cpc),
      cpl: toNumberSafe(raw.cpl),
      cpm: toNumberSafe(raw.cpm),
      conversao_lp_pct: toNumberSafe(raw.conversao_lp_pct),
      roi: toNumberSafe(raw.roi),
      roas: toNumberSafe(raw.roas),
      impacto_pct: toNumberSafe(raw.impacto_pct),
      fase: raw.fase ?? "",
    };

    rows.push(row);
  }

  return rows;
}

export function computeExecutiveMetrics(rows: CsvRow[]): ExecutiveMetrics {
  const isMidia = (r: CsvRow) => r.categoria === "Midia";
  const isPrograma = (r: CsvRow) => r.categoria === "Programa";

  const investimentoMidia = rows
    .filter(isMidia)
    .reduce((acc, r) => acc + r.investimento, 0);

  const receitaProgramas = rows
    .filter(isPrograma)
    .reduce((acc, r) => acc + r.receita, 0);

  const leadsTotais = rows.reduce((acc, r) => acc + r.leads, 0);
  const vendasTotais = rows.reduce((acc, r) => acc + r.vendas, 0);

  const leadsMidia = rows
    .filter(isMidia)
    .reduce((acc, r) => acc + r.leads, 0);

  const cplMedio = leadsMidia > 0 ? investimentoMidia / leadsMidia : 0;

  const vendasProgramas = rows
    .filter(isPrograma)
    .reduce((acc, r) => acc + r.vendas, 0);

  const ticketMedio =
    vendasProgramas > 0 ? receitaProgramas / vendasProgramas : 0;

  const roiValues = rows
    .filter(isPrograma)
    .map((r) => r.roi)
    .filter((v) => Number.isFinite(v));

  const roiMedio =
    roiValues.length > 0
      ? roiValues.reduce((a, b) => a + b, 0) / roiValues.length
      : 0;

  const impactoIciaValues = rows
    .filter(
      (r) =>
        r.categoria === "Programa" &&
        r.subcategoria.toLowerCase().includes("icia"),
    )
    .map((r) => r.impacto_pct);

  const impactoCopaValues = rows
    .filter(
      (r) =>
        r.categoria === "Programa" &&
        r.subcategoria.toLowerCase().includes("copa"),
    )
    .map((r) => r.impacto_pct);

  const impactoIcia =
    impactoIciaValues.length > 0
      ? impactoIciaValues.reduce((a, b) => a + b, 0) /
        impactoIciaValues.length
      : 0;

  const impactoCopa =
    impactoCopaValues.length > 0
      ? impactoCopaValues.reduce((a, b) => a + b, 0) /
        impactoCopaValues.length
      : 0;

  return {
    investimentoMidia,
    receitaProgramas,
    leadsTotais,
    vendasTotais,
    cplMedio,
    ticketMedio,
    roiMedio,
    impactoIcia,
    impactoCopa,
  };
}

export function formatCurrencyBR(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}