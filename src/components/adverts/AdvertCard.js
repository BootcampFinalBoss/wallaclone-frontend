/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Typography, Card, Avatar } from 'antd';
import { DeleteOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { REACT_APP_API_HOST: IMAGE_BASE_URL } = process.env;
const { Paragraph } = Typography;
const { Meta } = Card;

const getHeadStyle = (sale) =>
  sale
    ? {
        backgroundColor: '#f6ffed',
        color: '#52c41a',
      }
    : {
        backgroundColor: '#fff7e6',
        color: '#fa8c16',
      };

const AdvertCard = ({ ad, checkDetail, hasDelete }) => {
  const history = useHistory();
  if (!ad) return;
  console.log(ad);

  const handleDelete = () => {
    console.log('delete advert', ad._id);
  };

  return (
    <Col key={ad._id} span={6} className="mx-auto">
      <Card
        title={ad.sale ? 'Sell' : 'Buy'}
        headStyle={getHeadStyle(sale)}
        hoverable
        className="mb-3"
        cover={
          <img
            src={
              ad.image || ad.photo
                ? `${IMAGE_BASE_URL}${ad.image || ad.photo}`
                : 'https://placedog.net/800'
            }
            className="card-img-top"
            alt={ad?.name}
          />
        }
        actions={[
          <StarOutlined key="favorite" />,
          <DeleteOutlined onClick={() => handleDelete()} key="edit" />,
          <EyeOutlined
            onClick={() => history.push(`/adverts/${ad?._id}`)}
            key="check details"
          />,
        ]}>
        <Meta
          title={ad.title || ad?.name}
          description={() => AdvertContent(ad)}
        />
      </Card>
    </Col>
  );
};

const AdvertContent = ({ ad }) => {
  return (
    <>
      <p className="card-text d-flex justify-content-between card-price font-weight-bold">
        {ad.price} €.
        <i>{ad.sale ? 'For sale' : 'To buy'}</i>
      </p>
      <p>Tags: {ad.tags && ad.tags.join(', ')}</p>
    </>
  );
};

export default AdvertCard;
