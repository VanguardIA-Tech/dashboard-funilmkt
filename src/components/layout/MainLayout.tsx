import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Board Executivo" },
  { to: "/midia", label: "Mídia & Funil" },
  { to: "/criativos", label: "Criativos" },
  { to: "/programas", label: "Programas" },
];

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001B3D] via-[#001b3de6] to-[#00A89D] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100 md:text-2xl">
              Dashboard Vanguardia V15
            </h1>
            <p className="text-xs text-slate-300 md:text-sm">
              Enterprise Intelligence Board — Mídia · Funil · Criativos ·
              Programas
            </p>
          </div>
          <nav className="flex gap-2 rounded-full bg-white/5 p-1 text-xs backdrop-blur-md md:text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3 py-1.5 transition-all",
                    "text-slate-200 hover:bg-white/10",
                    isActive && "bg-white/20 text-white shadow-md",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="flex-1">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl md:p-6">
            <Outlet />
          </div>
        </main>

        <footer className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <span>VANGUARD.OS · V15</span>
          <span>2026 · Enterprise Intelligence</span>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;