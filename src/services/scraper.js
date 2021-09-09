const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
  const navigator = await puppeteer.launch();
  const site = await navigator.newPage();

  await site.goto(url, { waitUntil: 'networkidle0' });
    const title = await site.evaluate(() => document.querySelector('head > title').innerText);

    await navigator.close();

    return title;
}

async function getData(url) {
    const navigator = await puppeteer.launch();
    const site = await navigator.newPage();
    await site.goto(url, { waitUntil: 'networkidle0' });
	
  await site.waitForSelector('[class=movie-box]')
	const peliculas = await site.evaluate(() => { 
		const $films = document.querySelectorAll('[class="movie-box"]')
		const links = []
		$films.forEach(($films) => {
			link= $films.getAttribute("href")
      const num = link.split("/") 
      
      complete="https://royal-films.com/api/v1/movie/"+num[num.length-2]+"/barranquilla?"
      links.push(complete)

      })
		return links	
	  })
     
  //console.log("El resultado es:")
  await navigator.close();
    return peliculas;
    
}

async function data(url){
  try {
    const navigator = await puppeteer.launch();
  const site = await navigator.newPage();
  await site.goto(url);
    const movieDetails = await site.evaluate(async (url) => {
      const movie = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        mode: "cors",
      });
      return movie.json();
    },url);
  await navigator.close(); 
  
  return { originalTitle:movieDetails.data['original'],
  title:movieDetails.data['title'],
  synopsis:movieDetails.data['synopsis'],
  starred:movieDetails.data['starred'],
  director:movieDetails.data['director'],
  posterPhoto: "/"+movieDetails.data['poster_photo']+"/",
  trailer: "https://www.youtube.com/watch?v="+movieDetails.data.youtube+"/",
}
  } catch (error) {
    
  }
  

}
module.exports = {
    getPageTitle,
    getData,
    data,
};
