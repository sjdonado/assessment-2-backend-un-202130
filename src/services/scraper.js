const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */

// get Title
async function getTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' }); 
 	const title = await page.evaluate(() => document.querySelector("head > title").innerText);
	await browser.close();
	// const allvalues = Object.assign(title);
	return title;
};

//getting relevant links
async function getLinks(url){

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	
	await page.waitForSelector('.movie-box')
	const link1 = await page.evaluate(() => {
		
		const link = document.querySelectorAll('[class="movie-box"]');
		
		
		const list = [];
		for (var i = 0; i < link.length; i++) {
			const lk = link[i].getAttribute("href");
			const aux = lk.split("/");
			const lkr="https://royal-films.com/api/v1/movie/"+aux[3]+"/barranquilla?"			
			list.push(lkr);
		};
		
		return list;
	});
	return link1;
};


async function getAll(url){
	try {	
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	const mdata = await page.evaluate(async(url) => {
		const mov = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
			mode: "cors",
		});
		return mov.json();
	}, url);
	await browser.close()


	return {originalTitle: mdata.data['original'],
	title: mdata.data['title'],
	synopsis: mdata.data['synopsis'],
	starred: mdata.data['starred'],
	director: mdata.data['director'],
	posterPhoto: "/"+mdata.data['poster_photo']+"/",
	trailer: "https://www.youtube.com/watch?v="+mdata.data.youtube+"/",
	}
}
	catch (error){	
	}
};

module.exports = {
	getTitle,
	getAll,
	getLinks,
};
