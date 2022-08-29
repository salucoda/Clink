import styled from "styled-components";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return(
        <MainDiv>
            
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
    padding-top: 15vh;
    height: 85vh;
    background-color: var(--color-red);
`

export default SignIn;