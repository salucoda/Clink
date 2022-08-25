import styled from "styled-components";
import LoginButton from "./login";
import LogoutButton from "./logout";

const SignIn = () => {
    return(
        <div>
            <h1>hi from SignIn</h1>
            <LoginButton />
            <LogoutButton />
        </div>
    )
}
export default SignIn;