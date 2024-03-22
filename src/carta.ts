import { Color } from "./color.js";
import { Tipo } from "./tipo.js";
import { Rareza } from "./rareza.js";

export interface Carta {
  id: number;
  nombre: string;
  costeMana: number;
  color: Color;
  tipo: Tipo;
  rareza: Rareza;
  textoReglas: string;
  fuerza?: number;
  resistencia?: number;
  marcasLealtad?: number;
  valorMercado: number;
}