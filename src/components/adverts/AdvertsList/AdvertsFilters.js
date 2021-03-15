/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Input, Slider, Radio, Button, Form } from 'antd';

import TagsSelect from '../../Tags/TagSelect';
import { useDispatch } from 'react-redux';
import { loadAdverts, loadMoreAdverts } from '../../../store/actions';
import { definitions, storage } from '../../../utils';
import translate from '../../../intl/translate';
const { Title, Paragraph } = Typography;
const { MIN_PRICE, MAX_PRICE, saleOptions } = definitions;

const AdvertsFilters = ({ filters, setFilters }) => {
  const dispatch = useDispatch();

  const onValuesChange = (changedValues, allValues) => {
    setFilters(allValues);
  };

  const onFinish = async (filtersData) => {
    dispatch(loadAdverts(filtersData));
  };

  return (
    <Col span={12} className="adverts__filters">
      <Form
        className="adverts__form"
        onFinish={onFinish}
        initialValues={filters}
        onValuesChange={onValuesChange}
      >
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item name="name" label={translate('advertsPage.byName')}>
              <Input placeholder="Name" value={filters.name} />
            </Form.Item>
            <Form.Item
              name="price"
              label={
                <>
                  {translate('advertsPage.byPrice')}
                  <Paragraph type="strong" style={{ margin: '0 5px' }}>
                    {filters.price.join(' - ')}
                  </Paragraph>
                </>
              }
            >
              <Slider range min={MIN_PRICE} max={MAX_PRICE} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tags" label={translate('advertsPage.byTags')}>
              <TagsSelect value={filters.tags} />
            </Form.Item>
            <Form.Item name="type" label={translate('advertsPage.byType')}>
              <Radio.Group
                options={Object.values(saleOptions)}
                value={filters.sale}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit" block>
              {translate('advertsPage.search')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default AdvertsFilters;
