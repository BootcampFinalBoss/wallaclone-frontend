import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

import {
  PrivateRoute,
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPassword,
} from '../auth';
import {
  AdvertsContainer,
  AdvertsNew,
  AdvertPage,
  AdvertsEdit,
} from '../adverts';
import { UserProfile, UserEdit, UserAdverts } from '../users';
// import { AdvertsContainer, AdvertsNew, AdvertPage } from '../adverts';
import NotFoundPage from '../errors/NotFoundPage';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Content } from 'antd/lib/layout/layout';
import CommonErrorPage from '../errors/CommonErrorPage';

const App = () => {
  const location = useLocation();
  const ui = useSelector((state) => getUi(state));
  const history = useHistory();
  let HideHeader = location.pathname.match('/login') ? null : <Header />;
  let HideFooter = location.pathname.match('/login') ? null : <Footer />;

  useEffect(() => {
    if (ui.error?.code === 500) {
      history.push('/error');
    }
  }, [ui]);

  return (
    <>
      {HideHeader}
      <Content>
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
          <Route path="/profile/:username">
            <UserProfile />
          </Route>
          <Route path="/adverts" exact>
            <AdvertsContainer />
          </Route>
          <Route path="/reset/:id">
            <ResetPassword />
          </Route>
          <Route path="/user-edit/:id">
            {(routerProps) => <UserEdit {...routerProps} />}
          </Route>
          <PrivateRoute path="/adverts/new" exact component={AdvertsNew} />
          <PrivateRoute path="/adverts/edit/:id" exact>
            {(routerProps) => (
              <AdvertsEdit history={history} {...routerProps} />
            )}
          </PrivateRoute>
          <Route path="/adverts/:nameId" exact>
            {(routerProps) => <AdvertPage history={history} {...routerProps} />}
          </Route>
          <Route path="/error" exact>
            {CommonErrorPage}
          </Route>
          <Route path="/404" exact>
            <NotFoundPage ui={ui} history={history} />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Content>
      {HideFooter}
    </>
  );
};

export default App;
