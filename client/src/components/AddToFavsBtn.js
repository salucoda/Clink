import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentColorContext } from "./CurrentColorContext";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const AddToFavsBtn = ({ id, name, image }) => {
    const [loadingBtnAdd, setLoadingBtnAdd] = useState(false)
    const [loadingBtnRemove, setLoadingBtnRemove] = useState(false)
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { savedRecipes, toggleFavs, setToggleFavs } = useContext(CurrentColorContext);

    const existingRecipe = savedRecipes.filter((recipe) => {
        return recipe.id === id
    })

    const addToFav = () => {
        setLoadingBtnRemove(false)
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
            setLoadingBtnAdd(true)
        })
        .catch(err => console.log(err))
    }

    const removeFromFav = () => {
        setLoadingBtnAdd(false)
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
            setLoadingBtnRemove(true)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        {isAuthenticated &&
        existingRecipe.length ?
        
        <StyledBtn onClick={removeFromFav}>
            {loadingBtnRemove === true ?
            <>
            <CircularProgress size={20}/>
            </>
            :
            <>
            remove from favs
            </>}
        </StyledBtn>
        :
        isAuthenticated &&

        <StyledBtn onClick={addToFav}>
            {loadingBtnAdd === true ?
            <>
            <CircularProgress size={20}/>
            </>
            :
            <>
            add to favs
            </>}
        </StyledBtn>
        }
        </>
    )
}

const StyledBtn = styled.button`
    margin-top: 20px;
    width: 150px;
    height: 35px;
    font-family: var(--font-body);
    border-radius: 30px;
    font-weight: bold;
    background-color: black;
    color: var(--color-green);
    
    &:hover{
        background-color: var(--color-green);
        color: black;
        border: solid 2px black;
        cursor: pointer;
    }
`
export default AddToFavsBtn;