import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import RecipeCard from "./RecipeCard";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentColorContext } from "./CurrentColorContext";
import Waves from "../assets/wavespng.png";


const SavedRecipes = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const { savedRecipes, setCurrentColor } = useContext(CurrentColorContext);

    useEffect(() => {
        setCurrentColor("#9b99d0");
    }, [])

    return(
        <>
        <StyledImg src={Waves} />
        {savedRecipes &&
        <MainDiv>
            <h2 className="titlesaved">saved recipes</h2>
            <div className="results">
                {savedRecipes.map((recipe) => {
                    return(
                        <RecipeCard name={recipe.name} image={recipe.image} id={recipe.id} />
                    )
                })}
            </div>
        </MainDiv>
        }
        <StyledImg2 src={Waves} />
        </>
    )
}

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: var(--color-purple);
    overflow: hidden;
    overflow-y: hidden;

    .results{
    display: flex;
    width: 900px;
    flex-wrap: wrap;
    justify-content: center;
}

.titlesaved{
    font-size: 40px;
    font-family: var(--font-header-option-two);
}
`

const StyledImg = styled.img`
    margin-bottom: -550px;
    width: 600px;
    position:fixed;
    
`
const StyledImg2 = styled.img`
    width: 600px;
    position: fixed;
    bottom: 0;
    right: 0;
    transform:rotate(180deg);
    margin-bottom: -86px;
`
export default SavedRecipes;