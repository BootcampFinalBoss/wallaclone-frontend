/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Button } from 'antd';
import { getUi } from '../../store/selectors';
import { useHistory } from 'react-router';
const { Title, Paragraph } = Typography;

const CommonErrorPage = ({ ui, history }) => {
  const goBackToHome = () => history.push('/');
  return (
    <Row justify="center" align="middle" style={{ height: '70vh' }}>
      <Col className="text-center">
        <Title level={2}>Error page</Title>
        <Paragraph>{ui?.error}</Paragraph>
        <Button onClick={goBackToHome}>Go back to home page</Button>
      </Col>
    </Row>
  );
};

export default CommonErrorPage;
