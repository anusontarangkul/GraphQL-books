const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

// const app = express();

// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// });

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();

    const app = express();

    // Additional middleware can be mounted at this point to run before Apollo.
    // app.use('*', jwtCheck, requireAuth, checkScope);

    // Mount Apollo middleware here.


    server.applyMiddleware({ app });
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    db.once('open', () => {
        console.log('DB is live');
        app.listen(PORT, () => {
            console.log(`App is running on ${PORT}`);
            console.log(`The graphQL PLAYGROUND that is configured here http://localhost:${PORT}${server.graphqlPath}`)
        })
    })
}
startApolloServer()
