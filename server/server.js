const express = require("express");
const morgan = require('morgan');
const app = express()
const port = 8000

//importing handler functions
const {
    getSavedRecipes,
} = require("./handlers.js");

app.use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
    });

app.use(morgan('tiny'));
app.use(express.static('./server/assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(__dirname + '/'));

//******************************
// Endpoints
//******************************

//GET all the recipes a user has saved
app.get("/get-saved-recipes", getSavedRecipes);

// Catch all
app.get('*', (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is not what you're looking for.",
    });
});

app.listen(port, () => console.info(`Listening on port ${port}`));