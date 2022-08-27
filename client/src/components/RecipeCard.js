import styled from "styled-components";

const RecipeCard = ({ name, image, description }) => {
    return(
        <StyledCard>
            <img src={image} alt="drink"/>
            <p>{name}</p>
        </StyledCard>
    )
}

const StyledCard = styled.div`
    border: solid 1px orange;
    padding: 40px;
    display: flex;
    flex-direction: column;
    width: 10vw;

    img{
        width: 200px;
        border-radius: 15px;
    }
`
export default RecipeCard;