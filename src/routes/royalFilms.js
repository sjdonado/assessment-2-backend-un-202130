const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const { title, urls } = await scraper.getPageInfo('https://royal-films.com/cartelera/barranquilla');
		res.writeJSONResponse({
			data: { pageTitle: title, allMoviesDetails: urls, },
		}, 200);
	} catch (err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
