import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ItemDetail from "./components/ItemDetail";
import NotFound from "./components/NotFound";
import SignIn from "./components/SignIn";
import VerifyToken from "./components/VerifyToken";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/image/:id" component={ItemDetail} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/verify" component={VerifyToken} />
            <Route exact path="/login" component={Login} />

            <Route component={NotFound} />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
