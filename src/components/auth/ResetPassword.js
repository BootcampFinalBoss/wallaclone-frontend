import React from "react";
import { Form, Button, Input, Row, Col, PageHeader } from "antd";
import "antd/dist/antd.css";
import "./RegisterPage.css";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (data) => {
    console.log("submit", data);
    await dispatch(authRegister(data));
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title="Reset-Password" />,
      <Form
        form={form}
        name="resetPassword"
        onFinish={onFinish}
        scrollToFirstError
        //style={{ border: "1px solid gray" }}
      >
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
export default ResetPassword;
