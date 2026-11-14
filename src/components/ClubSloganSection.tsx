import { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface ClubSloganSectionProps {
  onGoToRegister: () => void;
}

export function ClubSloganSection({ onGoToRegister }: ClubSloganSectionProps) {
  const [videoError, setVideoError] = useState(false);

  return (
    <section
      aria-labelledby="slogan-club-heading"
      className="border-b border-white/10 bg-[#0D0D0F] py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-sm border border-white/10 bg-[#0A0A0C]">
            {videoError ? (
              <div className="flex aspect-video flex-col items-center justify-center p-8 text-center">
                <Volume2
                  className="h-9 w-9 text-[#FF1E6E]"
                  aria-hidden="true"
                />
                <p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#F4F1EA] uppercase">
                  Juntos vamos a lo más alto
                </p>
                <p className="mt-2 max-w-md text-sm text-[#A1A1AA]">
                  Oye, jugadores del DF, ven a unirte al club Altura BC.
                </p>
              </div>
            ) : (
              <video
                src="/assets/aistudio/presentacion_del_club_59b350ac.mp4"
                controls
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
                aria-label="Video oficial Altura BC: Juntos vamos a lo más alto"
                className="block h-auto w-full bg-[#0A0A0C]"
              >
                Tu navegador no soporta la reproducción de video HTML5.
              </video>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
            Altura BC · Ciudad de México · 2,240M
          </p>

          <h2
            id="slogan-club-heading"
            className="mt-3 font-display text-5xl leading-[0.93] font-extrabold tracking-tight text-[#F4F1EA] uppercase sm:text-6xl [text-wrap:balance]"
          >
            Juntos vamos a lo más alto
          </h2>

          <blockquote className="mt-5 border-l-2 border-[#FF1E6E] pl-4 text-base leading-relaxed text-[#D4D4D8] sm:text-lg">
            “Oye, jugadores del DF, ven a unirte al club Altura BC. Juntos vamos
            a lo más alto.”
          </blockquote>

          <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
            Dale play al mensaje del club y aparta tu lugar en la primera
            generación en la Ciudad de México.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={onGoToRegister}
              className="cursor-pointer whitespace-nowrap rounded-sm bg-[#FF1E6E] px-6 py-3.5 text-sm font-bold text-[#0D0D0F] transition-colors duration-150 hover:bg-[#ff3b81] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F1EA]"
            >
              Unirme a Altura BC
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
