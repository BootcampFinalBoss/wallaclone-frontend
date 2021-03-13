import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import flatten from 'flat';

import messages from './messages';
import { useSelector } from 'react-redux';
import { getLocale } from '../store/selectors';

const Provider = ({ children }) => {
  const locale = useSelector((state) => getLocale(state));

  return (
    <IntlProvider
      textComponent={Fragment}
      locale={locale}
      messages={flatten(messages[locale])}>
      {children}
    </IntlProvider>
  );
};

Provider.displayName = 'I18nProvider';

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
