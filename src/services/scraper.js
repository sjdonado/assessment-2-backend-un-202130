const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title and the data of each movie
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
 * Go to url and return the data of each movie
 * @param {string} url
 * @returns {string}
 */
async function Get_INFORMATION(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('[class=movie-box]')
    
	const pelis = await page.evaluate(() => { 
        const $p = document.querySelectorAll('[class="movie-box"]')
        const urls = []
        $p.forEach(($p) => {
            link= $p.getAttribute("href")
			dig = link.replace(/[^0-9\.]+/g, "");
			urls.push(dig)    
		})
        return urls   
    })
    await browser.close();

	const datos = [];
	let i=0;
	while(i<pelis.length){
		const url="https://royal-films.com/api/v1/movie/"+pelis[i]+"/barranquilla?"
		datos.push(info(url))
		i++;
	}
    return datos;
}
/**
 * Go to url and return and get the information of each field of a movie
 * @param {string} url
 * @returns {string}
 */
async function info(url){
	const browser = await puppeteer.launch();
	const inf = await page.evaluate(() => {
    return{
          originalTitle: fetch(url).then(response => response.json()).then(f => f.data['original']),
		  title: fetch(url).then(response => response.json()).then(f => f.data['title']),
		  synopsis: fetch(url).then(response => response.json()).then(f => f.data['synopsis']),
		  starred: fetch(url).then(response => response.json()).then(f => f.data['starred']),
		  director: fetch(url).then(response => response.json()).then(f => f.data['director']),
		  posterPhoto: fetch(url).then(response => response.json()).then(f => f.data['posterPhoto']),
		  trailer: fetch(url).then(response => response.json()).then(f => "https://www.youtube.com/watch?v="+f.data['youtube'])
    }	 
	})
    await browser.close(); 
    return inf
}

module.exports = {
    Get_Page_Title,
};
