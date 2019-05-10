import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
