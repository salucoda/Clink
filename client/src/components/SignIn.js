import styled from "styled-components";
import LoginButton from "./login";
import LogoutButton from "./logout";

const SignIn = () => {
    return(
        <MainDiv>
            <h1>hi from SignIn</h1>
            <LoginButton />
            <LogoutButton />
        </MainDiv>
    )
}

const MainDiv = styled.div`
    margin-top: 20vh;
`

export default SignIn;