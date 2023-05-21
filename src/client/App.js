import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {MainPage, MealsPage, Page404, SingleMealPage} from '../client/components/pages';

import TestComponent from "./components/TestComponent/TestComponent";
import Header from "./components/header/Header";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";


function App() {

  return (

    <Router>
      <div className="app">
        <Header/>
        <main>
          <Switch>
            <Route exact path="/">
              <MainPage/>
            </Route>

            <Route exact path="/meals">
              <ErrorBoundary>
                <MealsPage/>
              </ErrorBoundary>
            </Route>

            <Route exact path="/meals/:mealId">
              <ErrorBoundary>
                <SingleMealPage/>
              </ErrorBoundary>
            </Route>

            <Route path="*">
                <Page404/>
            </Route>
            
            <Route exact path="/test-component">
              <TestComponent></TestComponent>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
