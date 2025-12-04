export type Categoria = "Midia" | "Funil" | "Criativo" | "Programa";

export type Fase =
  | "Midia"
  | "Pagina"
  | "Criativos"
  | "Conversoes"
  | "Programas"
  | string;

export interface CsvRowRaw {
  data: string;
  categoria: string;
  subcategoria: string;
  criativo: string;
  descricao: string;

  investimento: string;
  receita: string;

  impressoes: string;
  cliques: string;
  visitas_lp: string;
  leads: string;

  conversoes_whatsapp: string;
  conversoes_formulario: string;

  vendas: string;

  cpc: string;
  cpl: string;
  cpm: string;

  conversao_lp_pct: string;
  roi: string;
  roas: string;
  impacto_pct: string;

  fase: string;
}

export interface CsvRow {
  data: string;
  categoria: string;
  subcategoria: string;
  criativo: string;
  descricao: string;

  investimento: number;
  receita: number;

  impressoes: number;
  cliques: number;
  visitas_lp: number;
  leads: number;

  conversoes_whatsapp: number;
  conversoes_formulario: number;

  vendas: number;

  cpc: number;
  cpl: number;
  cpm: number;

  conversao_lp_pct: number;
  roi: number;
  roas: number;
  impacto_pct: number;

  fase: string;
}

export interface ExecutiveMetrics {
  investimentoMidia: number;
  receitaProgramas: number;
  leadsTotais: number;
  vendasTotais: number;
  cplMedio: number;
  ticketMedio: number;
  roiMedio: number;
  impactoIcia: number;
  impactoCopa: number;
}