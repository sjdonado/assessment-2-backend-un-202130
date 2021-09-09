const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
        const pageData = await scraper.getMoviesURL('https://royal-films.com/cartelera/barranquilla');
        const AllInformation=[]
        for (e of pageData) {
            //Obtenemos urls y introducciomos su informacion de data en cada cadena
            info= scraper.data_Json(e)
            AllInformation.push(info) 
          }
          let MoviesData = await Promise.all(AllInformation);
        const dataJson = {
            pageTitle: pageTitle,
            allMoviesDetails:MoviesData
        }
        res.writeJSONResponse({ data: dataJson }, 200);
    } catch(err) {
        res.writeJSONResponse({ data: null, err: err.message }, 500);
    }
}

module.exports = {
    get,
};