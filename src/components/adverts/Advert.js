/* eslint-disable react/prop-types */
import client from '../../api/client';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Col,
  Descriptions,
  Image,
  Modal,
  Row,
  Typography,
  Select,
} from 'antd';

import {
  ExclamationCircleOutlined,
  FacebookFilled,
  StarOutlined,
  TwitterSquareFilled,
  CommentOutlined
} from '@ant-design/icons';
import placeholder from '../../assets/photo-placeholder.png';
import { deleteAdvert, loadAdvert } from '../../store/actions';
import { getAdvertOnState, getLoggedUser, getUi } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  addFavoriteAdvert,
  removeFavoriteAdvert,
  updateAdvertState,
} from '../../api/adverts';
import translate from '../../intl/translate';
import Chip from '@material-ui/core/Chip';
import './Advert.css';

const { confirm } = Modal;

const { Title, Paragraph } = Typography;

const AdvertOptionsModal = ({
  showOptionsModal,
  goToEditAdvert,
  showConfirmDelete,
  setShowOptionsModal,
  handleChangeState,
}) => {
  return (
    <Modal
      visible={showOptionsModal}
      title={translate('advert.advancedOptions.title')}
      closable
      onCancel={() => setShowOptionsModal(false)}
      footer={
        <Row justify="space-between">
          <Col span={8} style={{ display: 'flex' }}>
            <Button onClick={goToEditAdvert}>
              {translate('buttonAdvert.edit')}
            </Button>
          </Col>
          <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button danger onClick={showConfirmDelete}>
              {translate('buttonAdvert.delete')}
            </Button>
          </Col>
          <Col span={8}>
            <Button
              key="submit"
              type="primary"
              onClick={() => setShowOptionsModal(false)}>
              {translate('buttonAdvert.showAdvancedOptions.close')}
            </Button>
          </Col>
        </Row>
      }>
      <Row className="advert__button-col">
        <Col span={24}>
          <p>{translate('buttonAdvert.changeState.title')}:</p>
          <Select
            style={{ width: 100 }}
            onChange={(value) => {
              handleChangeState(value);
            }}>
            <Select.Option value="reserved">
              {translate('buttonAdvert.reserved')}
            </Select.Option>
            <Select.Option value="sold">
              {translate('buttonAdvert.sold')}
            </Select.Option>
            <Select.Option value="default">
              {translate('buttonAdvert.nothing')}
            </Select.Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  );
};

const AdvertPage = ({ history, ...props }) => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => getUi(state));
  const userData = useSelector((state) => getLoggedUser(state));
  const getAdvertId = () => props.match.params.nameId?.split('-')[1];
  const advert = useSelector((state) => getAdvertOnState(state));
  const [isFavorited, setIsFavorited] = useState(false);
  const [advertFavorites, setAdvertFavorites] = useState(0);
  const [advertState, setAdvertState] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);  

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
      setAdvertFavorites((prev) => prev + 1);
    } else {
      await removeFavoriteAdvert(advert._id, userData.userId);
      setIsFavorited(false);
      setAdvertFavorites((prev) => prev - 1);
    }
  };

  const handleContactAdvert = async () => {
   const {_id} = advert;
   const {username} = userData;
   const res = await client.post(`/advert/contact/${_id}`, {username});
   if(res){
     if(res.status === 200){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.data.msg,
        showConfirmButton: false,
        timer: 2400,
      });
      return;
     }
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

      const advertNameNoSpaces = advert?.name.replace(/\s/gi, '%20');

      const advertLink = `${process.env.REACT_APP_FRONT_END}/${advertNameNoSpaces}-${advert?._id}`;

      const titleType =
        type === 'sell'
          ? translate('advertsCard.sell')
          : translate('advertsCard.buy');

      return (
        <Row className="advert-container">
          <Col span={24}>
            <Image
              className="advert__image"
              src={image}
              alt={name}
              fallback={placeholder}
            />
          </Col>
          <Col span={24}>
            <Row>
              <Title className="advert__title" level={2}>
                {name} - {titleType}
              </Title>
              <div className="advert__tags">
                {advert.favorites && (
                  <>
                    <div className="advert__favorites">
                      {translate('advert.detail.hasNFavorites', {
                        favorites: advertFavorites,
                      })}
                    </div>
                  </>
                )}
                {advertState === 'reserved' ? (
                  <Chip
                    label={translate('advert.reserved')}
                    color="secondary"
                    style={{
                      fontSize: '1rem',
                      backgroundColor: '#BC876C',
                    }}
                  />
                ) : advertState === 'sold' ? (
                  <Chip
                    label={translate('advert.sold')}
                    color="secondary"
                    style={{
                      fontSize: '1rem',
                      backgroundColor: '#027E0B',
                    }}
                  />
                ) : (
                  ''
                )}
              </div>
            </Row>
            <Row style={{ position: 'relative' }}>
              <Title level={3} style={{ marginBottom: '2rem' }}>
                {translate('advert.priceWithNumber', { price })}
              </Title>
            </Row>
            <Descriptions bordered title={translate('advert.description')}>
              <Paragraph>{description}</Paragraph>
            </Descriptions>
            <Paragraph style={{ marginTop: '2rem' }}>
              <b>Tags: </b>
              {tags?.join(', ')}
            </Paragraph>
            <Row style={{ marginTop: '20px' }} gutter={[24, 24]}>
              <Col span={24} className="advert__buttons">
                <Paragraph>{translate('global.share')}:</Paragraph>
                <Row>
                  <Button
                    className="button-margin-right share-buttons"
                    shape="round">
                    <FacebookFilled />
                    <div data-href={advertLink}>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${advertLink}`}>
                        {translate('global.share')}
                      </a>
                    </div>
                  </Button>
                  <Button
                    className="button-margin-right share-buttons"
                    shape="round">
                    <TwitterSquareFilled />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="twitter-share-button"
                      href={`https://twitter.com/intent/tweet?text=Check%20this%20awesome%20advert!%20${advertLink?.toString()}`}>
                      Tweet
                    </a>
                  </Button>
                  {userData.userId && (
                    <Button
                      className="btn-favorites button-margin-right"
                      onClick={handleToggleAdvert}
                      shape="round">
                      {isFavorited ? removeFavoriteLabel : addFavoriteLabel}
                      <StarOutlined />
                    </Button>
                  )}
                  {userData.userId && (
                    <Button
                      className="btn-favorites"
                      onClick={handleContactAdvert}
                      shape="round"
                      >
                        {translate('global.contact')}
                      <CommentOutlined />
                    </Button>
                  )}
                </Row>
              </Col>
            </Row>
            {userData.userId === advert.user._id && (
              <Row className="advert__button-col">
                <Button
                  className="advert__button"
                  shape="round"
                  onClick={() => {
                    setShowOptionsModal(true);
                  }}>
                  {translate('buttonAdvert.showAdvancedOptions.title')}
                </Button>
              </Row>
            )}
          </Col>
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
    setAdvertFavorites(advert?.favorites?.length || 0);
  }, [advert?._id, userData]);

  return (
    <Row justify="center">
      <Col xs={20} lg={12}>
        {renderAdvert()}
      </Col>
      <AdvertOptionsModal
        showOptionsModal={showOptionsModal}
        handleChangeState={handleChangeState}
        showConfirmDelete={showConfirmDelete}
        goToEditAdvert={goToEditAdvert}
        setShowOptionsModal={setShowOptionsModal}
      />
    </Row>
  );
};

export default AdvertPage;
