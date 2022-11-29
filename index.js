const express = require('express');
const app = express();

const {graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server now listening for requests on port ${port}`);
});


const {products} = require('./data/data.json');
const {clients} = require('./data/data.json');

// Schema GraphQL
const schema = buildSchema(
    `type Query {
        inddProductoAll(clave: String, claveOrdenamiento: String): resultProduct
        inddClienteAll(clave: String): resultClients
    }
    
    type resultProduct {
        totalCount: Int,
        inddproducto: [Inddproducto]
    }
    
    type resultClients {
        totalCount: Int,
        inddcliente: [Inddcliente]
    }
    
    type Inddproducto {
        clave: String,
        claveOrdenamiento: String,
        numId: String,
        tipoId: String,
        producto: String,
        descProducto: String,
        cupo: Float,
        cuota: Float,
        plan: String,
        lineaCredito: String,
        campana: Float,
        vigencia: String,
        plazo: Float,
        plazoMin: Float,
        plazoMax: Float,
        tasa: Float,
        cupoMin: Float,
    }
    
    type Inddcliente {
         clave: String
         numId: String
         tipoId: String
         llaveSistemaMdm: String
         indAjustado: Float
         indDisponible: Float
         nuevaG: String
         tipologiaG: String
         nivelRiesgo: String
         flagBancaColombia: Float
         nompenRiesgos: String
         flagPrefePlusAlto: Float
         segmento: String
         subsegmento: String
         flagNichoObjetivo: Float
         campana: Float
    }`
)

const getClients = (args) => {
    let clientsFound = clients.filter(client => {
        return client.clave === args.clave;
    });
    return {
        totalCount: clientsFound.length,
        inddcliente: clientsFound
    }
}

const getProducts = (args) => {
    let productsFound = products.filter(product => {
        return product.clave === args.clave;
    });
    return {
        totalCount: productsFound.length,
        inddproducto: productsFound
    }
}

const root = {
    inddClienteAll: getClients,
    inddProductoAll: getProducts
}

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
        rootValue: root,
    }));

