export interface ProgramOverview {
  id: string;
  slug: string;
  name: string;
  age: string;
  audience: string;
  adds: string;
  weeklyLoad: string;
  hookHeadline: string;
  ctaLabel: string;
}

export interface FormationStage {
  stage: string;
  age: string;
  objective: string;
  taught: string;
  notYet: string;
  sessionsPerWeek: string;
}

export interface FirstYearGroup {
  group: string;
  age: string;
  size: string;
  coaches: string;
}

export interface TechnificationBlock {
  block: string;
  focus: string;
}

export interface UniversityPathway {
  pathway: string;
  academicReq: string;
  process: string;
  note: string;
}

export interface GradeCalendarRow {
  mexicoGrade: string;
  equivalent: string;
  actions: string;
}

export interface SessionPart {
  part: string;
  duration: string;
  content: string;
}

export interface StaffRole {
  role: string;
  responsibility: string;
  whenNeeded: string;
}

export interface SeasonPeriod {
  period: string;
  months: string;
  activity: string;
}

export interface TrackingDimension {
  title: string;
  detail: string;
}

export const PROGRAMS_OVERVIEW: ProgramOverview[] = [
  {
    id: 'club',
    slug: '/club',
    name: 'El Club',
    age: '7 a 18 años',
    audience: 'Todos los niveles',
    adds: 'Equipo de tu edad, entrenamiento estructurado y liga',
    weeklyLoad: '2 a 4 sesiones + partido',
    hookHeadline: 'Tu punto de entrada: aprendes, juegas y creces por etapa.',
    ctaLabel: 'Ver etapas del club',
  },
  {
    id: 'tecnificacion',
    slug: '/tecnificacion',
    name: 'Academia de tecnificación',
    age: '10 a 18 años',
    audience: 'Abierta también a jugadores de otros clubes',
    adds: 'Trabajo individual en grupos de máximo 8 jugadores por nivel',
    weeklyLoad: '+2 sesiones (60–75 min)',
    hookHeadline: 'Más repeticiones, corrección precisa y progreso medido cada 8–10 semanas.',
    ctaLabel: 'Explorar tecnificación',
  },
  {
    id: 'universitaria',
    slug: '/academia-universitaria',
    name: 'Academia universitaria EE. UU.',
    age: '14 a 18 años',
    audience: 'Seleccionados del club con perfil deportivo y académico',
    adds: 'Alto rendimiento, seguimiento de boletas, inglés y video para coaches',
    weeklyLoad: '+3 sesiones + tutoría',
    hookHeadline: 'Llega elegible, preparado y visible a NCAA, NAIA o NJCAA.',
    ctaLabel: 'Ver ruta universitaria',
  },
];

export const HOW_WE_PLAY: string[] = [
  'Ritmo alto: correr después de cada rebote y cada robo.',
  'Defensa individual en todas las categorías hasta los 13 años; las zonas llegan después.',
  'El balón se mueve: pase antes que bote, y ventaja antes que jugada.',
  'Todos tiran, todos botan y todos defienden. Sin posiciones fijas antes de los 14 años.',
  'Se entrena decidiendo: los ejercicios tienen defensa y lectura desde el principio.',
];

export const HOW_WE_FORM: string[] = [
  'Hasta los 12 años juegan todos, con minutos repartidos. El resultado no decide quién entra.',
  'El jugador sabe siempre qué está trabajando y por qué.',
  'La escuela va primero: sin estudios al día no hay academia universitaria.',
  'Respeto al rival, al árbitro y al compañero como norma de vestidor, no como cartel.',
];

export const FORMATION_STAGES: FormationStage[] = [
  {
    stage: 'Iniciación',
    age: '7 a 9 años',
    objective: 'Que se enganchen al básquet',
    taught: 'Coordinación, bote, pase y tiro jugando; partidos 3 contra 3',
    notYet: 'Sistemas, posiciones, físico específico',
    sessionsPerWeek: '2 de 60 min',
  },
  {
    stage: 'Fundamentos',
    age: '10 a 12 años',
    objective: 'Dominar la técnica individual',
    taught: 'Manejo con ambas manos, mecánica de tiro, finalizaciones, 1c1, defensa individual',
    notYet: 'Zonas, jugadas cerradas',
    sessionsPerWeek: '3 de 75 min',
  },
  {
    stage: 'Desarrollo',
    age: '13 a 15 años',
    objective: 'Entender el juego',
    taught: 'Lectura de ventajas, juego sin balón, bloqueo directo, ayudas defensivas; inicio de fuerza con técnica',
    notYet: 'Especialización total por posición',
    sessionsPerWeek: '3 a 4 de 90 min',
  },
  {
    stage: 'Rendimiento',
    age: '16 a 18 años',
    objective: 'Competir y proyectarse',
    taught: 'Táctica colectiva, scouting, rol en el equipo, fuerza y prevención de lesiones',
    notYet: 'Nada: aquí se trabaja todo',
    sessionsPerWeek: '4 de 90 min + físico',
  },
];

