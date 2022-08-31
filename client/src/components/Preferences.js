import styled from "styled-components";
import Bg from "../assets/bglines.png";
import { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {CgSmile} from "react-icons/cg";
import { CurrentColorContext } from "./CurrentColorContext";

const Preferences = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [confirmed, setConfirmed] = useState(false);
    const [formData, setFormData] = useState({});
    const { setCurrentColor } = useContext(CurrentColorContext);

    useEffect(() => {
        setCurrentColor("#f1a198");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = {...formData, email: user.email}

        fetch("/add-preferences", {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(form)
        })
        .then((res) => res.json())
        .then((json) => setConfirmed(true));
    };

    const handleChange = (key, value) => {
        setFormData({...formData, [key]: value});
    };

    return(
        <MainDiv>
            <img className="png" src={Bg} alt="map topography"/>
            {confirmed ?
            <>
            <p>Updated! <CgSmile/></p>
            </>
            :
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h1>Update your preferences</h1>
                </div>

                <div>
                    <label>nickname</label>
                    <input 
                    type="text"
                    onChange={(e) => handleChange("nickname", e.target.value)}
                    ></input>
                </div>

                <div>
                    <label>pronouns</label>
                    <input 
                    type="text"
                    onChange={(e) => handleChange("pronouns", e.target.value)}
                    ></input>
                </div>

                <div>
                    <label>age</label>
                    <input 
                    type="text"
                    onChange={(e) => handleChange("age", e.target.value)}
                    ></input>
                </div>

                <div>
                    <label>tell us about yourself/ your reasons for using our app</label>
                    <input 
                    type="text"
                    onChange={(e) => handleChange("bio", e.target.value)}
                    ></input>
                </div>

                <div>
                    <label>allergies</label>
                    <input 
                    type="text"
                    onChange={(e) => handleChange("allergy", e.target.value)}
                    ></input>
                </div>

                <div>
                    <label>dietary restrictions</label>
                    <input 
                    type="text"
                    onChange={(e) => handleChange("restriction", e.target.value)}
                    ></input>
                </div>

                <div>
                    <label>favourite drink?</label>
                    <input 
                    type="text"
                    onChange={(e) => handleChange("favdrink", e.target.value)}
                    ></input>
                </div>

                <button type="submit">update</button>
            </form>
            }
        </MainDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 15vh;
    height: 85vh;
    background-color: var(--color-red);
    display: flex;
    justify-content: center;

    .png{
        transform: rotate(90deg);
        width: 900px;
        height: 2453.6px;
        margin-top: -854px;
        margin-left: 18px;
    }

    .form{
        z-index: 100;
        border: solid black 3px;
        border-radius: 40px;
        padding: 20px;
        height: 500px;
        background-color: var(--color-red);
    }
`
export default Preferences;