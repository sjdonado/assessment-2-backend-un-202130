const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.getTitle('https://royal-films.com/cartelera/barranquilla');
		const pageAll = await scraper.getLinks('https://royal-films.com/cartelera/barranquilla');
		
		const vec = []

		for (x in pageAll){
			tem = scraper.getAll(x)
			vec.push(tem)
		}
		let val= await Promise.all(vec);
		const json ={
			pageTitle: pageTitle,
			allMoviesDetails: val,
		}

		res.writeJSONResponse({ data: json }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
