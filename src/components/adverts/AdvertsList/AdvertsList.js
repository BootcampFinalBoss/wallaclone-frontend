import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Button, Divider, PageHeader } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import AdvertCard from './AdvertCard';
import { getLoggedUser } from '../../../store/selectors';
import translate from '../../../intl/translate';

const { Title, Paragraph } = Typography;

const AdvertsList = ({ adverts, ui, fetchMore }) => {
  if (ui.loading) {
    return (
      <Col xs={20} className="adverts">
        <PageHeader
          className="site-page-header"
          title= {translate('advertsList.title')}
        />
        ,
        <Row gutter={[24, 24]} style={{ marginBottom: '2em' }} justify="center">
          <Title level={2}>{translate('ui.loading')}</Title>
        </Row>
      </Col>
    );
  }

  return (
    <Col xs={20} className="adverts">
      <PageHeader
        className="site-page-header"
        title={translate('advertsList.title')}
      />
      ,
      <Row gutter={[24, 24]} style={{ marginBottom: '2em' }} justify="center">
        {adverts?.length > 0 && (
          <InfiniteScroll
            dataLength={adverts?.length || 10} // This is important field to render the next data
            next={fetchMore}
            hasMore={ui.hasMoreAdverts}
            loader={translate('ui.loading')}
            // endMessage={}
          >
            <Row gutter={[24, 24]}>
              {adverts?.map((ad) => {
                return <AdvertCard key={ad._id} ad={ad} checkDetail={true} />;
              })}
            </Row>
          </InfiniteScroll>
        )}
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
  const { token: isLoggedUser } = useSelector((state) => getLoggedUser(state));

  if (isLoggedUser) {
    return (
      <Row justify="center">
        <Button onClick={goCreateOne}>
          {translate('advertsPage.createOne')}
        </Button>
      </Row>
    );
  }
  return (
    <Row justify="center">
      <Paragraph>{translate('advertsList.haveAccount')}</Paragraph>
      <Button onClick={goLogin}>{translate('advertsList.logAndCreateBtn')}</Button>
      <Divider></Divider>
      <Paragraph>{translate('advertsList.member')}</Paragraph>
      <Button onClick={goRegister}>{translate('advertsList.regAndCreateBtn')}</Button>
    </Row>
  );
};

export default AdvertsList;
