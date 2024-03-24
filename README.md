# Informe Práctica 9 - Aplicación para coleccionistas de cartas Magic
---

- Alumno: Sebastián André Porto Specht
- Correo: *alu0101494265*
- Asignatura: **Desarrollo de Sistemas Informáticos** (DSI)

---

# Índice

- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Código Implementado y Tests](#código-implementado-y-tests)
- [Conclusión](#conclusión)
- [Bibliografía](#bibliografía)

---

## Introducción

Se ha creado una aplicación en TypeScript para coleccionistas de cartas Magic, permitiendo gestionar y organizar colecciones personales de cartas a través de la línea de comandos. Las funcionalidades principales incluyen añadir, modificar, eliminar, listar y consultar detalles de cartas. La información de las cartas se guarda en formato `JSON` en el sistema de ficheros local. El código está alojado en un repositorio de GitHub y sigue una estructura coherente con las prácticas enseñadas en clase. Se han utilizado las herramientas `yargs` para la ejecución de comandos por línea de comandos y `chalk` para mostrar colores en la consola. Por último se requiere el uso de la API síncrona de Node.js `fs`.


## Objetivos

- **Desarrollo en TypeScript:** Implementar una aplicación funcional utilizando TypeScript como lenguaje de programación principal.
- **Gestión de Colecciones:** Permitir a los usuarios gestionar y organizar su colección personal de cartas Magic, incluyendo operaciones como añadir, modificar, eliminar, listar y consultar información detallada de las cartas.
- **Almacenamiento en JSON:** Almacenar la información de cada carta en formato JSON en el sistema de ficheros del dispositivo donde se ejecute la aplicación, garantizando una estructura de datos coherente y fácilmente manipulable.
- **Interfaz de Línea de Comandos (CLI):** Desarrollar una interfaz de usuario basada exclusivamente en la línea de comandos, utilizando la biblioteca yargs para facilitar la creación de comandos y la interacción con el usuario.
- **Estilización de Salida:** Utilizar la biblioteca chalk para mejorar la presentación de la información en la línea de comandos mediante la aplicación de colores y estilos.
- **Gestión del sistema de ficheros con `fs`:** Utilizar el módulo fs de Node.js para la lectura, escritura y manipulación de archivos, asegurando una gestión eficiente y segura de la información de las colecciones de cartas Magic.
- **Gestión de Código Fuente:** Alojar todo el código desarrollado en un repositorio de GitHub, asegurando una estructura de proyecto coherente y organizada, similar a las prácticas vistas en clase.
- **Análisis y Documentación:** Elaborar un informe detallado que analice las decisiones de diseño adoptadas durante el desarrollo de la solución, proporcionando una visión clara y explicativa de las elecciones técnicas realizadas.

### Código Implementado y Tests
#### **Código**
Los siguientes ficheros se encuentran dentro del directorio `/src/code`:
##### `color.ts`
- **Enum `Color`**: Este archivo define un enumerado TypeScript llamado `Color`, que representa los colores de las cartas en el juego Magic. Los colores incluidos son:
  - `white`
  - `blue`
  - `black`
  - `red`
  - `green`
  - `colorless`
  - `multicolor`

##### `tipo.ts`
- **Enum `Tipo`**: Define un enumerado TypeScript llamado `Tipo`, que describe los diferentes tipos de cartas Magic:
  - `Tierra`
  - `Criatura`
  - `Encantamiento`
  - `Conjuro`
  - `Instantáneo`
  - `Artefacto`
  - `Planeswalker`

##### `rareza.ts`
- **Enum `Rareza`**: Este archivo define un enumerado TypeScript llamado `Rareza`, que representa las rarezas de las cartas Magic:
  - `Comun`
  - `Infrecuente`
  - `Rara`
  - `Mitica`

##### `carta.ts`
- **Interface `Carta`**: Define una interfaz TypeScript llamada `Carta`, que describe la estructura de una carta Magic. Los atributos incluyen:
  - `id`: número identificador de la carta
  - `nombre`: nombre de la carta
  - `costeMana`: coste de mana necesario para jugar la carta
  - `color`: color de la carta (enum `Color`)
  - `tipo`: tipo de la carta (enum `Tipo`)
  - `rareza`: rareza de la carta (enum `Rareza`)
  - `textoReglas`: texto que describe las reglas de la carta
  - `fuerza`: fuerza de la carta (opcional, solo para cartas de tipo `Criatura`)
  - `resistencia`: resistencia de la carta (opcional, solo para cartas de tipo `Criatura`)
  - `marcasLealtad`: marcas de lealtad de la carta (opcional, solo para cartas de tipo `Planeswalker`)
  - `valorMercado`: valor de mercado de la carta

##### `coleccion.ts`
- **Clase `Coleccion`**: Esta clase representa una colección de cartas para un usuario. Los métodos incluyen:
  - `dirBase`: atributo que guarda el directorio base donde se almacenarán las colecciones de cartas
  - `constructor`: inicializa la clase y establece el directorio base
  - `añadirCarta(usuario, carta)`: añade una carta a la colección de un usuario
  - `modificarCarta(usuario, carta, argv)`: modifica una carta existente en la colección de un usuario
  - `eliminarCarta(usuario, id)`: elimina una carta de la colección de un usuario
  - `listarCartas(usuario)`: lista todas las cartas de la colección de un usuario
  - `mostrarCarta(usuario, id)`: muestra una carta específica de la colección de un usuario

#### **Tests**
El siguiente fichero de tests se encuentra en el directorio `/tests`:
##### `coleccion.spec.ts`
- **Tests para `Coleccion`**: Este archivo contiene pruebas unitarias para la clase `Coleccion`. Los tests incluyen:
  - `Se crea una Coleccion correctamente`: prueba que verifica si se crea correctamente una instancia de la clase `Coleccion`
  - `Se añade una carta a la coleccion`: verifica la funcionalidad de añadir cartas a la colección
  - `Se modifica una carta de la coleccion`: verifica la funcionalidad de modificar cartas en la colección
  - `Se elimina una carta de la coleccion`: verifica la funcionalidad de eliminar cartas de la colección
  - `Se listan las cartas de la coleccion`: verifica la funcionalidad de listar todas las cartas de la colección de un usuario
  - `Se muestra una carta de la coleccion`: verifica la funcionalidad de mostrar una carta específica de la colección de un usuario

#### **Ejemplos de los archivos JSON**
Para los archivos `JSON` se ha guardado la estructura de una interfaz de una carta, guardando en cada directorio de un usuario (`/usuarios/usuario`) una base de datos con el ID de la carta (`X.json`, siendo X la id, un número). Algún ejemplo sería:
##### `/usuarios/Seb/1.json`
``` json
{
  "id": 1,
  "nombre": "Prueba",
  "costeMana": 0,
  "color": 3,
  "tipo": 0,
  "rareza": 0,
  "textoReglas": "Regla_1",
  "valorMercado": 0
}
```

#### **Programa Principal**
El programa principal se encuentra en el directorio `/src/main`:
##### `app.ts`
- **Importaciones**: Se importan módulos y clases necesarios como `yargs`, `Color`, `Tipo`, `Rareza`, `Carta` y `Coleccion`.

- **Inicialización de la Colección**: Se crea una instancia de la clase `Coleccion`.

- **Configuración de yargs**:
  - `hideBin`: Ayuda a ocultar el binario de Node.js y mostrar solo los argumentos.
  - `command`: Define diferentes comandos disponibles para la aplicación.
    - `añadir`: Añade una nueva carta a la colección.
    - `modificar`: Modifica una carta existente en la colección.
    - `eliminar`: Elimina una carta de la colección.
    - `listar`: Lista todas las cartas de un usuario específico.
    - `mostrar`: Muestra detalles de una carta específica de un usuario.
  - `builder`: Define los argumentos esperados para cada comando.
  - `handler`: Define la lógica a ejecutar cuando se llama a un comando específico.

- **Ejemplo de Handler**:
  - En el comando `añadir`, se crea un objeto `Carta` con los argumentos proporcionados y se llama al método `añadirCarta` de la instancia `coleccion`.
  - En el comando `modificar`, se crea un objeto `Carta` con los argumentos proporcionados y se llama al método `modificarCarta` de la instancia `coleccion`.
  - En el comando `eliminar`, se llama al método `eliminarCarta` de la instancia `coleccion`.
  - En el comando `listar`, se llama al método `listarCartas` de la instancia `coleccion`.
  - En el comando `mostrar`, se llama al método `mostrarCarta` de la instancia `coleccion`.

- **Ayuda y Alias**: Se proporciona una opción de ayuda (`help`) y un alias (`h`) para mostrar información sobre cómo usar la aplicación.

---

## Conclusión
Durante la realización de la práctica se desarrolló con éxito una aplicación en TypeScript para gestionar colecciones de cartas **Magic** a través de la línea de comandos. Se emplearon herramientas como `yargs` y `chalk` para mejorar la interacción y visualización en la consola, respectivamente. También se ha empleado el módulo `fs` de Node.js para gestionar de manera efectiva y segura el sistema de ficheros, facilitando las operaciones de lectura, escritura y manipulación de archivos relacionados con las colecciones de cartas Magic. El proyecto se estructuró de manera organizada y se alojó en un repositorio de GitHub, reflejando las buenas prácticas de programación aprendidas en clase.

Cabe destacar que debido a la estructura de los tests y el uso de la API síncrona, al realizar el push no se pushean los cambios en los tests ni se crean ni borran o modifican los ficheros, por lo que no pasará tests, coverage y sonarcloud en GitHubActions, a pesar de hacerlo en el repositorio.

---

## Bibliografía

- [Enunciado de la práctica](https://ull-esit-inf-dsi-2324.github.io/prct09-fiilesystem-magic-app/)
- [Instanbul](https://istanbul.js.org/)
- [Coveralls](https://coveralls.io/)
- [TypeDoc](https://typedoc.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Yargs](https://www.npmjs.com/package/yargs)
- [Chalk](https://www.npmjs.com/package/chalk)
- [API sincrona de Node.js `fs`](#https://nodejs.org/docs/latest/api/fs.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SonarCloud](https://sonarcloud.io)
- [Guía de Markdown](https://markdown.es/sintaxis-markdown/#links)
- [Repositorio en Github de la práctica](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-SebastianPortoULL)
