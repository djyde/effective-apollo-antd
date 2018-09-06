import * as React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Table from "../chapters/Table";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./apolloClient";

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <div>
          <nav>
            <Link to="/table">Table</Link>
          </nav>

          <div>
            <Switch>
              <Route path="/table" component={Table} />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
