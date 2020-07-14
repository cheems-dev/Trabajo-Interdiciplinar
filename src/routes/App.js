import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../container/Home";
import Layout from "../container/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import ContentFile from "../container/ContentFile";
import NotFound from "../container/NotFound";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/content" component={ContentFile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
