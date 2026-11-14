import { useState, type FormEvent } from 'react';
import { CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { SPREADSHEET_TITLE, type BoletinRow } from '../services/googleSheets';

interface FooterProps {
  onNavigate: (to: string) => void;
  onSubscribeNewsletter: (row: BoletinRow) => void;
  onOpenSheetsManager: () => void;
  pendingCount: number;
  isSheetConnected: boolean;
}

const SITE_PAGES = [
  { href: '/', label: 'Inicio' },
  { href: '/club', label: 'Programa 1: El Club (/club)' },
  { href: '/tecnificacion', label: 'Programa 2: Tecnificación (/tecnificacion)' },
  {
    href: '/academia-universitaria',
    label: 'Programa 3: Academia Universitaria (/academia-universitaria)',
  },
  { href: '/metodologia', label: 'Metodología y Temporada (/metodologia)' },
];

const HOME_ANCHORS = [
  { href: '/#sede', label: 'Sede y horarios' },
  { href: '/#membresias', label: 'Membresías' },
  { href: '/#preguntas', label: 'Preguntas frecuentes' },
  { href: '/#registro', label: 'Apartar clase de prueba' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Footer({
  onNavigate,
  onSubscribeNewsletter,
  onOpenSheetsManager,
  pendingCount,
  isSheetConnected,
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const trimmed = email.trim();

    if (!EMAIL_REGEX.test(trimmed)) {
      setErrorMsg('Ingresa un correo electrónico válido.');
      return;
    }

    onSubscribeNewsletter({
      fecha: new Date().toLocaleString('es-MX'),
      correo: trimmed,
      origen: 'Boletín pie de página',
    });

    setSubscribedEmail(trimmed);
    setEmail('');
  };

  return (
    <footer className="border-t border-white/10 bg-[#0A0A0C] py-14 text-sm text-[#A1A1AA]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-xl font-extrabold tracking-wide text-[#F4F1EA] uppercase">
              Altura BC
            </p>
            <p className="mt-2">
              Club de formación y academias de básquet · Ciudad de México
            </p>

            {/* Email Newsletter Subscription */}
            <div className="mt-6 max-w-sm">
              <p className="font-semibold text-[#F4F1EA]">
                Boletín de temporada
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#A1A1AA]">
                Recibe fechas de visorias, apertura de inscripciones y campus de
                verano.
              </p>

              {subscribedEmail ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-3 rounded-sm border border-white/15 bg-[#141417] p-3.5 text-xs leading-relaxed text-[#D4D4D8]"
                >
                  <div className="flex items-center gap-2 font-semibold text-[#FF1E6E]">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Suscripción confirmada</span>
                  </div>
                  <p className="mt-1">
                    Enviaremos avisos de temporada a{' '}
                    <span className="text-[#F4F1EA]">{subscribedEmail}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubscribedEmail(null)}
                    className="mt-2 cursor-pointer text-[11px] font-semibold text-[#A1A1AA] underline underline-offset-4 hover:text-[#F4F1EA]"
                  >
                    Cambiar correo
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  noValidate
                  className="mt-3 flex flex-col gap-2 sm:flex-row"
                >
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Correo electrónico para boletín
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="tu@correo.com"
                    className="min-w-0 flex-1 rounded-sm border border-white/15 bg-[#141417] px-3.5 py-2.5 text-sm text-[#F4F1EA] placeholder:text-[#71717A] focus:border-[#FF1E6E] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-4 py-2.5 text-xs font-bold text-[#0D0D0F] transition-colors duration-150 hover:bg-[#ff3b81] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F1EA]"
                  >
                    Suscribirme
                  </button>
                </form>
              )}

              {errorMsg && (
                <p role="alert" className="mt-2 text-xs text-[#FDA4AF]">
                  {errorMsg}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="font-semibold text-[#F4F1EA]">Proyecto y páginas</p>
            <ul className="mt-3 space-y-2">
              {SITE_PAGES.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLink(e, item.href)}
                    className="transition-colors hover:text-[#F4F1EA]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-semibold text-[#F4F1EA]">Club en CDMX</p>
            <ul className="mt-3 space-y-2">
              {HOME_ANCHORS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLink(e, item.href)}
                    className="transition-colors hover:text-[#F4F1EA]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-semibold text-[#F4F1EA]">Contacto</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="tel:+525541829034"
                  className="transition-colors hover:text-[#F4F1EA]"
                >
                  +52 55 4182 9034
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@alturabc.mx"
                  className="transition-colors hover:text-[#F4F1EA]"
                >
                  hola@alturabc.mx
                </a>
              </li>
              <li className="pt-1 text-xs text-[#71717A]">
                IG @alturabc.cdmx · TT @alturabc.mx
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#71717A] sm:flex-row sm:items-center">
          <span>© 2026 Altura BC · Ciudad de México</span>

          <button
            type="button"
            onClick={onOpenSheetsManager}
            className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-white/15 bg-[#121215] px-3.5 py-2 text-xs font-medium text-[#D4D4D8] transition-colors hover:border-[#FF1E6E] hover:text-[#F4F1EA]"
          >
            <FileSpreadsheet
              className="h-3.5 w-3.5 text-[#FF1E6E]"
              aria-hidden="true"
            />
            <span>
              {isSheetConnected
                ? `Google Sheets: ${SPREADSHEET_TITLE}`
                : `Conectar hoja «${SPREADSHEET_TITLE}»`}
              {pendingCount > 0 ? ` (${pendingCount} pendientes)` : ''}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
