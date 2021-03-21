/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Typography, Card, Avatar } from 'antd';
import { DeleteOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

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

const AdvertCard = ({ ad, checkDetail, hasDelete }) => {
  const history = useHistory();
  if (!ad) return;

  const handleDelete = () => {
    console.log('delete advert', ad._id);
  };

  const image = () => {
    // TODO: Check if image exists
    if ((ad.image || ad.photo) && `${IMAGE_BASE_URL}${ad.image || ad.photo}`) {
      console.log('ImgDB');
      return (
        <img
          src={`${IMAGE_BASE_URL}/${ad.image}`}
          className="card-img-top"
          style={{padding: '1rem'}}
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

  return (
    <Col key={ad._id} xs={12}className="mx-auto">
      <Card
        title={ad?.type === 'sell' ? 'Sell' : 'Buy'}
        headStyle={getHeadStyle(ad?.type === 'sell' ? true : false)}
        hoverable
        cover={image()}
        actions={[
          <EyeOutlined
            onClick={() => history.push(`/adverts/${ad?._id}`)}
            key="check details"
          />,
        ]}>
        <Meta
          title={ad.title || ad?.name}
          description={
            <>

                <p><Chip color="primary" label={`Tags: ${ad?.tags && ad?.tags?.join(', ')}`} style={{fontSize: '.8rem'}}></Chip></p>
              <div style={{display: 'flex', flex: 'row'}}><p><Chip label={`${ad.price} €`} color="secondary" style={{fontSize: '1rem'}} >
                {ad?.price} €.
              </Chip></p>
                  <p>{ad.reserved===true ? <Chip label='Reservado' color="secondary" style={{fontSize: '1.2rem', backgroundColor:'#BC876C', margin:'0 1rem'}}  /> : ad.sold === true ? <Chip label='Vendido' color="secondary" style={{fontSize: '1.2rem', backgroundColor:'#027E0B', margin:'0 1rem'}}  /> : '' }</p>
              </div>

            </>
          }
        />
      </Card>
    </Col>
  );
};

export default AdvertCard;
