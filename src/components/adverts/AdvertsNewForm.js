import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Button, Input, InputNumber, Radio } from 'antd';
// import NewAdvertForm from './NewAdvertForm';
import { createAdvert } from '../../store/actions';
import { getUi } from '../../store/selectors';
import TagsSelect from '../Tags/TagSelect';
import { InputImage } from '../globals';
import { definitions } from '../../utils';

const { saleOptions, MIN_PRICE, MAX_PRICE } = definitions;

const NewAdvertForm = () => {
  const ui = useSelector((state) => getUi(state));

  const canSubmit = () => {
    return false;
  };

  return (
    <Form>
      <Row>
        <Col span={11}>
          <Form.Item label="Name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Price">
            <InputNumber min={MIN_PRICE} max={MAX_PRICE} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item label="Tags">
            <TagsSelect />
          </Form.Item>
          <Form.Item label="Type">
            <Radio.Group options={[saleOptions.sell, saleOptions.buy]} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Photo">
            <InputImage type="file" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canSubmit()}
            block>
            Up!
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default NewAdvertForm;
