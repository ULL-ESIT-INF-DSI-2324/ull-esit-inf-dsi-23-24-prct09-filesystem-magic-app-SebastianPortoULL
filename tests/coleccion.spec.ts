import 'mocha';
import { expect } from 'chai';

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import { Color } from '../src/code/color.js';
import { Tipo } from '../src/code/tipo.js';
import { Rareza } from '../src/code/rareza.js';
import { Carta } from '../src/code/carta.js';
import { Coleccion } from '../src/code/coleccion.js';

describe('Tests de la clase Coleccion', () => {
	const coleccion: Coleccion = new Coleccion();
	let carta_planewalker: Carta;
	let carta_criatura: Carta;
	let carta: Carta;
	let carta_err_criatura: Carta;
	let carta_err_planeswalker: Carta;
	let carta_err: Carta;
	let usuario: string;
	beforeEach(() => {
		usuario = 'Test';
		carta_criatura = {
			id: 1, 
			nombre: 'Test', 
			costeMana: 1, 
			color: Color.white, 
			tipo: Tipo.Criatura, 
			rareza: Rareza.Comun, 
			textoReglas: 'Test', 
			fuerza: 2, 
			resistencia: 3, 
			valorMercado: 1
		};
		carta_planewalker = {
			id: 2,
			nombre: 'Test', 
			costeMana: 1, 
			color: Color.colorless, 
			tipo: Tipo.Planeswalker, 
			rareza: Rareza.Comun, 
			textoReglas: 'Test', 
			marcasLealtad: 2, 
			valorMercado: 1
		};
		carta = {
			id: 3, 
			nombre: 'Test', 
			costeMana: 1, 
			color: Color.multicolor, 
			tipo: Tipo.Tierra, 
			rareza: Rareza.Comun, 
			textoReglas: 'Test', 
			valorMercado: 1
		};
		carta_err_criatura = {
			id: 4, 
			nombre: 'Test', 
			costeMana: 1, 
			color: Color.white, 
			tipo: Tipo.Criatura, 
			rareza: Rareza.Comun, 
			textoReglas: 'Test', 
			valorMercado: 1
		};
		carta_err_planeswalker = {
			id: 5, 
			nombre: 'Test', 
			costeMana: 1, 
			color: Color.colorless, 
			tipo: Tipo.Planeswalker, 
			rareza: Rareza.Comun, 
			textoReglas: 'Test', 
			valorMercado: 1
		};
		carta_err = {
			id: 6, 
			nombre: 'Test', 
			costeMana: 1, 
			color: Color.multicolor, 
			tipo: Tipo.Tierra, 
			rareza: Rareza.Comun, 
			textoReglas: 'Test', 
			valorMercado: 1
		};
	});

	it('Se crea una Coleccion correctamente', () => {
		expect(coleccion).to.be.an.instanceof(Coleccion);
	});

	it('Se añade una carta a la coleccion', () => {
		coleccion.añadirCarta(usuario, carta_criatura);
		expect(fs.existsSync(path.join(coleccion.dirbase, usuario, `${carta_criatura.id}.json`))).to.be.true;

		coleccion.añadirCarta(usuario, carta_planewalker);
		expect(fs.existsSync(path.join(coleccion.dirbase, usuario, `${carta_planewalker.id}.json`))).to.be.true;

		coleccion.añadirCarta(usuario, carta);
		expect(fs.existsSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`))).to.be.true;

		// Errores carta
		expect(() => coleccion.añadirCarta(usuario, carta)).to.throw(Error, 'La carta ya existe en la colección.');

		expect(() => coleccion.añadirCarta(usuario, carta_err_criatura)).to.throw(Error, 'Las criaturas deben tener fuerza y resistencia.');
		carta_err.fuerza = 2;
		expect(() => coleccion.añadirCarta(usuario, carta_err)).to.throw(Error, 'Las cartas que no son criaturas no deben tener fuerza ni resistencia.');
		carta_err.fuerza = undefined;

		expect(() => coleccion.añadirCarta(usuario, carta_err_planeswalker)).to.throw(Error, 'Los Planeswalker deben tener marcas de lealtad.');
		carta_err.marcasLealtad = 2;
		expect(() => coleccion.añadirCarta(usuario, carta_err)).to.throw(Error, 'Las cartas que no son Planeswalker no deben tener marcas de lealtad.');
	});

	it('Se modifica una carta de la coleccion', () => {
		coleccion.modificarCarta(usuario, carta_criatura, { fuerza: 3 });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta_criatura.id}.json`), 'utf-8')).fuerza).to.be.equal(3);
		coleccion.modificarCarta(usuario, carta_criatura, { resistencia: 3 });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta_criatura.id}.json`), 'utf-8')).resistencia).to.be.equal(3);

		coleccion.modificarCarta(usuario, carta_planewalker, { marcasLealtad: 3 });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta_planewalker.id}.json`), 'utf-8')).marcasLealtad).to.be.equal(3);

		coleccion.modificarCarta(usuario, carta, { nombre: 'Test2' });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`), 'utf-8')).nombre).to.be.equal('Test2');
		coleccion.modificarCarta(usuario, carta, { costeMana: 2 });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`), 'utf-8')).costeMana).to.be.equal(2);
		coleccion.modificarCarta(usuario, carta, { color: Color.black });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`), 'utf-8')).color).to.be.equal('black');
		coleccion.modificarCarta(usuario, carta, { tipo: Tipo.Criatura });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`), 'utf-8')).tipo).to.be.equal('Criatura');
		coleccion.modificarCarta(usuario, carta, { rareza: Rareza.Rara });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`), 'utf-8')).rareza).to.be.equal('Rara');
		coleccion.modificarCarta(usuario, carta, { textoReglas: 'Test2' });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`), 'utf-8')).textoReglas).to.be.equal('Test2');
		coleccion.modificarCarta(usuario, carta, { valorMercado: 2 });
		expect(JSON.parse(fs.readFileSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`), 'utf-8')).valorMercado).to.be.equal(2);

		// Errores carta
		expect(() => coleccion.modificarCarta(usuario, carta_err, { tipo: 'Criatura' })).to.throw(Error, 'La carta no existe en la colección.');
	});

	it('Se elimina una carta de la coleccion', () => {
		coleccion.eliminarCarta(usuario, carta_criatura.id);
		expect(fs.existsSync(path.join(coleccion.dirbase, usuario, `${carta_criatura.id}.json`))).to.be.false;

		coleccion.eliminarCarta(usuario, carta_planewalker.id);
		expect(fs.existsSync(path.join(coleccion.dirbase, usuario, `${carta_planewalker.id}.json`))).to.be.false;

		coleccion.eliminarCarta(usuario, carta.id);
		expect(fs.existsSync(path.join(coleccion.dirbase, usuario, `${carta.id}.json`))).to.be.false;

		// Errores carta
		expect(() => coleccion.eliminarCarta(usuario, carta_err.id)).to.throw(Error, 'La carta no existe en la colección.');
	});
	
	it('Se listan las cartas de la coleccion', () => {
		coleccion.añadirCarta(usuario, carta_criatura);
		coleccion.añadirCarta(usuario, carta_planewalker);
		coleccion.añadirCarta(usuario, carta);
		// Al devolver void no se puede comprobar si se ha listado correctamente, se mira en la consola/terminal
		coleccion.listarCartas(usuario);

		usuario = 'Test2';
		expect(() => coleccion.listarCartas(usuario)).to.throw(Error, 'El usuario no tiene cartas en su colección.');
	});

	it('Se muestra una carta de la coleccion', () => {
		// Al devolver void no se puede comprobar si se ha mostrado correctamente, se mira en la consola/terminal
		coleccion.mostrarCarta(usuario, carta_criatura.id);
		coleccion.mostrarCarta(usuario, carta_planewalker.id);
		coleccion.mostrarCarta(usuario, carta.id);

		// Errores carta
		usuario = 'Test2';
		expect(() => coleccion.mostrarCarta(usuario, carta_criatura.id)).to.throw(Error, 'La carta no existe en la colección.');
	});
});