import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

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

{/* test */}
            {isAuthenticated && (
                <div>
                    <h2> Hello {user.name}</h2>
                </div>
            )}
        </div>
    )
}

export default Header;