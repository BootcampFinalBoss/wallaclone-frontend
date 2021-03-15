import React, {useEffect}from 'react';
import { Form, Button, Upload, Input, Row, Col, PageHeader, Alert } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import "../../assets/styles/styles.css"
import {useParams} from 'react-router-dom';
import {editUser, getUserId} from '../../store/actions';

const UserEdit = () => {
  let dataInitials = {};
  ///const [form] = Form.useForm();
  const id = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const token = state.auth;
  const dataUser = state.user

  const canSubmit = () => {
    return true;
  };


  if(dataUser !== null){
    console.log(dataUser);
    dataInitials = {
      name: dataUser.result.name,
      email: dataUser.result.email,
      username: dataUser.result.username,
      avatar: dataUser.result.avatar,
      surname: dataUser.result.surname
    }
  }

  useEffect(()=> {
    dispatch(getUserId(id.id, token.token));
  },[])

  const onValuesChange = (changedValues) => {
    console.log(changedValues);
  };

  const onFinish = async (data) => {
    console.log('submit', data);
    dispatch(editUser(id.id,data, token.token ));
    console.log(data, id.id, token.token);
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title="Edit User" />
      <Form
          initialValues={dataInitials}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
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
            {state.error &&
              state.error.errors.map((error) => {
                if (error.param === 'email') {
                  return <Alert message={error.msg} type="error" showIcon />;
                }
              })}
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  min: 8,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  min: 8,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
