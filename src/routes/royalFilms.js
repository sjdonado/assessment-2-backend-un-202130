const { url } = require('inspector');
const scraper = require('../services/scraper');

require("events").EventEmitter.defaultMaxListeners = 15;


async function get(req, res) {
	try {
        const url = 'https://royal-films.com/cartelera/barranquilla';
		const pageTitle = await scraper.getPageTitle(url);
		const pageData = await scraper.getData(url);
		res.writeJSONResponse({ data: { pageTitle , allMoviesDetails: pageData} }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
