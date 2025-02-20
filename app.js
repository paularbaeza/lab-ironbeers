const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname + "/views/partials"));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req,res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    let beersArr = beersFromApi
    //console.log('Beers from the database: ', beersFromApi)
    //console.log('Beers from the database: ', beersFromApi.length)
    res.render ("beers", {
      beersArr
    })
  })
  .catch(error => console.log(error));

})


app.get("/random-beer", (req,res) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {
    let randomBeerArr = responseFromAPI
    //console.log(randomBeerArr)
    res.render ("random-beer",{
      randomBeerArr
    })
  })
  .catch(error => console.log(error));
})


app.get('/beers/:id', (req, res) => {
  //console.log(req.params)
  let id = req.params.id
  punkAPI.getBeer(id)
  .then( (beerChosenArr) => {
    res.render('beer-by-id', {beerChosenArr});
  })
  .catch(error => console.log(error));
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
