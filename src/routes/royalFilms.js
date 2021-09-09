const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const pageData = await scraper.getData('https://royal-films.com/cartelera/barranquilla');

		res.writeJSONResponse({ data: { pageTitle, allMoviesDetails: pageData} }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
