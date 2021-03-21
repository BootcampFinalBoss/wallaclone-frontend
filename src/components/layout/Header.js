import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Menu,
  Button,
  Icon,
  Image,
  Dropdown,
  Header as Logo,
} from 'semantic-ui-react';
import { getLoggedUser } from '../../store/selectors';
import { authLogout, loadLang } from '../../store/actions';
import { useHistory } from 'react-router';
import translate from '../../intl/translate';
import { LOCALES } from '../../intl';
import { Link } from 'react-router-dom';

const userOptions = (userData) => {
  return {
    key: userData.username,
    text: userData.username,
    value: userData.username,
    image: { avatar: true, src: '/logo192.png' },
  };
};

const Header = () => {
  const dispatch = useDispatch();
  const [menuActiveItem, setMenuActiveItem] = useState('');
  const userData = useSelector((state) => getLoggedUser(state));
  const history = useHistory();

  const handleChangeLocale = (newLocale) => {
    dispatch(loadLang(newLocale));
  };

  const handleItemClick = (e, { name }) => setMenuActiveItem(name);

  return (
    <Menu stackable>
      <Menu.Item>
        <Link to="/">
          <Logo as="h4">
            <Image circular src="/logo192.png" /> Wallaclone
          </Logo>
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          onClick={() => handleChangeLocale(LOCALES.ENGLISH)}
          name={LOCALES.ENGLISH}
          active={menuActiveItem === LOCALES.ENGLISH}
          color="teal"></Menu.Item>
        <Menu.Item
          onClick={() => handleChangeLocale(LOCALES.SPANISH)}
          name={LOCALES.SPANISH}
          active={menuActiveItem === LOCALES.SPANISH}
          color="teal"></Menu.Item>
        {userData && userData.token ? (
          <PrivateHeader
            menuActiveItem={menuActiveItem}
            handleItemClick={handleItemClick}
            loggedUser={userData}
            history={history}
          />
        ) : (
          <PublicHeader
            menuActiveItem={menuActiveItem}
            handleItemClick={handleItemClick}
          />
        )}
      </Menu.Menu>
    </Menu>
  );
};

const PublicHeader = ({ menuActiveItem, handleItemClick }) => {
  return (
    <>
      <Menu.Item
        name="register"
        active={menuActiveItem === 'register'}
        onClick={handleItemClick}
        color="teal">
        <Link to={'/register'}>{translate('menu.register')}</Link>
      </Menu.Item>

      <Menu.Item
        href="/login"
        name="login"
        active={menuActiveItem === 'login'}
        onClick={handleItemClick}>
        <Button icon color="teal">
          <Icon name="user circle" />
          Login
        </Button>
      </Menu.Item>
    </>
  );
};

PublicHeader.propTypes = {
  menuActiveItem: PropTypes.string,
  handleItemClick: PropTypes.func.isRequired,
};

const PrivateHeader = ({
  menuActiveItem,
  handleItemClick,
  loggedUser,
  history,
}) => {
  const dispatch = useDispatch();
  const username = loggedUser.username;
  const handleLogout = () => {
    dispatch(authLogout());
  };
  const goToMyProfile = () => {
    history.push(`/profile/${username}`);
  };

  return (
    <>
      <Menu.Item
        name="advertsNew"
        active={menuActiveItem === 'advertsNew'}
        onClick={handleItemClick}
        color="teal">
        <Link to={'/adverts/new'}>{translate('menu.createAdvert')}</Link>
      </Menu.Item>
      <Menu.Item>
        <Dropdown
          inline
          text={userOptions(loggedUser).text}
          defaultValue={userOptions(loggedUser).value}>
          <Dropdown.Menu>
            <Dropdown.Item
              icon="user"
              text={translate('menu.myProfile')}
              onClick={goToMyProfile}></Dropdown.Item>
            <Dropdown.Item
              icon="power off"
              text={translate('menu.logout')}
              onClick={handleLogout}></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
};

PrivateHeader.propTypes = {
  menuActiveItem: PropTypes.string,
  handleItemClick: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  history: PropTypes.any,
};

export default Header;
