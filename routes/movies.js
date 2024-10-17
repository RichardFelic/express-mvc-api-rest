// import { randomUUID } from "node:crypto";
import { Router } from "express";
// import { readJSON } from "../utils.js";
// import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
// import { MovieModel } from "../models/movie.js";
import { MoviesController } from "../controllers/movies.js";
// const movies = readJSON("movies.json");

export const moviesRouter = Router();

moviesRouter.get("/", MoviesController.getAll);

moviesRouter.get("/:id", MoviesController.getById);

moviesRouter.post("/", MoviesController.create);

moviesRouter.delete("/:id", MoviesController.deleteById);

moviesRouter.patch("/:id", MoviesController.updateById);
