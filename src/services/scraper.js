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
    const allMoviesDetails = [];
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

    for (const endpoint of endpoints) {
        await axios.get(endpoint).then(response => {
            const movieData = response.data.data;
            allMoviesDetails.push({
                'originalTitle': movieData.original,
                'title': movieData.title,
                'synopsis': movieData.synopsis,
                'starred': movieData.starred,
                'director': movieData.director,
                'posterPhoto': movieData.poster_photo,
                'trailer': `https://youtu.be/${movieData.youtube}`
            });
        });
    }

    return { pageTitle, allMoviesDetails };
}

module.exports = {
    getPageData
};