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

async function getLinkM(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
  
  await page.waitForSelector('[class=movie-box]')
  const Pelis = await page.evaluate(() => { 
	//const links=document.querySelector('[class="movie-box"]')['href'];
	//const links=document.getElementsByClassName('[class="movie-box"]')[0].getAttribute('href');
	const movies = document.querySelectorAll('[class="movie-box"]')
	const urls = []
	
	movies.forEach((movies) => {
	  link= movies.getAttribute("href")
	  urls.push(link)
  
	  })
	return urls	
  })
  
  await browser.close();
	return Pelis;   
  }



module.exports = {
	getPageTitle,
	getLinkM,
};
