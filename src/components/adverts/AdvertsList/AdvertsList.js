/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Button, Divider, PageHeader } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import AdvertCard from './AdvertCard';
import { getLoggedUser } from '../../../store/selectors';
import translate from '../../../intl/translate';
import { Loader } from '../../globals/Loader';

const { Title, Paragraph } = Typography;

const NoMoreAdverts = ({ text }) => (
  <Col span={24} className="text-center">
    <Divider />
    <Paragraph>{text ? text : translate('advertsPage.pNoAdverts')}</Paragraph>
    <CreateNew />
  </Col>
);

const AdvertsList = ({ adverts, ui, fetchMore }) => {
  if (ui.loading) {
    return (
      <Col xs={20} className="adverts">
        <PageHeader
          className="site-page-header"
          title={translate('advertsList.title')}
        />
        <Row gutter={[24, 24]} style={{ marginBottom: '2em' }} justify="center">
          <Loader />
        </Row>
      </Col>
    );
  }

  return (
    <Col xs={24} className="adverts">
      <PageHeader
        className="site-page-header"
        title={translate('advertsList.title')}
      />

      <Row gutter={[24, 24]} style={{ marginBottom: '2em' }} justify="center">
        {adverts?.length > 1 && (
          <InfiniteScroll
            dataLength={adverts?.length || 10} // This is important field to render the next data
            next={fetchMore}
            hasMore={ui.hasMoreAdverts}
            loader={<Loader />}
            endMessage={<NoMoreAdverts />}>
            <Row gutter={[24, 24]} justify="center">
              {adverts?.map((ad) => {
                return <AdvertCard key={ad._id} ad={ad} />;
              })}
            </Row>
          </InfiniteScroll>
        )}
        {adverts?.length === 1 &&
          adverts?.map((ad) => {
            return <AdvertCard key={ad._id} ad={ad} />;
          })}
        {adverts?.length === 1 && <NoMoreAdverts />}
        {(!adverts || adverts?.length === 0) && (
          <Col className="text-center">
            <Paragraph>{translate('advertsPage.pNoAdverts')}</Paragraph>
            <CreateNew />
          </Col>
        )}
      </Row>
    </Col>
  );
};

AdvertsList.propTypes = {
  adverts: PropTypes.array,
  ui: PropTypes.object,
  fetchMore: PropTypes.func,
};

const CreateNew = () => {
  const history = useHistory();
  const goCreateOne = () => {
    history.push('/adverts/new');
  };
  const goRegister = () => {
    history.push('/register');
  };
  const goLogin = () => {
    history.push('/login');
  };
  const auth = useSelector((state) => getLoggedUser(state));

  if (auth?.token) {
    return (
      <Row justify="center">
        <Button onClick={goCreateOne} shape="round">
          {translate('advertsPage.createOne')}
        </Button>
      </Row>
    );
  }
  return (
    <Row justify="center">
      <Paragraph>{translate('advertsList.haveAccount')}</Paragraph>
      <Button onClick={goLogin} shape="round" className="mx-3">
        {translate('advertsList.logAndCreateBtn')}
      </Button>
      <Divider></Divider>
      <Paragraph>{translate('advertsList.member')}</Paragraph>
      <Button onClick={goRegister} shape="round" className="mx-3">
        {translate('advertsList.regAndCreateBtn')}
      </Button>
    </Row>
  );
};

export default AdvertsList;
