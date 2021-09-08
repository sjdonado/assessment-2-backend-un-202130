const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
        const pageData = await scraper.getData('https://royal-films.com/cartelera/barranquilla');

        const dato=[]
        
        for (i of pageData) {
            
            x= scraper.details(i)
            dato.push(x) 
            
        }

        
          let info = await Promise.all(dato);
        const dataJson = {
            pageTitle: pageTitle,
            allMoviesDetails:info
        }

        res.writeJSONResponse({ data: dataJson }, 200);
    } catch(err) {
        res.writeJSONResponse({ data: null, err: err.message }, 500);
    }
}

module.exports = {
    get,
};
