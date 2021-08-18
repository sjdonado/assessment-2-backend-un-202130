# [Template] Royal Films scraper

Fork this project and modify the `./src/*` files in order to complete your assessment.

**IMPORTANT: don't modify the `./tests` or `.github` folder, otherwise your PR will not be reviewed**

Good luck!

## Setup cloud9
```bash
sudo amazon-linux-extras install epel -y
sudo yum install -y chromium

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