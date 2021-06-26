var express = require('express');
var router = express.Router();
var axios = require('axios');

var prefixes = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <ontotext.com/explicit>
    PREFIX skos: <w3.org/2004/02/skos/core#>
    PREFIX : <http://www.semanticweb.org/aninhas/ontologies/hoteis#>
`

var getLink = "http://localhost:7200/repositories/PRC-tp" + "?query=" 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hoteis' });
});


router.get('/hoteis', function (req, res, next){
  
  var query = `select ?name ?property_type ?address ?city ?country ?longitude ?latitude ?property_type ?star_rating ?zip_code ?url where { 
    ?s rdf:type :Hotel;
      :name ?name;
      :address ?address;
      :city ?city;
      :country ?country;
      :latitude ?latitude;
      :longitude ?longitude;
      :property_type ?property_type;
      :star_rating ?star_rating;
      :url ?url;
      :zip_code ?zip_code.	
  }  
  `

  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)
     .then(dados => {
        var hoteis = dados.data.results.bindings.map(bind => {return {
              name : bind.name.value,
              property_type : bind.property_type.value,
              address: bind.address.value,
              city: bind.city.value,
              country: bind.country.value,
              star_rating : bind.star_rating.value,
              zip_code : bind.zip_code.value,
              url : bind.url.value,
              latitude : bind.latitude.value,
              longitude : bind.longitude.value,
          }});
          
          res.status(200).jsonp(hoteis);
      })
      .catch(e => res.render('error', {error: e}))
})

// exemplo:  http://localhost:7700/hoteis/1771651
router.get('/hoteis/:id', function (req, res, next){
  
  var query = `select ?name ?property_type ?address ?city ?country ?longitude ?latitude ?property_type ?star_rating ?zip_code ?url where { 
    :hotel_`+ req.params.id +` rdf:type :Hotel;
      :name ?name;
      :address ?address;
      :city ?city;
      :country ?country;
      :latitude ?latitude;
      :longitude ?longitude;
      :property_type ?property_type;
      :star_rating ?star_rating;
      :url ?url;
      :zip_code ?zip_code.	
  }  
  `

  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)
     .then(dados => {
        var hoteis = dados.data.results.bindings.map(bind => {return {
              name : bind.name.value,
              property_type : bind.property_type.value,
              address: bind.address.value,
              city: bind.city.value,
              country: bind.country.value,
              star_rating : bind.star_rating.value,
              zip_code : bind.zip_code.value,
              url : bind.url.value,
              latitude : bind.latitude.value,
              longitude : bind.longitude.value,
          }});
          
          res.status(200).jsonp(hoteis);
      })
      .catch(e => res.render('error', {error: e}))
})

router.get('/rooms', function (req, res, next){
  
  var query = `select ?s ?room_type ?hotel ?room_am ?room_ft ?url where { 
    ?s rdf:type :Room;
        :belongs_to ?hotel;
         :room_type ?room_type;
      :room_amenities ?room_am;
      :room_features ?room_ft;
      :url ?url.
  }
  `

  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)
     .then(dados => {
        var rooms = dados.data.results.bindings.map(bind => {return {
              s : bind.s.value.split("#")[1],
              hotel : bind.hotel.value.split("#")[1],
              room_type : bind.room_type.value,
              room_am : bind.room_am.value,
              url : bind.url.value
          }});
          
          res.status(200).jsonp(rooms);
      })
      .catch(e => res.render('error', {error: e}))
})


// exemplo : http://localhost:7700/rooms/50672149
router.get('/rooms/:id', function (req, res, next){
  console.log(req.params.id)
  var query = `select ?room_type ?hotel ?room_am ?room_ft ?url where { 
    :room_`+ req.params.id +` rdf:type :Room;
        :belongs_to ?hotel;
         :room_type ?room_type;
      :room_amenities ?room_am;
      :room_features ?room_ft;
      :url ?url.
  }
  `

  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)
     .then(dados => {
        var rooms = dados.data.results.bindings.map(bind => {return {
              hotel : bind.hotel.value.split("#")[1],
              room_ft : bind.room_ft.value,
              room_type : bind.room_type.value,
              room_am : bind.room_am.value,
              url : bind.url.value
          }});
          
          res.status(200).jsonp(rooms);
      })
      .catch(e => res.render('error', {error: e}))
})



module.exports = router;
