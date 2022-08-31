import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user){
            fetch(`/get-user-info/${user.email}`)
            .then(res => res.json())
            .then(data => setUserInfo(data.data.user))
        }
    }, [isAuthenticated])

    if(userInfo){
        console.log(userInfo)
    }
    return(
        userInfo &&
        <MainDiv>
            {isAuthenticated &&
            <div className="forminfo">
                <p>nickname: {userInfo.nickname}</p>
                <p>email: {user.email}</p>
                <p>age: {userInfo.age}</p>
                {/* {userInfo.allergy !== "" && */}
                <p>allergies: {userInfo.allergy}</p>
                {/* } */}
                <p>pronouns: {userInfo.pronouns}</p>
                <p>dietary restrictions: {userInfo.restriction}</p>
                <p>{userInfo.bio}</p>
                <p>Favourite drink: {userInfo.favdrink}</p>
            </div>
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