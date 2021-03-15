import React, {useEffect} from 'react';
import { Card, PageHeader, Image, Row, Col, Button, Modal } from "antd";
import "antd/dist/antd.css";
import {deleteUser, getUserId} from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom';
import {getLoggedUser} from '../../store/selectors';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { confirm } = Modal;

let dataExample = {
};

const UserProfile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const id = useParams();
    const state = useSelector((state) => state);

    const token = state.auth;
    const {idUser} = token.userId
    console.log(idUser);
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

    const handleDeleteAdvert = async () => {
        const res = await dispatch(deleteUser(id.id, token.token));
        console.log(res);
        if(res){
            if (res.status === 200){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 2400
                });
                return;
            }
        }
    };

    const showConfirmDelete = () => {
        confirm({
            title: 'Are you sure delete the user account?',
            icon: <ExclamationCircleOutlined />,
            content: "This action can't be reversed. Your adverts also delete.",
            okText: 'Yes, delete this userAccount',
            okType: 'danger',
            cancelText: 'No!!!!',
            onOk() {
                handleDeleteAdvert();
            },
            onCancel() {},
        });
    };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title="My Profile" />,
      <Card
        title="User Profile"
        style={{ maxWidth: 1200, textAlign: "center", padding: "0 1rem" }}
        actions={[
          <Button onClick={() => history.push(`/user-adverts/${idUser}`)} key="advert" type="default" size={64}>
            Adverts
          </Button>,
          <Button
              onClick={() => history.push(`/user-edit/${idUser}`)}
              key="edit" type="primary" size={64}>
            Edit
          </Button>,
          <Button key="delete" type="danger" onClick={showConfirmDelete} size={64}>
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
