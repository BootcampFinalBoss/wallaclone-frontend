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

import { StarOutlined } from '@ant-design/icons';
import placeholder from '../../assets/photo-placeholder.png';
import Tags from '../Tags/Tags';
import { loadAdvert, deleteAdvert } from '../../store/actions';
import { getAdvertOnState, getLoggedUser, getUi } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  ExclamationCircleOutlined,
  FacebookFilled,
  TwitterSquareFilled,
} from '@ant-design/icons';
import Swal from 'sweetalert2';
import {
  addFavoriteAdvert,
  removeFavoriteAdvert,
  updateAdvertState,
} from '../../api/adverts';
import translate from '../../intl/translate';

const { confirm } = Modal;

const { Title, Paragraph } = Typography;

const AdvertPage = ({ history, ...props }) => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => getUi(state));
  const userData = useSelector((state) => getLoggedUser(state));
  const getAdvertId = () => props.match.params.nameId?.split('-')[1];
  const advert = useSelector((state) => getAdvertOnState(state));
  const [isFavorited, setIsFavorited] = useState(false);
  const [advertState, setAdvertState] = useState(false);

  const handleGetAdvert = async () => {
    dispatch(loadAdvert(getAdvertId()));
  };

  const goToEditAdvert = () => {
    history.push('/adverts/edit/' + getAdvertId());
  };

  const handleDeleteAdvert = async () => {
    const res = await dispatch(deleteAdvert(getAdvertId(), userData.userId));
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

  const handleToggleAdvert = async () => {
    if (!isFavorited) {
      await addFavoriteAdvert(advert._id, userData.userId);
      setIsFavorited(true);
    } else {
      await removeFavoriteAdvert(advert._id, userData.userId);
      setIsFavorited(false);
    }
  };

  const handleChangeState = async (newState) => {
    await updateAdvertState(advert._id, newState);
    setAdvertState(newState !== 'default' ? newState : advert?.type);
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

  const addFavoriteLabel = translate('advert.detail.addFavorite');
  const removeFavoriteLabel = translate('advert.detail.removeFavorite');

  const renderAdvert = () => {
    if (ui?.error) {
      return <Redirect to="/500" />;
    }

    if (!advert && !ui?.loading) {
      return null;
    }

    if (advert && advert.name) {
      const { name, description, price, tags, type, image } = advert;
      const advertLink = `${process.env.REACT_APP_FRONT_END}/${advert?.name}-${advert?._id}`;

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
            {advert.favorites && (
              <Row
                style={{
                  marginTop: '20px',
                }}>
                <Paragraph>
                  {translate('advert.detail.hasNFavorites')}:{' '}
                  {advert.favorites.length}
                </Paragraph>
                {userData.token && (
                  <Button
                    className="btn-favorites"
                    onClick={handleToggleAdvert}>
                    {isFavorited ? removeFavoriteLabel : addFavoriteLabel}
                    <StarOutlined />
                  </Button>
                )}
              </Row>
            )}
            <Row
              style={{
                marginTop: '20px',
              }}
              gutter={[24, 24]}>
              <Col span={24}>
                <Row>
                  <Paragraph>
                    {translate('advert.state')}: {advertState}
                  </Paragraph>
                </Row>
              </Col>
              {userData.userId === advert.user._id && (
                <Col span={24}>
                  <Row>
                    <Paragraph>{translate('advert.changeState')}:</Paragraph>
                  </Row>
                  <Row>
                    <Button
                      className="button-margin-right"
                      onClick={() => handleChangeState('reserved')}>
                      Reserved
                    </Button>
                    <Button
                      className="button-margin-right"
                      onClick={() => handleChangeState('sold')}>
                      Sold
                    </Button>
                    <Button onClick={() => handleChangeState('default')}>
                      Nothing
                    </Button>
                  </Row>
                </Col>
              )}
              <Col span={24}>
                <Paragraph>{translate('global.share')}:</Paragraph>
                <Row>
                  <Button className="button-margin-right share-buttons">
                    <FacebookFilled />
                    <div
                      className="fb-share-button"
                      data-href="https://developers.facebook.com/docs/plugins/"
                      data-layout="button_count"
                      data-size="large">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                        className="fb-xfbml-parse-ignore">
                        {translate('global.share')}
                      </a>
                    </div>
                  </Button>
                  <Button className="share-buttons">
                    <TwitterSquareFilled />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="twitter-share-button"
                      href={`https://twitter.com/intent/tweet?text=Check%20this%20awesome%20advert!%20${advertLink}`}>
                      Tweet
                    </a>
                  </Button>
                </Row>
              </Col>
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
          {userData.userId === advert.user._id && (
            <Col
              span={5}
              style={{
                justifyContent: 'space-between',
                display: 'flex',
                marginTop: '20px',
              }}>
              <Button onClick={goToEditAdvert}>Edit advert</Button>
              <Button danger onClick={showConfirmDelete}>
                Delete advert
              </Button>
            </Col>
          )}
        </Row>
      );
    }
  };

  useEffect(() => {
    handleGetAdvert();
  }, [props.match.params.id]);

  useEffect(() => {
    if (
      advert?.favorites?.filter((ids) => ids === userData.userId).length > 0
    ) {
      setIsFavorited(true);
    }
    setAdvertState(advert?.state !== 'default' ? advert?.state : advert?.type);
  }, [advert?._id, userData]);

  return (
    <Row justify="center">
      <Col xs={20} lg={16}>
        <Divider>{translate('advert.detail.title')}</Divider>
        {renderAdvert()}
      </Col>
    </Row>
  );
};

export default AdvertPage;
