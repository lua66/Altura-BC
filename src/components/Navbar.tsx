import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (to: string) => void;
  onCtaClick: () => void;
}

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/club', label: 'El Club' },
  { href: '/tecnificacion', label: 'Tecnificación' },
  { href: '/academia-universitaria', label: 'Universitaria' },
  { href: '/metodologia', label: 'Metodología' },
];

export function Navbar({ currentPath, onNavigate, onCtaClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0D0D0F]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1E6E]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-[#FF1E6E]"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
            <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M5.5 4.5C8.5 7.5 8.5 16.5 5.5 19.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M18.5 4.5C15.5 7.5 15.5 16.5 18.5 19.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className="font-display text-xl font-extrabold tracking-wide text-[#F4F1EA]">
            ALTURA BC
          </span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`shrink-0 whitespace-nowrap text-sm font-medium transition-colors duration-150 hover:text-[#F4F1EA] hover:underline hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1E6E] ${
                  isActive
                    ? 'text-[#FF1E6E] underline decoration-[#FF1E6E] underline-offset-8'
                    : 'text-[#A1A1AA]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onCtaClick}
            className="hidden shrink-0 cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-5 py-2.5 text-sm font-bold text-[#0D0D0F] transition-colors duration-150 hover:bg-[#ff3b81] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F1EA] md:inline-flex"
          >
            Quiero entrar
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-white/15 text-[#F4F1EA] transition-colors hover:border-white/30 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#121215] px-6 py-5 md:hidden">
          <nav aria-label="Menú móvil" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-1.5 text-base font-medium transition-colors hover:text-[#F4F1EA] ${
                    isActive ? 'text-[#FF1E6E]' : 'text-[#D4D4D8]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onCtaClick();
              }}
              className="mt-2 w-full cursor-pointer rounded-sm bg-[#FF1E6E] px-5 py-3 text-center text-sm font-bold text-[#0D0D0F] transition-colors hover:bg-[#ff3b81]"
            >
              Quiero entrar
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
