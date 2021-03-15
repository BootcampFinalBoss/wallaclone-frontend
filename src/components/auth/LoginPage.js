import React from 'react';
import {
  Button,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';
import './LoginPage.css';
import { Form, Input, Alert, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../store/actions';
import translate from '../../intl/translate';

const LoginPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui);

  const onFinish = async (data) => {
    await dispatch(authLogin(data));
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo192.png" /> {translate('loginPage.title')}
        </Header>
        <Form
          form={form}
          size="large"
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          {state.error && (
            <Alert message={state.error.message} type="error" showIcon />
          )}

          <Segment stacked>
            <Form.Item
              name="username"
              label={translate('loginPage.username')}
              rules={[
                {
                  required: true,
                  message: 'Please input your username',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label={translate('loginPage.password')}
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
            <Form.Item
              className="login__remember-me"
              name="remember"
              label={translate('loginPage.rememberMe')}
            >
              <Switch />
            </Form.Item>
            <Button color="teal" fluid size="large">
              {translate('loginPage.loginBtn')}
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="/forgot-password">{translate('loginPage.forgotPass')}</a>
          <br />
          {translate('loginPage.account')}
          <a href="/register">{translate('loginPage.register')}</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
