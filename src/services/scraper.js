const puppeteer = require("puppeteer");
/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */

async function getPageTitle(url,browser) {

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const title = await page.evaluate(
    () => document.querySelector("head > title").innerText
  );

  await page.close();

  return title;
}

/* async function getMovieTextInfo(url){
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setRequestInterception(true);
	page.on('request', (req) => {
	  if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
		req.abort();
	  }
	  else {
		req.continue();
	  }
	});
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('div > div > div> div > div > div > ul > li > span');
	try{
		await page.click('div > div > div > p > a');
	} catch (error){
		console.log('No tiene ver mas')
	};
	const Descripcion = await page.evaluate(() => document.querySelector('div > div > div > div > div> p').innerText);
  
	const Tabla = await page.evaluate(() => Array.from(document.querySelectorAll('table > tbody > tr > td'), element => element.innerText));
  
	const Titulo = String(Tabla[0]);
	const Original = String(Tabla[1]);
	const Reparto = String(Tabla[2]);
	const Director = String(Tabla[3]);
	await page.screenshot({ path: 'example1.png' });
	await browser.close();
  
	const AllMovieInfo = [Titulo,Original,Reparto,Director,Descripcion];
	
	return AllMovieInfo;

} */
/* async function getVideo(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('div > div > div> div > div > div > ul > li > span');
	await page.click('#header > div:nth-child(3) > span');
	await page.waitForSelector('iframe');
	const Video = await page.evaluate(() => document.querySelector('iframe').src);
	await browser.close();
  
	 return Video;
  }
 */
/*  async function getImage(url) {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle0' });
		await page.waitForSelector('div > div > div> div > div > div > ul > li > span');
		const Image = await page.evaluate(() => document.querySelector('#movie > div > div > div> div > span').style.backgroundImage);
		let urlimage = String(Image);
		urlimage = urlimage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
		await browser.close();
	
		return urlimage;
	  }
*/
async function getAllURLMovies(url,browser) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector("div > div > div > div > a");
  const AllUrl = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("div > div > div > div > div > a"),
      (element) => element.href
    )
  );
  await page.close();
  return AllUrl;
}

async function getAllFetchMovies(identifier,browser) {
  const page = await browser.newPage();
  const fetchurl =
    "https://royal-films.com/api/v1/movie/" + identifier + "/barranquilla";
  const fetching = await page.evaluate(async (fetchurl) => {
    const Details = await fetch(fetchurl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "cors",
    });
    return Details.json();
  }, fetchurl);

  await page.close();
  return fetching;
}

module.exports = {
  getPageTitle,
  getAllURLMovies,
  /*getImage,getVideo,getMovieTextInfo */ getAllFetchMovies,
};
