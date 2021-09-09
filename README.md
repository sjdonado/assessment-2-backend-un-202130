# [Template] Royal Films scraper

This work is done to obtain data from a movie billboard

To prove it https://github.com/kangcheng322/assessment-2-backend-un-202130.git

The fields to search for information are:

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

This is an example of the response that returns
{
"data":{
"pageTitle":"Cartelera Barranquilla - Royal Films",
"allMoviesDetails":[
{
"originalTitle":"Paw Patrol",
"title":"Paw Patrol",
"synopsis":"¡Ellos son Paw Patrol! Cuando Humdinger, el rival más
grande de todos, se convierte en alcalde de Adventure City comienza a
causar estragos, Ryder, y nuestros cachorros favoritos se ponen en marcha
para enfrentar el desafío. Mientras uno de los cachorros deberá de
enfrentar su pasado en Adventure City, el equipo conoce a un nuevo aliado:
Liberty, un inteligente perro salchicha. Juntos, armados con emocionantes
nuevos artefactos y equipo lucharán para salvar a los ciudadanos de
Adventure City. En esta primera aventura de PAW Patrol en la pantalla
grande estarán los integrantes del elenco de la serie original y además
Iain Armitage, Marsai Martin, Ron Pardo, Yara Shahidi, Kim Kardashian West,
Randall Park, Dax Shepard con la presentación especial de Tyler Perry y
Jimmy Kimmel, presentando a Will Brisbin.",
"starred":"Iain Armitage, Marsai Martin, Ron Pardo, Yara Shahidi,
Kim Kardashian West, Randall Park, Dax Shepard con la presentación especial
de Tyler Perry y Jimmy Kimmel, presentando a Will Brisbin",
"director":"Cal Brunker",
"posterPhoto":"https://royal-films.com/assets/covers/1626875131274-pp-int-d
igital-1-sht-collage-las-min.jpg",
"trailer":"https://youtube.com/watch?v=95F4ZfIjRL0"
}
]
}
}

References:
https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular/
https://www.adictosaltrabajo.com/2020/02/27/testing-funcional-con-puppeteer/