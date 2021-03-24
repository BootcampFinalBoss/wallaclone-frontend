/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Row, Typography, Col, PageHeader } from 'antd';
import { useHistory } from 'react-router';

import translate from '../../../intl/translate';
import { definitions, storage } from '../../../utils';
import AdvertsList from './AdvertsList';
import AdvertsFilters from './AdvertsFilters';
// import BasicFilters from './BasicFilters';

import { loadAdverts, loadMoreAdverts, loadTags } from '../../../store/actions';
import {
  getAdvertsOnState,
  getUi,
  getTagsOnState,
} from '../../../store/selectors';

import '../../../css/styles.css';
import { sortOptions } from '../../../utils/definitions';
import LoaderWithContainer from '../../globals/Loader';

const { Title, Paragraph } = Typography;

const { MIN_PRICE, MAX_PRICE, saleOptions } = definitions;
const pricesRange = [MIN_PRICE, MAX_PRICE];

const defaultFilters = {
  name: '',
  price: pricesRange,
  tags: [],
  sale: saleOptions.all,
  sort: sortOptions.desc,
};

const AdvertsContainer = () => {
  const tags = useSelector((state) => getTagsOnState(state));
  const adverts = useSelector((state) => getAdvertsOnState(state));
  const ui = useSelector((state) => getUi(state));
  const history = useHistory();
  const [filters, setFilters] = useState(
    storage.get('filters') || defaultFilters,
  );

  const dispatch = useDispatch();

  const fetchMore = () => {
    dispatch(loadMoreAdverts({ ...filters, skip: ui.advertsIndex }));
  };

  if (ui.error) {
    history.push('/500');
  }

  useEffect(() => {
    dispatch(loadTags());
    dispatch(loadAdverts({ ...filters }));
  }, [loadTags]);

  return (
    <div className="containerPrincipal">
      <Row
        className="adverts__container"
        justify="center"
        align="middle"
        gutter={[0, 24]}>
        <Col span={24}>
          <PageHeader
            className="site-page-header"
            title={translate('advertsPage.title')}
          />
        </Col>
        <Col span={24}>
          <Row justify="center" align="middle">
            <AdvertsFilters filters={filters} setFilters={setFilters} />
            {ui.loading === true && <LoaderWithContainer />}
            <AdvertsList adverts={adverts} ui={ui} fetchMore={fetchMore} />
          </Row>
        </Col>
      </Row>
    </div>
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
