import React from 'react';
import { Form, Button, Input, Row, Col, PageHeader } from 'antd';
import Swal from 'sweetalert2';
import 'antd/dist/antd.css';
import './RegisterPage.css';
import { authForgotPassword } from '../../store/actions';
import { useDispatch } from 'react-redux';
import translate from '../../intl/translate';

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (data) => {
    const res = await dispatch(authForgotPassword(data));
    if (res) {
      if (res.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.msg,
          text: 'Revisa la bandeja de entrada el correo indicado.',
          showConfirmButton: true,
        });
      }
      return;
    }
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader
        className="site-page-header"
        title={translate('formForgot.title')}
      />
      ,
      <Form
        form={form}
        name="forgot"
        onFinish={onFinish}
        scrollToFirstError
        //style={{ border: "1px solid gray" }}
      >
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              className="my-2">
              {translate('formForgot.btnReset')}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
export default ForgotPasswordPage;
