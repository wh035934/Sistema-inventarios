export interface Producto {
  id: number;
  nombre: string;
  modelo: string;
  categoria: string;
  ubicacion: string;
  cantidad: number;
  estado: string;
  fechaRegistro: string;
  precio: number;
  descripcion: string;
}

export type ProductoForm = Omit<Producto, 'id'>;

export interface Entrega {
  id: number;
  nombre: string;
  area: string;
  estado: string;
}

export type EntregaForm = Omit<Entrega, 'id'>;

// Datos locales de ejemplo. Todo vive en memoria, sin conexión externa.
export const inventarioInicial: Producto[] = [
  { id: 1, nombre: 'Laptop HP', modelo: 'ProBook 450', categoria: 'computo', ubicacion: 'almacen A', cantidad: 10, estado: 'disponible', fechaRegistro: '2026-01-15', precio: 15500, descripcion: 'Equipo para oficina' },
  { id: 2, nombre: 'Taladro Bosch', modelo: 'GSB 13', categoria: 'herramienta', ubicacion: 'almacen B', cantidad: 5, estado: 'en reparacion', fechaRegistro: '2026-02-10', precio: 2300, descripcion: 'Requiere cambio de carbones' },
  { id: 3, nombre: 'Monitor LG', modelo: '24MP400', categoria: 'computo', ubicacion: 'oficina 1', cantidad: 8, estado: 'disponible', fechaRegistro: '2026-03-05', precio: 3200, descripcion: 'Monitor 24 pulgadas' },
];

export const entregasIniciales: Entrega[] = [
  { id: 1, nombre: 'Desarrollador Frontend', area: 'sistemas', estado: 'activa' },
  { id: 2, nombre: 'Diseñador UX', area: 'marketing', estado: 'urgente' },
  { id: 3, nombre: 'Auxiliar Contable', area: 'administracion', estado: 'pausada' },
];
