export interface CategoryItem {
  id: string;
  ageRange: string;
  title: string;
  description: string;
  formValue: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface ScheduleRow {
  category: string;
  days: string;
  time: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
  footnote?: string;
}

export type FaqTopic = 'horarios' | 'sede' | 'requisitos';

export interface FaqItem {
  topic: FaqTopic;
  topicLabel: string;
  question: string;
  answer: string;
}

export interface VenueGalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  areaLabel: string;
}

export const VENUE_GALLERY: VenueGalleryItem[] = [
  {
    id: 'duela',
    src: '/src/assets/images/court_duela_cdmx_1794670556083.jpg',
    alt: 'Cancha techada de duela reglamentaria de Altura BC en Ciudad de México',
    title: 'Cancha principal de duela',
    subtitle: 'Madera de maple con amortiguación para cuidar rodillas',
    areaLabel: 'Cancha',
  },
  {
    id: 'tableros',
    src: '/src/assets/images/court_hoop_detail_1794671837093.jpg',
    alt: 'Tablero de cristal templado y aro profesional en la duela de Altura BC',
    title: 'Tableros de cristal templado',
    subtitle: 'Aros abatibles e iluminación uniforme para juego nocturno',
    areaLabel: 'Tableros',
  },
  {
    id: 'vestidores',
    src: '/src/assets/images/locker_room_benches_1794671836864.jpg',
    alt: 'Vestidores modernos con casilleros individuales, bancas de madera y regaderas',
    title: 'Vestidores y regaderas',
    subtitle: 'Casilleros individuales, bancas amplias y agua caliente',
    areaLabel: 'Vestidores',
  },
  {
    id: 'calentamiento',
    src: '/src/assets/images/facility_warmup_area_1794671839138.jpg',
    alt: 'Zona lateral de calentamiento con rack de balones de piel y colchonetas',
    title: 'Zona de calentamiento',
    subtitle: 'Balones de piel listos para entrenar y área de movilidad',
    areaLabel: 'Entrenamiento',
  },
];

export const PILLARS: string[] = [
  'CLUB FORMATIVO 7–18',
  'TECNIFICACIÓN ABIERTA',
  'RUTA UNIVERSITARIA EE. UU.',
  'FEMENIL Y VARONIL',
  'RETAS Y LIGA ADULTOS',
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'iniciacion',
    ageRange: '7 A 9 AÑOS · INICIACIÓN',
    title: 'MINI',
    description:
      'Que se enganchen al básquet: coordinación, bote, pase y tiro jugando en partidos 3 contra 3. Minutos repartidos para todos.',
    formValue: 'Iniciación / Mini (7 a 9)',
  },
  {
    id: 'fundamentos',
    ageRange: '10 A 12 AÑOS · FUNDAMENTOS',
    title: 'INFANTIL',
    description:
      'Manejo con ambas manos, mecánica de tiro, finalizaciones y defensa individual. Opción de sumar Academia de Tecnificación.',
    formValue: 'Fundamentos (10 a 12)',
  },
  {
    id: 'desarrollo-rendimiento',
    ageRange: '13 A 18 AÑOS · DESARROLLO Y RENDIMIENTO',
    title: 'JUVENIL',
    description:
      'Vía de participación o liga exigente, lectura de ventajas, táctica colectiva, fuerza con técnica y acceso a Ruta Universitaria EE. UU.',
    formValue: 'Desarrollo / Rendimiento (13 a 18)',
  },
  {
    id: 'adultos',
    ageRange: '18+ Y 35+ · LIBRE Y MÁSTER',
    title: 'LIBRE / MÁSTER',
    description:
      'Entrenamiento entre semana, retas organizadas por nivel y equipo de liga para adultos en ramas femenil, varonil y máster.',
    formValue: 'Libre / Máster (18+)',
  },
];

export const STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Regístrate y elige programa',
    description:
      'Dinos tu edad, nivel y si buscas el Club base, la Academia de Tecnificación (abierta a externos) o ruta universitaria.',
  },
  {
    number: '02',
    title: 'Ven a evaluación y clase de prueba',
    description:
      'Un balón por jugador, sin filas largas. Conoces la metodología de 90 minutos y te ubicamos en el grupo de tu nivel.',
  },
  {
    number: '03',
    title: 'Entrena con seguimiento real',
    description:
      'Recibes ficha técnica y pruebas medibles tres veces por temporada para ver tu evolución en números antes de elegir vía.',
  },
];

export const VENUE_INFO = {
  address: 'Av. Universidad 318, Col. Narvarte Poniente, Benito Juárez',
  transit: 'A 4 min del Metro Etiopía y Metrobús Doctor Vértiz',
};

export const SCHEDULE: ScheduleRow[] = [
  {
    category: 'Iniciación (7–9)',
    days: 'Mar y Jue',
    time: '16:30 – 17:30',
  },
  {
    category: 'Fundamentos (10–12)',
    days: 'Lun, Mié y Vie',
    time: '16:45 – 18:00',
  },
  {
    category: 'Desarrollo (13–15)',
    days: 'Lun, Mié y Vie',
    time: '18:00 – 19:30',
  },
  {
    category: 'Rendimiento (16–18)',
    days: 'Lun a Jue',
    time: '18:30 – 20:00',
  },
  {
    category: 'Tecnificación (10–18)',
    days: 'Mar y Jue / Sáb',
    time: '17:30 – 18:45',
  },
  {
    category: 'Libre y Máster (18+ / 35+)',
    days: 'Lun a Jue',
    time: '20:00 – 22:00',
  },
  {
    category: 'Retas abiertas',
    days: 'Vie y Sáb',
    time: '19:30 – 22:00',
  },
];

