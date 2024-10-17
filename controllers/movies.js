import { MovieModel } from "../models/movie.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MoviesController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  }

  static async getById(req, res) {
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
