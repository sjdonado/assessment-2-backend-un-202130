const puppeteer = require('puppeteer');
let browser;
let page;
var details = [];
var detailFormat = [];

init = async () => {
  browser = await puppeteer.launch();
};

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */

async function getPageTitle(url) {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const title = await page.evaluate(() => document.querySelector('head > title').innerText);
  return title;
}

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {JSON}
 */

async function getPageMovies(url) {
  await page.goto(url, { waitUntil: 'networkidle0' });
  var bodyMovies = await page.evaluate(() => {
    return JSON.parse(document.querySelector('body').innerText);
  });
  for (let i = 0; i < bodyMovies.data.length; i++) {
    var url = 'https://royal-films.com/api/v1/movie/' + bodyMovies.data[i].id + '/barranquilla';
    await page.goto(url, { waitUntil: 'networkidle0' });
    var details = await page.evaluate(() => {
      return JSON.parse(document.querySelector('body').innerText);
    });
    details.push(details.data);
  }
  await browser.close();
  return details;
}

module.exports = {
  getPageTitle,
  getPageMovies,
 };
