/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Col, Descriptions, Divider, Image, Modal, Row, Typography,} from 'antd';

import {ExclamationCircleOutlined, FacebookFilled, StarOutlined, TwitterSquareFilled} from '@ant-design/icons';
import placeholder from '../../assets/photo-placeholder.png';
import {deleteAdvert, loadAdvert} from '../../store/actions';
import {getAdvertOnState, getLoggedUser, getUi} from '../../store/selectors';
import {useDispatch, useSelector} from 'react-redux';
import Swal from 'sweetalert2';
import {addFavoriteAdvert, removeFavoriteAdvert, updateAdvertState,} from '../../api/adverts';
import translate from '../../intl/translate';
import Chip from '@material-ui/core/Chip';

const {confirm} = Modal;

const {Title, Paragraph} = Typography;

const AdvertPage = ({history, ...props}) => {
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
      const titleType = type === 'sell' ? translate('advertsCard.sell') : translate('advertsCard.buy');

      return (
          <Row style={{marginBottom: '3em', border: '1px solid gray', padding: '1rem', borderRadius: 20}}>
            <Col span={24}>
              <Row>
                <Col span={12}>
              <Title level={2}>
                {name} - {titleType}
              </Title>
              <Paragraph>
                <div style={{display: 'flex', flex: 'row'}}>
                  <p>
                    <Chip
                        label={`Precio: ${price} €`}
                        color="secondary"
                        style={{fontSize: '1rem'}}>
                    </Chip>
                  </p>
                  <p>
                    {advertState === 'reserved' ? (
                        <Chip
                            label={translate('advert.reserved')}
                            color="secondary"
                            style={{
                              fontSize: '1rem',
                              backgroundColor: '#BC876C',
                              margin: '0 1rem',
                            }}
                        />
                    ) : advertState === 'sold' ? (
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
              </Paragraph>
              <Row style={{marginTop: 20}}>
                <p style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  borderRadius: 30,
                  padding: '.5rem',
                  fontSize: '1rem'
                }}>
                  {`Tags: ${tags && tags?.join(', ')}`}
                </p>
              </Row>
              {advert.favorites && (
                  <Row
                      style={{
                        margin: '20px 0',
                      }}>
                    <Paragraph>
                      {translate('advert.detail.hasNFavorites')}:{' '}
                      {advert.favorites.length}
                    </Paragraph>
                  {/* {userData.token && (

                    )}*/}
                  </Row>
              )}
              <Row style={{
                margin: '20px 0',
              }}>
              <Button className="btn-favorites" onClick={handleToggleAdvert} shape='round'>
                {isFavorited ? removeFavoriteLabel : addFavoriteLabel}
                <StarOutlined/>
              </Button>
              </Row>
                </Col>
                <Col span={12}>
                  <Image
                      src={image}
                      alt={name}
                      width={300}
                      height={280}
                      fallback={placeholder}
                  />
                </Col>
              </Row>
              <Descriptions
                  bordered
                  title={translate('advert.description')}
              >
                <Paragraph>{description}</Paragraph>
              </Descriptions>
              <Row
                  style={{marginTop: '20px',}}
                  gutter={[24, 24]}>
                    <Col span={24}>
                        <Paragraph>{translate('global.share')}:</Paragraph>
                        <Row>
                            <Button className="button-margin-right share-buttons" shape='round'>
                                <FacebookFilled/>
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
                          <Button className="share-buttons" shape='round'>
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
              {userData.userId === advert.user._id && (
                <Col
                    span={24}
                    style={{
                      justifyContent: 'space-between',
                      display: 'flex',
                      marginTop: '20px',
                      borderTop: '1px solid gray',
                      padding: '1rem 0 .3rem 0'
                    }}>
                    <Button shape='round' onClick={goToEditAdvert}>{translate('buttonAdvert.edit')}</Button>
                    <Button shape='round' danger onClick={showConfirmDelete}>
                      {translate('buttonAdvert.delete')}
                    </Button>
                    <Button shape='round'
                            style={{marginRight: '20px', borderColor: 'purple'}}
                            onClick={() => handleChangeState('reserved')}>
                      {translate('buttonAdvert.reserved')}
                    </Button>
                    <Button shape='round'
                            style={{marginRight: '20px'}}
                            onClick={() => handleChangeState('sold')}>
                      {translate('buttonAdvert.sold')}
                    </Button>
                    <Button shape='round' onClick={() => handleChangeState('default')}>
                      {translate('buttonAdvert.nothing')}
                    </Button>
                </Col>)}
            </Col>
          </Row>
      )};
  }



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
