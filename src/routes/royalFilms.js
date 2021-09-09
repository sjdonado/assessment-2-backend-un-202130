const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const { title, date_movie_page } = await scraper.getAllInfoPage('https://royal-films.com/cartelera/barranquilla');
		res.writeJSONResponse({
			data: { pageTitle: title, allMoviesDetails: date_movie_page, },
		}, 200);
	} catch (err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
