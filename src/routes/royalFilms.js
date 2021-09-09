const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.Get_Page_Title('https://royal-films.com/cartelera/barranquilla');
		const pageInfo = await scraper.Get_INFORMATION('https://royal-films.com/cartelera/barranquilla');
		let i=0
		const list= []
		while(i<pageInfo.length){
            list.push(pageInfo[i])
			i++;
		}
		const Json = {
			pageTitle: pageTitle,
			allMoviesDetails: pageInfo
		}
		res.writeJSONResponse({ data: { Json } }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
