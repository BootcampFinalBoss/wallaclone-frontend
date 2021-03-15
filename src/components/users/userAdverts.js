import React, {useEffect}from 'react';
import { Row, Col, PageHeader} from 'antd';
import 'antd/dist/antd.css';
import "../../assets/styles/styles.css"
import {useDispatch, useSelector} from 'react-redux';
import {loadAdvertUser} from '../../store/actions';
import {useParams} from 'react-router-dom';
import {getAdvertsOnState} from '../../store/selectors';
import AdvertCard from '../adverts/AdvertsList/AdvertCard';


const UserAdverts = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const advert = useSelector((state) => getAdvertsOnState(state));
    console.log(advert);


    useEffect(() => {
       dispatch(loadAdvertUser(id))
    }, []);

    return (
        <div className="containerPrincipalRegister">
            <PageHeader className="site-page-header" title="Adverts User" />


                {advert && (
                    <Row gutter={[12, 12, 12]}>
                        {advert.map((ad) => {
                            return <AdvertCard key={ad._id} ad={ad} checkDetail={true} />;
                        })}
                    </Row>
                )}


        </div>
    );
};

export default UserAdverts;
