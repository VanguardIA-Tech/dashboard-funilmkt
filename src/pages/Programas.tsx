import { useDataContext } from "@/context/DataContext";
import { formatCurrencyBR, formatNumber } from "@/utils/csv";

type ProgramaAggregated = {
  receita: number;
  vendas: number;
  impacto: number[];
  roi: number[];
};

const ProgramasPage = () => {
  const { rows } = useDataContext();

  const programas = rows.filter((r) => r.categoria === "Programa");

  const receitaTotal = programas.reduce((acc, r) => acc + r.receita, 0);
  const vendasTotal = programas.reduce((acc, r) => acc + r.vendas, 0);
  const ticketMedio =
    vendasTotal > 0 ? receitaTotal / vendasTotal : 0;

  const porPrograma = programas.reduce<Record<string, ProgramaAggregated>>(
    (acc, r) => {
      const key = r.subcategoria || "Outro";
      if (!acc[key]) {
        acc[key] = { receita: 0, vendas: 0, impacto: [], roi: [] };
      }
      acc[key].receita += r.receita;
      acc[key].vendas += r.vendas;
      acc[key].impacto.push(r.impacto_pct);
      acc[key].roi.push(r.roi);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            Programas — ICIA / COPA / CTC
          </h2>
          <p className="text-xs text-slate-300 md:text-sm">
            Receita, vendas, ticket médio, impacto e ROI por programa.
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">Receita total</p>
          <p className="mt-1 text-lg font-semibold text-emerald-300">
            {formatCurrencyBR(receitaTotal)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">Vendas totais</p>
          <p className="mt-1 text-lg font-semibold text-slate-50">
            {formatNumber(vendasTotal, 0)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-inner shadow-black/30">
          <p className="text-xs text-slate-300">Ticket médio</p>
          <p className="mt-1 text-lg font-semibold text-emerald-300">
            {ticketMedio > 0 ? formatCurrencyBR(ticketMedio) : "—"}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-100">
          Programas — visão consolidada
        </h3>
        <div className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/10">
          <table className="min-w-full text-xs">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left">Programa</th>
                <th className="px-3 py-2 text-right">Receita</th>
                <th className="px-3 py-2 text-right">Vendas</th>
                <th className="px-3 py-2 text-right">Ticket</th>
                <th className="px-3 py-2 text-right">Impacto médio</th>
                <th className="px-3 py-2 text-right">ROI médio</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(porPrograma).map(
                ([programa, data]) => {
                  const ticket =
                    data.vendas > 0 ? data.receita / data.vendas : 0;
                  const impactoMedio =
                    data.impacto.length > 0
                      ? data.impacto.reduce((a, b) => a + b, 0) /
                        data.impacto.length
                      : 0;
                  const roiMedio =
                    data.roi.length > 0
                      ? data.roi.reduce((a, b) => a + b, 0) /
                        data.roi.length
                      : 0;

                  return (
                    <tr
                      key={programa}
                      className="border-t border-white/5 hover:bg-white/5"
                    >
                      <td className="px-3 py-1.5">{programa}</td>
                      <td className="px-3 py-1.5 text-right">
                        {formatCurrencyBR(data.receita)}
                      </td>
                      <td className="px-3 py-1.5 text-right">
                        {formatNumber(data.vendas, 0)}
                      </td>
                      <td className="px-3 py-1.5 text-right">
                        {ticket > 0 ? formatCurrencyBR(ticket) : "—"}
                      </td>
                      <td className="px-3 py-1.5 text-right">
                        {impactoMedio
                          ? `${formatNumber(impactoMedio)}%`
                          : "—"}
                      </td>
                      <td className="px-3 py-1.5 text-right">
                        {roiMedio
                          ? `${formatNumber(roiMedio)}%`
                          : "—"}
                      </td>
                    </tr>
                  );
                },
              )}

              {programas.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-4 text-center text-slate-400"
                  >
                    Nenhum programa encontrado no CSV.
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

export default ProgramasPage;