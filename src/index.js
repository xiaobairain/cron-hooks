/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: Bean
 * @Date: 2020-08-27 15:23:26
 * @LastEditors: Bean
 * @LastEditTime: 2020-08-31 17:37:31
 */
import React, { useState } from 'react';
// import classnames from 'classnames';
import { Tabs, Checkbox, Col, Dropdown, Input } from 'antd';
import CronPane from './PrivateComponents/CronPane';

import './index.less';

const { TabPane } = Tabs;
const options = {
  second: [],
  hour: [],
  day: [],
  month: [],
  week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
};

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 60; i++) {
  options.second.push(`${i}`);
  if (i < 24) options.hour.push(`${i}`);
  if (i > 0 && i < 32) options.day.push(`${i}`);
  if (i > 0 && i < 13) options.month.push(`${i}`);
}
/**
 * @name: cron表达式组件
 * @msg:
 * @param {type}
 * @return {type}
 */
const CronHooks = props => {
  const {
    value = '0 0 0 * * ?',
    type = ['second', 'minute', 'hour', 'day', 'month', 'week'],
    style = { width: 540 },
    onChange,
  } = props;
  const cronArr = value.split(' ');
  const [activeKey, setActiveKey] = useState(type[0]);
  const [cronData, setCronData] = useState({
    second: cronArr[0] || '0',
    minute: cronArr[1] || '0',
    hour: cronArr[2] || '0',
    day: cronArr[3] || '*',
    month: cronArr[4] || '*',
    week: cronArr[5] || '?',
    year: cronArr[6],
  });

  // type类型做映射，确定TabPane是否显示
  const typeMap = {};
  type.map(tp => {
    typeMap[tp] = true;
  });

  // 获取最后的 cron表达式，在表单中使用时，通过onChange上报
  const getValue = data => {
    const { second, minute, hour, day, month, week, year } = data;
    const tempArr = [second, minute, hour, day, month, week, year];
    const val = tempArr.filter(cron => !!cron).join(' ');
    return val;
  };

  const tabsChange = active => {
    setActiveKey(active);
  };

  const createChecks = (option, radiochecked, radio) => {
    const flag = option === 'minute' ? 'second' : option;
    const optionList = options[flag] || [];
    return optionList.map(index => (
      <Col
        key={index}
        span={optionList.length === 7 ? 3 : 4}
        style={{ marginRight: optionList.length === 7 ? 5 : 0 }}
      >
        <Checkbox disabled={radiochecked !== radio} value={index.toString()}>
          {index}
        </Checkbox>
      </Col>
    ));
  };

  // 表达式监听事件
  const expressionChange = (option, val) => {
    const tempCron = { ...cronData };
    tempCron[option] = val;
    setCronData({
      ...cronData,
      [option]: val,
    });
    if (onChange) {
      const inputValue = getValue(tempCron);
      onChange(inputValue);
    }
  };

  return (
    <div className='cron-wrap' style={style}>
      <Tabs activeKey={activeKey} onChange={tabsChange}>
        {typeMap.second && (
          <TabPane tab="秒" key="second">
            <CronPane
              type="second"
              value={cronData.second}
              options={options.second}
              onChange={expressionChange}
              createChecks={createChecks}
            />
          </TabPane>
        )}
        {typeMap.minute && (
          <TabPane tab="分" key="minute">
            <CronPane
              type="minute"
              value={cronData.minute}
              options={options.second}
              onChange={expressionChange}
              createChecks={createChecks}
            />
          </TabPane>
        )}
        {typeMap.hour && (
          <TabPane tab="时" key="hour">
            <CronPane
              type="hour"
              value={cronData.hour}
              options={options.hour}
              onChange={expressionChange}
              createChecks={createChecks}
            />
          </TabPane>
        )}
        {typeMap.day && (
          <TabPane tab="日" key="day">
            <CronPane
              type="day"
              value={cronData.day}
              options={options.day}
              onChange={expressionChange}
              createChecks={createChecks}
            />
          </TabPane>
        )}
        {typeMap.month && (
          <TabPane tab="月" key="month">
            <CronPane
              type="month"
              value={cronData.month}
              options={options.month}
              onChange={expressionChange}
              createChecks={createChecks}
            />
          </TabPane>
        )}
        {typeMap.week && (
          <TabPane tab="周" key="week">
            <CronPane
              type="week"
              value={cronData.week}
              options={options.week}
              onChange={expressionChange}
              createChecks={createChecks}
            />
          </TabPane>
        )}
        {typeMap.year && (
          <TabPane tab="年" key="year">
            year
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export const InputCron = props => {
  const { value, style, lang, type, width, onChange } = props;
  const [state, setState] = useState({
    value: value || '',
    dateVisible: false,
  });

  const handleChange = val => {
    setState({
      ...state,
      value: val,
    });
    if (onChange) {
      onChange(val);
    }
  };
  return (
    <Dropdown
      trigger={['click']}
      placement="bottomLeft"
      visible={state.dateVisible}
      onVisibleChange={visible => setState({ ...state, dateVisible: visible })}
      overlay={<CronHooks onChange={handleChange} value={value} style={style} type={type} />}
    >
      <Input readOnly value={value} style={{ width }} />
    </Dropdown>
  );
};

export default CronHooks;
