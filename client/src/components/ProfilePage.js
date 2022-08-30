import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(user)
    return(
        <MainDiv>
            {isAuthenticated &&
            <>
                {/* <img src={user.picture} alt="display" /> */}
                <p>name: {user.name}</p>
                <p>email: {user.email}</p>
                <p>allergies:</p>
                <p>dietary restrictions: </p>
            </>
            }
        </MainDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 15vh;
    height: 85vh;
    background-color: var(--color-pink);
`

export default ProfilePage;