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
    <Paragraph>
      {text
        ? translate('advertsPage.pNoMoreAdverts')
        : translate('advertsPage.pNoAdverts')}
    </Paragraph>
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
            endMessage={<NoMoreAdverts text={true} />}>
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
        {adverts?.length === 1 && <NoMoreAdverts text={true} />}
        {(!adverts || adverts?.length === 0) && (
          <Col span={24} className="text-center">
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
      <Col xs={24} md={12}>
        <Paragraph>{translate('advertsList.haveAccount')}</Paragraph>
        <Button onClick={goLogin} shape="round">
          {translate('advertsList.logAndCreateBtn')}
        </Button>
      </Col>
      <Col xs={24} md={12}>
        <Paragraph>{translate('advertsList.member')}</Paragraph>
        <Button onClick={goRegister} shape="round">
          {translate('advertsList.regAndCreateBtn')}
        </Button>
      </Col>
    </Row>
  );
};

export default AdvertsList;
