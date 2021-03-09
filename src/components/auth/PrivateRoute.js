/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { getLoggedUser } from '../../store/selectors';

const PrivateRoute = ({ ...props }) => {
  const { token } = useSelector((state) => getLoggedUser(state));
  const location = useLocation();
  return token ? (
    <Route {...props}>{props.children}</Route>
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
