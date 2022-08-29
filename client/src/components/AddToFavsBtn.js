import styled from "styled-components";
import { useEffect, useState } from "react";
// ask about toggle, usecontext
const AddToFavsBtn = ({ id, name, image }) => {
    const [fav, setFav] = useState(false);

    const addToFav = () => {
        fetch("/add-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id, name: name, image: image})
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            setFav(true)
        })
        .catch(err => console.log(err))
    }

    const removeFromFav = () => {
        fetch(`/remove-recipe/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            setFav(false)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        {fav ?
        <button onClick={removeFromFav}>Remove from Favorites</button>
        :

        <button onClick={addToFav}>Add to Favorites</button>
        }
        </>
    )
}

export default AddToFavsBtn;