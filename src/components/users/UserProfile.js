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
import LoaderWithContainer from '../globals/Loader';

const { confirm } = Modal;

const UserProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const loggedUser = useSelector((state) => getLoggedUser(state));
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const myProfile = translate('profile.title');
  let pageTitle = loggedUser.username === params.username ? myProfile : '';

  const handleGetUserData = async () => {
    setLoading(true);
    let fetchedUserData = await user.getUser(params.username);
    setProfileData(fetchedUserData);
    setLoading(false);
  };

  useEffect(() => {
    handleGetUserData();
  }, [params]);

  if (!profileData && !loading) {
    return <Redirect to="/404" />;
  }

  if (loading) {
    return (
      <Content>
        <LoaderWithContainer />
      </Content>
    );
  }

  const showFav = showFavorites
    ? translate('buttonProfile.showAdverts')
    : translate('buttonProfile.showFavorite');

  const handleDeleteUser = async () => {
    const res = await dispatch(deleteUser(loggedUser.userId, loggedUser.token));
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
  const msgTitle = translate('deleteModal.title');

  const showConfirmDelete = () => {
    confirm({
      title: 'Are you sure delete the user account?',
      icon: <ExclamationCircleOutlined />,
      content:
        "This action can't be reversed. Your adverts will be deleted aswell",
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDeleteUser();
      },
      onCancel() {},
    });
  };

  const loggedUserProfileActions = loggedUser.username === params.username && (
    <>
      <Row>
        <Col xs={{ span: 24, my: 2 }} md={{ span: 10, my: 2 }}>
          <Button
            style={{ margin: '.3rem' }}
            onClick={() => setShowFavorites((prev) => !prev)}
            key="advert"
            type="default"
            shape="round"
            size={64}>
            {showFav}
          </Button>
        </Col>
        <Col xs={{ span: 24, my: 2 }} md={{ span: 7, my: 2 }}>
          <Button
            style={{ margin: '.3rem' }}
            onClick={() => history.push(`/user-edit/${profileData.username}`)}
            key="edit"
            type="primary"
            shape="round"
            size={64}>
            {translate('buttonProfile.edit')}
          </Button>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 7 }}>
          <Button
            style={{ margin: '.3rem' }}
            key="delete"
            type="danger"
            shape="round"
            onClick={showConfirmDelete}
            size={64}>
            {translate('buttonProfile.delete')}
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title={pageTitle} />
      <Card
        title={translate('profile.profileUser')}
        style={{ textAlign: 'center', padding: '0 1rem', margin: '1rem 0' }}
        actions={[loggedUserProfileActions || []]}>
        <Row className="text-left">
          <Col span={14}>
            <span>{translate('profile.name')}</span>
            <p>{profileData?.name}</p>
            <span>{translate('profile.username')}</span>
            <p>{profileData?.username}</p>
            <span>Email</span>
            <p>{profileData?.email}</p>
          </Col>
          <Col span={6} offset={2}>
            <Image
              style={{ minWidth: 130, padding: '0 1.3rem' }}
              src='https://res.cloudinary.com/diregndkr/image/upload/v1616622688/avatar/avatar_loekir.png'
            />
          </Col>
        </Row>
      </Card>

      {showFavorites ? (
        <Row justify="center" style={{ marginTop: '2rem' }}>
          <Col span={24}>
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
