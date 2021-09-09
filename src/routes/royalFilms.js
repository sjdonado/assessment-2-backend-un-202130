const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const { title, dicc } = await scraper.getPageTitleUrls('https://royal-films.com/cartelera/barranquilla');
		res.writeJSONResponse({
			data: { pageTitle: title, allMoviesDetails: dicc, },
		}, 200);
	} catch (err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
