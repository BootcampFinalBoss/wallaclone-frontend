/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Divider,
  Image,
  Typography,
  Statistic,
  Row,
  Col,
  Button,
  Space,
  Modal,
} from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../assets/photo-placeholder.png';
import Tags from '../Tags/Tags';
import { loadAdvert, deleteAdvert } from '../../store/actions';
import { getAdvertOnState, getUi } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { confirm } = Modal;

const { Title, Paragraph } = Typography;

const AdvertPage = ({ history, ...props }) => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => getUi(state));
  const getAdvertId = () => props.match.params.nameId?.split('-')[1];
  const advert = useSelector((state) => getAdvertOnState(state));

  const handleDeleteClick = async () => {
    dispatch(deleteAdvert(getAdvertId()));

    await history.push('/');
  };

  const handleGetAdvert = async () => {
    dispatch(loadAdvert(getAdvertId()));
  };

  const goToEditAdvert = () => {
    history.push('/adverts/edit/' + getAdvertId());
  };

  const handleDeleteAdvert = async () => {
    const res = await dispatch(deleteAdvert(getAdvertId()));
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

  const showConfirmDelete = () => {
    confirm({
      title: 'Are you sure delete this advert?',
      icon: <ExclamationCircleOutlined />,
      content: "This action can't be reversed",
      okText: 'Yes, delete this advert',
      okType: 'danger',
      cancelText: 'No!!!!',
      onOk() {
        handleDeleteAdvert();
      },
      onCancel() {},
    });
  };

  const renderAdvert = () => {
    if (ui?.error) {
      return <Redirect to="/500" />;
    }

    if (!advert && !ui?.loading) {
      return null;
    }

    if (advert && advert.name) {
      const { name, description, price, tags, type, image } = advert;

      return (
        <Row style={{ marginBottom: '3em' }}>
          <Col span={12}>
            <Title level={2}>
              {name} - {type === 'sell' ? 'Sell' : 'Buy'}
            </Title>
            <Paragraph>{description}</Paragraph>
            <Statistic title="Price" value={price} />
            <Row style={{ marginTop: 20 }}>
              <Paragraph style={{ marginRight: 5, marginBottom: 0 }}>
                Tags
              </Paragraph>
              <Tags tags={tags} />
            </Row>
          </Col>
          <Col span={12}>
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              fallback={placeholder}
            />
          </Col>
          <Col span={24} style={{ justifyContent: 'space-between' }}>
            <Button onClick={goToEditAdvert}>Edit advert</Button>
            <Button danger onClick={showConfirmDelete}>
              Delete advert
            </Button>
          </Col>
        </Row>
      );
    }
  };

  useEffect(() => {
    handleGetAdvert();
  }, [props.match.params.id]);

  return (
    <Row justify="center">
      <Col xs={20} lg={16}>
        <Divider>Detail of your advert</Divider>
        {renderAdvert()}
      </Col>
    </Row>
  );
};

export default AdvertPage;
