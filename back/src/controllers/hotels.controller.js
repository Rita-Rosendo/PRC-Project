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

        var query = `select ?s ?name ?city ?property_type ?address ?country ?longitude ?latitude ?star_rating ?url where { 
            ?s rdf:type :Hotel;
              :name ?name;
              :city ?city;
              :property_type ?property_type;
              :address ?address;
              :country ?country;
              :longitude ?longitude;
              :latitude ?latitude;
              :star_rating ?star_rating;
              :url ?url.
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
                    "id" : bind.s.value.split('#')[1].split('_')[1],
                    "name": bind.name.value,
                    "property_type": bind.property_type.value,
                    "address": bind.address.value,
                    "city": bind.city.value,
                    "country": bind.country.value,
                    "star_rating": bind.star_rating.value,
                    "url": bind.url.value,
                    "latitude": bind.latitude.value,
                    "longitude": bind.longitude.value,
                }});

                res.status(200).jsonp(hoteis);
            })
            .catch(e => res.render('error', {"error": e}))
}

exports.getHoteisPage = (req, res) => {
    var query = `select (COUNT(*) AS ?triples) where {    ?s rdf:type :Hotel;
        :name ?name;
        :city ?city;
        :property_type ?property_type;
        :address ?address;
        :country ?country;
        :longitude ?longitude;
        :latitude ?latitude;
        :star_rating ?star_rating;
        :url ?url.`

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

exports.getRooms = (req, res) => {

    var query = `select ?s ?room_type ?hotel_name ?room_am ?room_ft ?url where { 
        ?s rdf:type :Room;
            :belongs_to ?hotel;
            :room_type ?room_type;
            :room_amenities ?room_am;
            :room_features ?room_ft;
            :url ?url.
        ?hotel :name ?hotel_name.`

    if(req.query.room_type != ""){
        query +=       `filter regex(?room_type,"`+ req.query.room_type +`").`
    }

    query += `}  
    order by ?hotel_name LIMIT 20 OFFSET ${20*(req.query.page-1)}
    `

    var encoded = encodeURIComponent(prefixes + query)

    axios.get(getLink + encoded)
        .then(dados => {
            var rooms = dados.data.results.bindings.map(bind => {return {
                "id" : bind.s.value.split('#')[1].split('_')[1],
                "room_type": bind.room_type.value,
                "room_amenities": bind.room_am.value,
                "room_features": bind.room_ft.value,
                "belongs_to": bind.hotel_name.value,
                "url": bind.url.value,
            }});

            res.status(200).jsonp(rooms);
        })
        .catch(e => res.render('error', {"error": e}))
}

exports.getRoomsPage = (req, res) => {
    var query = `select (COUNT(*) AS ?triples) where { 
        ?s rdf:type :Room;
        :belongs_to ?hotel;
        :room_type ?room_type;
        :room_amenities ?room_am;
        :room_features ?room_ft;
        :url ?url.
        ?hotel :name ?hotel_name.
        `

    if(req.query.room_type != ""){
        query +=       `filter regex(?room_type,"`+ req.query.room_type +`").`
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

exports.getHotel = (req,res) => {
    var query = 'select * where { :hotel_'+req.params.id+' ?p ?o .} '

    var encoded = encodeURIComponent(prefixes + query)

    axios.get(getLink + encoded)
        .then(dados => {
            console.log(dados.data.results.bindings)
            var hotelElem = dados.data.results.bindings.map(bind => {return {
                "p": bind.p.value.split('#')[1],
                "o": (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1],
            }});
            res.status(200).jsonp(hotelElem);
        })
        .catch(err => {
            res.status(500).jsonp(err);
        })
}

exports.getRoom = (req,res) => {
    console.log("IDDDD do quartooo no getRoom: " + ':room_'+req.params.id)
    var query = 'select * where { :room_'+req.params.id+' ?p ?o .} '

    var encoded = encodeURIComponent(prefixes + query)

    axios.get(getLink + encoded)
        .then(dados => {
            console.log(dados.data.results.bindings)
            var room = dados.data.results.bindings.map(bind => {return {
                "p": bind.p.value.split('#')[1],
                "o": (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1],
            }});
            res.status(200).jsonp(room);
        })
        .catch(err => {
            res.status(500).jsonp(err);
        })
}

exports.getRoomsFromHotel = (req,res) => {
    var query = `
        select ?room
        where{
            ?room rdf:type :Room;
                :belongs_to :hotel_`+req.params.id+`.
        }`

    var encoded = encodeURIComponent(prefixes + query)

    axios.get(getLink + encoded)
        .then(dados => {
            console.log(dados.data.results.bindings)
            var room = dados.data.results.bindings.map(bind => {return {
                "room": bind.room.value.split('#')[1],
            }});
            res.status(200).jsonp(room);
        })
        .catch(err => {
            res.status(500).jsonp(err);
        })
}

