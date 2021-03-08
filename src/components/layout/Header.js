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
import { authLogout } from '../../store/actions';
import { useHistory } from 'react-router';

const userOptions = (userData) => {
  return {
    key: userData.username,
    text: userData.username,
    value: userData.username,
    image: { avatar: true, src: '/logo192.png' },
  };
};

const Header = () => {
  const [menuActiveItem, setMenuActiveItem] = useState('');
  const userData = useSelector((state) => getLoggedUser(state));
  const history = useHistory();

  const handleItemClick = (e, { name }) => setMenuActiveItem(name);

  return (
    <Menu stackable>
      <Menu.Item href="/">
        <Logo as="h4">
          <Image circular src="/logo192.png" /> Wallaclone
        </Logo>
      </Menu.Item>
      <Menu.Menu position="right">
        {userData ? (
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
        href="/register"
        name="register"
        active={menuActiveItem === 'register'}
        onClick={handleItemClick}
        color="teal">
        Registro
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
  const handleLogout = () => {
    dispatch(authLogout());
  };
  const goToMyProfile = () => {
    history.push('/profile/' + loggedUser?.id);
  };
  console.log(userOptions(loggedUser));
  return (
    <>
      <Menu.Item
        href="/adverts/new"
        name="advertsNew"
        active={menuActiveItem === 'advertsNew'}
        onClick={handleItemClick}
        color="teal">
        Create advert
      </Menu.Item>

      <Menu.Item>
        <Dropdown
          inline
          text={userOptions(loggedUser).text}
          defaultValue={userOptions(loggedUser).value}>
          <Dropdown.Menu>
            <Dropdown.Item
              icon="user"
              text="Your Profile"
              onClick={goToMyProfile}></Dropdown.Item>
            <Dropdown.Item
              icon="newspaper outline"
              text="Adverts"></Dropdown.Item>
            <Dropdown.Item
              icon="power off"
              text="Logout"
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
