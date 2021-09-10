const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
        const pageData = await scraper.getMoviesData('https://royal-films.com/cartelera/barranquilla');

        const datas=[]
        
        for (m of pageData) {
            x= scraper.getcaracteristics(m)
            datas.push(x) 
          }
          let info = await Promise.all(datas);
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
