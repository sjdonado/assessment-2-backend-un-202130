const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
        const pageData = await scraper.getData('https://royal-films.com/cartelera/barranquilla');
        const caracteristics=[]
        for (m of pageData) {
            car= scraper.details(m)
            caracteristics.push(car) 
          }
          let information = await Promise.all(caracteristics);
            const dataJson = {
            pageTitle: pageTitle,
            allMoviesDetails:information
            }
        res.writeJSONResponse({ data: dataJson }, 200);
    } catch(err) {
        res.writeJSONResponse({ data: null, err: err.message }, 500);
    }
}

module.exports = {
    get,
};
