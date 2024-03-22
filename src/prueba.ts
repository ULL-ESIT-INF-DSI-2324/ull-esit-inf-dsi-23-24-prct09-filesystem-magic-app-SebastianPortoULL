import fs from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';

import { hideBin } from 'yargs/helpers';

// Configuración de yargs para definir los argumentos de línea de comandos
const argv = yargs(hideBin(process.argv))
  .option('file', {
    alias: 'f',
    describe: 'Ruta al archivo de texto',
    demandOption: true, // El argumento es obligatorio
    type: 'string',
  })
  .option('color', {
    alias: 'c',
    describe: 'Color para aplicar al texto',
    default: 'blue', // Color por defecto si no se especifica
    choices: ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white'], // Colores disponibles
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .argv;

// Función para leer el archivo de texto y aplicar el color especificado
function applyColorToFile(filePath: string, color: string) {
	try {
		// Leer el contenido del archivo
		const text = fs.readFileSync(filePath, 'utf-8');

		// Aplicar el color al texto leído
		const coloredText = (chalk as any)[color](text);

		// Imprimir el texto coloreado en la consola
		console.log(coloredText);
	} catch (err) {
		console.error(chalk.red('Error al leer el archivo:', err));
	}
}

// Llamar a la función con los argumentos proporcionados por el usuario
if (typeof argv !== 'object' || argv instanceof Promise || !argv.file) {
	throw new Error('Invalid arguments');
}

applyColorToFile(argv.file, argv.color);