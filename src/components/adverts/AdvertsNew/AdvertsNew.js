import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, PageHeader } from 'antd';
import AdvertsNewForm from './AdvertsNewForm';
import { getUi } from '../../../store/selectors';

const AdvertsNew = () => {
  const ui = useSelector((state) => getUi(state));

  return (
    <Row>
      <Col span={16} offset={4}>
        <PageHeader className="site-page-header" title="Create An Advert" />
        <AdvertsNewForm />
      </Col>
    </Row>
  );
};

export default AdvertsNew;
