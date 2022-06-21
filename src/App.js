import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";


import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <main>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home"></Redirect>
            </Route>

            <Route path="/home">
              <Home></Home>
            </Route>
            
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Layout>
      </main>
    </div>
  );
};

export default App;
