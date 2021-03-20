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

const { confirm } = Modal;

const UserProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams();
  const loggedUser = useSelector((state) => getLoggedUser(state));
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  let pageTitle = loggedUser.userId === id ? 'My Profile' : '';

  const handleGetUserData = async () => {
    setLoading(true);
    let fetchedUserData = await user.getUser(id.id);
    setProfileData(fetchedUserData);
    setLoading(false);
  };

  useEffect(() => {
    handleGetUserData();
  }, [id]);

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

  const handleDeleteUser = async () => {
    const res = await dispatch(deleteUser(id.id, token.token));
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
    confirm({
      title: 'Are you sure delete the user account?',
      icon: <ExclamationCircleOutlined />,
      content:
        "This action can't be reversed. Your adverts will be deleted aswell.",
      okText: 'Yes, delete this user account',
      okType: 'danger',
      cancelText: 'No!!!!',
      onOk() {
        handleDeleteUser();
      },
      onCancel() {},
    });
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title={pageTitle} />
      <Card
        title="User Profile"
        style={{ maxWidth: 1200, textAlign: 'center', padding: '0 1rem' }}
        actions={[
          <Button
            onClick={() => history.push(`/user-adverts/${id}`)}
            key="advert"
            type="default"
            size={64}>
            Adverts
          </Button>,
          <Button
            onClick={() => history.push(`/user-edit/${loggedUser.userId}`)}
            key="edit"
            type="primary"
            size={64}>
            Edit
          </Button>,
          <Button
            key="delete"
            type="danger"
            onClick={showConfirmDelete}
            size={64}>
            Delete
          </Button>,
        ]}>
        <Row className="text-left">
          <Col span={14}>
            <span>Name</span>
            <p>{profileData?.name}</p>
            <span>Username</span>
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
      <Row justify="center">
        <Col span={20}>
          <Title level={2}>Adverts</Title>
          {profileData && (
            <Row gutter={[24, 24]} justify="center">
              {profileData?.adverts.map((ad) => {
                return <AdvertCard key={ad._id} ad={ad} hideSeller={true} />;
              })}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default UserProfile;
