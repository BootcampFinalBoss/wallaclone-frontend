/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Typography, Card, Avatar } from 'antd';
import { StarFilled, EyeOutlined, StarOutlined } from '@ant-design/icons';
import Chip from '@material-ui/core/Chip';
import { getLoggedUser } from '../../../store/selectors';
import translate from '../../../intl/translate';

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
    const titleType = ad?.type === 'sell' ? translate('advertsCard.sell') : translate('advertsCard.buy')
  if (!ad) return;

  const image = () => {
    // TODO: Check if image exists
    if ((ad.image || ad.photo) && `${IMAGE_BASE_URL}${ad.image || ad.photo}`) {
      return (
        <img
          src={`${IMAGE_BASE_URL}/${ad.image}`}
          className="card-img-top m-auto"
          style={{ padding: '2rem', width:'60%', height: 320}}
          alt={ad?.name}
        />
      );
    } else {
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
    <Col key={ad._id} xs={24} md={12} className="mx-auto">
      <Card
        title={titleType}
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
              <div style={{ display: 'flex', flex: 'row' }}>
                <p>
                  <Chip
                    label={`${ad.price} €`}
                    color="secondary"
                    style={{ fontSize: '1rem' }}>
                    {ad?.price} €.
                  </Chip>
                </p>
                <p>
                  {ad.state === 'reserved' ? (
                    <Chip
                      label={translate('advert.reserved')}
                      color="secondary"
                      style={{
                        fontSize: '1rem',
                        backgroundColor: '#BC876C',
                        margin: '0 1rem',
                      }}
                    />
                  ) : ad.state === 'sold' ? (
                    <Chip
                      label={translate('advert.sold')}
                      color="secondary"
                      style={{
                        fontSize: '1rem',
                        backgroundColor: '#027E0B',
                        margin: '0 1rem',
                      }}
                    />
                  ) : (
                    ''
                  )}
                </p>
              </div>
                <p style={{backgroundColor: 'blue', color:'white', borderRadius: 20, padding:'.8rem', fontSize: '1rem', width:'50%' }}>
                    {`Tags: ${ad?.tags && ad?.tags?.join(', ')}`}
                </p>
              <p>
                {!hideSeller && (
                  <Link to={`/profile/${ad.user?.username}`} style={{fontSize: '1.2rem'}}>
                   {translate('advert.seller')}: {ad.user?.username}
                  </Link>
                )}
              </p>
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default AdvertCard;
