import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentColorContext = createContext();

export const CurrentColorProvider = ({ children }) => {
    const [currentColor, setCurrentColor] = useState("");

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [toggleFavs, setToggleFavs] = useState(false);
    const [load, setLoad] = useState(null);

    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {

            fetch("/get-saved-recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: user.email})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setSavedRecipes(data.data)
            })
        }
    }, [isAuthenticated, toggleFavs])

    return(
        <CurrentColorContext.Provider value={{ toggleFavs, setToggleFavs, savedRecipes, setSavedRecipes, currentColor, setCurrentColor, load, setLoad }}>
            {children}
        </CurrentColorContext.Provider>
    )
}