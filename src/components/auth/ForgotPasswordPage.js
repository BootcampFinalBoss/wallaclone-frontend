import React from "react";
import { Form, Button, Input, Row, Col, PageHeader } from "antd";
import "antd/dist/antd.css";
import "./RegisterPage.css";
import { authForgotPassword } from "../../store/actions";
import { useDispatch } from "react-redux";

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (data) => {
    console.log("submit", data);
    //await dispatch(authForgotPassword(data.email));
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title="Forgot-Password" />,
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
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
export default ForgotPasswordPage;
