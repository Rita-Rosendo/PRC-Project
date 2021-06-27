const axios = require('axios')
const config = require('../config.js')

var prefixes = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <ontotext.com/explicit>
    PREFIX skos: <w3.org/2004/02/skos/core#>
    PREFIX : <http://www.semanticweb.org/aninhas/ontologies/hoteis#>
    `

var getLink = `http://${config.graphdb.host}:${config.graphdb.port}/repositories/${config.graphdb.repo}?query=`


/*
  - exemplo: http://localhost:7700/hoteis?country=Greece devolve a lista de hoteis
situados na Bulgária ordenados pelo nome
  - exemplo: http://localhost:7700/hoteis?country=Greece&city=Adamas devolve a lista de hoteis
situados na Bulgária na cidade Balchik ordenados pelo nome
*/
exports.getHoteis = (req, res) => {

        var query = `select ?s ?name ?property_type ?address ?city ?country ?longitude ?latitude ?property_type ?star_rating ?zip_code ?url where { 
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
        `
        if(req.query.country != ""){
            query +=       `filter regex(?country,"`+ req.query.country +`").`
        }

    if(req.query.city != ""){
        query +=       `filter regex(?city,"`+ req.query.city +`").`
    }
    if(req.query.name != ""){
        query +=       `filter regex(?name,"`+ req.query.name +`").`
    }
    if(req.query.address != ""){
        query +=       `filter regex(?address,"`+ req.query.address +`").`
    }

        query +=        `
    }  
    order by ?name LIMIT 20 OFFSET ${20*(req.query.page-1)}
    `

        var encoded = encodeURIComponent(prefixes + query)

        axios.get(getLink + encoded)
            .then(dados => {
                var hoteis = dados.data.results.bindings.map(bind => {return {
                    "name": bind.name.value,
                    "property_type": bind.property_type.value,
                    "address": bind.address.value,
                    "city": bind.city.value,
                    "country": bind.country.value,
                    "star_rating": bind.star_rating.value,
                    "zip_code": bind.zip_code.value,
                    "url": bind.url.value,
                    "latitude": bind.latitude.value,
                    "longitude": bind.longitude.value,
                }});

                res.status(200).jsonp(hoteis);
            })
            .catch(e => res.render('error', {"error": e}))


}

exports.getHoteisPage = (req, res) => {
    var query = `select (COUNT(*) AS ?triples) where {     ?s rdf:type :Hotel;
    	  :name ?name;
        :address ?address;
        :city ?city;
        :country ?country;
        :latitude ?latitude;
        :longitude ?longitude;
        :property_type ?property_type;
        :star_rating ?star_rating;
        :url ?url;
        :zip_code ?zip_code.`

    if(req.query.country != ""){
        query +=       `filter regex(?country,"`+ req.query.country +`").`
    }

    if(req.query.city != ""){
        query +=       `filter regex(?city,"`+ req.query.city +`").`
    }
    if(req.query.name != ""){
        query +=       `filter regex(?name,"`+ req.query.name +`").`
    }
    if(req.query.address != ""){
        query +=       `filter regex(?address,"`+ req.query.address +`").`
    }
    query +=        `
    }  
    `
    var encoded = encodeURIComponent(prefixes + query)

    axios.get(getLink + encoded)
        .then(dados => {
            res.status(200).jsonp(dados.data.results);
        })
        .catch(e => res.render('error', {"error": e}))

}