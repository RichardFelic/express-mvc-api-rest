import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
export const readJSON = (path) => require(`./${path}`);

// import movies from "./movies.json" with { type: "json" };
// LEER JSON EN ESModules
// import fs from "node:fs";
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

// leer un json en ESModules asincronico
// import fs from 'fs/promises';

// async function loadMovies() {
//   try {
//     const data = await fs.readFile('./movies.json', 'utf-8');
//     const movies = JSON.parse(data);
//     console.log(movies);
//   } catch (error) {
//     console.error('Error al leer el archivo JSON:', error);
//   }
// }

// loadMovies();

// // leer un json en ESModules de manera nativa
// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
// const movies = require("./movies.json");
