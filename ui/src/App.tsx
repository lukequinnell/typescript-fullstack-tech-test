import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { CreateRecipe } from './pages/CreateRecipe/CreateRecipe';

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create-recipe" component={CreateRecipe} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
