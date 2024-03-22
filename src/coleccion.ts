import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import { Color } from './color.js';
import { Tipo } from './tipo.js';
import { Rareza } from './rareza.js';
import { Carta } from './carta.js';

const DIR_BASE = '/home/usuario/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-SebastianPortoULL/usuarios';

export class Coleccion {

	private dirBase: string;

	constructor() {
		this.dirBase = DIR_BASE;
	}

	get dirbase() { return this.dirBase; }

  añadirCarta(usuario: string, carta: Carta) {
    const dirUsuario = path.join(this.dirbase, usuario);
    if (!fs.existsSync(dirUsuario)) {
      fs.mkdirSync(dirUsuario);
    }

    const filePath = path.join(dirUsuario, `${carta.id}.json`);
    if (fs.existsSync(filePath)) {
      console.error(chalk.red('Error: La carta ya existe en la colección.'));
      return;
    }

		// Si es de tipo Criatura, comprobar que tiene fuerza y resistencia. Si no es Criatura, no deben existir estos campos
		if (carta.tipo === Tipo.Criatura && (!carta.fuerza || !carta.resistencia)) {
			console.error(chalk.red('Error: Las criaturas deben tener fuerza y resistencia.'));
			return;
		} 
		if (carta.tipo !== Tipo.Criatura && (carta.fuerza || carta.resistencia)) {
			console.error(chalk.red('Error: Las cartas que no son criaturas no deben tener fuerza ni resistencia.'));
			return;
		}

		// Si es de tipo Planeswalker, comprobar que tiene marcas de lealtad. Si no es Planeswalker, no deben existir estas marcas
		if (carta.tipo === Tipo.Planeswalker && !carta.marcasLealtad) {
			console.error(chalk.red('Error: Los Planeswalker deben tener marcas de lealtad.'));
			return;
		}
		if (carta.tipo !== Tipo.Planeswalker && carta.marcasLealtad) {
			console.error(chalk.red('Error: Las cartas que no son Planeswalker no deben tener marcas de lealtad.'));
			return;
		}

    fs.writeFileSync(filePath, JSON.stringify(carta, null, 2));
    console.log(chalk.green('Carta añadida correctamente.'));
  }

  modificarCarta(usuario: string, carta: Carta, argv: any) {
    const dirUsuario = path.join(this.dirbase, usuario);
    const filePath = path.join(dirUsuario, `${carta.id}.json`);
    
    if (!fs.existsSync(filePath)) {
      console.error(chalk.red('Error: La carta no existe en la colección.'));
      return;
    }

    const cartaExistente : Carta = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Carta;
    
    // Actualizar solo los campos especificados en argv
  	if (argv.nombre) cartaExistente.nombre = argv.nombre;
  	if (argv.costeMana) cartaExistente.costeMana = argv.costeMana;
  	if (argv.color) cartaExistente.color = Color[argv.color as keyof typeof Color];
  	if (argv.tipo) cartaExistente.tipo = Tipo[argv.tipo as keyof typeof Tipo];
  	if (argv.rareza) cartaExistente.rareza = Rareza[argv.rareza as keyof typeof Rareza];
  	if (argv.textoReglas) cartaExistente.textoReglas = argv.textoReglas;
  	if (argv.fuerza) cartaExistente.fuerza = argv.fuerza;
  	if (argv.resistencia) cartaExistente.resistencia = argv.resistencia;
  	if (argv.marcasLealtad) cartaExistente.marcasLealtad = argv.marcasLealtad;
  	if (argv.valorMercado) cartaExistente.valorMercado = argv.valorMercado;

    fs.writeFileSync(filePath, JSON.stringify(cartaExistente, null, 2));
    console.log(chalk.green('Carta modificada correctamente.'));
  }

  eliminarCarta(usuario: string, id: number) {
    const dirUsuario = path.join(this.dirbase, usuario);
    const filePath = path.join(dirUsuario, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      console.error(chalk.red('Error: La carta no existe en la colección.'));
      return;
    }

    fs.unlinkSync(filePath);
    console.log(chalk.green('Carta eliminada correctamente.'));
  }

  listarCartas(usuario: string) {
    const dirUsuario = path.join(this.dirbase, usuario);

    if (!fs.existsSync(dirUsuario)) {
      console.error(chalk.red('Error: El usuario no tiene cartas en su colección.'));
      return;
    }

    const files = fs.readdirSync(dirUsuario);
    files.forEach(file => {
      const filePath = path.join(dirUsuario, file);
      const carta = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Carta;
      const text : string = JSON.stringify(carta, null, 2);
      const coloredText : string = (chalk as any)[Color[carta.color]](text);
      console.log(coloredText);
    });
  }

  mostrarCarta(usuario: string, id: number) {
    const dirUsuario = path.join(this.dirbase, usuario);
    const filePath = path.join(dirUsuario, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      console.error(chalk.red('Error: La carta no existe en la colección.'));
      return;
    }

    const carta = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Carta;
    const text : string = JSON.stringify(carta, null, 2);
    const coloredText : string = (chalk as any)[Color[carta.color]](text);
    console.log(coloredText);
  }
}