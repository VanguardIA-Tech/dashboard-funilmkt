import { ChangeEvent } from "react";
import { useDataContext } from "@/context/DataContext";
import {
  computeExecutiveMetrics,
  formatCurrencyBR,
  formatNumber,
} from "@/utils/csv";

const Index = () => {
  const { rawCsv, setCsv, rows, metrics } = useDataContext();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = String(evt.target?.result ?? "");
      setCsv(text);
    };
    reader.readAsText(file);
  };

  const localMetrics =
    rows.length > 0 ? computeExecutiveMetrics(rows) : metrics;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            Board Executivo (C-Level)
          </h2>
          <p className="text-xs text-slate-300 md:text-sm">
            Visão consolidada de Mídia, Funil, Criativos e Programas —
            cálculo 100% fiel ao CSV V15.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 text-xs md:flex-row md:items-center">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white/10 px-4 py-2 text-slate-50 shadow-md shadow-black/30 transition hover:bg-white/20">
            Importar CSV V15
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={handleFile}
            />
          </label>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#001B3D] to-[#004C80] p-4 shadow-xl shadow-black/40">
          <p className="text-xs text-slate-300">
            Investimento anual em mídia
          </p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">
            {formatCurrencyBR(localMetrics.investimentoMidia)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">
            Receita anual dos programas
          </p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">
            {formatCurrencyBR(localMetrics.receitaProgramas)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">Leads totais</p>
          <p className="mt-2 text-lg font-semibold text-slate-50">
            {formatNumber(localMetrics.leadsTotais, 0)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">Vendas totais</p>
          <p className="mt-2 text-lg font-semibold text-slate-50">
            {formatNumber(localMetrics.vendasTotais, 0)}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-black/20 p-4 shadow-inner shadow-black/40">
          <p className="text-xs text-slate-300">CPL médio (mídia)</p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">
            {localMetrics.cplMedio > 0
              ? formatCurrencyBR(localMetrics.cplMedio)
              : "—"}
          </p>
        </div>
        <div className="rounded-2xl bg-black/20 p-4 shadow-inner shadow-black/40">
          <p className="text-xs text-slate-300">Ticket médio</p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">
            {localMetrics.ticketMedio > 0
              ? formatCurrencyBR(localMetrics.ticketMedio)
              : "—"}
          </p>
        </div>
        <div className="rounded-2xl bg-black/20 p-4 shadow-inner shadow-black/40">
          <p className="text-xs text-slate-300">ROI médio (programas)</p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">
            {localMetrics.roiMedio
              ? `${formatNumber(localMetrics.roiMedio)}%`
              : "—"}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-gradient-to-br from-[#004C80]/80 to-[#00A89D]/70 p-4 shadow-xl shadow-black/40">
          <p className="text-xs text-slate-200">
            Impacto médio — ICIA vs COPA
          </p>
          <div className="mt-3 flex items-end justify-between text-xs">
            <div>
              <p className="text-slate-200">ICIA</p>
              <p className="mt-1 text-lg font-semibold text-emerald-100">
                {localMetrics.impactoIcia
                  ? `${formatNumber(localMetrics.impactoIcia)}%`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-slate-200">COPA</p>
              <p className="mt-1 text-lg font-semibold text-emerald-100">
                {localMetrics.impactoCopa
                  ? `${formatNumber(localMetrics.impactoCopa)}%`
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-black/20 p-4 shadow-inner shadow-black/40">
          <p className="text-xs text-slate-300">
            CSV V15 — colar conteúdo (opcional)
          </p>
          <textarea
            className="mt-2 h-32 w-full rounded-xl border border-white/10 bg-black/30 p-2 text-xs text-slate-100 outline-none"
            placeholder="Cole aqui o conteúdo da planilha V15 em formato CSV (Jan–Dez 2026)..."
            value={rawCsv}
            onChange={(e) => setCsv(e.target.value)}
          />
          <p className="mt-1 text-[10px] text-slate-400">
            Nenhum valor é transformado: campos vazios viram 0, números são
            usados exatamente como no CSV.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;