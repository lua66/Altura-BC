import {
  GRADE_CALENDAR,
  UNIVERSITY_FRONTS,
  UNIVERSITY_PATHWAYS,
} from '../data/projectData';

interface UniversitariaPageProps {
  onSelectCategoryAndRegister: (category: string) => void;
  onNavigate: (to: string) => void;
}

export function UniversitariaPage({
  onSelectCategoryAndRegister,
  onNavigate,
}: UniversitariaPageProps) {
  return (
    <div className="bg-[#0D0D0F] text-[#F4F1EA]">
      {/* Hero */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
            Programa 03 · 14 a 18 años · Ramas femenil y varonil
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-7xl [text-wrap:balance]">
            Academia universitaria: llega elegible, preparado y visible a EE. UU.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            Prepara a un grupo piloto seleccionado del club (8 a 12 jugadores
            por rama, a partir de la segunda temporada) para ser admitidos y
            competir en universidades de Estados Unidos.
          </p>

          <div className="mt-6 max-w-2xl rounded-sm border border-white/15 bg-[#141417] p-5 text-sm leading-relaxed text-[#D4D4D8]">
            <strong className="text-[#F4F1EA]">
              Transparencia desde el primer día:
            </strong>{' '}
            el club no puede prometer una beca —la decisión depende de cada
            universidad y los lugares son pocos—. Lo que sí garantizamos es que
            el jugador llegue con expediente limpio, nivel competitivo y
            exposición real ante entrenadores.
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() =>
                onSelectCategoryAndRegister('Ruta Universitaria EE. UU. (14 a 18)')
              }
              className="cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-6 py-3.5 text-sm font-bold text-[#0D0D0F] transition-colors hover:bg-[#ff3b81]"
            >
              Registrar interés en ruta universitaria
            </button>
            <a
              href="/club"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/club');
              }}
              className="whitespace-nowrap text-sm font-semibold text-[#F4F1EA] underline decoration-[#52525B] underline-offset-8 transition-colors hover:decoration-[#FF1E6E]"
            >
              Primero entrar por el Club →
            </a>
          </div>
        </div>
      </section>

      {/* The 4 Fronts */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
          Cuatro frentes de trabajo simultáneos
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {UNIVERSITY_FRONTS.map((front, idx) => (
            <div
              key={front.title}
              className="rounded-sm border border-white/10 bg-[#141417] p-6"
            >
              <p className="font-display text-3xl font-extrabold text-[#FF1E6E] tabular-nums">
                0{idx + 1}
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold uppercase">
                {front.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                {front.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Entry Pathways Table */}
      <section className="border-y border-white/10 bg-[#0A0A0C] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
            Las cinco vías de entrada en Estados Unidos
          </h2>
          <p className="mt-3 max-w-3xl text-base text-[#A1A1AA]">
            La academia orienta a cada jugador hacia la liga que encaja con su
            perfil deportivo y académico. El expediente para NCAA cuenta desde
            3.º de secundaria (Grado 9), con boletas en español y traducción
            certificada al inglés.
          </p>

          <div className="mt-8 overflow-x-auto rounded-sm border border-white/10 bg-[#121215]">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                  <th scope="col" className="px-5 py-4">
                    Vía
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Requisito académico
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Trámite
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Nota clave
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {UNIVERSITY_PATHWAYS.map((row) => (
                  <tr key={row.pathway} className="align-top hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-bold whitespace-nowrap text-[#FF1E6E]">
                      {row.pathway}
                    </td>
                    <td className="px-5 py-4 text-[#F4F1EA]">
                      {row.academicReq}
                    </td>
                    <td className="px-5 py-4 text-[#D4D4D8]">{row.process}</td>
                    <td className="px-5 py-4 text-[#A1A1AA]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#71717A]">
            Nota: Las pruebas SAT y ACT ya no forman parte de la elegibilidad
            NCAA, pero cada universidad decide si las exige para admisión, igual
            que el examen de inglés. Antes de aceptar dinero o firmar con un
            representante se revisan las reglas de amateurismo de la vía
            elegida.
          </p>
        </div>
      </section>

      {/* Grade Calendar & Access/Retention */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              Calendario por grado escolar
            </h2>
            <div className="mt-6 overflow-x-auto rounded-sm border border-white/10 bg-[#121215]">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                    <th scope="col" className="px-5 py-4">
                      Grado en México
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Equivale a
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Qué se hace
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {GRADE_CALENDAR.map((row) => (
                    <tr key={row.mexicoGrade} className="align-top">
                      <td className="px-5 py-4 font-semibold whitespace-nowrap text-[#F4F1EA]">
                        {row.mexicoGrade}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-[#FF1E6E] tabular-nums">
                        {row.equivalent}
                      </td>
                      <td className="px-5 py-4 text-[#D4D4D8]">
                        {row.actions}
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
                Acceso y permanencia
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold uppercase">
                Solo para jugadores del club
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#D4D4D8]">
                Se entra tras al menos un año dentro del club mediante selección:
                evaluación deportiva, promedio escolar mínimo y entrevista con la
                familia.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                La escuela manda: si el promedio baja del mínimo dos bimestres
                seguidos, el jugador sale de la academia universitaria hasta
                recuperar su expediente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
