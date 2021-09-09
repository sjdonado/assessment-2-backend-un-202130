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

async function getMoviesURL(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForSelector('[class="my-3 col-lg-2 col-md-3 col-sm-4 col-6"] a')
	const peliculas = await page.evaluate(() => { 
		const $movies = document.querySelectorAll('[class="my-3 col-lg-2 col-md-3 col-sm-4 col-6"] a')
		const links = []
		$movies.forEach(($movies) => {
			link= $movies.getAttribute("href")
      const link_parts = link.split("/") 
      id = link_parts[3]  
      complete="https://royal-films.com/api/v1/movie/"+id+"/barranquilla"
      links.push(complete)
      })
		return links	
	  })   
  await browser.close();
    return peliculas;
}

async function data_Json(url){
  //console.log(url)
  try {
    const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
    const movieInformation = await page.evaluate(async (url) => {
      //Obtenemos el Json de los url obtenidos
      const response = await fetch(url);
      const movie = await response.json();
      //Enviamos el Json
      return movie;
    },url);
  await browser.close(); 
  const originalTitle = movieInformation.data['original'];
  const title = movieInformation.data['title'];
  const synopsis = movieInformation.data['synopsis'];
  const starred =  movieInformation.data['starred'];
  const director = movieInformation.data['director'];
  const posterPhoto=  movieInformation.data['poster_photo'];
  const trailer = "https://youtube.com/watch?v="+movieInformation.data.youtube+"/";
  return { 
  originalTitle,
  title,
  synopsis,
  starred,
  director,
  posterPhoto,
  trailer,
}           
  } catch (error) {
  }
}
module.exports = {
    getPageTitle,
    getMoviesURL,
    data_Json,
};