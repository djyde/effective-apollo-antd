import * as React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./apolloClient";

import Table from "../chapters/Table";
import TableLimit from "../chapters/Table/limit";

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <div>
          <div>
            <Switch>
              <Route exact path="/table" component={Table} />
              <Route exact path="/table/limit" component={TableLimit} />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
