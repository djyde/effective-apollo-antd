import * as React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./apolloClient";

import Table from "../chapters/Table";
import TableLimit from "../chapters/Table/limit";
import TableCreate from "../chapters/Table/create";
import TablePagination from "../chapters/Table/pagination";

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <div>
          <div>
            <Switch>
              <Route exact path="/table" component={Table} />
              <Route exact path="/table/limit" component={TableLimit} />
              <Route exact path="/table/create" component={TableCreate} />
              <Route
                exact
                path="/table/pagination"
                component={TablePagination}
              />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
