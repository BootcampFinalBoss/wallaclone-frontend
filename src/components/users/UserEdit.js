import React from 'react';
import { Form, Button, Upload, Input, Row, Col, PageHeader, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
// import { authRegister } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import "../../assets/styles/styles.css"

const UserEdit = () => {
  const [form] = Form.useForm();
  const dispach = useDispatch();
  const state = useSelector((state) => state.ui);
  console.log(state);

  const onFinish = async (data) => {
    console.log('submit', data);
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title="Edit User" />
      <Form
        form={form}
        name="editUser"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your username',
                },
              ]}
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
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
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
                {
                  required: true,
                  message: 'Please input your E-mail!',
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
                  required: true,
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
                  required: true,
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

          <Col span={24}>
            <Form.Item
              name="newAvatar"
              label="Avatar"
              valuePropName="fileList"
              extra="Upload your new avatar."
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="align-center">
              Update
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default UserEdit;
