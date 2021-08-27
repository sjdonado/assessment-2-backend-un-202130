# [Template] Royal Films scraper

Fork this project and modify the `./src/*` files in order to complete your assessment.

**IMPORTANT: don't modify the `./tests` or `.github` folder, otherwise your PR will not be reviewed**

Good luck!

## Setup azure VM
```bash
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev

npm install
```

## Run in development (hot reload)
```bash
npm run dev
```

## Responses shapes

- 200
```js
{
  data: {
    pageTitle: string,
    allMoviesDetails: [
      {
        originalTitle: string,
        title: string,
        synopsis: string,
        starred: string,
        director: string,
        posterPhoto: string,
        trailer: string,
      },
      ...
    ]
  }
}
```
- 404
```js
{
  data: null,
  err: string,
}
```
