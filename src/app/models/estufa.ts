import { Cocina } from './cocina';

export interface Estufa {
  id?: number; // opcional
  marca: string;
  modelo: string;
  tipo: string;
  potencia: number;
  descripcion: string;
  cocina: Cocina | null;
}
