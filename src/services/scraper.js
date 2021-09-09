const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getAllInfoPage(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);
	await page.waitForSelector('.movie-box') // wait for the element
	let elements = await page.$$('.movie-box') // return all the elements with the class style given
	let urls = [];
	for (const x of elements) {//  pathway taken by the elements 
		urls.push('https://royal-films.com' + await page.evaluate(el => el.getAttribute('href'), x))
	}
	let date_movie_page = [];
	for (urls_i of urls) {
		const movie_page = await browser.newPage();
		await movie_page.goto(urls_i, { waitUntil: 'networkidle0' });
		await movie_page.waitForTimeout('2000');
		await movie_page.waitForSelector('td') // wait for the element
		let elements_m = await movie_page.$$('td') // return all the elements with the class style given
		let datos = []
		for (let x of elements_m) {//  pathway taken by the elements 
			// console.log(x);
			datos.push(await movie_page.evaluate(el => el.textContent, x));
		}
		// console.log(datos);
		await movie_page.waitForSelector('.img') // wait for the element
		let elements_mm = await movie_page.$('.img') // return all the elements with the class style given
		let contentarry = await movie_page.evaluate(el => el.getAttribute('style'), elements_mm);
		contentarry = contentarry.substring(23, contentarry.length - 3);
		datos.push(contentarry);

		await movie_page.waitForSelector('.synopsis') // wait for the element
		let x = await movie_page.$('.synopsis') // return all the elements with the class style given
		let syn1 = await movie_page.evaluate(el => el.textContent, x)
		let synopsis = await syn1.trim()
		synopsis = synopsis.split('\n');
		let content = synopsis[0];
		content = content.replace(/\./g, '');
		datos.push(content);

		await movie_page.click('[class="img gaussian"]');
		await movie_page.waitForSelector('iframe') // wait for the element
		let elements_mmm = await movie_page.$('iframe') // return all the elements with the class style given
		let contentv = await movie_page.evaluate(el => el.getAttribute('src'), elements_mmm);
		// console.log(contentv);
		let trai = 'https://www.youtube.com/watch?v=' + contentv.substring(30, contentv.indexOf('?'))
		// console.log(trai);
		datos.push(trai);
		// console.log(datos);
		let dicc = await {
			originalTitle: datos[1],
			title: datos[0],
			synopsis: datos[5],
			starred: datos[2],
			director: datos[3],
			posterPhoto: datos[4],
			trailer: datos[6]
		}
		date_movie_page.push(dicc);
	}


	await browser.close();

	return { title, date_movie_page };
}


module.exports = {
	getAllInfoPage,
};