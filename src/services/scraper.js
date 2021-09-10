const puppeteer = require('puppeteer');
const axios = require('axios')


/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
 async function getAllMoviesLinks(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('[class="movie-box"]');
	const links = await page.evaluate(() => {
        const elements = document.querySelectorAll('[class="movie-box"]');
        const links = [];
        for (let link of elements) {
            links.push(link.href);
        }
        return links;
    });
  
	  await browser.close();
  
	  return links;
  }

  async function Listing(url) {
 	const links = await getAllMoviesLinks(url);
  	const linksids=[];
	links.forEach(element => {
		linksids.push('https://royal-films.com/api/v1/movie/'+element.split('/')[5]+'/barranquilla')
	});
	
	return getMoviesDetails(linksids);
	
}

async function getMoviesDetails(urls) {
	const moviesDetails = [];
	try{
		for(let url of urls){
		/*const retorno = await page.evaluate(async (url) => {
		const fet = await fetch(url);
		const retorno = await fet.json();
		return retorno;
		},url);*/
		const reto = await axios.get(url);
		const retorno = reto.data;
		moviesDetails.push({
			originalTitle: retorno.data['original'],
			title: retorno.data['title'],
			synopsis: retorno.data['synopsis'],
			starred: retorno.data['starred'],
			director: retorno.data['director'],
			posterPhoto: retorno.data['poster_photo'],
			trailer: "https://youtube.com/watch?v="+retorno.data.youtube
		}); 
	}
	}catch(error){
		console.log(error);
	}
	return moviesDetails;
  }

async function getPageTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);
	
	await browser.close();

	return title;
}

module.exports = {
	getPageTitle,
	getAllMoviesLinks,
	Listing,
	getMoviesDetails,
};
