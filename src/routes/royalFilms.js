const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const pageTitle2 = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		res.writeJSONResponse({ data: { pageTitle, pageTitle2 } }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};