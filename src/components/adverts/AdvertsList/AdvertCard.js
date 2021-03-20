/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Card, Avatar } from 'antd';
import { StarFilled, EyeOutlined, StarOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { getLoggedUser } from '../../../store/selectors';

const { REACT_APP_IMAGE_BASE_URL: IMAGE_BASE_URL } = process.env;
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

const AdvertCard = ({ ad, hideSeller }) => {
  const history = useHistory();
  const userData = useSelector((state) => getLoggedUser(state));

  if (!ad) return;

  const image = () => {
    // TODO: Check if image exists
    if ((ad.image || ad.photo) && `${IMAGE_BASE_URL}${ad.image || ad.photo}`) {
      console.log('ImgDB');
      return (
        <img
          src={`${IMAGE_BASE_URL}/${ad.image}`}
          className="card-img-top"
          alt={ad?.name}
        />
      );
    } else {
      console.log('ImgBad');
      return (
        <img
          src="https://placedog.net/800"
          className="card-img-top"
          alt={ad?.name}
        />
      );
    }
  };

  // const hasFavoriteFromLoggedUser =
  //   ad.favorites?.filter((ids) => ids !== userData.userId) > 0;
  // const FavoriteButton = hasFavoriteFromLoggedUser ? (
  //   <StarOutlined />
  // ) : (
  //   <StarFilled />
  // );

  return (
    <Col key={ad._id} xs={12} md={8} lg={8} className="mx-auto">
      <Card
        title={ad?.type === 'sell' ? 'Sell' : 'Buy'}
        headStyle={getHeadStyle(ad?.type === 'sell' ? true : false)}
        hoverable
        cover={image()}
        actions={[
          // <FavoriteButton key="favorite" />,
          <EyeOutlined
            onClick={() => history.push(`/adverts/${ad?.name}-${ad?._id}`)}
            key="check details"
          />,
        ]}>
        <Meta
          title={ad.title || ad?.name}
          description={
            <>
              <p className="card-text d-flex justify-content-between card-price font-weight-bold">
                {ad.price} €.
                <i>{ad.type === 'sell' ? 'For sale' : 'To buy'}</i>
              </p>
              <p>Tags: {ad.tags && ad.tags?.join(', ')}</p>
              {!hideSeller && (
                <Link to={`/profile/${ad.user?._id}`}>
                  Seller: {ad.user?.username}
                </Link>
              )}
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default AdvertCard;
