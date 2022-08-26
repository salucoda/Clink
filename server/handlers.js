//Mongo Setup
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const {MONGO_URI} = process.env;
const options = {};
const client = new MongoClient(MONGO_URI,options);

//gets all the recipes a user has saved

const getSavedRecipes = async (req, res) => {
    try{
        await client.connect();
        const db = client.db("database");
        const result = await db.collection("saved-recipes").find().toArray();
        res.status(200).json({ status: 200, data: result});
        client.close();
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
        client.close();
    }
}

module.exports = {
    getSavedRecipes,
}