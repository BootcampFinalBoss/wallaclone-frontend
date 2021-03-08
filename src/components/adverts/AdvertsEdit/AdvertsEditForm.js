/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Input, InputNumber, Radio } from 'antd';
// import NewAdvertForm from './NewAdvertForm';
import { editAdvert, loadAdvert } from '../../../store/actions';
import { getAdvertOnState, getUi } from '../../../store/selectors';
import TagsSelect from '../../Tags/TagSelect';
import { InputImage } from '../../globals';
import { definitions } from '../../../utils';

const { saleOptions, MIN_PRICE, MAX_PRICE } = definitions;

const AdvertsEditForm = ({ advert }) => {
  const advertData = { name: advert?.name };
  const dispatch = useDispatch();

  const canSubmit = () => {
    return true;
  };

  const onValuesChange = (changedValues, allValues) => {
    console.log('values change', changedValues, allValues, advertData);
  };

  const onFinish = async (data) => {
    console.log(data);
    dispatch(editAdvert({ ...data, _id: advert._id }));
  };

  return (
    <Form
      initialValues={advert}
      onFinish={onFinish}
      onValuesChange={onValuesChange}>
      <Row style={{ marginBottom: '3em' }}>
        <Col span={11}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}>
            <InputNumber min={MIN_PRICE} max={MAX_PRICE} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="tags"
            label="Tags"
            rules={[
              {
                required: true,
              },
            ]}>
            <TagsSelect />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
              },
            ]}>
            <Radio.Group options={[saleOptions.sell, saleOptions.buy]} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="photo" label="Photo">
            <InputImage type="file" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canSubmit()}
            block>
            Finish editing
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvertsEditForm;
