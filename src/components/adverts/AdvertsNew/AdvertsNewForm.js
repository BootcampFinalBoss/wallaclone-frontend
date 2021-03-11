import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Input, InputNumber, Radio, Upload } from 'antd';
// import NewAdvertForm from './NewAdvertForm';
import { createAdvert } from '../../../store/actions';
import { getUi } from '../../../store/selectors';
import TagsSelect from '../../Tags/TagSelect';
import { InputImage } from '../../globals';
import { definitions } from '../../../utils';

const { saleOptions, MIN_PRICE, MAX_PRICE } = definitions;

const NewAdvertForm = () => {
  const ui = useSelector((state) => getUi(state));
  const dispatch = useDispatch();
  const fileList = [];

  const uploadProps ={
    beforeUpload: file => {
      fileList.push(file)
      return false;
    }
  };

  const handleCreateAdvert = async (data) => {
    console.log(data);
    /*console.log('File', fileList);*/
    data.image = fileList[0];
    dispatch(createAdvert(data));
  };

  const canSubmit = () => {
    return true;
  };

  return (
    <Form onFinish={handleCreateAdvert}>
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
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input maxLength={150} placeholder="Name" />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload {...uploadProps}>
              <Button>Select File</Button>
            </Upload>
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
