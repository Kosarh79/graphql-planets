const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const planetList = require('./planetList.js').planetList();
const path = require('path');
// GraphQL schema
const schema = buildSchema(`
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
const getPlanet = function(args) {
    const id = args.id;
    return planetList.filter(planet => {
        return planet.id === id;
    })[0];
};
const getPlanets = function(args) {
    if (args.galaxy) {
        const galaxy = args.galaxy;
        return planetList.filter(planet => planet.galaxy === galaxy);
    } else {
        return planetList;
    }
};
// const AddPlanet = function(options){
//
// }
//root resolver
const root = {
    planet: getPlanet,
    planets: getPlanets,
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use(express.static('static'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
