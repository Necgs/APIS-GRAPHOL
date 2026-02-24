const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();
const PORT = 3000;

const typeDefs = gql`
  type Libro {
    id: ID!
    titulo: String!
    autor: String!
  }

  type Query {
    libros: [Libro] #Obtener todos los libros
    libro(id: ID!): Libro #Obtener un libro por ID
  }
    type Query {
    libros: [Libro] #Obtener todos los libros
    libro(id: ID!): Libro #Obtener un libro por ID
  }
    type Mutation {
    agregarLibro(titulo: String!, autor: String!): Libro #Agregar un nuevo libro
    eliminarLibro(id: ID!): Boolean #Eliminar un libro por ID
    modificarLibro(id: ID!, titulo: String, autor: String): Libro #Modificar un libro por ID
  }
`;

// BASE DE DATOS
let libros = [
    { id: 1, titulo: 'El Gran Gatsby', autor: 'F. Scott Fitzgerald' },
    { id: 2, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez' },
    { id: 3, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' }
];

//DEfinir los roseolvers
const resolvers = {
    Query: {
        libros: () => libros,
        libro: (parent, args) => libros.find(libro => libro.id === parseInt(args.id))
    },
    Mutation: {
        agregarLibro: (parent, { titulo, autor }) => {
            const nuevoLibro = { id: String(libros.length + 1), titulo, autor };
            libros.push(nuevoLibro);
            return nuevoLibro;
        }
    }
};

//Crear el servidor de Apollo
async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Servidor GraphQL escuchando en http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
