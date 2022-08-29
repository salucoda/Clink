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

            <div className="everythingelse">
                <div className="links">

                    <NavLink to="/">
                        <StyledButton>find a recipe</StyledButton>
                    </NavLink>

                    {isAuthenticated ?
                    <NavLink to="/saved-recipes">
                        <StyledButton>saved recipes</StyledButton>
                    </NavLink>
                    :
                    <NavLink to="/sign-in">
                        <StyledButton>saved recipes</StyledButton>
                    </NavLink>
                    }

                    <NavLink to="/sign-in">
                        {isAuthenticated ?
                        <StyledButton>sign out</StyledButton>
                        : <StyledButton>sign in</StyledButton>
                        }
                    </NavLink>

                </div>

                {isAuthenticated && (
                    <div>
                        <p className="hello"> hello, {user.name.split(" ")[0]}</p>
                    </div>
                )}
            </div>
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
    background-color: black; 
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
        padding-left: 130px;
        text-decoration: none;
        color: #f9cc67;
        font-style: italic;
    }

    .hello{
        color: #f9cc67;
        font-family: var(--font-header-option-one);
        padding-right: 100px;
        font-size: 26px;
        font-style: italic;
    }

    .everythingelse{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100vw;
        
    }

    .links{
        padding-right: 50px;
        display: flex;
        gap: 12px;
    }
`
const StyledButton = styled.button`
    font-family: var(--font-body);
    color: #f9cc67;
    border: 2px solid #f9cc67;
    padding: 7px 9px;
    border-radius: 30px;
    width: 140px;
    font-size: 14px;
    background-color: transparent;

    &:hover{
        cursor: pointer;
        background-color: #f9cc67;
        color: black;
    }
`
export default Header;