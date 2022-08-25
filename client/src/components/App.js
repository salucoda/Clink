import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import SideBar from "./SideBar";
import RecipeDetails from "./RecipeDetails";
import SearchPage from "./SearchPage";
import SavedRecipes from "./SavedRecipes";
import SignIn from "./SignIn";

const App = () => {

    return (
      <div>
        <GlobalStyles />
        <Router>
        <SideBar />
        <Switch>

          <Route exact path="/">
            <SearchPage />
          </Route>

          <Route exact path="/sign-in">
            <SignIn />
          </Route>

          <Route exact path="/saved-recipes">
            <SavedRecipes />
          </Route>

          <Route exact path="/recipe/:recipeId">
            <RecipeDetails />
          </Route>
          
        </Switch>
        </Router>
      </div>
    )
}

export default App;
