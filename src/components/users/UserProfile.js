import React, { useEffect, useState } from 'react';
import { Card, PageHeader, Image, Row, Col, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import { deleteUser } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { getLoggedUser } from '../../store/selectors';
import Title from 'antd/lib/typography/Title';
import { user } from '../../api';
import AdvertCard from '../adverts/AdvertsList/AdvertCard';
import { Content } from 'antd/lib/layout/layout';
import translate from '../../intl/translate';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import AdvertListUser from '../adverts/AdvertsList/AdvertListUser';

const { confirm } = Modal;

const UserProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const loggedUser = useSelector((state) => getLoggedUser(state));
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const myProfile = translate('profile.title')
  let pageTitle = loggedUser.username === params.username ? myProfile : '';

  const handleGetUserData = async () => {
    setLoading(true);
    let fetchedUserData = await user.getUser(params.username);
    setProfileData(fetchedUserData);
    setLoading(false);
  };

  console.log(loggedUser);

  useEffect(() => {
    console.log(params);
    handleGetUserData();
  }, [params]);

  if (!profileData && !loading) {
    return <Redirect to="/404" />;
  }

  if (loading) {
    return (
      <Content>
        <Title level={1}>{translate('ui.loading')}</Title>
      </Content>
    );
  }

  const showFav =  showFavorites ? translate('buttonProfile.showAdverts') : translate('buttonProfile.showFavorite')

  const handleDeleteUser = async () => {
    const res = await dispatch(deleteUser(profileData._id));
    if (res) {
      if (res.status === 200) {
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

  const showConfirmDelete = () => {
    const msgTitle = translate('deleteModal.title')
    confirm({
      title: 'Aqui',
      icon: <ExclamationCircleOutlined />,
      content:
          'aqui',
      okText: 'aqui',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDeleteUser();
      },
      onCancel() {},
    });
  };

  const showFavsAdsBtn = 'Show User Favorites';
  const showUserAdsBtn = 'Show User Adverts';

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title={pageTitle} />
      <Card
        title={translate('profile.profileUser')}
        style={{ maxWidth: 1200, textAlign: 'center', padding:  '0 1rem', margin:'1rem 0'}}
        actions={[
          /*<Button
            onClick={() => setShowFavorites((prev) => !prev)}
            key="advert"
            type="default"
            shape="round"
            size={64}>
            {showFav}
          </Button>,
          <Button
            onClick={() => history.push(`/user-edit/${loggedUser.userId}`)}
            key="edit"
            type="primary"
         shape="round"
            size={64}>
            {translate('buttonProfile.edit')}
          </Button>,
          <Button
            key="delete"
            type="danger"
            shape="round"
            onClick={showConfirmDelete}
            size={64}>
            {translate('buttonProfile.delete')}
          </Button>*/
        ]}

      >
        <Row className="text-left">
          <Col span={14}>
            <span>{translate('profile.name')}</span>
            <p>{profileData?.name}</p>
            <span>{translate('profile.username')}</span>
            <p>{profileData?.username}</p>
            <span>Email</span>
            <p>{profileData?.email}</p>
          </Col>
          <Col span={8}>
            <Image
              style={{ minWidth: 150, padding: '0 1rem' }}
              src={`${process.env.REACT_APP_IMAGE_AVATAR_BASE_URL}/${profileData?.avatar}`}
            />
          </Col>
        </Row>
      </Card>
      {loggedUser.username === params.username && (
          <Col
              span={24}
              style={{
                justifyContent: 'space-around',
                display: 'flex',
                marginTop: '20px',
                borderTop: '1px solid gray',
                padding: '1rem 0 .3rem 0'
              }}>
      <Button
          onClick={() => setShowFavorites((prev) => !prev)}
          key="advert"
          type="default"
          shape="round"
          size={64}>
        {showFav}
      </Button>
      <Button
          onClick={() => history.push(`/user-edit/${loggedUser.userId}`)}
          key="edit"
          type="primary"
          shape="round"
          size={64}>
        {translate('buttonProfile.edit')}
      </Button>
      <Button
          key="delete"
          type="danger"
          shape="round"
          onClick={showConfirmDelete}
          size={64}>
        {translate('buttonProfile.delete')}
      </Button>
          </Col>
      )}
      {showFavorites ? (
        <Row justify="center" style={{ marginTop: '2rem' }}>
          <Col span={20}>
            {profileData && (
              <Row gutter={[24, 24]} justify="center">
                {profileData?.favorites.map((ad) => {
                  return (
                    <AdvertCard
                      key={`${ad._id}-favorite`}
                      ad={ad}
                      hideSeller={true}
                    />
                  );
                })}
              </Row>
            )}
          </Col>
        </Row>
      ) : (
        <Row justify="center" style={{ marginTop: '2rem' }}>
          <Col span={24}>
            {profileData && (
              <Row gutter={[24, 24]} justify="center">
                {profileData?.adverts.map((ad) => {
                  return (
                    <AdvertCard
                      key={`${ad._id}-adverts`}
                      ad={ad}
                      hideSeller={true}
                    />
                  );
                })}
              </Row>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};
export default UserProfile;
