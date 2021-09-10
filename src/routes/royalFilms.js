const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const PageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const PageData = await scraper.getLinkM('https://royal-films.com/cartelera/barranquilla');

		const Data=[];

        PageData.forEach(element=>{
			x=scraper.getMovies(element)
			Data.push(x)
		})

		let info=await Promise.all(Data);

		const DataJS={
			pageTitle:PageTitle,
            allMoviesDetails:info
		}

		res.writeJSONResponse({ data: { DataJS } }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
