import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/mealsList/MealsList";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

function App() {

  return (

    <Router>

      <Route exact path="/">
        <h1>Meal sharing</h1>
        <Link to="/meals"><button>Meals</button></Link>
      </Route>

      <Route exact path="/meals">
        <ErrorBoundary>
          <MealsList/>
        </ErrorBoundary>
        
      </Route>
      
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
