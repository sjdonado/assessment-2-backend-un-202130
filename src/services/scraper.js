const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);

	await browser.close();

	return title;
}

async function getLinksMovies(url){
  const browser = await puppeteer.launch();
	const page = await browser.newPage();
  
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('a.movie-box');
	const links = await page.evaluate(() => {
        const elements = document.querySelectorAll('a.movie-box');
        const links = [];
        for (let link of elements) {
            links.push("https://royal-films.com/api/v1/movie/"+link.href.split("/")[5]+"/barranquilla");
        }
        return links;
    });

  
	  await browser.close();

    return links;
}

async function getMovieDetails(link) {

	  try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(link, { waitUntil: 'networkidle0' });
            const detailsMovie = await page.evaluate(async (link) => {
            //Obtenemos el Json de los url obtenidos
            const res = await fetch(link);
            const detailsMovie = await res.json();
            //Enviamos el Json
            return detailsMovie;
            },link);
            await browser.close();
            
            return {
                originalTitle: detailsMovie.data['original'],
                title: detailsMovie.data['title'],
                synopsis: detailsMovie.data['synopsis'],
                starred: detailsMovie.data['starred'],
                director: detailsMovie.data['director'],
                posterPhoto: detailsMovie.data['poster_photo'],
                trailer: "https://youtube.com/watch?v="+detailsMovie.data.youtube
            }; 
          
                  
      } catch (error) {
          console.log(error);
      }
  
  }
  
module.exports = {
	getPageTitle,
	getMovieDetails,
  getLinksMovies,
};
