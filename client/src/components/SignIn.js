import styled from "styled-components";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return(
        <MainDiv>
            <h1>hi from SignIn</h1>
            {isAuthenticated ?
            <>
            <p>Thanks for stopping by!</p>
            <LogoutButton />
            </>
            : 
            <>
            <p>Please log in to gain access to our entire site.</p>
            <LoginButton />
            </>
            }
        </MainDiv>
    )
}

const MainDiv = styled.div`
    margin-top: 20vh;
`

export default SignIn;