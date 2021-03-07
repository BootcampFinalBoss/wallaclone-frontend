/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import AdvertsList from './AdvertsList';
import AdvertsFilters from './AdvertsFilters';
// import BasicFilters from './BasicFilters';

import { loadTags } from '../../../store/actions';
import {
  getAdvertsOnState,
  getUi,
  getTagsOnState,
} from '../../../store/selectors';
import { Row, Typography, Col } from 'antd';
import { useHistory } from 'react-router';

const { Title, Paragraph } = Typography;

const AdvertsContainer = () => {
  const tags = useSelector((state) => getTagsOnState(state));
  const adverts = useSelector((state) => getAdvertsOnState(state));
  const ui = useSelector((state) => getUi(state));
  const history = useHistory();
  // const [isAdvancedFilters, setIsAdvancedFilters] = useState(false);

  const dispatch = useDispatch();

  if (ui.error) {
    console.log('redirect to error page');
    history.push('/500');
  }

  useEffect(() => {
    dispatch(loadTags());
  }, [loadTags]);

  return (
    <Row
      className="adverts__container"
      justify="center"
      align="middle"
      gutter={[0, 24]}>
      <Col span={24}>
        <Title type="h2" className="text-center">
          Adverts page
        </Title>
      </Col>
      <Col span={24}>
        <Row justify="center" align="middle">
          <AdvertsFilters tags={tags} />
          {ui.loading === true && (
            <Paragraph className="general-error-text">Loading...</Paragraph>
          )}
          <AdvertsList adverts={adverts} ui={ui} />
        </Row>
      </Col>
    </Row>
  );
};

export default AdvertsContainer;

// TODO: Add basic filters as extra

// const Filters = ({isAdvancedFilters, setIsAdvancedFilters}) => {
//     return (
//         <>
//         {!isAdvancedFilters && <BasicFilters />}
//         <button type="button" onClick={() => setIsAdvancedFilters(!isAdvancedFilters)} className="mx-auto d-block btn btn-primary py-2 px-5">
//             {isAdvancedFilters ? "Close" : "Open"} advanced search
//         </button>
//         </>
//     )
// }
