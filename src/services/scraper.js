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
	await page.waitForSelector('[class="my-3 col-lg-2 col-md-3 col-sm-4 col-6"] a');
	const links = await page.evaluate(() => {
        const elements = document.querySelectorAll('[class="my-3 col-lg-2 col-md-3 col-sm-4 col-6"] a');
        const links = [];
        for (let link of elements) {
            links.push(link.href);
        }
        return links;
    });
	 /*const data = [];
	 for (let x in links){
		await page.goto(x, { waitUntil: 'networkidle0' });
		const content = [];
		content.title = await page.evaluate(() => data.push(document.querySelector('head > title').innerText));
	}*/
	await browser.close();
	return links
  }


module.exports = {
	getPageTitle,
	getAllMoviesDetails,
};
