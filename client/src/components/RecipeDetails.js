import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import AddToFavsBtn from "./AddToFavsBtn";
import { CurrentColorContext } from "./CurrentColorContext";
import CircularProgress from "@mui/material/CircularProgress";

const RecipeDetails = () => {
    const {recipeId} = useParams();
    const [recipeDeet, setRecipeDeet] = useState();
    const { setCurrentColor } = useContext(CurrentColorContext);
    const [loading, setLoading] = useState(true);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd9742427b7msh21169e5eb9d27e6p123da9jsnf56da5fcd1b3',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    useEffect(() => {
        setCurrentColor("#a8c686");
        fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${recipeId}`, options)
            .then(response => response.json())
            .then(response => {
                setRecipeDeet(response);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    return(
        recipeDeet &&
        loading === false ?
        <MainDiv>
            <h1>{recipeDeet.name}</h1>

            <AddToFavsBtn id={recipeDeet.id} name={recipeDeet.name} image={recipeDeet.thumbnail_url} />

            <img className="img" src={recipeDeet.thumbnail_url} alt="drink" />

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
                <ol>
                    {recipeDeet.instructions.map((instruction) => {
                        return(
                            <li>
                                {instruction.display_text}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </MainDiv>
        : loading === true &&
        <LoadingDiv>
            <CircularProgress />
        </LoadingDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 15vh;
    background-color: var(--color-green);
    height: 85vh;

    .img{
        width: 100px;
    }
`
const LoadingDiv = styled.div`
    padding-top: 50vh;
    height: 50vh;
    padding-left: 50vw;
    background-color: var(--color-green);
`
export default RecipeDetails;