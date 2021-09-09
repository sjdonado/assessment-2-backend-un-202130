const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const siteTitle = await scraper.getPageTitle("https://royal-films.com/cartelera/barranquilla");
        const siteData = await scraper.getData("https://royal-films.com/cartelera/barranquilla");

        const datas=[]

        for (i of siteData) {

            x= scraper.data(i)
            datas.push(x) 

          }
          let values = await Promise.all(datas);
        const dataJson = {
            siteTitle: siteTitle,
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
