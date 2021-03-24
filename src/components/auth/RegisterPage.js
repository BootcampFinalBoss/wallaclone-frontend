import React from 'react';
import {
  Form,
  Button,
  Upload,
  Checkbox,
  Input,
  Row,
  Col,
  PageHeader,
  Alert,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./RegisterPage.css";
import Swal from 'sweetalert2'
import translate from '../../intl/translate';


import { authRegister } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui);
  console.log(state);

  const onFinish = async (data) => {
    console.log("submit", data);
    const res = await dispatch(authRegister(data));
    if(res){
      if (res.status === 200){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 2800
        });
        return;
      }
    }

  };
  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title={translate('registerPage.title')} />
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ border: '1px solid gray' }}
      >
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="name"
              label={translate('registerPage.registerName')}
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="surname" label={translate('registerPage.surname')}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="username"
              label={translate('registerPage.username')}
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            {state.error &&
              state.error.errors.map((error) => {
                if (error.param === 'username') {
                  return <Alert message={error.msg} type="error" showIcon />;
                }
              })}
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
              label={translate('registerPage.password')}
              rules={[
                {
                  min: 8,
                  required: true,
                  message: 'Please input your password!',
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
              label={translate('registerPage.confirmPass')}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  min: 8,
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Should accept agreement'),
              },
            ]}
          >
            <Checkbox>
             {translate('registerPage.checkbox')} <a href="">{translate('registerPage.agreement')}</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {translate('registerPage.registerBtn')}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
export default RegisterPage;
