import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import AddToFavsBtn from "./AddToFavsBtn";
import { CurrentColorContext } from "./CurrentColorContext";
import CircularProgress from "@mui/material/CircularProgress";
import Wavy from "../assets/wavy.png";

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
        <>
            <StyledWave src={Wavy} alt="wavy"/>
            <StyledWave2 src={Wavy} alt="wavy"/>

            <MainDiv>
                <div className="contentDiv">
                    <div className="centereddiv">
                        <h1 className="title">{recipeDeet.name}</h1>
                    </div>

                    <div className="leftrightcontainer">
                        <div className="left">
                            <img className="img" src={recipeDeet.thumbnail_url} alt="drink" />

                            <p className="servings"><span className="bold">Servings:</span> {recipeDeet.num_servings}</p>

                            <p>{recipeDeet.description}</p>
                        </div>

                        <div className="right">
                            <div className="ingredients">
                                <p className="removemargin">Ingredients:</p>
                                <ul>
                                {recipeDeet.sections[0].components.map((ingredient) => {
                                    return(
                                        <li className="spaceul">
                                            {ingredient.raw_text}
                                        </li>
                                    )
                                })}
                                </ul>
                            </div>

                            <div className="instructions">
                                <p className="removemargin">Instructions:</p>
                                <ol>
                                    {recipeDeet.instructions.map((instruction) => {
                                        return(
                                            <li className="spaceol">
                                                {instruction.display_text}
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="centereddiv">
                        <AddToFavsBtn id={recipeDeet.id} name={recipeDeet.name} image={recipeDeet.thumbnail_url} />
                    </div>
                </div>
            </MainDiv>
        </>
        : loading === true &&
        <LoadingDiv>
            <CircularProgress />
        </LoadingDiv>
    )
}

const MainDiv = styled.div`
    background-color: var(--color-green);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-body);

    .img{
        width: 400px;
        height: 400px;
        border: 3px solid black;
        border-radius: 30px;
    }
    
    .contentDiv{
        width: 1000px;
        margin-top: 50px;
        background-color: var(--color-green);
        /* z-index: 50; */
    }
    
    .centereddiv{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .right{
        padding-left: 50px;
    }

    .leftrightcontainer{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto auto auto;
        margin-left: 50px;
        
    }

    .title{
        font-family: var(--font-header-option-two);
        margin-top: 20px;
        margin-bottom: 30px;
    }

    .removemargin{
        margin-left: -50px;
        margin-bottom: 10px;
        margin-top: 10px;
        font-weight: bold;
        text-decoration: underline;
    }

    .spaceol{
        margin-bottom: 10px;
    }

    .bold{
        font-weight: bold;
        text-decoration: underline;
    }

    .servings{
        margin-top: 10px;
        margin-bottom: 10px;
    }
`
const LoadingDiv = styled.div`
    padding-top: 50vh;
    height: 50vh;
    padding-left: 50vw;
    background-color: var(--color-green);
`
const StyledWave = styled.img`
    margin-top: 300px;
    margin-left: -350px;
    transform:rotate(90deg);
    height: 400px;
    width: 1100px;
    position: fixed;
`
const StyledWave2 = styled.img`
    margin-top: 320px;
    margin-left: 1170px;
    transform:rotate(270deg);
    height: 400px;
    width: 1100px;
    position: fixed;
`
export default RecipeDetails;