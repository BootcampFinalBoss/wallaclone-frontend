/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Input, Row, Col, Alert } from 'antd';
import { getUi } from '../../store/selectors';

const UserEditForm = ({ dataInitials, onFinish }) => {
  const { error } = useSelector((state) => getUi(state));
  return (
    <Form initialValues={dataInitials} onFinish={onFinish}>
      {error && <Alert message={error.error.message} type="error" showIcon />}
      <Row type="flex" justify="space-between" gutter={16}>
        <Col xs={24} md={12} lg={12} xl={12}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item name="surname" label="Surname">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item name="username" label="Username">
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
            ]}>
            <Input />
          </Form.Item>
        </Col>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="align-center">
            Update
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default UserEditForm;