export const FIRST_YEAR_GROUPS: FirstYearGroup[] = [
  { group: 'Iniciación', age: '7 a 9', size: '10 a 14', coaches: '1 + auxiliar' },
  { group: 'Fundamentos', age: '10 a 12', size: '10 a 14', coaches: '1 + auxiliar' },
  { group: 'Desarrollo', age: '13 a 15', size: '10 a 12', coaches: '1' },
  { group: 'Rendimiento', age: '16 a 18', size: '10 a 12', coaches: '1' },
];

export const COMPETITION_CRITERIA: string[] = [
  'Asistencia mínima del 85 % en los últimos tres meses.',
  'Evaluación técnica de la etapa aprobada.',
  'Actitud y compromiso valorados por su entrenador.',
  'Calificaciones escolares al día.',
];

export const TECHNIFICATION_SPECS = [
  {
    label: 'Edad',
    value: 'Desde los 10 años',
    detail: 'Antes de los 10, el trabajo formativo del club basta.',
  },
  {
    label: 'Grupos',
    value: 'Máximo 8 por entrenador',
    detail: 'Agrupados por nivel real de juego y no por edad.',
  },
  {
    label: 'Carga',
    value: '2 sesiones extra / semana',
    detail: 'Sesiones de 60 a 75 minutos añadidas al equipo.',
  },
  {
    label: 'Acceso',
    value: 'Abierta a externos',
    detail: 'Evaluación inicial para ubicar nivel; abierta a jugadores de otros clubes.',
  },
];

export const TECHNIFICATION_BLOCKS: TechnificationBlock[] = [
  {
    block: 'Tiro',
    focus: 'Mecánica, tiro tras bote y tras pase, volumen medido',
  },
  {
    block: 'Manejo',
    focus: 'Ambas manos, cambios de ritmo y dirección bajo presión',
  },
  {
    block: 'Finalización',
    focus: 'Contacto, ambas manos, apoyos y paradas',
  },
  {
    block: 'Juego sin balón',
    focus: 'Cortes, uso de bloqueos, lectura de espacios',
  },
  {
    block: 'Trabajo por posición',
    focus: 'Exteriores e interiores, a partir de los 14 años',
  },
  {
    block: 'Físico',
    focus: 'Coordinación y velocidad; fuerza con técnica desde los 13 años',
  },
  {
    block: 'Video',
    focus: 'Revisión de sus propios partidos, desde los 13 años',
  },
];

export const UNIVERSITY_FRONTS = [
  {
    title: 'Deportivo',
    detail:
      'Grupo de alto rendimiento con 3 sesiones adicionales por semana, preparación física y análisis en video individual.',
  },
  {
    title: 'Académico',
    detail:
      'Un tutor revisa calificaciones cada bimestre y lleva la cuenta de las 16 materias básicas desde 3.º de secundaria.',
  },
  {
    title: 'Inglés',
    detail:
      'Nivel medido al entrar y objetivo claro de examen de admisión antes del último año de preparatoria.',
  },
  {
    title: 'Exposición',
    detail:
      'Video de jugadas actualizado cada temporada, perfil del jugador, contacto directo con entrenadores y viajes a torneos o campus en EE. UU.',
  },
];

export const UNIVERSITY_PATHWAYS: UniversityPathway[] = [
  {
    pathway: 'NCAA División I',
    academicReq: '16 materias básicas aprobadas y promedio mínimo de 2.3',
    process: 'Cuenta en el Eligibility Center',
    note: 'Plantel máximo de 15 jugadores en universidades adheridas al acuerdo House',
  },
  {
    pathway: 'NCAA División II',
    academicReq: '16 materias básicas y promedio mínimo de 2.2',
    process: 'Cuenta en el Eligibility Center',
    note: 'Becas parciales y completas según perfil',
  },
  {
    pathway: 'NCAA División III',
    academicReq: 'Lo fija cada universidad',
    process: 'El Eligibility Center certifica la parte deportiva',
    note: 'Fuerte enfoque en becas académicas y admisión',
  },
  {
    pathway: 'NAIA',
    academicReq: 'Lo determina su centro de elegibilidad',
    process: 'Registro en PlayNAIA y evaluación de estudios InCred',
    note: 'Gran vía para perfiles internacionales competitivos',
  },
  {
    pathway: 'NJCAA (Junior College)',
    academicReq: 'Preparatoria terminada y condición de amateur',
    process: 'Lo revisa cada colegio',
    note: 'Dos temporadas y después transferencia a universidad de cuatro años',
  },
];

export const GRADE_CALENDAR: GradeCalendarRow[] = [
  {
    mexicoGrade: '3.º de secundaria',
    equivalent: 'Grado 9',
    actions:
      'Entrada a la academia, diagnóstico de inglés y de materias; las calificaciones ya cuentan para el expediente NCAA.',
  },
  {
    mexicoGrade: '1.º de preparatoria',
    equivalent: 'Grado 10',
    actions:
      'Alta en el Eligibility Center, primer video de jugadas y lista amplia de universidades.',
  },
  {
    mexicoGrade: '2.º de preparatoria',
    equivalent: 'Grado 11',
    actions:
      'Exámenes de inglés y admisión, contacto directo con entrenadores, torneo o campus en EE. UU.',
  },
  {
    mexicoGrade: '3.º de preparatoria',
    equivalent: 'Grado 12',
    actions:
      'Solicitudes de admisión, certificación académica final (traducida al inglés) y trámite de visa de estudiante.',
  },
];

