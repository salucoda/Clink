import styled from "styled-components";
import { NavLink } from "react-router-dom";

const RecipeCard = ({ name, image, id }) => {
    return(
        <NavigationLink to={`/recipe/${id}`}>
            <StyledCard>
                <img className="img" src={image} alt="drink"/>
                <p className="name">{name}</p>
            </StyledCard>
        </NavigationLink>
    )
}

const StyledCard = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    width: 10vw;

    .img{
        width: 200px;
        height: 200px;
        border-radius: 20px;
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
const NavigationLink = styled(NavLink)`
    text-decoration: none;
`
export default RecipeCard;