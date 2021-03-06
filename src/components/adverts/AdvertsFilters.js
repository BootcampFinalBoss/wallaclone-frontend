/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Row, Typography, Col, Input, Slider, Radio, Button, Form } from 'antd';

import removeEmptyFields from '../../utils/removeEmptyFields';
import { definitions, storage } from '../../utils';
import TagsSelect from '../Tags/TagSelect';
import { useDispatch } from 'react-redux';
import { loadAdverts } from '../../store/actions';

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

  const formatFilters = (filters) => {
    if (filters.tags)
      filters.tags = filters.tags.map((tag) => tag.toLowerCase()).join(',');
    if (filters.price)
      filters.price = `${filters.price[0]}-${filters.price[1]}`;
    return removeEmptyFields(filters);
  };

  const onValuesChange = (changedValues, allValues) => {
    setFilters(allValues);
  };

  const onFinish = async (filtersData) => {
    dispatch(loadAdverts(formatFilters(filtersData)));
  };

  return (
    <Col span={12} className="adverts__filters">
      <Form
        className="adverts__form"
        onFinish={onFinish}
        initialValues={defaultFilters}
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
              <Slider
                range
                defaultValue={filters.price}
                min={MIN_PRICE}
                max={MAX_PRICE}
              />
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
