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
    background-color: #f9cc67; 
    height: 100vh;
`
export default SearchPage;