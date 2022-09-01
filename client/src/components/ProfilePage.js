import styled from "styled-components";
import Mountain from "../assets/mountain2.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import { CurrentColorContext } from "./CurrentColorContext";
import {IoSparklesSharp} from "react-icons/io5";
import {BsPersonCircle} from "react-icons/bs";
import Me from "../assets/MePurp (2).jpg";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userInfo, setUserInfo] = useState(null);
    const { setCurrentColor } = useContext(CurrentColorContext);

    useEffect(() => {
        setCurrentColor("#f5c6dc");
    }, []);

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
console.log(user)
    return(
        userInfo &&
        <MainDiv>
            <img className="png" src={Mountain} />
            {/* <IoSparklesSharp size={100}/> */}

            {isAuthenticated &&
                <>
                    <img className="img" src={Me} alt="profile"/>

                    <div className="forminfo">
                        <h2>{user.name}</h2>

                        {userInfo.nickname !== "" &&
                        <p>nickname: {userInfo.nickname}</p>
                        }

                        <p>email: {user.email}</p>

                        {userInfo.age !== "" &&
                        <p>age: {userInfo.age}</p>
                        }

                        {userInfo.allergy !== "" &&
                        <p>allergies: {userInfo.allergy}</p>
                        }

                        {userInfo.pronouns !== "" &&
                        <p>pronouns: {userInfo.pronouns}</p>
                        }

                        {userInfo.restriction !== "" &&
                        <p>dietary restrictions: {userInfo.restriction}</p>
                        }

                        {userInfo.bio !== "" &&
                        <p>{userInfo.bio}</p>
                        }

                        {userInfo.favdrink !== "" &&
                        <p>Favourite drink: {userInfo.favdrink}</p>
                        }
                    </div>
                </>
            }
        </MainDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 15vh;
    height: 85vh;
    background-color: var(--color-pink);

    .png{
        border-radius: 100%;
        width: 700px;
        border: 2px solid black;
        margin-left: 50px;
    }

    .forminfo{
        border: solid 1px black;
        width: 600px;
        height: 700px;
        z-index: 100;
        margin-top: -700px;
        margin-left: 900px; 
    }
    
    .img{
        z-index:100;
        width: 150px;
        /* border-radius: 100px; */
        border: solid 15px var(--color-pink);
        outline: black 2px solid;
        margin-left: -430px;
        margin-bottom: 250px;
    }
`

export default ProfilePage;