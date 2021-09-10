const puppeteer = require('puppeteer');
const fetch = require("fetch").fetchUrl;

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

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
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
    await page.goto(urls[url], { waitUntil: 'networkidle0', timeout: 0 });
    await page.waitForTimeout(1200);
    await page.waitForSelector('table.people td');

    const film = await page.evaluate(() => {
      let data = document.querySelectorAll('table.people td');
      //let sip = document.querySelector('p.synopsis').innerText;
      let photo = document.querySelector('span.gaussian').style.backgroundImage.slice(4, -1).replace(/"/g, "");
      return {
        "originalTitle": data[1].innerText,
        "title": data[0].innerText,
        "synopsis": "",
        "starred": data[2].innerText,
        "director": data[3].innerText,
        "posterPhoto": photo,
        "trailer": ""
      };
    });

    let id = urls[url].match(/\d/g);
    id = id.join("");
    
    fetch("https://royal-films.com/api/v1/movie/" + id + "/barranquilla", function(error, meta, body){
      let response = JSON.parse(body.toString());
      dataJson = response.data;
      film["synopsis"] = dataJson.synopsis;
      film["trailer"] =  "https://youtube.com/watch?v=" + dataJson.youtube;
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
