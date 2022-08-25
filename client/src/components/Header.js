import styled from "styled-components";
import { NavLink } from "react-router-dom"

const Header = () => {
    return(
        <div>
            <NavLink to="/">
                <div>Find a recipe</div>
            </NavLink>

            <NavLink to="/saved-recipes">
                <div>Saved recipes</div>
            </NavLink>

            <NavLink to="/sign-in">
                <div>Sign in</div>
            </NavLink>
        </div>
    )
}

export default Header;