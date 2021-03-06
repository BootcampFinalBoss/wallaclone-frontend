/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Typography } from 'antd';
import AdvertCard from './AdvertCard';

const { Title } = Typography;

const AdvertsList = ({ adverts }) => {
  return (
    <Col span={24} className="adverts">
      <Title type="h2" className="adverts__title text-center my-4">
        Adverts List
      </Title>
      <Row className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
        {adverts &&
          adverts.map((ad) => {
            return <AdvertCard key={ad._id} ad={ad} checkDetail={true} />;
          })}
      </Row>
    </Col>
  );
};

export default AdvertsList;
