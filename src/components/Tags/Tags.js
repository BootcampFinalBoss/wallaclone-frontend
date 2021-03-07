import React from 'react';
import T from 'prop-types';

import { Tag } from 'antd';

// const tagsColors = {
//   tech: 'Tech',
//   audio: 'Audio',
//   lifestyle: 'Lifestyle',
//   sports: 'Sports',
//   games: 'Games',
//   gaming: 'Gaming',
//   mobile: 'Mobile',
//   toys: 'Toys',
//   home: 'Home',
//   forniture: 'Forniture',
//   photography: 'Photography',
// };

const Tags = ({ tags }) =>
  tags.map((tag) => (
    <Tag key={tag}>
      {/* color={tagsColors[tag]} */}
      {tag}
    </Tag>
  ));

Tags.propTypes = {
  tags: T.arrayOf(T.string.isRequired).isRequired,
};

export default Tags;
