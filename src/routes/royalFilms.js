const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const bodyMovies = await scraper.getPageMovies('https://royal-films.com/api/v1/movies/city/barranquilla/billboard?time=1631241126093');
		const detallespeliculas = await scraper.getDetallesPeliculas(bodyMovies);
		const allMoviesDetails = await scraper.getformat(detallespeliculas)
		res.writeJSONResponse({ data: { pageTitle, allMoviesDetails } }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
