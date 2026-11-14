import { useState } from 'react';
import { Shirt } from 'lucide-react';

interface UniformShowcaseProps {
  onActionClick: () => void;
}

export function UniformShowcase({ onActionClick }: UniformShowcaseProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      aria-labelledby="uniforme-heading"
      className="border-b border-white/10 bg-[#0A0A0C] py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-sm border border-white/10 bg-[#141417]">
            {imgError ? (
              <div className="flex aspect-[3/2] flex-col items-center justify-center bg-gradient-to-br from-[#18181B] to-[#0D0D0F] p-8 text-center">
                <Shirt className="h-9 w-9 text-[#FF1E6E]" aria-hidden="true" />
                <p className="mt-3 font-display text-2xl font-bold tracking-wide text-[#F4F1EA] uppercase">
                  Uniforme Oficial Altura BC
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  Jersey, short y calcetas de competencia · CDMX 2,240M
                </p>
              </div>
            ) : (
              <img
                src="/assets/aistudio/Uniforme_de_b_squetbol_Altura_BC_172db6e6.png"
                alt="Uniforme oficial de básquetbol Altura BC: jersey negro con franjas tricolor verde, hueso y magenta, short y calcetas"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="aspect-[3/2] w-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
            Equipamiento oficial · Temporada inaugural
          </p>
          <h2
            id="uniforme-heading"
            className="mt-3 font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-[#F4F1EA] uppercase sm:text-6xl [text-wrap:balance]"
          >
            La piel de Altura BC
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
            Diseño propio con acentos tricolor sobre negro mate para representar
            al club en entrenamientos, retas y partidos de liga en la Ciudad de
            México.
          </p>

          <ul className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-[#D4D4D8]">
            <li className="flex gap-3">
              <span className="font-bold text-[#FF1E6E]" aria-hidden="true">
                —
              </span>
              <span>
                Jersey y short transpirables de corte atlético con escudo bordado
                del club.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#FF1E6E]" aria-hidden="true">
                —
              </span>
              <span>
                Calcetas de compresión a juego para las categorías de
                competencia y liga.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#FF1E6E]" aria-hidden="true">
                —
              </span>
              <span>
                El kit completo es obligatorio para jugar en el club y se
                adquiere aparte de la mensualidad. Una vez que ya cuentas con tu
                kit, puedes comprar prendas adicionales o dobles por separado.
              </span>
            </li>
          </ul>

          <div className="mt-8">
            <button
              type="button"
              onClick={onActionClick}
              className="cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-6 py-3.5 text-sm font-bold text-[#0D0D0F] transition-colors duration-150 hover:bg-[#ff3b81] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F1EA]"
            >
              Consultar disponibilidad y tallas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
