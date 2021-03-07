/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Input, Slider, Radio, Button, Form } from 'antd';

import removeEmptyFields from '../../../utils/removeEmptyFields';
import { definitions, storage } from '../../../utils';
import TagsSelect from '../../Tags/TagSelect';
import { useDispatch } from 'react-redux';
import { loadAdverts } from '../../../store/actions';

const { Title, Paragraph } = Typography;
const { MIN_PRICE, MAX_PRICE, saleOptions } = definitions;
const pricesRange = [MIN_PRICE, MAX_PRICE];
const defaultFilters = {
  name: '',
  price: pricesRange,
  tags: [],
  sale: saleOptions.all,
};

const AdvertsFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(
    storage.get('filters') || defaultFilters,
  );

  const onValuesChange = (changedValues, allValues) => {
    setFilters(allValues);
  };

  const onFinish = async (filtersData) => {
    dispatch(loadAdverts(filtersData));
  };

  // TODO: Automatically fetch for adverts
  // useEffect(() => {
  //   if (filters) {
  //     onFinish(filters);
  //   }
  // }, []);

  return (
    <Col span={12} className="adverts__filters">
      <Form
        className="adverts__form"
        onFinish={onFinish}
        initialValues={filters}
        onValuesChange={onValuesChange}>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item name="name" label="By name">
              <Input placeholder="Name" value={filters.name} />
            </Form.Item>
            <Form.Item
              name="price"
              label={
                <>
                  By price
                  <Paragraph type="strong" style={{ margin: '0 5px' }}>
                    {filters.price.join(' - ')}
                  </Paragraph>
                </>
              }>
              <Slider range min={MIN_PRICE} max={MAX_PRICE} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tags" label="By tags">
              <TagsSelect value={filters.tags} />
            </Form.Item>
            <Form.Item name="type" label="By type">
              <Radio.Group
                options={Object.values(saleOptions)}
                value={filters.sale}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit" block>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default AdvertsFilters;
