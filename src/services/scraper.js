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

async function getMoviesData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForSelector('[class=movie-box]')
	const movie = await page.evaluate(() => { 
		const movies = document.querySelectorAll('[class="movie-box"]')
		const urls = []
		movies.forEach((movies) => {
			urlM= movies.getAttribute("href")
      const pos = urlM.split("/") 
      const cod = pos[pos.length-2]
      direction="https://royal-films.com/api/v1/movie/"+cod+"/barranquilla?"
      urls.push(direction)
      })
		return urls	
	  })
     
  await browser.close();
    return movie;
    
}

async function getcaracteristics(url){
  try {
    const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
    const caracteristics = await page.evaluate(async (url) => {
      const movie = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        mode: "cors",
      });
      return movie.json();
    },url);
  await browser.close(); 
  
  return { originalTitle:caracteristics.data['original'],title:caracteristics.data['title'],synopsis:caracteristics.data['synopsis'],starred:caracteristics.data['starred'],director:caracteristics.data['director'],posterPhoto: "/"+caracteristics.data['poster_photo']+"/",
  trailer: "https://youtube.com/watch?v="+caracteristics.data.youtube+"/",
}
  } catch (error) {
    
  }
  

}
module.exports = {
    getPageTitle,
    getMoviesData,
    getcaracteristics,
};