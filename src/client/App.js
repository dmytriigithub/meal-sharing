import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/mealsList/MealsList";

function App() {

  return (

    <Router>

      <Route exact path="/">
        <h1>Meal sharing</h1>
        <Link to="/meals"><button>Meals</button></Link>
      </Route>

      <Route exact path="/meals">
        <MealsList/>
      </Route>
      
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
