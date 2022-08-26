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

//POST to send user to userdatabase

const createUser = async (req,res) => {
    try{
        await client.connect();
        const db = client.db("database");
        const id = uuidv4();
        const { user } = req.body

        const existingUser = await db.collection("user").findOne({email: user.email})

        if(existingUser) {
            res.status(400).json({ status: 400, message: "user already exists."})
        } else {
            const result = await db.collection("user").insertOne({id, user, email: user.email});
            res.status(201).json({ status: 201, message: "success", data: result , id: id});
        }

        client.close();
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
        client.close();
    }
}

module.exports = {
    getSavedRecipes,
    createUser,
}