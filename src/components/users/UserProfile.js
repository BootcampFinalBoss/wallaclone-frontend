import React, { useEffect, useState } from 'react';
import { Card, PageHeader, Image, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getLoggedUser } from '../../store/selectors';
import Title from 'antd/lib/typography/Title';
import { user } from '../../api';
import AdvertCard from '../adverts/AdvertsList/AdvertCard';
import { Content } from 'antd/lib/layout/layout';
import translate from '../../intl/translate';

let dataExample = {};

const UserProfile = () => {
  const id = useParams();
  const loggedUser = useSelector((state) => getLoggedUser(state));
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  let pageTitle = loggedUser.userId === id ? 'My Profile' : '';
  console.log(id);

  // Get the user id
  // Save the current logged user id on state (Important for better performance on the next step)
  // If the user id is the same as the actual user, is 'my profile'
  // Otherwise is another member

  const handleGetUserData = async () => {
    setLoading(true);
    let fetchedUserData = await user.getUser(id.id);
    setProfileData(fetchedUserData);
    setLoading(false);
  };

  useEffect(() => {
    handleGetUserData();
    console.log(profileData);
  }, [id]);
  console.log(profileData);

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

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title={pageTitle} />,
      <Card
        title="User Profile"
        style={{ maxWidth: 1200, textAlign: 'center', padding: '0 1rem' }}
        actions={[
          <Button key="advert" type="default" size={64}>
            Adverts
          </Button>,
          <Button key="edit" href="/user-edit" type="primary" size={64}>
            Edit
          </Button>,
          <Button key="delete" type="danger" size={64}>
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
              src={`http://localhost:5000/images/avatar/${dataExample.avatar}`}
            />
          </Col>
        </Row>
      </Card>
      <Row>
        <Title level={2}>Adverts</Title>
        {profileData?.adverts?.map((advert) => {
          <Col span={6}>
            <AdvertCard ad={advert} />
          </Col>;
        })}
      </Row>
    </div>
  );
};
export default UserProfile;
