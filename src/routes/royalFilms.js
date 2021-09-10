const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const {pageTitle, allMoviesDetails} = await scraper.getMoviesInfo('https://royal-films.com/cartelera/barranquilla');
		res.writeJSONResponse({ data: { pageTitle, allMoviesDetails } }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
