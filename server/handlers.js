//Mongo Setup
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const {MONGO_URI} = process.env;
const options = {};
const client = new MongoClient(MONGO_URI,options);

//POST for all the recipes a user has saved

const getSavedRecipes = async (req, res) => {
    const {email} = req.body;

    try{
        await client.connect();
        const db = client.db("database");
        const result = await db.collection("saved-recipes").find({email}).toArray();
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

        const userFavs = await db.collection("saved-recipes").find({ email: user.email }).toArray();
        console.log(userFavs);
        if(existingUser) {
            res.status(400).json({ status: 400, message: "user already exists.", data: existingUser, fav: userFavs});
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

//POST to add recipe to saved recipe database

const addRecipe = async (req,res) => {
    const {id, name, image, email} = req.body

    try{
        await client.connect();
        const db = client.db("database");
        const existingRecipe = await db.collection("saved-recipes").findOne({id: Number(id)})

        if (existingRecipe) {
            throw new Error("This recipe was already added to favorites.")
        } else {
            const result = await db.collection("saved-recipes").insertOne({id, name, image, email});
            res.status(201).json({ status: 201, message: "success", data: result}); 
        }
        client.close();
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
        client.close();
    }
}

//DELETE a recipe from saved recipe database

const removeRecipe = async (req, res) => {
    const recipeId = req.params.recipeId
    const {email} = req.body

    try{
        await client.connect();
        const db = client.db("database");
        const item = await db.collection("saved-recipes").findOne({id: Number(recipeId), email: email});

        if (item === null) {
            throw new Error(`The recipe with id ${recipeId} does not exist`);
        }

        const result = await db.collection("saved-recipes").deleteOne({id: item.id});
        res.status(200).json({ status: "success", data: result});

        client.close();
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message});
        client.close();
    }
}

//PATCH to update user database with preferences

const addPreferences = async (req, res) => {
    const {email, bio, allergy, restriction, nickname, pronouns, age, favdrink} = req.body

    try{
        await client.connect();
        const db = client.db("database");
        const currentUser = await db.collection("user").findOne({email: email});

        if (currentUser) {
            const result = await db.collection("user").updateOne({email: email}, { $set: {"user.bio": bio, "user.allergy": allergy, "user.restriction": restriction, "user.pronouns": pronouns, "user.nickname": nickname, "user.age": age, "user.favdrink": favdrink}});

            res.status(200).json({ status: 200, message: "success", data: result});
            client.close();
        } else {
            throw new Error("This user does not exist.");
        }

    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
        client.close();
    }
}

//GET to get all user info by email

const getUserInfo = async (req, res) => {
    const userEmail = req.params.userEmail;

    try{
        await client.connect();
        const db = client.db("database");
        const result = await db.collection("user").findOne({email: userEmail});

        res.status(200).json({ status: 200, data: result});
        client.close();

    } catch (err) {
        res.status(404).json({ status: 404, message: err.message});
        client.close();
    }
}
module.exports = {
    getSavedRecipes,
    createUser,
    addRecipe,
    removeRecipe,
    addPreferences,
    getUserInfo,
}