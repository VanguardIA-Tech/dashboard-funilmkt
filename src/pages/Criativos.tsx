import { useDataContext } from "@/context/DataContext";
import { formatCurrencyBR, formatNumber } from "@/utils/csv";
import { formatPercent } from "@/utils/percent";

const CriativosPage = () => {
  const { rows } = useDataContext();

  const criativoRows = rows.filter((r) => r.categoria === "Criativo");

  const ranking = [...criativoRows].sort((a, b) => {
    // ranking por leads, depois vendas
    if (b.leads !== a.leads) return b.leads - a.leads;
    return b.vendas - a.vendas;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            Painel de Criativos
          </h2>
          <p className="text-xs text-slate-300 md:text-sm">
            /criativos — Ranking, CPL, conversão e vendas por criativo.
          </p>
        </div>
      </header>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-100">
          Ranking de Criativos (por Leads & Vendas)
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          {ranking.slice(0, 6).map((r, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-emerald-300/20 bg-black/20 p-3 shadow-md"
            >
              <p className="text-xs uppercase tracking-wide text-emerald-300">
                #{idx + 1} · {r.criativo || "Sem nome"}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                {r.descricao || "Sem descrição"}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-400">Leads</p>
                  <p className="font-semibold text-slate-50">
                    {formatNumber(r.leads, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Vendas</p>
                  <p className="font-semibold text-slate-50">
                    {formatNumber(r.vendas, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">CPL</p>
                  <p className="font-semibold text-emerald-300">
                    {r.cpl > 0 ? formatCurrencyBR(r.cpl) : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">ROI</p>
                  <p className="font-semibold text-emerald-300">
                    {r.roi ? formatPercent(r.roi) : "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {ranking.length === 0 && (
            <div className="col-span-full rounded-2xl border border-white/10 bg-black/10 p-4 text-xs text-slate-300">
              Nenhum dado de criativos carregado. Importe o CSV na Home para
              ativar este painel.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-100">
          Tabela completa de criativos
        </h3>
        <div className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/10">
          <table className="min-w-full text-xs">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left">Criativo</th>
                <th className="px-3 py-2 text-left">Descrição</th>
                <th className="px-3 py-2 text-right">Leads</th>
                <th className="px-3 py-2 text-right">Vendas</th>
                <th className="px-3 py-2 text-right">CPL</th>
                <th className="px-3 py-2 text-right">ROI (%)</th>
              </tr>
            </thead>
            <tbody>
              {criativoRows.map((r, idx) => (
                <tr
                  key={idx}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="px-3 py-1.5">{r.criativo}</td>
                  <td className="px-3 py-1.5">{r.descricao}</td>
                  <td className="px-3 py-1.5 text-right">
                    {formatNumber(r.leads, 0)}
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    {formatNumber(r.vendas, 0)}
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    {r.cpl > 0 ? formatCurrencyBR(r.cpl) : "—"}
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    {r.roi ? formatPercent(r.roi) : "—"}
                  </td>
                </tr>
              ))}
              {criativoRows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-4 text-center text-slate-400"
                  >
                    Nenhum criativo encontrado no CSV.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CriativosPage;