import { request } from 'graphql-request'
const query = `{
  planets {
     name
     orbitalPeriod
     description
     image
   }
}`

request('http://localhost:4000/graphql', query).then(data => console.log(data))
