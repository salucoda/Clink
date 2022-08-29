import styled from "styled-components";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import {BsSearch} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import {CgSmileSad} from "react-icons/cg";
import {CgSmile} from "react-icons/cg";

//set up error catch
//use asparagus example
const SearchBar = () => {
    const [value, setValue] = useState("");
    const [recipes, setRecipes] = useState(null);
    const [error, setError ] = useState(false);
    const [side, setSide] = useState('');

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd9742427b7msh21169e5eb9d27e6p123da9jsnf56da5fcd1b3',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    const handleSearch = () => {
        fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=100&tags=drinks&q=${value}`, options)
            .then(response => response.json())
            .then(response => {
                    console.log(response)
                        setRecipes(response.results)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if (recipes) {
            if (recipes.length && recipes) {
                setError(false)
                console.log("green light")
                } else {
                setError(true)
                console.log("red light")
                }
        }
    }, [recipes])

    return(
        
        <>
                <SideDiv>
                {side ?
                    <p className="text">cheers to {side}</p>
                    :
                    <p className="text"><CgSmile className="iconsmile"/> search to start <CgSmile className="iconsmile"/></p>
                }
                </SideDiv>

                <SideDiv2>
                {side ?
                    <p className="text">cheers to {side}</p>
                    :
                    <p className="text"><CgSmile className="iconsmile"/> search to start <CgSmile className="iconsmile"/></p>
                }
                </SideDiv2>
        <StyledDiv>
            <div className="search">
                <input
                    className='inputTag'
                    type='text'
                    placeholder="Enter an ingredient..."
                    value={value}
                    onChange={(ev) => setValue(ev.target.value)}
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            handleSearch();
                            setSide(ev.target.value);
                        }
                    }}
                    />
                <StyledSearchIcon />
            </div>
            <div className="results">

                {recipes && recipes.filter((recipe) => {
                    return recipe && recipe.sections && recipe.sections.length <= 1
                }).map((recipe) => {
                    return (
                            <>
                                <RecipeCard name={recipe.name} image={recipe.thumbnail_url} description={recipe.description} id={recipe.id}/>
                            </> 
                        )
                })}

            </div>
        {error &&
        <div className="errordiv">
            <p className="error">Sorry, no recipes with this ingredient. Please check your spelling and try again.<CgSmileSad className="sadlogo" size={50}/></p>
        </div>
        }
        </StyledDiv>

        </>
    )
}
const StyledDiv = styled.div`
    padding-top: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f9cc67;

    .inputTag{
        border: black solid 3px;
        border-radius: 30px;
        height: 20px;
        width: 300px;
        padding: 10px;
        background: transparent; 
        font-family: var(--font-body);
        font-weight: bold;

        &:focus {
            outline: none;
        }

        &::placeholder{
            color: black;
            opacity: 0.5;
        }

    } 
    
    .results{
    padding:1vw;
    display: flex;
    width: 1200px;
    flex-wrap: wrap;
    justify-content: center;

}

    .errordiv{
        width: 400px;
        text-align: center;
        line-height: 30px;
        padding-top: 140px;
    }

    .error{
        font-family: var(--font-body);
        font-weight: bold;
    }

    .sadlogo{
        padding-top: 30px;
    }
    `

const StyledSearchIcon = styled(BsSearch)`
    padding:0.7vw;
    position: relative;
    left: -2.5vw;
    top:1.6vh;
`
const SideDiv = styled.div`
    transform: rotate(-0.25turn);
    /* border: solid 2px red; */
    position: fixed;
    width: 800px;
    height: 200px;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-top: -90px; /* Negative half of height. */
    margin-left: -1250px; /* Negative half of width. */
    z-index: 100;

    .text{
        font-size: 70px;
        font-family: var(--font-header-option-two);
        font-style: italic;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .iconsmile{
        margin-left: 20px;
        margin-right: 20px;
    }
`
const SideDiv2 = styled.div`
    transform: rotate(0.25turn);
    /* border: solid 2px red; */
    position: fixed;
    width: 800px;
    height: 200px;
    bottom: 50%;
    right: 1%;
    text-align: center;
    margin-bottom: -115px; /* Negative half of height. */
    margin-right: -310px; /* Negative half of width. */
    z-index: 100;

    .text{
        font-size: 70px;
        font-family: var(--font-header-option-two);
        font-style: italic;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .iconsmile{
        margin-left: 20px;
        margin-right: 20px;
    }
`

export default SearchBar;