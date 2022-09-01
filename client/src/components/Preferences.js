import styled from "styled-components";
import Bg from "../assets/bglines.png";
import { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {CgSmile} from "react-icons/cg";
import { CurrentColorContext } from "./CurrentColorContext";
import {IoSparklesSharp} from "react-icons/io5";

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
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
            {confirmed ?
            <div className="updatedDiv">
                <p className="updated">updated! <CgSmile/></p>
            </div>
            :
            <>
                <div>
                    <h2 className="title"><IoSparklesSharp className="sparkle" size={32}/> update your preferences <IoSparklesSharp className="sparkle" size={32}/></h2>
                </div>

                <div className="contentdiv">
                    <div className="halves">
                        <div className="half1">
                            <StyledInputDiv>
                                <label>nickname</label>
                                <StyledInput 
                                type="text"
                                onChange={(e) => handleChange("nickname", e.target.value)}
                                ></StyledInput>
                            </StyledInputDiv>

                            <StyledInputDiv>
                                <label>pronouns</label>
                                <StyledInput 
                                type="text"
                                onChange={(e) => handleChange("pronouns", e.target.value)}
                                ></StyledInput>
                            </StyledInputDiv>

                            <StyledInputDiv>
                                <label>age</label>
                                <StyledInput 
                                type="text"
                                onChange={(e) => handleChange("age", e.target.value)}
                                ></StyledInput>
                            </StyledInputDiv>
                        </div>
                        <div className="half2">
                            <StyledInputDiv>
                                <label>allergies</label>
                                <StyledInput 
                                type="text"
                                onChange={(e) => handleChange("allergy", e.target.value)}
                                ></StyledInput>
                            </StyledInputDiv>

                            <StyledInputDiv>
                                <label>dietary restrictions</label>
                                <StyledInput 
                                type="text"
                                onChange={(e) => handleChange("restriction", e.target.value)}
                                ></StyledInput>
                            </StyledInputDiv>

                            <StyledInputDiv>
                                <label>favourite drink</label>
                                <StyledInput 
                                type="text"
                                onChange={(e) => handleChange("favdrink", e.target.value)}
                                ></StyledInput>
                            </StyledInputDiv>
                        </div>
                    </div>
                    <div className="bio">
                        <label>what brought you here?</label>
                        <textarea 
                        className="textarea"
                        type="text"
                        onChange={(e) => handleChange("bio", e.target.value)}
                        ></textarea>
                    </div>

                    <SubmitButton type="submit">update</SubmitButton>
                </div>
            </>
            }
            </form>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    padding-top: 15vh;
    height: 85vh;
    background-color: var(--color-red);
    display: flex;
    justify-content: center;
    font-family: var(--font-body);
    font-size: 16px;

    .png{
        transform: rotate(90deg);
        width: 900px;
        height: 2453.6px;
        margin-top: -854px;
        margin-left: 18px;
        position: fixed;
    }

    .form{
        z-index: 100;
        border: solid black 7px;
        padding: 10px;
        height: 430px;
        width: 700px;
        opacity: 0.9;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 180px;
        margin-left: -30px;
    }

    .title{
    font-size: 35px;
    font-family: var(--font-header-option-two);
    color: black;
    margin-top: 15px;
    }

    .contentdiv{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 10px;
    width: 500px;
    }

    .bio{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 500px;
        margin-top: 15px;
    }

    label{
        margin-bottom: 7px;
        color: black;
        font-weight: bold;
    }

    .halves{
        display: flex;
        justify-content: space-evenly;
        width: 500px;
    }

    .half1{
        margin-right: 30px;
    }

    .textarea{
        resize: none;
        background-color: var(--color-red);
        border: solid 1px black;
        width: 400px;
        height: 50px;
        border-radius: 18px;
        font-size: 15px;
        font-family: var(--font-body);
        line-height: 18px;

        &:focus{
            outline: none;
        }
    }

    .updatedDiv{
        margin-top: 190px;
        font-size: 40px;
        font-family: var(--font-header-option-two);
    }
`

const StyledInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;

`

const StyledInput = styled.input`
    width: 250px;
    background-color: var(--color-red);
    border: black solid 1px;
    height: 25px;
    font-family: var(--font-body);
    font-size: 13px;
    border-radius: 10px;

    &:focus{
        outline: none;
    }
`

const SubmitButton = styled.button`
    margin-top: 15px;
    margin-right: 200px;
    padding: 7px;
    width: 100px;
    height: 35px;
    font-family: var(--font-body);
    border-radius: 30px;
    color: var(--color-red);
    background-color: black;
    font-weight: bold;

    &:hover{
        cursor: pointer;
        background-color: var(--color-red);
        border: solid 2px black;
        color: black;
    }
`
export default Preferences;