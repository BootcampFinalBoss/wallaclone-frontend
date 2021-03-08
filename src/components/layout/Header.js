import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  Button,
  Icon,
  Image,
  Dropdown,
  Header as Logo,
} from "semantic-ui-react";
import { getLoggedUserToken, getUser } from "../../store/selectors";
import { authLogout } from "../../store/actions";
import { EyeOutlined } from "@ant-design/icons";

let friendOptions = [
  /* {
    key: "Jenny Hess",
    text: "Jenny Hess",
    value: "Jenny Hess",
    image: { avatar: true, src: "/logo192.png" },
  },*/
];

//let userId = {};

const Header = () => {
  const [menuActiveItem, setMenuActiveItem] = useState("");
  const isLoggedUser = useSelector((state) => getLoggedUserToken(state));

  if (isLoggedUser !== null) {
    friendOptions = [
      {
        key: isLoggedUser.username,
        text: isLoggedUser.username,
        value: isLoggedUser.username,
        image: { avatar: true, src: "/logo192.png" },
      },
    ];
  } else {
    friendOptions = [
      {
        key: "",
        text: "",
        value: "",
        image: { avatar: true, src: "/logo192.png" },
      },
    ];
  }

  const handleItemClick = (e, { name }) => setMenuActiveItem(name);

  return (
    <Menu stackable>
      <Menu.Item href="/">
        <Logo as="h4">
          <Image circular src="/logo192.png" /> Wallaclone
        </Logo>
      </Menu.Item>
      <Menu.Menu position="right">
        {isLoggedUser ? (
          <PrivateHeader
            menuActiveItem={menuActiveItem}
            handleItemClick={handleItemClick}
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
        active={menuActiveItem === "register"}
        onClick={handleItemClick}
        color="teal"
      >
        Registro
      </Menu.Item>

      <Menu.Item
        href="/login"
        name="login"
        active={menuActiveItem === "login"}
        onClick={handleItemClick}
      >
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

const PrivateHeader = ({ menuActiveItem, handleItemClick, loggedUser }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authLogout());
  };
  return (
    <>
      <Menu.Item
        href="/adverts/new"
        name="advertsNew"
        active={menuActiveItem === "advertsNew"}
        onClick={handleItemClick}
        color="teal"
      >
        Create advert
      </Menu.Item>

      <Menu.Item>
        <Dropdown
          inline
          text={friendOptions[0].text}
          defaultValue={friendOptions[0].value}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="user"
              text="Your Profile"
              href="/my-profile/"
              key="user detail"
            ></Dropdown.Item>
            <Dropdown.Item
              icon="newspaper outline"
              text="Adverts"
            ></Dropdown.Item>
            <Dropdown.Item
              icon="power off"
              text="Logout"
              onClick={handleLogout}
            ></Dropdown.Item>
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
};

export default Header;