export const PLANS: MembershipPlan[] = [
  {
    id: 'reta',
    name: 'RETA',
    price: '$690',
    period: 'al mes',
    features: [
      'Retas organizadas por nivel',
      'Cancha de duela, balones de piel y árbitro incluidos',
      'Sin entrenamiento dirigido',
    ],
  },
  {
    id: 'club',
    name: 'CLUB',
    price: '$1,190',
    period: 'al mes',
    features: [
      '2 a 4 sesiones semanales según etapa + partido de liga',
      'Ficha técnica individual 3 veces por temporada',
      'Acceso prioritario a retas abiertas y eventos del club',
    ],
    featured: true,
    footnote: 'EL PUNTO DE ENTRADA AL PROYECTO',
  },
  {
    id: 'tecnificacion',
    name: 'CLUB + TECNIFICACIÓN',
    price: '$1,690',
    period: 'al mes',
    features: [
      'Todo lo del plan Club o acceso externo a la academia',
      '2 sesiones extra por semana en grupos máx. de 8 por nivel',
      'Ciclos medibles de 8–10 semanas con prueba inicial y final',
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    topic: 'requisitos',
    topicLabel: 'Requisitos',
    question: '¿Necesito saber jugar o tener experiencia previa para entrar?',
    answer:
      'No. En el Club nadie queda fuera por nivel: recibimos jugadores desde los 7 años y adultos en Libre y Máster. En la clase de prueba evaluamos tu nivel para ubicarte en el grupo adecuado, y hasta los 12 años juegan todos con minutos repartidos.',
  },
  {
    topic: 'requisitos',
    topicLabel: 'Requisitos',
    question: '¿Qué necesito llevar a mi primera clase de prueba?',
    answer:
      'Tenis de cancha con suela limpia, ropa deportiva cómoda y botella de agua. No necesitas traer balón: el club cuenta con balones de piel para cada jugador desde el primer minuto.',
  },
  {
    topic: 'sede',
    topicLabel: 'Sede y ubicación',
    question: '¿Dónde está ubicada la cancha y cómo llego?',
    answer:
      'Entrenamos en Av. Universidad 318, Col. Narvarte Poniente, Alcaldía Benito Juárez, CDMX. Está a 4 minutos caminando del Metro Etiopía / Plaza de la Transparencia y de la estación Doctor Vértiz del Metrobús.',
  },
  {
    topic: 'sede',
    topicLabel: 'Sede y ubicación',
    question: '¿Las instalaciones son techadas y cuentan con vestidores?',
    answer:
      'Sí. Jugamos en duela techada reglamentaria con amortiguación para cuidar rodillas, zona lateral de calentamiento y vestidores completos con casilleros, bancas y regaderas. Si acompañas a tu hija o hijo, puedes quedarte a ver la clase.',
  },
  {
    topic: 'horarios',
    topicLabel: 'Horarios',
    question: '¿Cuáles son los horarios y cuántas sesiones hay por semana?',
    answer:
      'Las etapas formativas (7 a 18 años) entrenan entre semana de 16:30 a 20:00 según categoría (de 2 sesiones de 60 min en Iniciación hasta 4 sesiones de 90 min en Rendimiento). Adultos Libre y Máster entrenan de 20:00 a 22:00, y las retas abiertas son viernes y sábados de 19:30 a 22:00.',
  },
  {
    topic: 'horarios',
    topicLabel: 'Horarios',
    question: '¿La temporada choca con exámenes escolares o vacaciones?',
    answer:
      'No. Nuestra temporada corre de agosto a julio alineada al ciclo escolar mexicano para respetar periodos de exámenes y vacaciones familiares.',
  },
  {
    topic: 'requisitos',
    topicLabel: 'Requisitos',
    question: '¿Puedo entrar solo a la Academia de Tecnificación si juego en otro club?',
    answer:
      'Sí. La Academia de Tecnificación (desde los 10 años) está abierta a jugadores de otros clubes. Solo requieres pasar una evaluación inicial para asignarte a un grupo de máximo 8 jugadores de tu mismo nivel.',
  },
  {
    topic: 'requisitos',
    topicLabel: 'Requisitos',
    question: '¿Qué requisitos pide la Academia Universitaria EE. UU.?',
    answer:
      'Está dirigida a jugadores del club de 14 a 18 años tras al menos una temporada con nosotros. Requiere evaluación deportiva, entrevista familiar y mantener el promedio escolar al día en las 16 materias básicas desde 3.º de secundaria. No prometemos becas: garantizamos elegibilidad, preparación y visibilidad ante entrenadores.',
  },
];

export const CATEGORY_OPTIONS: string[] = [
  'Iniciación / Mini (7 a 9)',
  'Fundamentos (10 a 12)',
  'Desarrollo / Rendimiento (13 a 18)',
  'Academia de Tecnificación (10 a 18 · Externo o Club)',
  'Ruta Universitaria EE. UU. (14 a 18)',
  'Libre / Máster (18+)',
  'Solo retas abiertas',
];

export const LEVEL_OPTIONS: string[] = [
  'Nunca he jugado',
  'Juego de vez en cuando',
  'Entreno o juego en liga escolar/local',
  'Competitivo / busco tecnificación o beca',
];
