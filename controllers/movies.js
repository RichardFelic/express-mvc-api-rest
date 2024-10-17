import { MovieModel } from "../models/local-file-system/movie.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
// import mongoose from "mongoose";

export class MoviesController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  }

  static async getById(req, res) {
    // MONGODB no falla porque el id es un ObjectId
    // import mongoose from "mongoose";
    // const { id } = req.params;
    // const objectId = mongoose.Types.ObjectId(id);
    // const movie = await MovieModel.getById({ id: objectId });
    // if (!movie) {
    //   return res.status(404).json({ message: "Movie not found" });
    // }
    // res.json(movie);

    // MONGODB este no falla porque el id es un ObjectId
    // const { id } = req.params;
    // if (!id || typeof id !== "string" || id.length !== 24) {
    //   return res.status(400).json({ message: "Invalid id" });
    // }
    // const movie = await MovieModel.getById({ id });
    // if (!movie) {
    //   return res.status(404).json({ message: "Movie not found" });
    // }
    // res.json(movie);

    // mongo: codigo falla porque el id no es un ObjectId
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  }
  static async create(req, res) {
    console.log("Request body:", req.body); // Ver el cuerpo de la solicitud
    const result = validateMovie(req.body);
    console.log("Validation result:", result); // Ver el resultado de la validación
    //   const { title, year, director, duracion, poster, genrer, rate } = req.body;

    if (result.error) {
      return res.status(400).json({ errors: JSON.parse(result.error.message) });
    }
    const newMovie = await MovieModel.create({ input: result.data });
    res.status(201).json(newMovie);
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    const result = await MovieModel.deleteById({ id });

    if (result === false) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted" });
  }

  static async updateById(req, res) {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors }); // Ajustar esto para acceder a los errores
    }

    const { id } = req.params;

    const updateMovie = await MovieModel.updateById({ id, input: result.data });

    return res.json(updateMovie);
  }
}
