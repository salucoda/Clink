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
    flex-direction: row;
    border: solid red 2px;
    height: 10vh;
`
export default Footer;