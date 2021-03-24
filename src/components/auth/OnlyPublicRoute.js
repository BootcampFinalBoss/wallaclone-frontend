/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { getLoggedUser } from '../../store/selectors';

const OnlyPublicRoute = ({ ...props }) => {
  const auth = useSelector((state) => getLoggedUser(state));
  const location = useLocation();
  return auth?.token ? (
    <Redirect to={{ pathname: '/adverts', state: { from: location } }} />
  ) : (
    <Route {...props}>{props.children}</Route>
  );
};

export default OnlyPublicRoute;
