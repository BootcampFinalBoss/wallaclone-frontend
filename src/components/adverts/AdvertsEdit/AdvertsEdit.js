/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Divider, Typography } from 'antd';
const { Title } = Typography;

import AdvertsEditForm from './AdvertsEditForm';
import { getUi, getAdvertOnState } from '../../../store/selectors';
import { loadAdvert } from '../../../store/actions';
import translate from '../../../intl/translate';

const AdvertsEdit = ({ history, ...props }) => {
  const ui = useSelector((state) => getUi(state));
  const advert = useSelector((state) => getAdvertOnState(state));
  const dispatch = useDispatch();
  const getAdvertId = () => props.match.params.id;
  const handleGetAdvert = () => dispatch(loadAdvert(getAdvertId()));

  // const advertData = { name: advert?.name, description: advert?.description }

  useEffect(() => {
    handleGetAdvert();
  }, [props.match.params.id]);

  return (
    <Row>
      <Col span={16} offset={4}>
        <Divider>{translate('advert.titleEdit')} &apos;{advert?.name}&apos;</Divider>
        <AdvertsEditForm advert={advert} />
      </Col>
    </Row>
  );
};

export default AdvertsEdit;
