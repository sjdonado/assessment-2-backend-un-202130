const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load', timeout: 0 });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);

	await browser.close();

	return title;
}

async function getPageInfo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load', timeout: 0 });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);
  //const films = await page.evaluate(() => document.querySelector('body'));

 
  console.log(films);

	await browser.close();

	return { 
    data: {
      pageTitle: "",
      allMoviesDetails: ""
    }
  };
}

module.exports = {
	getPageTitle,
  getPageInfo
};
