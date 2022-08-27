import styled from "styled-components";
import SearchBar from "./SearchBar";

const SearchPage = () => {
    return(
        <MainDiv>
            <h1>hi from SearchPage</h1>
            <SearchBar />
        </MainDiv>
    )
}

const MainDiv = styled.div`
    height: 50vh;
`
export default SearchPage;