/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { List, Avatar, Col, Button, Card } from 'antd';
import {
  PoweroffOutlined,
  ShoppingOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  StarOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { reservedAdvert, soldAdvert } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
//import {advert} from '../../../store/reducers';

const { REACT_APP_IMAGE_BASE_URL: IMAGE_BASE_URL } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const AdvertListUser = ({ ad, checkDetail, hasDelete }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  if (!ad) return;

  const stateAdvert = useSelector((state) => state.advert);

  useEffect(() => {}, [stateAdvert]);

  return (
    <Col key={ad._id} xs={24} className="mx-auto">
      <List itemLayout="vertical" size="large" bordered="true">
        <List.Item
          key={ad._id}
          extra={
            <img width={150} alt="logo" src={`${IMAGE_BASE_URL}/${ad.image}`} />
          }>
          <List.Item.Meta
            avatar={<Avatar>{ad.avatar}</Avatar>}
            title={
              <>
                {ad.name}
                {ad.reserved === true ? (
                  <Chip
                    label="Reservado"
                    color="secondary"
                    style={{
                      fontSize: '1.2rem',
                      backgroundColor: '#BC876C',
                      margin: '0 1rem',
                    }}
                  />
                ) : ad.sold === true ? (
                  <Chip
                    label="Vendido"
                    color="secondary"
                    style={{
                      fontSize: '1.2rem',
                      backgroundColor: '#027E0B',
                      margin: '0 1rem',
                    }}
                  />
                ) : (
                  ''
                )}
              </>
            }
            description={ad.description}
          />
          <div className={classes.root}>
            {ad.type === 'buy' ? (
              <Chip
                label={ad.type}
                style={{
                  fontSize: '1.2rem',
                  backgroundColor: '#FEF7E6',
                  color: 'orange',
                }}
              />
            ) : (
              <Chip
                label={ad.type}
                style={{
                  fontSize: '1.2rem',
                  backgroundColor: '#F5FDED',
                  color: 'green',
                }}
              />
            )}
            {/*<Chip label={ad.type} style={{fontSize: '1.2rem'}}  />*/}
            <Chip
              label={ad.tags}
              color="primary"
              style={{ fontSize: '1.2rem' }}
            />
            <Chip
              label={`${ad.price} €`}
              color="secondary"
              style={{ fontSize: '1.2rem' }}
            />
            {/*{ad.reserved===true ? <Chip label='Reservado' color="secondary" style={{fontSize: '1.2rem', backgroundColor:'#987654'}}  /> : ad.sold === true ? <Chip label='Vendido' color="secondary" style={{fontSize: '1.2rem', backgroundColor:'#90893'}}  /> : '' }*/}
          </div>
        </List.Item>
        <Button
          onClick={() => history.push(`/adverts/${ad?._id}`)}
          key="edit"
          shape="round"
          type="p"
          icon={
            <EyeOutlined key="check details" style={{ fontSize: '1.1rem' }} />
          }
          style={{ margin: '1rem', fontSize: '1rem' }}>
          Detalles
        </Button>
        {/* <Button
                onClick={() => history.push(`/user-edit/${loggedUser.userId}`)}
                key="delete"
                shape="round"
                type="danger"
                icon={<DeleteOutlined style={{fontSize: '1.1rem'}} />}
                style={{margin: '1rem'}}
            >
                Delete
            </Button>
            <Button
                onClick={() => dispatch(reservedAdvert(ad._id))}
                key="reserved"
                shape="round"
                icon={<CheckCircleOutlined style={{fontSize: '1.1rem'}} />}
                style={{margin: '1rem', backgroundColor: 'green', color: 'white'}}
            >
                Reserved
            </Button>
            <Button
                onClick={() => dispatch(soldAdvert(ad._id))}
                key="sold"
                shape="round"
                type="primary"
                icon={<ShoppingOutlined style={{fontSize: '1.1rem'}} />}
                style={{margin: '1rem', backgroundColor: 'orange', color: 'white'}}
            >
                Sold
            </Button>*/}
      </List>
    </Col>
  );
};

export default AdvertListUser;
