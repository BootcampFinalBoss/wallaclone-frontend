import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Button } from 'antd';
import { getUi } from '../../store/selectors';
import { useHistory } from 'react-router';
const { Title, Paragraph } = Typography;

const CommonErrorPage = () => {
  const ui = useSelector((state) => getUi(state));
  const history = useHistory();
  if (!ui.error) {
    history.push('/');
  }
  const goBackToHome = () => history.push('/');

  return (
    <Row>
      <Col>
        <Title level={2}>Error page</Title>
        <Paragraph>{ui.error}</Paragraph>
        <Button onClick={goBackToHome}>Go back to home page</Button>
      </Col>
    </Row>
  );
};

export default CommonErrorPage;
