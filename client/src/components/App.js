import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Header from "./Header";
import RecipeDetails from "./RecipeDetails";
import SearchPage from "./SearchPage";
import SavedRecipes from "./SavedRecipes";
import ProfilePage from "./ProfilePage";
import Footer from "./Footer";
import Preferences from "./Preferences";

const App = () => {

    return (
      <div>
        <GlobalStyles />
        <Router>
        <Header />
        <Switch>

          <Route exact path="/">
            <SearchPage />
          </Route>

          <Route exact path="/profile">
            <ProfilePage />
          </Route>

          <Route exact path="/saved-recipes">
            <SavedRecipes />
          </Route>

          <Route exact path="/preferences">
            <Preferences />
          </Route>

          <Route exact path="/recipe/:recipeId">
            <RecipeDetails />
          </Route>
          
        </Switch>
        {/* <Footer /> */}
        </Router>
      </div>
    )
}

export default App;
