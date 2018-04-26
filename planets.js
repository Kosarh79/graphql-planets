var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var planetList = require('./planetList.js').planetList();
// GraphQL schema
var schema = buildSchema(`
    type Query {
        planet(id: Int!): Planet
        planets(galaxy:String): [Planet]
    },
    type Planet {
        id: Int
        name: String!
        description: String!
        image: String!
        orbitalPeriod: String!
        galaxy:String!
    }
`);
// type mutation {
//   AddPlanet (name:String!, description:String!, image:String!, orbitalPeriod:Int!, galaxy:Int!): Planet!
// }
var getPlanet = function(args) {
    var id = args.id;
    return planetList.filter(planet => {
        return planet.id === id;
    })[0];
};
var getPlanets = function(args) {
  console.log('Im here')
    if (args.galaxy) {
        var galaxy = args.galaxy;
        return planetList.filter(planet => planet.galaxy === galaxy);
    } else {
        return planetList;
    }
};
// var AddPlanet = function(options){
//
// }
//root resolver
var root = {
    planet: getPlanet,
    planets: getPlanets,
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
