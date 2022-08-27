import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {GiMartini} from "react-icons/gi";


const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        console.log("useEffect")
        if(isAuthenticated){
            fetch("/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user})
            })
            .then((res) => res.json())
            .then(data => console.log(data))
        }
    }, [isAuthenticated])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <MainDiv>
            <div className="logo">
                <GiMartini size={100}/>
                <h1>CLINK</h1>
            </div>
            <NavLink to="/">
                <div>Find a recipe</div>
            </NavLink>

            <NavLink to="/saved-recipes">
                <div>Saved recipes</div>
            </NavLink>

            <NavLink to="/sign-in">
                <div>Sign in</div>
            </NavLink>

            {isAuthenticated && (
                <div>
                    <h2> Hello {user.name}</h2>
                </div>
            )}
        </MainDiv>
    )
}

const MainDiv = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    width: 100vw;
    flex-direction: row;
    height: 10vh;
    background-color: white; 
    z-index: 100;
`
export default Header;