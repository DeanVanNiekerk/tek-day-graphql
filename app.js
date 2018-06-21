const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();

mongoose.connect('mongodb+srv://sa:lead2gold@tracc-master-vt8et.mongodb.net/master');

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(3000, function() {
    console.log('listening on port 3000');
})