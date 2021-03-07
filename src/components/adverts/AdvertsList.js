/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Typography } from 'antd';
import AdvertCard from './AdvertCard';

const { Title } = Typography;

const AdvertsList = ({ adverts, ui }) => {
  return (
    <Col xs={20} lg={16} className="adverts">
      <Title type="h2" className="adverts__title text-center my-4">
        Adverts List
      </Title>
      <Row gutter={[24, 24]}>
        {!ui.loading &&
          adverts?.map((ad) => {
            return <AdvertCard key={ad._id} ad={ad} checkDetail={true} />;
          })}
      </Row>
    </Col>
  );
};

export default AdvertsList;
