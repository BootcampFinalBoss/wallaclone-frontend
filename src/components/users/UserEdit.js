/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from 'antd';
import 'antd/dist/antd.css';
import Swal from 'sweetalert2';
import '../../assets/styles/styles.css';
import { editUser, getUserId } from '../../store/actions';
import UserEditForm from './UserEditForm';
import translate from '../../intl/translate';


const UserEdit = ({ ...props }) => {
  let dataInitials = null;
  const id = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const token = state.auth;
  const dataUser = state.user;

  useEffect(() => {
    dispatch(getUserId(id.id, token.token));
  }, []);

  useEffect(() => {
    if (dataUser !== null) {
      dataInitials = {
        name: dataUser.name,
        email: dataUser.email,
        username: dataUser.username,
        avatar: dataUser.avatar,
        surname: dataUser.surname,
      };
    }
    console.log(dataUser, dataInitials);
  }, [dataUser, id, props.match.params.id]);

  const onFinish = async (data) => {
    const res = await dispatch(editUser(id.id, data, token.token));
    console.log(res);
    if (res) {
      console.log(res);
      if (res.status === 200) {
        console.log('Aqui');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data,
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
    }
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title={translate('editUser.title')}/>
      <UserEditForm dataInitials={dataInitials} onFinish={onFinish} />
    </div>
  );
};

export default UserEdit;
