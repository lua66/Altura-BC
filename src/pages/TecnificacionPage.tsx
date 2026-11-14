import { TECHNIFICATION_BLOCKS, TECHNIFICATION_SPECS } from '../data/projectData';

interface TecnificacionPageProps {
  onSelectCategoryAndRegister: (category: string) => void;
  onNavigate: (to: string) => void;
}

export function TecnificacionPage({
  onSelectCategoryAndRegister,
  onNavigate,
}: TecnificacionPageProps) {
  return (
    <div className="bg-[#0D0D0F] text-[#F4F1EA]">
      {/* Hero */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
            Programa 02 · Abierta a jugadores del club y externos
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-7xl [text-wrap:balance]">
            Academia de tecnificación: mejora medible en grupos de máximo 8
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            Trabajo individual añadido al entrenamiento de equipo: más
            repeticiones, corrección directa y grupos pequeños ordenados por
            nivel real de juego. También es la puerta de entrada para jugadores
            de otros clubes de la ciudad.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() =>
                onSelectCategoryAndRegister(
                  'Academia de Tecnificación (10 a 18 · Externo o Club)'
                )
              }
              className="cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-6 py-3.5 text-sm font-bold text-[#0D0D0F] transition-colors hover:bg-[#ff3b81]"
            >
              Solicitar evaluación inicial
            </button>
            <a
              href="/academia-universitaria"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/academia-universitaria');
              }}
              className="whitespace-nowrap text-sm font-semibold text-[#F4F1EA] underline decoration-[#52525B] underline-offset-8 transition-colors hover:decoration-[#FF1E6E]"
            >
              Ver Academia Universitaria EE. UU. →
            </a>
          </div>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNIFICATION_SPECS.map((spec) => (
            <div
              key={spec.label}
              className="rounded-sm border border-white/10 bg-[#141417] p-6"
            >
              <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
                {spec.label}
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F1EA] uppercase">
                {spec.value}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                {spec.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 Training Blocks */}
      <section className="border-y border-white/10 bg-[#0A0A0C] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
                Contenido por bloques
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
                Cada jugador pasa por una evaluación inicial para ubicarlo en el
                grupo que corresponde a su nivel técnico y trabajar exactamente
                lo que necesita destrabar.
              </p>

              <div className="mt-8 rounded-sm border border-[#FF1E6E]/40 bg-[#141417] p-6">
                <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
                  Ciclos de 8 a 10 semanas
                </p>
                <h3 className="mt-2 font-display text-3xl font-extrabold uppercase">
                  Progreso visible en números
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#D4D4D8]">
                  Trabajamos en ciclos de 8 a 10 semanas con un foco concreto
                  por jugador. Cada ciclo empieza y termina exactamente con la
                  misma prueba medible para comprobar la mejora real.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-sm border border-white/10 bg-[#121215]">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                      <th scope="col" className="px-5 py-4">
                        Bloque
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Qué se trabaja
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {TECHNIFICATION_BLOCKS.map((row) => (
                      <tr key={row.block} className="hover:bg-white/[0.02]">
                        <td className="px-5 py-4 font-bold whitespace-nowrap text-[#FF1E6E]">
                          {row.block}
                        </td>
                        <td className="px-5 py-4 text-[#D4D4D8]">{row.focus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
