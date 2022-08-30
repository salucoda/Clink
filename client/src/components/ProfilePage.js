import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return(
        <MainDiv>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 15vh;
    height: 85vh;
    background-color: var(--color-red);
`

export default ProfilePage;