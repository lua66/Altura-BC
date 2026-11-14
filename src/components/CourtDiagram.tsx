import { useState } from 'react';

interface ShotPosition {
  id: string;
  label: string;
  cx: number;
  cy: number;
  controlX: number;
  controlY: number;
}

const SHOT_SPOTS: ShotPosition[] = [
  {
    id: 'wing',
    label: 'Triple lateral',
    cx: 344,
    cy: 298,
    controlX: 300,
    controlY: 165,
  },
  {
    id: 'top',
    label: 'Triple frontal',
    cx: 220,
    cy: 344,
    controlX: 255,
    controlY: 205,
  },
  {
    id: 'corner',
    label: 'Esquina izquierda',
    cx: 56,
    cy: 112,
    controlX: 138,
    controlY: 56,
  },
];

export function CourtDiagram() {
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);
  const spot = SHOT_SPOTS[activeSpotIndex];

  const handleCycleShot = () => {
    setActiveSpotIndex((prev) => (prev + 1) % SHOT_SPOTS.length);
  };

  return (
    <div className="w-full max-w-[460px] select-none">
      <button
        type="button"
        onClick={handleCycleShot}
        aria-label={`Diagrama interactivo de media cancha. Tiro actual: ${spot.label}. Haz clic para cambiar posición de tiro.`}
        className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1E6E]"
      >
        <svg
          viewBox="0 0 440 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full transition-transform duration-200 group-hover:scale-[1.01]"
        >
          {/* Outer half-court frame */}
          <rect
            x="16"
            y="16"
            width="408"
            height="408"
            stroke="#52525B"
            strokeWidth="2"
          />

          {/* Three-point line in vibrant magenta */}
          <path
            d="M 46 16 L 46 162 A 174 174 0 0 0 394 162 L 394 16"
            stroke="#FF1E6E"
            strokeWidth="2.5"
          />

          {/* Key / Paint area */}
          <rect
            x="156"
            y="16"
            width="128"
            height="174"
            stroke="#71717A"
            strokeWidth="2"
          />

          {/* Free throw circle (top and dashed/solid inner arc) */}
          <circle
            cx="220"
            cy="190"
            r="52"
            stroke="#71717A"
            strokeWidth="2"
          />
          <line
            x1="156"
            y1="190"
            x2="284"
            y2="190"
            stroke="#71717A"
            strokeWidth="1.5"
          />

          {/* Center court arc at bottom */}
          <path
            d="M 168 424 A 52 52 0 0 1 272 424"
            stroke="#71717A"
            strokeWidth="2"
          />

          {/* Backboard */}
          <line
            x1="186"
            y1="44"
            x2="254"
            y2="44"
            stroke="#F4F1EA"
            strokeWidth="3"
          />

          {/* Rim */}
          <circle
            cx="220"
            cy="58"
            r="9"
            stroke="#FF1E6E"
            strokeWidth="3"
          />

          {/* Dashed shot trajectory arc */}
          <path
            d={`M ${spot.cx} ${spot.cy} Q ${spot.controlX} ${spot.controlY} 220 68`}
            stroke="#FF1E6E"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Basketball at current shot position */}
          <g className="transition-transform duration-300">
            <circle cx={spot.cx} cy={spot.cy} r="22" fill="#FF1E6E" />
            <line
              x1={spot.cx - 22}
              y1={spot.cy}
              x2={spot.cx + 22}
              y2={spot.cy}
              stroke="#0D0D0F"
              strokeWidth="2"
            />
            <line
              x1={spot.cx}
              y1={spot.cy - 22}
              x2={spot.cx}
              y2={spot.cy + 22}
              stroke="#0D0D0F"
              strokeWidth="2"
            />
            <path
              d={`M ${spot.cx - 14} ${spot.cy - 16} Q ${spot.cx - 4} ${spot.cy} ${spot.cx - 14} ${spot.cy + 16}`}
              stroke="#0D0D0F"
              strokeWidth="1.8"
              fill="none"
            />
            <path
              d={`M ${spot.cx + 14} ${spot.cy - 16} Q ${spot.cx + 4} ${spot.cy} ${spot.cx + 14} ${spot.cy + 16}`}
              stroke="#0D0D0F"
              strokeWidth="1.8"
              fill="none"
            />
          </g>
        </svg>

        <div className="mt-3 flex items-center justify-between text-xs text-[#71717A]">
          <span>Diagrama de media cancha · {spot.label}</span>
          <span className="text-[#A1A1AA] transition-colors group-hover:text-[#FF1E6E]">
            Cambiar ángulo →
          </span>
        </div>
      </button>
    </div>
  );
}
