const express = require("express");
const morgan = require('morgan');
const app = express()
const port = 8000

//importing handler functions
const {
    getSavedRecipes,
    createUser,
    addRecipe,
    removeRecipe,
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

//POST all the recipes a user has saved
app.post("/get-saved-recipes", getSavedRecipes);

//POST to add a user to the database
app.post("/create-user", createUser);

//POST to add a recipe to the saved recipe database 
app.post("/add-recipe", addRecipe);

//DELETE a recipe from saved recipe database by id
app.delete("/remove-recipe/:recipeId", removeRecipe);

// Catch all
app.get('*', (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is not what you're looking for.",
    });
});

app.listen(port, () => console.info(`Listening on port ${port}`));