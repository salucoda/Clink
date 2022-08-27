import styled from "styled-components";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import {BsSearch} from "react-icons/bs";
import { NavLink } from "react-router-dom";
//set up error catch
const SearchBar = () => {
    const [value, setValue] = useState("");
    const [recipes, setRecipes] = useState(null);
    const [error, setError ] = useState(false);

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
                    let goodRecipes = response.results.filter((recipe) => {
                    return recipe.sections.length <= 1
                });
                setRecipes(goodRecipes)
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
        <StyledDiv>
        <input
            className='inputTag'
            type='text'
            placeholder="Enter an ingredient..."
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                    handleSearch();
                }
            }}
            />
            <StyledSearchIcon />
            <div>

                {recipes && recipes.map((recipe) => {
                    return (
                        <NavigationLink to={`/recipe/${recipe.id}`}>
                            <RecipeCard name={recipe.name} image={recipe.thumbnail_url} description={recipe.description}/>
                        </NavigationLink>
                    )
                })}
            </div>
        </StyledDiv>
        </>
    )
}
const StyledDiv = styled.div`
    .inputTag{
        border: lightgray solid 1px;
        border-radius: 2px;
        height: 32px;
        width: 250px;
        padding: 10px;

        &:focus {
            outline: rgb(1 75 247 / 37%) solid 2px;
        }

    } `

// const StyledResults = styled.div`
//     margin-top: 5px;
//     width: 300px;
//     height: 200px;
//     background-color: rgb(255, 255, 255 / 37%);
//     box-shadow: rgb(0,0,0,0.35) 0px 5px 15px;
//     overflow: hidden;
//     overflow-y: auto;

//     &::-webkit-scrollbar {
//         display: none;
//     }
// `


const StyledSearchIcon = styled(BsSearch)`
    padding:0.7vw;
    position: relative;
    left: -2.5vw;
    top:1.6vh;
`
const NavigationLink = styled(NavLink)`
    text-decoration: none;
`
export default SearchBar;