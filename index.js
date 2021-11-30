const { application } = require("express");
const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const yenv = require('yenv');
const env = yenv('env.yaml');

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "HomeQuest API",
            version: "1.0.0",
            description: "REST Express API for managing React Native HomeQuest app"
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: 'Development version'
            },
            {
                url: "https://homequest.herokuapp.com/",
                description: 'Deployed version'
            }
        ],
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// const username = 'admin-user';
// const userpass = 'hypahypakwakwa';

// const dbURI = `mongodb+srv://${username}:${userpass}@nodetuts.je9tx.mongodb.net/homequest?retryWrites=true&w=majority`;
const dbURI = `mongodb+srv://${env.USER_NAME}:${env.USER_PASS}@nodetuts.je9tx.mongodb.net/homequest?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
    .then(() => {
        console.log('DB state: on');
    })
    .catch((err) => {
        console.log('DB state: off');
        console.log(err);
    });

app.use(routes);
