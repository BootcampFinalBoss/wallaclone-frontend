import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Button, Divider } from 'antd';
import AdvertCard from './AdvertCard';
import { useHistory } from 'react-router';
import { getLoggedUser } from '../../../store/selectors';

const { Title, Paragraph } = Typography;

const AdvertsList = ({ adverts, ui }) => {
  return (
    <Col xs={20} lg={16} className="adverts">
      <Title type="h2" className="adverts__title text-center my-4">
        Adverts List
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: '2em' }} justify="center">
        {!ui.loading && adverts?.length > 0 ? (
          adverts?.map((ad) => {
            return <AdvertCard key={ad._id} ad={ad} checkDetail={true} />;
          })
        ) : (
          <CreateNew />
        )}
      </Row>
    </Col>
  );
};

AdvertsList.propTypes = {
  adverts: PropTypes.array,
  ui: PropTypes.object,
};

const CreateNew = () => {
  const history = useHistory();
  const goCreateOne = () => {
    history.push('/adverts/new');
  };
  const goRegister = () => {
    history.push('/register');
  };
  const goLogin = () => {
    history.push('/login');
  };
  const { token: isLoggedUser } = useSelector((state) => getLoggedUser(state));

  if (isLoggedUser) {
    return (
      <Col>
        <Button onClick={goCreateOne}>Go create one!</Button>
      </Col>
    );
  }
  return (
    <Col className="text-center">
      <Paragraph>Have an account?</Paragraph>
      <Button onClick={goLogin}>Go login and create one!</Button>
      <Divider></Divider>
      <Paragraph>You are not a member yet?</Paragraph>
      <Button onClick={goRegister}>Go register and create one!</Button>
    </Col>
  );
};

export default AdvertsList;
