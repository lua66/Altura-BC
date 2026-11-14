import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { VenueGalleryItem } from '../data/clubData';

interface VenueGalleryProps {
  items: VenueGalleryItem[];
}

export function VenueGallery({ items }: VenueGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});

  const pointerStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const total = items.length;
  const activeItem = items[activeIndex];

  const goTo = (index: number) => {
    const normalized = ((index % total) + total) % total;
    setActiveIndex(normalized);
  };

  const handlePrev = () => goTo(activeIndex - 1);
  const handleNext = () => goTo(activeIndex + 1);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    pointerStartX.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    setDragOffset(delta);
  };

  const finishDrag = () => {
    if (!isDragging) return;
    const threshold = 48;
    if (dragOffset <= -threshold) {
      handleNext();
    } else if (dragOffset >= threshold) {
      handlePrev();
    }
    pointerStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const markImageError = (id: string) => {
    setFailedIds((prev) => ({ ...prev, [id]: true }));
  };

  const formattedIndex = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Galería de instalaciones: cancha y vestidores"
      className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1E6E]"
    >
      {/* Main swipeable viewport */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        className="relative touch-pan-y overflow-hidden rounded-sm border border-white/10 bg-[#141417] select-none cursor-grab active:cursor-grabbing"
      >
        <div
          className={`flex ${
            isDragging
              ? 'transition-none'
              : 'transition-transform duration-300 ease-out motion-reduce:transition-none'
          }`}
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {items.map((item) => (
            <div key={item.id} className="relative aspect-[4/3] w-full shrink-0">
              {failedIds[item.id] ? (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#18181B] to-[#0D0D0F] p-6 text-center">
                  <MapPin
                    className="h-8 w-8 text-[#FF1E6E]"
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-display text-2xl font-bold tracking-wide text-[#F4F1EA] uppercase">
                    {item.title}
                  </p>
                  <p className="mt-1 max-w-xs text-xs text-[#A1A1AA]">
                    {item.subtitle}
                  </p>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onError={() => markImageError(item.id)}
                  className="h-full w-full object-cover"
                />
              )}

              {/* Contrast scrim for caption */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
              />
            </div>
          ))}
        </div>

        {/* Overlay caption & counter */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
              {activeItem.areaLabel}
            </p>
            <p className="mt-0.5 truncate text-base font-semibold text-[#F4F1EA]">
              {activeItem.title}
            </p>
            <p className="mt-0.5 line-clamp-1 text-xs text-[#D4D4D8]">
              {activeItem.subtitle}
            </p>
          </div>

          <span className="shrink-0 font-display text-lg font-bold tracking-wider text-[#F4F1EA] tabular-nums">
            {formattedIndex} / {formattedTotal}
          </span>
        </div>

        {/* Left / Right navigation arrows */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Foto anterior"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-white/15 bg-[#0D0D0F]/80 text-[#F4F1EA] backdrop-blur-sm transition-colors hover:border-[#FF1E6E] hover:bg-[#0D0D0F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1E6E]"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Siguiente foto"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-white/15 bg-[#0D0D0F]/80 text-[#F4F1EA] backdrop-blur-sm transition-colors hover:border-[#FF1E6E] hover:bg-[#0D0D0F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1E6E]"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Interactive thumbnail / area selector strip */}
      <div
        role="tablist"
        aria-label="Seleccionar vista de la sede"
        className="mt-3 grid grid-cols-4 gap-2"
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Ver ${item.title}`}
              onClick={() => goTo(idx)}
              className={`group cursor-pointer overflow-hidden rounded-sm border text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1E6E] ${
                isActive
                  ? 'border-[#FF1E6E] bg-[#18181D]'
                  : 'border-white/10 bg-[#121215] opacity-70 hover:border-white/25 hover:opacity-100'
              }`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#18181B]">
                {failedIds[item.id] ? (
                  <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-[#71717A] uppercase">
                    {item.areaLabel}
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    onError={() => markImageError(item.id)}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                )}
              </div>
              <span
                className={`block truncate px-2 py-1.5 text-[11px] font-semibold whitespace-nowrap ${
                  isActive ? 'text-[#F4F1EA]' : 'text-[#A1A1AA]'
                }`}
              >
                {item.areaLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
