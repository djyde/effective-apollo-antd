import * as React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Table from "../chapters/Table";

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
