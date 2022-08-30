import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentColorContext } from "./CurrentColorContext";
import { useHistory } from "react-router-dom";

const AddToFavsBtn = ({ id, name, image }) => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const { savedRecipes, toggleFavs, setToggleFavs } = useContext(CurrentColorContext);

    console.log(savedRecipes)
    console.log(id)

    const existingRecipe = savedRecipes.filter((recipe) => {
        return recipe.id === id
    })
    console.log(existingRecipe);

    const addToFav = () => {
        
        fetch("/add-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id, name: name, image: image, email: user.email})
        })
        .then((res) => res.json())
        .then(data => {
            setToggleFavs(!toggleFavs)
            console.log(data)
        })
        .catch(err => console.log(err))

    }

    const removeFromFav = () => {
        fetch(`/remove-recipe/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: user.email})
        })
        .then((res) => res.json())
        .then(data => {
            setToggleFavs(!toggleFavs)
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        {isAuthenticated &&

        existingRecipe.length ?
        
        <button onClick={removeFromFav}>Remove from Favorites</button>
        :
        
        isAuthenticated &&
        
        <button onClick={addToFav}>Add to Favorites</button>
        }
        </>
    )
}

export default AddToFavsBtn;