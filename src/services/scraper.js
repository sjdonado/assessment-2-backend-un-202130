const puppeteer = require("puppeteer");

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getMovieName(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "load" });
  await page.waitForSelector(".movie-box", { visible: true });
  //   await waitTillHTMLRendered(page)
  const enlaces = await page.$$eval(".movie-box", (elements) => {
    const links = [];
    for (let element of elements) {
      links.push(element.href);
    }
    return links;
  });
  movieInfos = [];
  for (let enlace of enlaces) {
    await page.goto(enlace, { waitUntil: "load" });
    await page.waitForSelector(".synopsis", { visible: true });
    await page.waitForSelector(".people", { visible: true });
    await page.screenshot({ path: "screenshot.png", fullPage: true });
    let data = await page.evaluate(() => {
      const info_keys = {
        0: "titulo",
        1: "titulo_original",
        2: "reparto",
        3: "director",
      };
      movieInfo = {
        sinopsis: document.querySelector(".synopsis").innerText,
      };
      let rows = document.querySelector(".people > tbody").rows;
      for (let i = 0; i < rows.length; i++) {
        let text = rows[i].querySelector("td").innerText;
        movieInfo[info_keys[i]] = text;
      }
      return movieInfo;
    });
    movieInfos.push(data);
  }
  await browser.close();
  return movieInfos;
}

async function getPageTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });
  const title = await page.evaluate(
    () => document.querySelector("head > title").innerText
  );
  await browser.close();
  return title;
}

module.exports = {
  getPageTitle,
  getMovieName,
};
