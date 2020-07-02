import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../container/Home";
import Layout from "../container/Layout";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
