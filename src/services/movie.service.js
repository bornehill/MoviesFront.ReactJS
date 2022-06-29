import BaseService from "./base.service";

class MovieService extends BaseService {
	constructor() {
		super("");
	}

	getMovies() {
		return this.instance.get("/movies");
	}

	deleteMovie(movieId) {
		return this.instance.delete(`/movies/${movieId}`);
	}

	editMovie(movie) {
		return this.instance.put("/movies", movie);
	}

	addMovie(movie) {
		return this.instance.post("/movies", movie);
	}
}

export default new MovieService();
