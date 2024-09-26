import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import resolvers from "./resolvers";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    app.use(bodyParser.json());
    app.use(cors());
    await server.start();
    app.use("/graphql", expressMiddleware(server));
    app.listen(8000, () => {
        console.log(`🚀 Server ready at http://localhost:8000/graphql`);
    });
}
startServer();
//! Without express
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { typeDefs } from "./schema";
// import resolvers from "./resolvers";
// // The ApolloServer constructor requires two parameters: your schema
// // definition and your set of resolvers.
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// });
// // Passing an ApolloServer instance to the `startStandaloneServer` function:
// //  1. creates an Express app
// //  2. installs your ApolloServer instance as middleware
// //  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
//     listen: { port: 3000 },
// });
// console.log(`🚀  Server ready at: ${url}`);
