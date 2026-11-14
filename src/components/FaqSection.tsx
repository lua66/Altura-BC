import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS, type FaqTopic } from '../data/clubData';

type FilterValue = 'todas' | FaqTopic;

const FILTER_TABS: { value: FilterValue; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'horarios', label: 'Horarios' },
  { value: 'sede', label: 'Sede y ubicación' },
  { value: 'requisitos', label: 'Requisitos' },
];

export function FaqSection() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('todas');
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    FAQS[0]?.question ?? null
  );

  const filteredFaqs =
    activeFilter === 'todas'
      ? FAQS
      : FAQS.filter((item) => item.topic === activeFilter);

  const handleFilterChange = (nextFilter: FilterValue) => {
    setActiveFilter(nextFilter);
    const nextList =
      nextFilter === 'todas'
        ? FAQS
        : FAQS.filter((item) => item.topic === nextFilter);
    setOpenQuestion(nextList[0]?.question ?? null);
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestion((prev) => (prev === question ? null : question));
  };

  return (
    <section
      id="preguntas"
      aria-labelledby="faq-heading"
      className="border-t border-white/10 bg-[#0D0D0F] py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
            Preguntas frecuentes
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-[#F4F1EA] uppercase sm:text-6xl [text-wrap:balance]"
          >
            Dudas sobre horarios, sede y requisitos
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[#A1A1AA]">
            Todo lo que necesitas saber antes de pisar la duela en tu primera
            clase de prueba.
          </p>

          {/* Interactive topic filter buttons */}
          <div
            role="tablist"
            aria-label="Filtrar preguntas frecuentes por tema"
            className="mt-7 flex flex-wrap gap-2"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(tab.value)}
                  className={`cursor-pointer whitespace-nowrap rounded-sm border px-3.5 py-2 text-xs font-bold tracking-wide transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1E6E] ${
                    isActive
                      ? 'border-[#FF1E6E] bg-[#FF1E6E] text-[#0D0D0F]'
                      : 'border-white/15 bg-[#141417] text-[#D4D4D8] hover:border-white/30 hover:text-[#F4F1EA]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10 lg:col-span-7">
          {filteredFaqs.map((item) => {
            const isOpen = openQuestion === item.question;
            return (
              <div key={item.question} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleQuestion(item.question)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1E6E]"
                >
                  <div>
                    <span className="block text-[11px] font-bold tracking-[0.12em] text-[#FF1E6E] uppercase">
                      {item.topicLabel}
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-[#F4F1EA] transition-colors hover:text-[#FF1E6E]">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    aria-hidden="true"
                    className={`mt-2 h-5 w-5 shrink-0 text-[#A1A1AA] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#FF1E6E]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 max-w-2xl pr-8 text-base leading-relaxed text-[#A1A1AA]">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
