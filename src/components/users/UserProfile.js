import React, {useEffect} from 'react';
import { Card, PageHeader, Image, Row, Col, Button } from "antd";
import {
  CloseOutlined,
  EditOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
//import "./RegisterPage.css";
import {authRegister, getUserId, userRequest} from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import {getLoggedUser} from '../../store/selectors';

let dataExample = {
};

const UserProfile = () => {
  const dispatch = useDispatch();
    const id = useParams();
    const state = useSelector((state) => state);

    const token = state.auth;
    const dataUser = state.user
  useEffect(()=> {
      dispatch(getUserId(id.id, token.token));
  }, [])

    if(dataUser !== null){
        console.log(dataUser);
        dataExample = {
            name: dataUser.result.name,
            email: dataUser.result.email,
            username: dataUser.result.username,
            avatar: dataUser.result.avatar,
        }
    }

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
              src={`http://localhost:5000/images/avatar/${dataExample.avatar}` }
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default UserProfile;
