import React, {useState} from 'react';
import {
  Button,
  Grid,
  Header,
  Image, Menu,
  Message,
  Segment,
} from 'semantic-ui-react';
import './LoginPage.css';
import { Form, Input, Alert, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {authLogin, loadLang} from '../../store/actions';
import translate from '../../intl/translate';
import {LOCALES} from '../../intl';

const LoginPage = () => {
  const [form] = Form.useForm();
  const [menuActiveItem, setMenuActiveItem] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui);

  const onFinish = async (data) => {
    await dispatch(authLogin(data));
  };

  const handleChangeLocale = (newLocale) => {
    dispatch(loadLang(newLocale));
  };

  const handleItemClick = (e, { name }) => setMenuActiveItem(name);

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
          <br />
          <div style={{marginTop: 5, padding:8 }}>
            <img src="http://banderasmundo.es/wp-content/uploads/2017/09/reino-unido.png" alt=""  onClick={() => handleChangeLocale(LOCALES.ENGLISH)} width={30} height={20}/>
            <img src="http://banderasmundo.es/wp-content/uploads/2017/09/espana.png" alt=""  onClick={() => handleChangeLocale(LOCALES.SPANISH)} width={30} height={20} style={{marginLeft: 8}}/>
          </div>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
