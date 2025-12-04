export function formatPercent(value: number, decimals = 2): string {
  if (!Number.isFinite(value) || value === 0) return "0,00%";

  // Se for 0–1 (0.15) vira 15; se já estiver em 0–100 (15) continua 15
  const normalized = value <= 1 ? value * 100 : value;

  return normalized.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }) + "%";
}