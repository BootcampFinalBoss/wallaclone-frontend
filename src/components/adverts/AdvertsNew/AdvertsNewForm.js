import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Input, InputNumber, Radio, Upload } from 'antd';
// import NewAdvertForm from './NewAdvertForm';
import { createAdvert } from '../../../store/actions';
import { getUi } from '../../../store/selectors';
import TagsSelect from '../../Tags/TagSelect';
import { InputImage } from '../../globals';
import { definitions } from '../../../utils';
import { UploadOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2';
import translate from '../../../intl/translate';


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
    const res = await dispatch(createAdvert(data));
    if(res){
      if (res.status === 200){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 2800
        });
        return;
      }
    }
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
            label={translate('advertsForm.formName')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="price"
            label={translate('advertsForm.formPrice')}
            rules={[
              {
                required: true,
              },
            ]}
          >
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
            ]}
          >
            <TagsSelect />
          </Form.Item>
          <Form.Item
            name="type"
            label={translate('advertsForm.formType')}
            rules={[
              {
                required: true,
              },
            ]}
          >
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
            ]}
          >
            <Input maxLength={150} placeholder="Name" />
          </Form.Item>
          <Form.Item name="image" label={translate('advertsForm.formImage')}>
            <Upload {...uploadProps}>
              <Button>{translate('advertsForm.formSelectFile')}</Button>
            </Upload>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canSubmit()}
            shape="round"
            icon={<UploadOutlined />}
          >
            {translate('advertsForm.createBtn')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default NewAdvertForm;
