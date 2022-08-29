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
            <NavLink to="/" className="logos">
                <h1 className="logoname1">CL</h1>
                <GiMartini size={45}/>
                <h1 className="logoname2">NK</h1>
            </NavLink>

            <div className="links">
                <NavLink to="/">
                    <p>Find a recipe</p>
                </NavLink>

                <NavLink to="/saved-recipes">
                    <p>Saved recipes</p>
                </NavLink>

                <NavLink to="/sign-in">
                    {isAuthenticated ?
                    <p>Sign out</p>
                    : <p>Sign in</p>
                    }
                </NavLink>
            </div>

            {isAuthenticated && (
                <div>
                    <p> Hello, {user.name}</p>
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

    .logoname1{
        font-family: var(--font-header-option-two);
        font-size: 50px;
        margin-right: -8px;
        margin-top: 9px;
    }

    .logoname2{
        font-family: var(--font-header-option-two);
        font-size: 50px;
        margin-left: -5px;
        margin-top: 9px;
    }

    .logos{
        display: flex;
        align-items: center;
        padding-left: 70px;
        text-decoration: none;
        color: black;
    }

`
export default Header;