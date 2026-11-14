import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CATEGORY_OPTIONS, LEVEL_OPTIONS } from '../data/clubData';
import type { RegistroRow } from '../services/googleSheets';

interface RegistrationSectionProps {
  selectedCategory: string;
  selectedPlan: string | null;
  onClearPlan: () => void;
  onSubmitRegistration: (row: RegistroRow) => void;
}

interface FormSubmission {
  name: string;
  contact: string;
  category: string;
  level: string;
  plan: string | null;
}

function isValidContact(value: string): boolean {
  const trimmed = value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const digits = trimmed.replace(/\D/g, '');
  return emailPattern.test(trimmed) || digits.length >= 10;
}

export function RegistrationSection({
  selectedCategory,
  selectedPlan,
  onClearPlan,
  onSubmitRegistration,
}: RegistrationSectionProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState(selectedCategory);
  const [level, setLevel] = useState(LEVEL_OPTIONS[0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<FormSubmission | null>(null);

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedContact = contact.trim();

    if (trimmedName.length < 2) {
      setErrorMsg('Escribe tu nombre para apartar tu lugar.');
      return;
    }

    if (!isValidContact(trimmedContact)) {
      setErrorMsg(
        'Ingresa un número de WhatsApp válido (10 dígitos) o un correo electrónico.'
      );
      return;
    }

    const row: RegistroRow = {
      fecha: new Date().toLocaleString('es-MX'),
      nombre: trimmedName,
      contacto: trimmedContact,
      categoria: category,
      nivel: level,
      plan: selectedPlan ?? 'Sin especificar',
    };

    onSubmitRegistration(row);

    setSubmitted({
      name: trimmedName,
      contact: trimmedContact,
      category,
      level,
      plan: selectedPlan,
    });
  };

  const handleReset = () => {
    setSubmitted(null);
    setName('');
    setContact('');
    setErrorMsg(null);
  };

  return (
    <section id="registro" className="bg-[#FF1E6E] py-20 text-[#0D0D0F] md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 className="font-display text-5xl leading-[0.93] font-extrabold tracking-tight text-[#0D0D0F] uppercase sm:text-6xl md:text-7xl [text-wrap:balance]">
            Sé de los socios fundadores
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed font-medium text-[#0D0D0F]/90">
            El club está arrancando. Quien se registre ahora elige horario
            primero y recibe la invitación a la primera clase de prueba.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-sm bg-[#101012] p-7 text-[#F4F1EA] sm:p-9">
            {submitted ? (
              <div className="py-4" role="status" aria-live="polite">
                <div className="flex items-center gap-3 text-[#FF1E6E]">
                  <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <span className="font-display text-2xl font-extrabold tracking-wide uppercase">
                    Lugar apartado
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#D4D4D8]">
                  Listo, <strong className="text-[#F4F1EA]">{submitted.name}</strong>.
                  Registramos tu interés para la categoría{' '}
                  <strong className="text-[#F4F1EA]">{submitted.category}</strong>{' '}
                  ({submitted.level.toLowerCase()}).
                  {submitted.plan
                    ? ` Plan de referencia: ${submitted.plan}.`
                    : ''}
                </p>
                <p className="mt-3 text-sm text-[#A1A1AA]">
                  Te escribiremos a <span className="text-[#F4F1EA]">{submitted.contact}</span>{' '}
                  con los horarios de tu primera clase de prueba.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-7 w-full cursor-pointer rounded-sm border border-white/20 px-5 py-3 text-sm font-semibold text-[#F4F1EA] transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  Registrar a otra persona
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {selectedPlan && (
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-[#D4D4D8]">
                    <span>
                      Plan de interés:{' '}
                      <strong className="font-semibold text-[#FF1E6E]">
                        {selectedPlan}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={onClearPlan}
                      className="cursor-pointer text-[#A1A1AA] underline underline-offset-4 hover:text-[#F4F1EA]"
                    >
                      Quitar
                    </button>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="reg-name"
                    className="block text-xs font-semibold tracking-wide text-[#D4D4D8]"
                  >
                    Nombre
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="mt-2 w-full rounded-sm border border-white/15 bg-[#18181B] px-4 py-3 text-base text-[#F4F1EA] placeholder:text-[#71717A] focus:border-[#FF1E6E] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reg-contact"
                    className="block text-xs font-semibold tracking-wide text-[#D4D4D8]"
                  >
                    WhatsApp o correo
                  </label>
                  <input
                    id="reg-contact"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="55 1234 5678 o nombre@correo.com"
                    className="mt-2 w-full rounded-sm border border-white/15 bg-[#18181B] px-4 py-3 text-base text-[#F4F1EA] placeholder:text-[#71717A] focus:border-[#FF1E6E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="reg-category"
                      className="block text-xs font-semibold tracking-wide text-[#D4D4D8]"
                    >
                      Categoría
                    </label>
                    <select
                      id="reg-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-2 w-full cursor-pointer rounded-sm border border-white/15 bg-[#18181B] px-3.5 py-3 text-sm text-[#F4F1EA] focus:border-[#FF1E6E] focus:outline-none"
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="reg-level"
                      className="block text-xs font-semibold tracking-wide text-[#D4D4D8]"
                    >
                      Tu nivel
                    </label>
                    <select
                      id="reg-level"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="mt-2 w-full cursor-pointer rounded-sm border border-white/15 bg-[#18181B] px-3.5 py-3 text-sm text-[#F4F1EA] focus:border-[#FF1E6E] focus:outline-none"
                    >
                      {LEVEL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {errorMsg && (
                  <p
                    role="alert"
                    className="rounded-sm border border-[#FF1E6E]/40 bg-[#FF1E6E]/10 px-3.5 py-2.5 text-sm text-[#FDA4AF]"
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-2 w-full cursor-pointer rounded-sm bg-[#F4F1EA] px-6 py-3.5 text-base font-bold text-[#0D0D0F] transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1E6E]"
                >
                  Apartar mi lugar
                </button>

                <p className="text-xs text-[#71717A]">
                  Solo usamos tus datos para avisarte del arranque del club.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
