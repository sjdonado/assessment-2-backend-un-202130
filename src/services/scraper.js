const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */

async function getPageTitle(url) {
  const browser = await puppeteer.launch({ headless: false });
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
  await page.waitForSelector('#movies h3');

  const urls = await page.evaluate(() => {
    const urls_html = document.querySelectorAll('#movies a.movie-box')
    let urls_array = []
    for (const u in urls_html) {
      if (urls_html[u].href) {
        urls_array.push(
          urls_html[u].href
        );
      }
    }
    return urls_array;
  });

  //console.log(urls);

  const films = [];

  for (const url in urls) {
    console.log(urls[url]);
    await page.goto(urls[url], { waitUntil: 'load', timeout: 0 });
    await page.waitForTimeout(4000);
    await page.waitForSelector('table.people td');
    const film = await page.evaluate(() => {
      let data = document.querySelectorAll('table.people td');
      let sip = document.querySelector('p.synopsis').innerText;
      let photo = document.querySelector('span.gaussian').style.backgroundImage.slice(4, -1).replace(/"/g, "");;
      let trailer = "https://youtube.com/watch?v=95F4ZfIjRL0";
      return {
        "originalTitle": data[1].innerText,
        "title": data[0].innerText,
        "synopsis": sip,
        "starred": data[2].innerText,
        "director": data[3].innerText,
        "posterPhoto": photo,
        "trailer": trailer
      };
    });
    //console.log(film);
    films.push(film);
  }

  await browser.close();

  return {
    data: {
      pageTitle: title,
      allMoviesDetails: films
    }
  };
}

module.exports = {
  getPageTitle,
  getPageInfo
};
