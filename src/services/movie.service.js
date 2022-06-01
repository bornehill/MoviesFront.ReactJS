import BaseService from "./base.service";

class MovieService extends BaseService {
	constructor() {
		super("");
	}

	getMovies() {
		return this.instance.get("/movies");
	}
}

export default new MovieService();
