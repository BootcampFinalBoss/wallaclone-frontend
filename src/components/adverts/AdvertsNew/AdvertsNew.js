import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Divider, Typography, PageHeader } from 'antd';
const { Title } = Typography;

import AdvertsNewForm from './AdvertsNewForm';
import { createAdvert } from '../../../store/actions';
import { getUi } from '../../../store/selectors';
import translate from '../../../intl/translate';


const AdvertsNew = () => {
  const ui = useSelector((state) => getUi(state));

  return (
    <Row>
      <Col span={16} offset={4}>
        {/* <Divider>Create an advert</Divider> */}
        <PageHeader className="site-page-header" title={translate('createAdvert.title')} />,

        <AdvertsNewForm />
      </Col>
    </Row>
  );
};

export default AdvertsNew;
