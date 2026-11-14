import {
  CATEGORIES,
  PILLARS,
  PLANS,
  SCHEDULE,
  STEPS,
  VENUE_GALLERY,
  VENUE_INFO,
} from '../data/clubData';
import { PROGRAMS_OVERVIEW } from '../data/projectData';
import { CourtDiagram } from '../components/CourtDiagram';
import { VenueGallery } from '../components/VenueGallery';
import { FaqSection } from '../components/FaqSection';
import { RegistrationSection } from '../components/RegistrationSection';
import type { RegistroRow } from '../services/googleSheets';

interface HomePageProps {
  selectedCategory: string;
  selectedPlan: string | null;
  onSelectCategory: (formValue: string) => void;
  onSelectPlan: (planName: string) => void;
  onClearPlan: () => void;
  onNavigate: (to: string) => void;
  onGoToRegister: () => void;
  onSubmitRegistration: (row: RegistroRow) => void;
}

export function HomePage({
  selectedCategory,
  selectedPlan,
  onSelectCategory,
  onSelectPlan,
  onClearPlan,
  onNavigate,
  onGoToRegister,
  onSubmitRegistration,
}: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold tracking-[0.18em] text-[#FF1E6E] uppercase">
              Club formativo y academias · Ciudad de México
            </p>

            <h1 className="mt-4 font-display text-6xl leading-[0.88] font-extrabold tracking-tight text-[#F4F1EA] uppercase sm:text-7xl lg:text-[5.25rem] [text-wrap:balance]">
              Aquí se juega a 2,240 metros
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Un club de formación desde los 7 años con dos academias dentro:
              tecnificación abierta para mejorar más rápido y ruta universitaria
              hacia Estados Unidos. También entrenamientos, retas y liga para
              adultos.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={onGoToRegister}
                className="cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-6 py-3.5 text-sm font-bold text-[#0D0D0F] transition-colors duration-150 hover:bg-[#ff3b81] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F1EA]"
              >
                Quiero entrar al club
              </button>
              <a
                href="/club"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/club');
                }}
                className="whitespace-nowrap text-sm font-semibold text-[#F4F1EA] underline decoration-[#52525B] underline-offset-8 transition-colors hover:decoration-[#FF1E6E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1E6E]"
              >
                Ver proyecto deportivo →
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-6 lg:justify-end">
            <CourtDiagram />
          </div>
        </div>
      </section>

      {/* Pillars Strip */}
      <section
        aria-label="Pilares del proyecto"
        className="border-y border-white/10 bg-[#0A0A0C]"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-5">
          {PILLARS.map((pillar) => (
            <span
              key={pillar}
              className="font-display text-lg font-bold tracking-wider text-[#D4D4D8] uppercase sm:text-xl"
            >
              {pillar}
            </span>
          ))}
        </div>
      </section>

      {/* 3 Connected Programs (Main Player Hooks) */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
              Un solo sistema · Tres niveles de compromiso
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-[#F4F1EA] uppercase sm:text-6xl [text-wrap:balance]">
              Entras por el club, creces hasta donde quieras
            </h2>
          </div>

          <a
            href="/metodologia"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/metodologia');
            }}
            className="shrink-0 whitespace-nowrap text-sm font-semibold text-[#F4F1EA] underline decoration-[#52525B] underline-offset-8 transition-colors hover:decoration-[#FF1E6E]"
          >
            Cómo entrenamos y evaluamos →
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PROGRAMS_OVERVIEW.map((prog, index) => (
            <div
              key={prog.id}
              className="flex flex-col justify-between rounded-sm border border-white/10 bg-[#141417] p-7 transition-colors hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-[#A1A1AA]">
                  <span className="font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
                    Programa 0{index + 1} · {prog.age}
                  </span>
                  <span className="tabular-nums text-[#71717A]">
                    {prog.weeklyLoad}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[#F4F1EA] uppercase">
                  {prog.name}
                </h3>

                <p className="mt-3 text-base font-medium leading-relaxed text-[#E4E4E7]">
                  {prog.hookHeadline}
                </p>

                <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                  <div>
                    <dt className="inline font-semibold text-[#A1A1AA]">
                      Para quién:{' '}
                    </dt>
                    <dd className="inline text-[#D4D4D8]">{prog.audience}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-[#A1A1AA]">
                      Qué añade:{' '}
                    </dt>
                    <dd className="inline text-[#D4D4D8]">{prog.adds}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-7 pt-2">
                <a
                  href={prog.slug}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(prog.slug);
                  }}
                  className="inline-flex items-center text-sm font-bold text-[#FF1E6E] transition-colors hover:text-[#ff5793] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1E6E]"
                >
                  {prog.ctaLabel} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section
        id="categorias"
        className="border-t border-white/10 mx-auto max-w-6xl px-6 py-20 md:py-24"
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-[#F4F1EA] uppercase sm:text-6xl [text-wrap:balance]">
            Hay un lugar para tu nivel
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            Un balón por jugador, sin filas de más de 30 segundos y con grupos
            reales por etapa y nivel. Haz clic en una categoría para apartar tu
            prueba.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.formValue;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.formValue)}
                className={`group flex h-full cursor-pointer flex-col justify-between rounded-sm border p-6 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1E6E] ${
                  isSelected
                    ? 'border-[#FF1E6E]/70 bg-[#18181D]'
                    : 'border-white/10 bg-[#141417] hover:border-white/25 hover:bg-[#18181D]'
                }`}
              >
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
                    {category.ageRange}
                  </p>
                  <h3 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#F4F1EA] uppercase">
                    {category.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                    {category.description}
                  </p>
                </div>
                <span className="mt-6 inline-block text-xs font-semibold text-[#71717A] transition-colors group-hover:text-[#F4F1EA]">
                  Apartar en esta categoría →
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Three Steps Section (Light Contrast Surface) */}
      <section className="bg-[#F4F1EA] py-20 text-[#0D0D0F] md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-xl font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-[#0D0D0F] uppercase sm:text-6xl [text-wrap:balance]">
              De la banca a la duela en tres pasos
            </h2>
            <a
              href="/metodologia"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/metodologia');
              }}
              className="shrink-0 whitespace-nowrap text-sm font-bold text-[#0D0D0F] underline decoration-[#0D0D0F]/30 underline-offset-8 transition-colors hover:decoration-[#FF1E6E]"
            >
              Ver sesión de 90 min y ficha técnica →
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="border-t-2 border-[#0D0D0F] pt-6"
              >
                <p className="font-display text-5xl font-extrabold tracking-tight text-[#0D0D0F] tabular-nums">
                  {step.number}
                </p>
                <h3 className="mt-3 text-lg font-bold text-[#0D0D0F]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3F3F46]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Schedule Section */}
      <section
        id="sede"
        className="border-b border-white/10 bg-[#0D0D0F] py-20 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-[#F4F1EA] uppercase sm:text-6xl">
            Sede y horarios
          </h2>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <VenueGallery items={VENUE_GALLERY} />

              <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                <span className="font-medium text-[#F4F1EA]">
                  {VENUE_INFO.address}
                </span>{' '}
                · {VENUE_INFO.transit}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-x-auto rounded-sm border border-white/10 bg-[#121215]">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-bold tracking-[0.12em] text-[#71717A] uppercase">
                      <th scope="col" className="px-5 py-4">
                        Categoría / Programa
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Días
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Hora
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {SCHEDULE.map((row) => (
                      <tr
                        key={row.category}
                        className="transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-4 font-semibold text-[#F4F1EA]">
                          {row.category}
                        </td>
                        <td className="px-5 py-4 text-[#A1A1AA]">{row.days}</td>
                        <td className="px-5 py-4 font-medium text-[#D4D4D8] tabular-nums">
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-[#71717A]">
                Temporada alineada al ciclo escolar mexicano (agosto a julio)
                para no chocar con exámenes ni vacaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Memberships / Pricing Section */}
      <section id="membresias" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-xl">
          <h2 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-[#F4F1EA] uppercase sm:text-6xl [text-wrap:balance]">
            Paga por lo que vas a jugar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            Sin inscripción anual ni plazos forzosos. Tres planes mensuales
            según qué tanto quieras entrenar y competir.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isFeatured = Boolean(plan.featured);
            const isChosen = selectedPlan === plan.name;

            return (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPlan(plan.name);
                  }
                }}
                aria-label={`Elegir plan ${plan.name}, ${plan.price} ${plan.period}`}
                className={`flex cursor-pointer flex-col justify-between rounded-sm border p-7 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1E6E] ${
                  isFeatured
                    ? 'border-[#F4F1EA] bg-[#F4F1EA] text-[#0D0D0F]'
                    : isChosen
                      ? 'border-[#FF1E6E] bg-[#18181D] text-[#F4F1EA]'
                      : 'border-white/10 bg-[#141417] text-[#F4F1EA] hover:border-white/25'
                }`}
              >
                <div>
                  <h3 className="font-display text-3xl font-extrabold tracking-tight uppercase">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold tracking-tight tabular-nums">
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${
                        isFeatured ? 'text-[#52525B]' : 'text-[#A1A1AA]'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <ul
                    className={`mt-6 space-y-3 text-sm leading-relaxed ${
                      isFeatured ? 'text-[#27272A]' : 'text-[#D4D4D8]'
                    }`}
                  >
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  {plan.footnote ? (
                    <p className="border-t border-[#0D0D0F]/15 pt-4 text-[11px] font-bold tracking-[0.12em] text-[#0D0D0F] uppercase">
                      {plan.footnote}
                    </p>
                  ) : (
                    <p className="border-t border-white/10 pt-4 text-xs font-semibold text-[#71717A] uppercase">
                      Elegir {plan.name} →
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onGoToRegister}
            className="cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-6 py-3.5 text-sm font-bold text-[#0D0D0F] transition-colors duration-150 hover:bg-[#ff3b81] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F1EA]"
          >
            Quiero entrar al club
          </button>
        </div>
      </section>

      <FaqSection />

      <RegistrationSection
        selectedCategory={selectedCategory}
        selectedPlan={selectedPlan}
        onClearPlan={onClearPlan}
        onSubmitRegistration={onSubmitRegistration}
      />
    </>
  );
}
