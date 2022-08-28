import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipeDetails = () => {
    const {recipeId} = useParams();
    const [recipeDeet, setRecipeDeet] = useState();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd9742427b7msh21169e5eb9d27e6p123da9jsnf56da5fcd1b3',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    useEffect(() => {
        fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${recipeId}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setRecipeDeet(response)
            })
            .catch(err => console.error(err));
    }, []);

    return(
        recipeDeet &&
        <MainDiv>
            <h1>{recipeDeet.name}</h1>
            <img src={recipeDeet.thumbnail_url} alt="drink" />
            <p>Servings: {recipeDeet.num_servings}</p>
            <p>{recipeDeet.description}</p>

            <div className="ingredients">
                <p>Ingredients:</p>
                <ul>
                {recipeDeet.sections[0].components.map((ingredient) => {
                    return(
                        <li>
                            {ingredient.raw_text}
                        </li>
                    )
                })}
                </ul>
            </div>

            <div className="instructions">
                <p>Instructions:</p>
                <ul>
                    {recipeDeet.instructions.map((instruction) => {
                        return(
                            <li>
                                {instruction.display_text}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 20vh;
`
export default RecipeDetails;