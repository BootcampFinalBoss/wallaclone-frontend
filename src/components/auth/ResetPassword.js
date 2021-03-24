import React, { useEffect } from 'react';
import { Form, Button, Input, Row, Col, PageHeader, Alert } from 'antd';
import 'antd/dist/antd.css';
import './RegisterPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { authReset, authUpdatePassword } from '../../store/actions';
import { getRes } from '../../store/selectors';
import Swal from 'sweetalert2';
import translate from '../../intl/translate';

const ResetPassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const token = useParams();
  const reset = useSelector((state) => getRes(state));
  const state = useSelector((state) => state.ui);
  let mesaggeCheck = null;

  useEffect(() => {
    dispatch(authReset(token.id));
  }, []);

  if (reset !== undefined && reset !== null) {
    mesaggeCheck = reset.data.message;
  }

  const onFinish = async (data) => {
    const passUpdate = data.password;
    const res = await dispatch(
      authUpdatePassword(token.id, { password: passUpdate }),
    );
    if (res) {
      if (res.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 2800,
        });
        return;
      }
    }
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader
        className="site-page-header"
        title={translate('formForgot.titleReset')}
      />
      ,
      <Form
        form={form}
        name="resetPassword"
        onFinish={onFinish}
        scrollToFirstError
        //style={{ border: "1px solid gray" }}
      >
        {reset && <Alert message={mesaggeCheck} type="info" showIcon />}

        {state.error && (
          <Alert message={state.error.message} type="error" showIcon />
        )}
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24}>
            <Form.Item
              name="password"
              label={translate('formForgot.iPass')}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={translate('formForgot.iPassConfirm')}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              className="my-2">
              {translate('formForgot.btnUpdate')}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
export default ResetPassword;
