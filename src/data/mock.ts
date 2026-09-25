export interface Empleado {
  id: number;
  nombres: string;
  apellidos: string;
  edad: number;
  area: string;
  puesto: string;
}

export type EmpleadoForm = Omit<Empleado, 'id'>;

export interface Vacante {
  id: number;
  nombre: string;
  area: string;
  estado: string;
}

export type VacanteForm = Omit<Vacante, 'id'>;

// Datos locales de ejemplo. Todo vive en memoria, sin conexión externa.
export const empleadosIniciales: Empleado[] = [
  { id: 1, nombres: 'Juan', apellidos: 'Pérez', edad: 30, area: 'sistemas', puesto: 'Desarrollador' },
  { id: 2, nombres: 'María', apellidos: 'López', edad: 28, area: 'marketing', puesto: 'Diseñadora' },
  { id: 3, nombres: 'Carlos', apellidos: 'Sánchez', edad: 35, area: 'administracion', puesto: 'Contador' },
];

export const vacantesIniciales: Vacante[] = [
  { id: 1, nombre: 'Desarrollador Frontend', area: 'sistemas', estado: 'activa' },
  { id: 2, nombre: 'Diseñador UX', area: 'marketing', estado: 'urgente' },
  { id: 3, nombre: 'Auxiliar Contable', area: 'administracion', estado: 'pausada' },
];
