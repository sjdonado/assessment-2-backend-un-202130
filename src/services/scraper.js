const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title 
 * @param {string} url
 * @returns {string}
 */
async function Get_Page_Title(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const title = await page.evaluate(() => document.querySelector('head > title').innerText);
  await browser.close();
  return title;
}

/**
 * Go to url and returns the url of each movie 
 * @param {string} url
 * @returns {string}
 */
async function Get_Links(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForSelector('[class=movie-box]');
  
const pelis = await page.evaluate(() => { 
      const $p = document.querySelectorAll('[class="movie-box"]')
      const urls = []
      $p.forEach(($p) => {
          link= $p.getAttribute("href")
    dig = link.split("/");
    urls.push("https://royal-films.com/api/v1/movie/"+dig[3]+"/barranquilla?")    
  })
      return urls   
  })
  await browser.close();
  return pelis;
}
     
 

/**
 * Go to url and returns the movie data
 * @param {string} url
 * @returns {string}
 */
 async function Get_Data(url){
	try {	
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	const d = await page.evaluate(async(url) => {
		const peli = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
			mode: "cors",
		});
		return peli.json();
	}, url);
	await browser.close()

	return {originalTitle: d.data['original'],
	title: d.data['title'],
	synopsis: d.data['synopsis'],
	starred: d.data['starred'],
	director: d.data['director'],
	posterPhoto: "/"+d.data['poster_photo']+"/",
	trailer: "https://youtube.com/watch?v="+d.data.youtube+"/",
}
  } catch (error) {
    
  }
  

}
module.exports = {
    Get_Page_Title,
    Get_Links,
    Get_Data,
};