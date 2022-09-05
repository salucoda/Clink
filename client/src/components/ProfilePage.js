import styled from "styled-components";
import Mountain from "../assets/mountain2.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import { CurrentColorContext } from "./CurrentColorContext";
import Me from "../assets/MePurp (2).jpg";
import CircularProgress from "@mui/material/CircularProgress";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const { setCurrentColor } = useContext(CurrentColorContext);

    useEffect(() => {
        setCurrentColor("#f5c6dc");
    }, []);

    useEffect(() => {
        if (isAuthenticated && user){
            fetch(`/get-user-info/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserInfo(data.data.user)
                setLoading(false);
            })
        }
    }, [isAuthenticated])

    return(
        userInfo && 
        loading === false ?
        <MainDiv>
            <img className="png" src={Mountain} />

            {isAuthenticated &&
                <>
                    <img className="img" src={Me} alt="profile"/>

                    <div className="forminfo">
                        <div className="namePronoun">
                            <h2 className="name">{user.name}</h2>

                            {userInfo.pronouns !== "" &&
                            <p className="pronoun"> • {userInfo.pronouns}</p>
                            }
                            {userInfo.age !== "" &&
                            <p className="pronoun"> • {userInfo.age}</p>
                            }

                        </div>

                        <div className="favdiv">
                            {userInfo.nickname !== "" &&
                            <p className="fav">{userInfo.nickname}, </p>}

                            {userInfo.favdrink !== "" && 
                            <span className="fav">{userInfo.favdrink} lover</span>}
                        </div>

                            <div className="allergydiv">
                                {userInfo.restriction !== "" &&
                                <p><span className="span">dietary restriction/s:</span> {userInfo.restriction}</p>
                                }

                                {userInfo.allergy !== "" &&
                                <p><span className="span">allergies:</span> {userInfo.allergy}</p>
                                }
                            </div>

                        <div className="container">
                            {userInfo.bio !== "" &&
                            <p>"{userInfo.bio}"</p>
                            }
                        </div>
                    </div>
                </>
            }
        </MainDiv>
        : loading === true &&
        <LoadingDiv>
            <CircularProgress/>
        </LoadingDiv>
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
        border: solid 2px black;
        width: 600px;
        height: 250px;
        z-index: 100;
        margin-top: -480px;
        margin-left: 900px; 
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
    
    .img{
        z-index:100;
        width: 150px;
        border: solid 15px var(--color-pink);
        outline: black 2px solid;
        margin-left: -430px;
        margin-bottom: 250px;
    }

    .namePronoun{
        display: flex;
        padding: 10px;
    }

    .name{
        font-family: var(--font-header-option-one);
        font-size: 30px;
    }

    .pronoun{
        margin-top: 15px;
        margin-left: 10px;
        font-family: var(--font-body);
        font-size: 15px;
    }

    .fav{
        margin-left: 10px;
        margin-top: -10px;
        font-family: var(--font-body);
        font-size: 14px;
    }
    
    .favdiv{
        display: flex;
    }

    .span{
        /* font-weight: bold; */
        text-decoration: underline;
    }

    .allergydiv{
        font-family: var(--font-body);
        font-size: 14px;
        margin-left: 10px;
        margin-top: 15px;
        margin-bottom: 30px;
    }

    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        font-family: var(--font-body);
        text-align: center;
        font-weight: bold;
        margin-top: 10px;
    }
`
const LoadingDiv = styled.div`
    padding-top: 50vh;
    height: 50vh;
    padding-left: 50vw;
    background-color: var(--color-pink);
`
export default ProfilePage;