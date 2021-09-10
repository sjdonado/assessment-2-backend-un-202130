const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const title = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const urls_movies_api = await scraper.getIDs('https://royal-films.com/cartelera/barranquilla');
		let details_movie_arry = [];
		for (let index = 0; index < urls_movies_api.length; index++) {
			details_movie = scraper.getDataMovie('https://royal-films.com/cartelera/barranquilla', urls_movies_api[index]);
			details_movie_arry.push(details_movie);
		}
		let all_data = await Promise.all(details_movie_arry);
		res.writeJSONResponse({ data: { pageTitle: title, allMoviesDetails: all_data } }, 200);
	} catch (err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};