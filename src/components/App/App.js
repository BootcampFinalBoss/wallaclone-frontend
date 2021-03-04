import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import {
  PrivateRoute,
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
} from "../auth";
// import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import NotFoundPage from "./NotFoundPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AdvertsContainer from "../adverts/AdvertsContainer";

const App = () => {
  const history = useHistory();
  let HideHeader = history.location.pathname !== "/login" ? <Header /> : null;
  console.log(HideHeader);
  let HideFooter = history.location.pathname !== "/login" ? <Footer /> : null;
  return (
    <>
      {HideHeader}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/register" exact component={RegisterPage}></Route>
        <Route path="/login" exact>
          {(routerProps) => <LoginPage {...routerProps} />}
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/adverts" exact>
          <AdvertsContainer />
        </Route>
        {/* <PrivateRoute path="/adverts/new" exact component={NewAdvertPage} />
        <PrivateRoute path="/adverts/:id" exact component={AdvertPage} /> */}
        <Route path="/404" exact>
          {NotFoundPage}
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
      {HideFooter}
    </>
  );
};

export default App;
