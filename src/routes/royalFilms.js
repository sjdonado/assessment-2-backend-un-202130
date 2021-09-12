const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
        const pageData = await scraper.getData('https://royal-films.com/cartelera/barranquilla');

        const datas=[]
        
        for (i of pageData) {
            
            x= scraper.data(i)
            datas.push(x) 
            
          }
          let values = await Promise.all(datas);
        const dataJson = {
            pageTitle: pageTitle,
            allMoviesDetails:values
        }
        res.writeJSONResponse({ data: dataJson }, 200);
    } catch(err) {
        res.writeJSONResponse({ data: null, err: err.message }, 500);
    }
}

module.exports = {
    get,
};