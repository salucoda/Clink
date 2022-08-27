import styled from "styled-components";

const Footer = () => {
    return(
        <MainDiv>
            <h1>Footer</h1>
        </MainDiv>
    )
};

const MainDiv = styled.div`
    display: flex;
    position: fixed;
    z-index: 1;
    bottom: 0;
    width: 100vw;
    flex-direction: row;
    /* border: solid red 2px; */
    height: 5vh;
    background-color: grey;
`
export default Footer;