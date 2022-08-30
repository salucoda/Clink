import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import RecipeCard from "./RecipeCard";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentColorContext } from "./CurrentColorContext";


const SavedRecipes = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const { savedRecipes, setSavedRecipes } = useContext(CurrentColorContext);

    console.log(savedRecipes)
    return(
        savedRecipes &&
        <MainDiv>
            <h2>Saved Recipes</h2>
            <div className="results">
                {savedRecipes.map((recipe) => {
                    return(
                        <RecipeCard name={recipe.name} image={recipe.image} id={recipe.id} />
                    )
                })}
            </div>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 85vh;
    background-color: var(--color-purple);

    .results{
    display: flex;
    /* border: solid 2px red; */
    width: 900px;
    flex-wrap: wrap;
    justify-content: center;
}
`
export default SavedRecipes;