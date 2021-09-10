const axios = require('axios');
const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageData(url) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });

    const pageTitle = await page.evaluate(() => document.querySelector('head > title').innerText);

    await page.waitForSelector('.movie-box');
    const endpoints = await page.evaluate(() => {
        const movieBoxes = document.querySelectorAll('.movie-box')
        const endpoints = [];
        movieBoxes.forEach((movieBox) => {
            const movieId = (movieBox.href.match(/\d/g)).join("");
            endpoints.push(`https://royal-films.com/api/v1/movie/${movieId}/barranquilla`);
        })
        return endpoints;
    });

    await browser.close();
    const allMoviesDetails = await getMoviesData(endpoints);
    return { pageTitle, allMoviesDetails };
}

async function getMoviesData(endpoints) {
    const responses = [];
    for (let endpoint of endpoints) {
        responses.push(getMovieDataFromAPI(endpoint));
    }
    //validate and filter results
    const results = await Promise.all(responses.map(p => p.catch(e => e)));
    const validResults = results.filter(result => !(result instanceof Error));
    return validResults;
}

async function getMovieDataFromAPI(endpoint) {
    const resp = await axios.get(endpoint);
    const respData = resp.data.data;
    const movieData = {
        'originalTitle': respData.original,
        'title': respData.title,
        'synopsis': respData.synopsis,
        'starred': respData.starred,
        'director': respData.director,
        'posterPhoto': respData.poster_photo,
        'trailer': `https://youtube.com/watch?v=${respData.youtube}`
    };
    return movieData;
}

module.exports = {
    getPageData
};