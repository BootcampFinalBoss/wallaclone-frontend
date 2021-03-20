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
import Swal from 'sweetalert2';

const { saleOptions, MIN_PRICE, MAX_PRICE } = definitions;

const AdvertsEditForm = ({ advert }) => {
  const dispatch = useDispatch();

  const canSubmit = () => {
    return true;
  };

  const onFinish = async (data) => {
    console.log(data);
    const res = await dispatch(editAdvert({ ...data, _id: advert._id }));
    if (res) {
      if (res.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 2400,
        });
        return;
      }
    }
  };

  return (
    <Form initialValues={advert} onFinish={onFinish}>
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
