import React from "react";
import { Card, PageHeader, Image, Row, Col, Button } from "antd";
import {
  CloseOutlined,
  EditOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
//import "./RegisterPage.css";
import { authRegister } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const dataExample = {
  name: "Usuario1",
  username: "User",
  email: "user@user.com",
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui);
  console.log(state);

  const onFinish = async (data) => {
    console.log("submit", data);
    await dispatch(authRegister(data));
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title="My Profile" />,
      <Card
        title="User Profile"
        style={{ maxWidth: 1200, textAlign: "center", padding: "0 1rem" }}
        actions={[
          <Button key="advert" type="default" size={64}>
            Adverts
          </Button>,
          <Button key="edit" href="/user-edit" type="primary" size={64}>
            Edit
          </Button>,
          <Button key="delete" type="danger" size={64}>
            Delete
          </Button>,
        ]}
      >
        <Row className="text-left">
          <Col span={14}>
            <span>Name</span>
            <p>{dataExample.name}</p>
            <span>Username</span>
            <p>{dataExample.username}</p>
            <span>Email</span>
            <p>{dataExample.email}</p>
          </Col>
          <Col span={8}>
            <Image
              style={{ minWidth: 150, padding: "0 1rem" }}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default UserProfile;
