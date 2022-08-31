import { useEffect, useContext } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { CurrentColorContext } from "./CurrentColorContext";

const SearchPage = () => {
    const { setCurrentColor } = useContext(CurrentColorContext);

    useEffect(() => {
        setCurrentColor("#f9cc67");
    }, [])

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