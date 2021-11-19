const { application } = require("express");
const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const username = 'admin-user';
const userpass = 'hypahypakwakwa';

const dbURI = `mongodb+srv://${username}:${userpass}@nodetuts.je9tx.mongodb.net/homequest?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
    .then(() => {
        console.log('DB state: on');
    })
    .catch((err) => {
        console.log('DB state: off');
        console.log(err);
    });

app.use(routes);
