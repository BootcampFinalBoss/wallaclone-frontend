import React, { useEffect } from 'react';
import { Select } from 'antd';
import { loadTags } from '../../store/actions';
import { getTagsOnState } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const TagsSelect = ({ ...props }) => {
  const tags = useSelector((state) => getTagsOnState(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTags());
  }, [loadTags]);

  return (
    <Select
      allowClear
      disabled={!tags}
      mode="multiple"
      placeholder="Select tags"
      style={{ width: '100%' }}
      {...props}>
      {tags && tags.map((tag) => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
};

export default TagsSelect;
