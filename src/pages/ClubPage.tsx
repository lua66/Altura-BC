import {
  COMPETITION_CRITERIA,
  FIRST_YEAR_GROUPS,
  FORMATION_STAGES,
  HOW_WE_FORM,
  HOW_WE_PLAY,
} from '../data/projectData';

interface ClubPageProps {
  onSelectCategoryAndRegister: (category: string) => void;
  onNavigate: (to: string) => void;
}

export function ClubPage({
  onSelectCategoryAndRegister,
  onNavigate,
}: ClubPageProps) {
  return (
    <div className="bg-[#0D0D0F] text-[#F4F1EA]">
      {/* Page Hero */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
            Programa 01 · Desde los 7 hasta los 18 años
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-7xl [text-wrap:balance]">
            El Club: tu equipo, tu etapa y tu identidad en la cancha
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            El club es la base de todo el proyecto. Cada jugador pertenece a un
            grupo de su edad, entrena con él y compite en liga bajo una misma
            forma de jugar y de comportarse.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() =>
                onSelectCategoryAndRegister('Iniciación / Mini (7 a 9)')
              }
              className="cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-6 py-3.5 text-sm font-bold text-[#0D0D0F] transition-colors hover:bg-[#ff3b81]"
            >
              Apartar clase de prueba
            </button>
            <a
              href="/tecnificacion"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/tecnificacion');
              }}
              className="whitespace-nowrap text-sm font-semibold text-[#F4F1EA] underline decoration-[#52525B] underline-offset-8 transition-colors hover:decoration-[#FF1E6E]"
            >
              Conocer Academia de Tecnificación →
            </a>
          </div>
        </div>
      </section>

      {/* Game Identity & Formation Rules */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-sm border border-white/10 bg-[#141417] p-7 sm:p-8">
            <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
              Identidad de juego
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              Cómo jugamos en todas las edades
            </h2>
            <p className="mt-3 text-sm text-[#A1A1AA]">
              Cualquier equipo del club, de 7 o de 17 años, debe reconocerse por
              lo mismo dentro de la duela.
            </p>
            <ul className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-[#D4D4D8]">
              {HOW_WE_PLAY.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-bold text-[#FF1E6E]" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-white/10 bg-[#141417] p-7 sm:p-8">
            <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
              Cultura de vestidor
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              Cómo formamos personas y jugadores
            </h2>
            <p className="mt-3 text-sm text-[#A1A1AA]">
              Formar jugadores completos empieza por darles claridad, minutos
              justos y hábitos fuera de la cancha.
            </p>
            <ul className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-[#D4D4D8]">
              {HOW_WE_FORM.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-bold text-[#FF1E6E]" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 Formation Stages Table */}
      <section className="border-y border-white/10 bg-[#0A0A0C] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
            Cuatro etapas de formación (7 a 18 años)
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#A1A1AA]">
            Cada etapa tiene un objetivo claro y contenidos que todavía no
            tocan para no quemar procesos. Las edades se organizan por año de
            nacimiento.
          </p>

          <div className="mt-8 overflow-x-auto rounded-sm border border-white/10 bg-[#121215]">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                  <th scope="col" className="px-5 py-4">
                    Etapa
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Edad
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Objetivo
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Qué se enseña
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Qué no toca aún
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Sesiones / sem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {FORMATION_STAGES.map((row) => (
                  <tr key={row.stage} className="align-top hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-bold text-[#FF1E6E]">
                      {row.stage}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap tabular-nums text-[#F4F1EA]">
                      {row.age}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#F4F1EA]">
                      {row.objective}
                    </td>
                    <td className="px-5 py-4 text-[#D4D4D8]">{row.taught}</td>
                    <td className="px-5 py-4 text-[#A1A1AA]">{row.notYet}</td>
                    <td className="px-5 py-4 whitespace-nowrap tabular-nums font-medium text-[#F4F1EA]">
                      {row.sessionsPerWeek}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Two Pathways & First Year Groups */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              Dos vías dentro del club
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
              A partir de los 13 años los equipos pueden competir en dos vías
              (separando ramas femenil y varonil según liga). La revisión se
              hace dos veces por temporada y funciona en ambos sentidos.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-white/10 bg-[#141417] p-6">
                <h3 className="font-display text-2xl font-extrabold uppercase">
                  Vía Participación
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                  Entrenar, jugar liga local y disfrutar el deporte. Nadie queda
                  fuera por su nivel inicial.
                </p>
              </div>
              <div className="rounded-sm border border-[#FF1E6E]/50 bg-[#18181D] p-6">
                <h3 className="font-display text-2xl font-extrabold text-[#FF1E6E] uppercase">
                  Vía Competencia
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#D4D4D8]">
                  Equipos que juegan la liga más exigente disponible a partir de
                  los 13 años.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-sm border border-white/10 bg-[#121215] p-6">
              <h3 className="text-sm font-bold tracking-[0.12em] text-[#F4F1EA] uppercase">
                4 criterios para pasar a Competencia
              </h3>
              <ol className="mt-4 grid grid-cols-1 gap-3 text-sm text-[#D4D4D8] sm:grid-cols-2">
                {COMPETITION_CRITERIA.map((criterion, idx) => (
                  <li key={criterion} className="flex gap-2.5">
                    <span className="font-display text-lg font-bold text-[#FF1E6E] tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              Grupos año uno
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
              Arrancamos con cuatro grupos mixtos (uno por etapa) y abrimos un
              segundo grupo en cuanto el primero supere los 14 jugadores.
            </p>

            <div className="mt-6 overflow-hidden rounded-sm border border-white/10 bg-[#121215]">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                    <th scope="col" className="px-4 py-3.5">
                      Grupo
                    </th>
                    <th scope="col" className="px-4 py-3.5">
                      Edad
                    </th>
                    <th scope="col" className="px-4 py-3.5">
                      Tamaño
                    </th>
                    <th scope="col" className="px-4 py-3.5">
                      Coaches
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {FIRST_YEAR_GROUPS.map((g) => (
                    <tr key={g.group}>
                      <td className="px-4 py-3.5 font-semibold text-[#F4F1EA]">
                        {g.group}
                      </td>
                      <td className="px-4 py-3.5 tabular-nums text-[#A1A1AA]">
                        {g.age}
                      </td>
                      <td className="px-4 py-3.5 tabular-nums text-[#D4D4D8]">
                        {g.size}
                      </td>
                      <td className="px-4 py-3.5 text-[#D4D4D8]">
                        {g.coaches}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
