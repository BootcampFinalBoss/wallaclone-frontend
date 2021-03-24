import React from 'react';
import { Spin } from 'antd';
import { BugOutlined } from '@ant-design/icons';

const antIcon = <BugOutlined style={{ fontSize: 40 }} spin />;

const LoaderWithContainer = () => (
  <div className="loader-container">
    <Spin indicator={antIcon} />
  </div>
);

export const Loader = () => <Spin indicator={antIcon} />;

export default LoaderWithContainer;
