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

async function getAllMoviesDetails(url) {
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

	  const allMoviesDetails = [];

	  try {
          for(let link of links){
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
            allMoviesDetails.push({
                originalTitle: detailsMovie.data['original'],
                title: detailsMovie.data['title'],
                synopsis: detailsMovie.data['synopsis'],
                starred: detailsMovie.data['starred'],
                director: detailsMovie.data['director'],
                posterPhoto: detailsMovie.data['poster_photo'],
                trailer: "https://youtube.com/watch?v="+detailsMovie.data.youtube
            }); 
          }
                  
      } catch (error) {
          console.log(error);
      }
  
	  return allMoviesDetails;
  }



/*async function getPageBody(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const links = await page.evaluate(() => {
        const elements = document.querySelectorAll('[class="my-3 col-lg-2 col-md-3 col-sm-4 col-6"] a')
        const links = []
        for (let element of elements) {
            links.push(element.href) //Query selector All
        }
        return links
    });

    const films = []
    for (const link of links) {
        console.log(link)
        await page.goto(link, { waitUntil: 'networkidle0' });
        await page.waitForTimeout(1000)
        await page.click('[class="img gaussian"]')
        await page.waitForTimeout(1000)
        const film = await page.evaluate(() => {
            const main = document.querySelector('[class="row"]')
            const image = main.children[0].children[0].children[0].style.backgroundImage.slice(4, -1).replace(/"/g, "");
            const main2 = main.children[1].children[1].children[1]
            const props = main2.children[2].children[0].children
            const synopsisMain = main2.children[0]
            const synopsisP1 = synopsisMain.innerText
            const synopsisP2 = synopsisMain.childNodes[2].innerText
            const end = synopsisP2.indexOf('\n\n')
            const sypnopsis = synopsisP1.substring(0, synopsisP1.length - 11) + synopsisP2.substring(0, end)
            const trailer = document.getElementById('player').children[0].children[0].src
            var film
            for (var i = 0, len = props.length; i < len; i++) {
                film = {
                    originalTitle: props[1].children[1].innerText,
                    title: props[0].children[1].innerText,
                    synopsis: sypnopsis,
                    starred: props[2].children[1].innerText,
                    director: props[3].children[1].innerText,
                    porterPhoto: image,
                    trailer: trailer
                }
            }
            return film
        });

        film.trailer = parseToUrlNormal(film.trailer)
        films.push(film)
    }

    await browser.close();

    return films;
}

function parseToUrlNormal(url) {
    //\\/[A-Za-z0-9\\_] inicia 30 termina ? https://www.youtube.com/embed/
    const start = 30
    const end = url.indexOf('?')
    const parsedURL = 'https://www.youtube.com/watch?v=' + url.substring(start, end)
    return parsedURL

}*/

module.exports = {
	getPageTitle,
	getAllMoviesDetails,
	//getPageBody,
};
