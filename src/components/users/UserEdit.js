import React, {useEffect}from 'react';
import { Form, Button, Upload, Input, Row, Col, PageHeader, Alert } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import "../../assets/styles/styles.css"
import {useParams} from 'react-router-dom';
import {editUser, getUserId} from '../../store/actions';
import {getUi} from '../../store/selectors';
import Swal from 'sweetalert2';

const UserEdit = () => {
  let dataInitials = {};
  ///const [form] = Form.useForm();
  const id = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const token = state.auth;
  const dataUser = state.user
  const {error} = useSelector(state => getUi(state));

  const canSubmit = () => {
    return true;
  };


  if(dataUser !== null){
    dataInitials = {
      name: dataUser.name,
      email: dataUser.email,
      username: dataUser.username,
      avatar: dataUser.avatar,
      surname: dataUser.surname
    }
  }

  useEffect(()=> {
    dispatch(getUserId(id.id, token.token));
  },[])

  const onValuesChange = (changedValues) => {
    console.log(changedValues);
  };

  const onFinish = async (data) => {
    const res = await dispatch(editUser(id.id,data, token.token ));
    console.log(res);
    if(res){
      console.log(res);
      if (res.status === 200){
        console.log('Aqui');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data,
          showConfirmButton: false,
          timer: 2500
        });
        return;
      }
    }
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title="Edit User" />
      <Form
          initialValues={dataInitials}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        {error && (
            <Alert message={error.error.message} type="error" showIcon />
        )}
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="name"
              label="Name"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="surname" label="Surname">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="username"
              label="Username"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="align-center"  disabled={!canSubmit()}>
              Update
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default UserEdit;
