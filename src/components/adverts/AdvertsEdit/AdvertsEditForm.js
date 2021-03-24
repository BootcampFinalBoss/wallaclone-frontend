/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Button, Input, InputNumber, Radio } from 'antd';
// import NewAdvertForm from './NewAdvertForm';
import { editAdvert } from '../../../store/actions';
import TagsSelect from '../../Tags/TagSelect';
import { InputImage } from '../../globals';
import { definitions } from '../../../utils';
import Swal from 'sweetalert2';
import translate from '../../../intl/translate';
import TextArea from 'antd/es/input/TextArea';

const { saleOptions, MIN_PRICE, MAX_PRICE } = definitions;

const AdvertsEditForm = ({ advert }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

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

  useEffect(() => {
    form.setFieldsValue(advert);
  }, [advert]);

  return (
    <Form form={form} initialValues={advert} onFinish={onFinish}>
      <Row style={{ marginBottom: '3em' }}>
        <Col xs={24} md={11}>
          <Form.Item
            name="name"
            label={translate('advertsForm.formName')}
            rules={[
              {
                required: true,
              },
            ]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="price"
            label={translate('advertsForm.formPrice')}
            rules={[
              {
                required: true,
              },
            ]}>
            <InputNumber min={MIN_PRICE} max={MAX_PRICE} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 2 }}>
          <Form.Item
            name="tags"
            label={translate('advertsPage.byTags')}
            rules={[
              {
                required: true,
              },
            ]}>
            <TagsSelect />
          </Form.Item>
          <Form.Item
            name="type"
            label={translate('advertsForm.formType')}
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
            label={translate('advertsForm.formDesc')}
            rules={[
              {
                required: true,
              },
            ]}>
            <TextArea placeholder="Name" />
          </Form.Item>
          <Form.Item name="photo" label={translate('advertsForm.formImage')}>
            <InputImage type="file" />
          </Form.Item>
          <Button
            className="my-4"
            size="large"
            type="primary"
            shape="round"
            htmlType="submit"
            disabled={!canSubmit()}
            block>
            {translate('advertsForm.updateBtn')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvertsEditForm;
