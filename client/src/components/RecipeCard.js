import styled from "styled-components";

const RecipeCard = ({ name, image, description }) => {
    return(
        <StyledCard>
            <img className="img" src={image} alt="drink"/>
            <p className="name">{name}</p>
        </StyledCard>
    )
}

const StyledCard = styled.div`
    /* border: solid 1px orange; */
    padding: 40px;
    display: flex;
    flex-direction: column;
    width: 10vw;

    .img{
        width: 200px;
        border-radius: 15px;
    }

    .name{
        font-family: var(--font-body);
        color: black;
        font-weight: bold;
        text-align: center;
        font-size: 18px;
        padding-top: 15px;
    }
`
export default RecipeCard;