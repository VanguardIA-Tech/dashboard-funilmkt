import { useDataContext } from "@/context/DataContext";
import { formatNumber } from "@/utils/csv";

const MidiaFunilPage = () => {
  const { rows } = useDataContext();

  const midiaRows = rows.filter((r) => r.categoria === "Midia");

  const totalImpressoes = midiaRows.reduce(
    (acc, r) => acc + r.impressoes,
    0,
  );
  const totalCliques = midiaRows.reduce((acc, r) => acc + r.cliques, 0);
  const totalVendas = midiaRows.reduce((acc, r) => acc + r.vendas, 0);

  const ctr =
    totalImpressoes > 0 ? (totalCliques / totalImpressoes) * 100 : 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            Performance de Mídia & Funil
          </h2>
          <p className="text-xs text-slate-300 md:text-sm">
            Visão completa do funil: Impressões → Cliques → LP → Leads → Vendas
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">Impressões</p>
          <p className="mt-1 text-lg font-semibold text-slate-50">
            {formatNumber(totalImpressoes, 0)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">Cliques</p>
          <p className="mt-1 text-lg font-semibold text-slate-50">
            {formatNumber(totalCliques, 0)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">CTR (%)</p>
          <p className="mt-1 text-lg font-semibold text-emerald-300">
            {formatNumber(ctr)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">Vendas (Mídia)</p>
          <p className="mt-1 text-lg font-semibold text-slate-50">
            {formatNumber(totalVendas, 0)}
          </p>
        </div>
      </section>

      <section className="mt-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-100">
          Tabela analítica — Mídia
        </h3>
        <div className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/10">
          <table className="min-w-full text-xs">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left">Data</th>
                <th className="px-3 py-2 text-left">Canal</th>
                <th className="px-3 py-2 text-right">Impressoes</th>
                <th className="px-3 py-2 text-right">Cliques</th>
                <th className="px-3 py-2 text-right">Visitas LP</th>
                <th className="px-3 py-2 text-right">Leads</th>
                <th className="px-3 py-2 text-right">Vendas</th>
              </tr>
            </thead>
            <tbody>
              {midiaRows.map((r, idx) => (
                <tr
                  key={idx}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="px-3 py-1.5">{r.data}</td>
                  <td className="px-3 py-1.5">{r.subcategoria}</td>
                  <td className="px-3 py-1.5 text-right">
                    {formatNumber(r.impressoes, 0)}
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    {formatNumber(r.cliques, 0)}
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    {formatNumber(r.visitas_lp, 0)}
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    {formatNumber(r.leads, 0)}
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    {formatNumber(r.vendas, 0)}
                  </td>
                </tr>
              ))}

              {midiaRows.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-4 text-center text-slate-400"
                  >
                    Nenhum dado de mídia carregado. Importe o CSV na Home.
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

export default MidiaFunilPage;