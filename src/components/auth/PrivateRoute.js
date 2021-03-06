import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { getLoggedUserToken } from '../../store/selectors';

const PrivateRoute = ({ ...props }) => {
  const token = useSelector((state) => getLoggedUserToken(state));
  const location = useLocation();
  return token ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