export const SESSION_STRUCTURE: SessionPart[] = [
  {
    part: 'Activación',
    duration: '10 min',
    content: 'Movilidad y coordinación con balón',
  },
  {
    part: 'Técnica individual',
    duration: '25 min',
    content: 'El fundamento del día, con muchas repeticiones',
  },
  {
    part: 'Juego reducido',
    duration: '25 min',
    content: '1 contra 1 a 3 contra 3 aplicando ese fundamento',
  },
  {
    part: 'Juego real',
    duration: '20 min',
    content: '4 contra 4 o 5 contra 5 con una consigna clara',
  },
  {
    part: 'Cierre',
    duration: '10 min',
    content: 'Tiros libres, estiramiento y una idea para llevarse',
  },
];

export const METHOD_RULES: string[] = [
  'Un balón por jugador y nada de filas largas: nadie espera más de 30 segundos.',
  'Un solo objetivo por sesión, anunciado al empezar y repasado al terminar.',
  'Se corrige a un jugador con una cosa cada vez.',
  'La planificación es mensual por etapa y la comparten todos los entrenadores.',
  'Los ejercicios viven en un banco común del club, ordenado por etapa y fundamento.',
];

export const TRACKING_DIMENSIONS: TrackingDimension[] = [
  {
    title: 'Técnica',
    detail:
      'Lista de fundamentos de su etapa, cada uno marcado como iniciado, en progreso o dominado.',
  },
  {
    title: 'Pruebas medibles',
    detail:
      'Tiros libres y de campo sobre número fijo de intentos, circuito de manejo cronometrado, salto y velocidad.',
  },
  {
    title: 'Juego',
    detail:
      'Valoración del entrenador sobre toma de decisiones, defensa y trabajo en equipo.',
  },
  {
    title: 'Compromiso',
    detail: 'Registro continuo de asistencia y actitud en entrenamientos y partidos.',
  },
  {
    title: 'Escuela',
    detail:
      'Promedio del bimestre, obligatorio para acceder y permanecer en la academia universitaria.',
  },
];

export const SEASON_CALENDAR: SeasonPeriod[] = [
  {
    period: 'Pretemporada',
    months: 'Agosto',
    activity: 'Evaluación inicial, formación de grupos, jornada de entrenadores',
  },
  {
    period: 'Bloque 1',
    months: 'Septiembre a diciembre',
    activity: 'Fundamentos de la etapa, inicio de liga, primer ciclo de tecnificación',
  },
  {
    period: 'Bloque 2',
    months: 'Enero a marzo',
    activity: 'Evaluación de mitad de temporada, revisión de vías, segundo ciclo',
  },
  {
    period: 'Bloque 3',
    months: 'Abril a junio',
    activity: 'Fase final de ligas, evaluación final, informes a familias',
  },
  {
    period: 'Verano',
    months: 'Julio',
    activity: 'Campus abierto, captación y viaje de la academia universitaria',
  },
];

export const STAFF_ROLES: StaffRole[] = [
  {
    role: 'Director deportivo',
    responsibility: 'Identidad, planificación, formación de entrenadores y evaluación',
    whenNeeded: 'Desde el día uno',
  },
  {
    role: 'Entrenadores de grupo',
    responsibility: 'Un grupo cada uno; siguen la planificación común',
    whenNeeded: 'Desde el día uno',
  },
  {
    role: 'Auxiliares',
    responsibility: 'Apoyo en Iniciación y Fundamentos',
    whenNeeded: 'Desde el día uno',
  },
  {
    role: 'Responsable de tecnificación',
    responsibility: 'Evaluaciones, ciclos y grupos por nivel',
    whenNeeded: 'Al abrir la academia de tecnificación',
  },
  {
    role: 'Preparador físico',
    responsibility: 'Fuerza y prevención desde los 13 años',
    whenNeeded: 'Al abrir Desarrollo y Rendimiento',
  },
  {
    role: 'Responsable de academia universitaria',
    responsibility: 'Elegibilidad, relación con universidades y familias',
    whenNeeded: 'Al abrir la academia universitaria',
  },
  {
    role: 'Tutor académico y profesor de inglés',
    responsibility: 'Seguimiento escolar y preparación de exámenes (pueden ser externos)',
    whenNeeded: 'Al abrir la academia universitaria',
  },
];

export const COACH_FORMATION: string[] = [
  'Una jornada de método antes de la temporada y una reunión técnica al mes.',
  'El director deportivo observa una sesión de cada entrenador al mes y le da devolución.',
  'Todo entrenador nuevo pasa un mes como auxiliar antes de llevar un grupo.',
];
