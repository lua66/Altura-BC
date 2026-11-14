import {
  COACH_FORMATION,
  METHOD_RULES,
  SEASON_CALENDAR,
  SESSION_STRUCTURE,
  STAFF_ROLES,
  TRACKING_DIMENSIONS,
} from '../data/projectData';

interface MetodologiaPageProps {
  onGoToRegister: () => void;
}

export function MetodologiaPage({ onGoToRegister }: MetodologiaPageProps) {
  return (
    <div className="bg-[#0D0D0F] text-[#F4F1EA]">
      {/* Hero */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
            Cómo trabajamos en la duela · Temporada y seguimiento
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-7xl [text-wrap:balance]">
            Metodología común, cero filas largas y progreso medible
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            Todas las sesiones del club siguen la misma estructura para que un
            jugador pueda subir de grupo o cambiar de entrenador sin perderse,
            con una ficha de seguimiento tres veces por temporada.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={onGoToRegister}
              className="cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-6 py-3.5 text-sm font-bold text-[#0D0D0F] transition-colors hover:bg-[#ff3b81]"
            >
              Probar una sesión de 90 minutos
            </button>
          </div>
        </div>
      </section>

      {/* 90-minute session + 5 method rules */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              Estructura de sesión (90 min)
            </h2>
            <div className="mt-6 overflow-hidden rounded-sm border border-white/10 bg-[#121215]">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                    <th scope="col" className="px-5 py-4">
                      Parte
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Duración
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Contenido
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {SESSION_STRUCTURE.map((row) => (
                    <tr key={row.part} className="hover:bg-white/[0.02]">
                      <td className="px-5 py-4 font-bold text-[#FF1E6E]">
                        {row.part}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap tabular-nums font-semibold text-[#F4F1EA]">
                        {row.duration}
                      </td>
                      <td className="px-5 py-4 text-[#D4D4D8]">
                        {row.content}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full rounded-sm border border-white/10 bg-[#141417] p-7">
              <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
                Reglas del método
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold uppercase">
                Tiempo útil al máximo
              </h2>
              <ul className="mt-6 space-y-4 border-t border-white/10 pt-5 text-sm leading-relaxed text-[#D4D4D8]">
                {METHOD_RULES.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <span
                      className="font-bold text-[#FF1E6E]"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Player Tracking Card (Light section) */}
      <section className="bg-[#F4F1EA] py-16 text-[#0D0D0F] md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
              Evaluación continua · 3 veces por temporada
            </p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              Ficha de seguimiento del jugador
            </h2>
            <p className="mt-3 text-base text-[#3F3F46]">
              Actualizada al inicio, a mitad y al final de temporada. Después de
              cada evaluación, el jugador y su familia reciben un informe de una
              página con dos fortalezas y dos objetivos para el siguiente
              periodo.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {TRACKING_DIMENSIONS.map((dim, idx) => (
              <div
                key={dim.title}
                className="border-t-2 border-[#0D0D0F] pt-5"
              >
                <p className="font-display text-3xl font-extrabold tabular-nums">
                  0{idx + 1}
                </p>
                <h3 className="mt-2 text-base font-bold">{dim.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3F3F46]">
                  {dim.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season Calendar & Two-Phase Launch */}
      <section className="border-b border-white/10 bg-[#0A0A0C] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
                Temporada agosto a julio
              </h2>
              <p className="mt-3 text-sm text-[#A1A1AA]">
                Sigue el ciclo escolar mexicano para no chocar con periodos de
                exámenes ni vacaciones familiares.
              </p>

              <div className="mt-6 overflow-x-auto rounded-sm border border-white/10 bg-[#121215]">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                      <th scope="col" className="px-5 py-4">
                        Periodo
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Meses
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Qué pasa
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {SEASON_CALENDAR.map((row) => (
                      <tr key={row.period} className="align-top">
                        <td className="px-5 py-4 font-bold whitespace-nowrap text-[#FF1E6E]">
                          {row.period}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-[#F4F1EA]">
                          {row.months}
                        </td>
                        <td className="px-5 py-4 text-[#D4D4D8]">
                          {row.activity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
                Arranque en dos fases
              </h2>

              <div className="rounded-sm border border-white/10 bg-[#141417] p-6">
                <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
                  Fase 1 · Primera temporada
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#D4D4D8]">
                  Arrancan juntos el Club (con los cuatro grupos formativos) y
                  la Academia de Tecnificación desde el primer día. En paralelo
                  se prepara la estructura universitaria y los primeros contactos
                  en EE. UU.
                </p>
              </div>

              <div className="rounded-sm border border-white/10 bg-[#141417] p-6">
                <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
                  Fase 2 · Segunda temporada
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#D4D4D8]">
                  Abre la Academia Universitaria con un grupo piloto de 8 a 12
                  jugadores por rama, elegidos entre quienes ya llevan un año
                  entrenando en el club.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff & Coach Training */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              Entrenadores y staff
            </h2>
            <p className="mt-3 text-sm text-[#A1A1AA]">
              El primer año el club opera con un equipo compacto de cinco o seis
              personas capacitadas bajo el mismo estándar.
            </p>
            <div className="mt-6 overflow-x-auto rounded-sm border border-white/10 bg-[#121215]">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                    <th scope="col" className="px-5 py-4">
                      Rol
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Responsabilidad
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Cuándo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {STAFF_ROLES.map((row) => (
                    <tr key={row.role} className="align-top">
                      <td className="px-5 py-3.5 font-semibold text-[#F4F1EA]">
                        {row.role}
                      </td>
                      <td className="px-5 py-3.5 text-[#D4D4D8]">
                        {row.responsibility}
                      </td>
                      <td className="px-5 py-3.5 text-[#A1A1AA]">
                        {row.whenNeeded}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-sm border border-white/10 bg-[#141417] p-7">
              <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
                Formación interna
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold uppercase">
                Cómo formamos a nuestros entrenadores
              </h2>
              <ul className="mt-6 space-y-4 border-t border-white/10 pt-5 text-sm leading-relaxed text-[#D4D4D8]">
                {COACH_FORMATION.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="font-bold text-[#FF1E6E]"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
