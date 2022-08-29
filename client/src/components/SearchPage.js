import styled from "styled-components";
import SearchBar from "./SearchBar";

const SearchPage = () => {
    return(
        <MainDiv>
            <SearchBar />
        </MainDiv>
    )
}

const MainDiv = styled.div`
    background-color: var(--color-yellow);
    height: 100vh;
`
export default SearchPage;