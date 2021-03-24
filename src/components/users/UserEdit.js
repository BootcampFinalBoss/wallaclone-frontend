/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from 'antd';
import 'antd/dist/antd.css';
import '../../css/styles.css';
import { editUser, getUserId } from '../../store/actions';
import UserEditForm from './UserEditForm';
import translate from '../../intl/translate';
import { getLoggedUser, getUserData } from '../../store/selectors';
import Swal from 'sweetalert2';

const UserEdit = () => {
  let dataInitials = null;
  const params = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => getLoggedUser(state));
  const dataUser = useSelector((state) => getUserData(state));

  useEffect(() => {
    dispatch(getUserId(params.id, dataInitials));
  }, []);

  if (dataUser !== null) {
    dataInitials = {
      name: dataUser.name,
      email: dataUser.email,
      username: dataUser.username,
      surname: dataUser.surname,
    };
  }

  const onFinish = async (data) => {
    const { userId, token } = auth;
    const res = await dispatch(editUser(userId, data, token));
    if (res) {
      if (res.status === 200) {
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
      <PageHeader
        className="site-page-header"
        title={translate('editUser.title')}
      />
      <UserEditForm dataInitials={dataInitials} onFinish={onFinish} />
    </div>
  );
};

export default UserEdit;
