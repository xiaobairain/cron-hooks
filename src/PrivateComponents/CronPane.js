/* eslint-disable no-unused-vars */
/*
 * @Descripttion:
 * @Author: Bean
 * @Date: 2020-08-27 16:04:32
 * @LastEditors: Bean
 * @LastEditTime: 2020-08-31 17:04:21
 */
import React, { useState} from 'react';
import { Radio, InputNumber, Row, Checkbox, Select, Divider, Alert } from 'antd';
import defaultData, { localeMap } from './BASICDATA';
import './components.less';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const CronPane = props => {
  const { value = '0', type = 'second', options = [], onChange, createChecks } = props;
  const [errMessage, setErrMessage] = useState('');
  const defaultSecond = defaultData[type];
  const defaultInputData = {
    cycles: ['1', '1'],
    ranges: ['1', '1'],
    checks: type === 'week' ? ['MON'] : [options[0]],
    weekRanges: ['SUN', 'FRI'],
    weekSeveral: ['SUN', '1'],
    weekl: 'MON',
  };
  let radiochecked = '1';
  if (value === '*') {
    radiochecked = '1';
  } else if (value === '?') {
    radiochecked = '5';
  } else if (value.indexOf('-') > -1) {
    const tempValue = value.split('-');
    if (type === 'week') {
      radiochecked = '6';
      defaultInputData.weekRanges = tempValue;
    } else {
      radiochecked = '2';
      defaultInputData.cycles = tempValue;
    }
  } else if (value.indexOf('/') > -1) {
    radiochecked = '3';
    defaultInputData.ranges = value.split('/');
  } else if (value.indexOf('#') > -1) {
    radiochecked = '7';
    defaultInputData.weekSeveral = value.split('#');
  } else if (value.indexOf('L') > -1) {
    radiochecked = '8';
    defaultInputData.weekl = value.slice(0, value.length - 1);
  } else {
    // 数组类型
    radiochecked = '4';
    defaultInputData.checks = value.split(',');
  }

  const checkRange = () => {
    setErrMessage('数据范围有误，请校对!');
  };

  // radio更改，赋给默认的second对应数据，以重新渲染选中的radio
  const onRadioChange = e => {
    const secondRadio = e.target.value;
    onChange(type, defaultSecond[secondRadio]);
  };

  // checkbox更改直接修改数据
  const onCheckboxChange = checkedValues => {
    const data = Array.from(new Set(checkedValues));
    onChange(type, data.join(','));
  };

  const inputChange = (inputValue, option, index, connectLine) => {
    let reportData = '';
    if (radiochecked !== '8') {
      defaultInputData[option][index] = `${inputValue}`;
      reportData = defaultInputData[option].join(connectLine);
    } else {
      // 周 -- 本月的最后一个星期， 数据是末尾加 L 标识的字符串
      defaultInputData[option] = `${inputValue}L`;
      reportData = defaultInputData[option];
    }
    onChange(type, reportData);
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <>
      {errMessage ? <Alert message={errMessage} banner /> : null}
      <RadioGroup name="radiogroup" value={radiochecked} onChange={onRadioChange}>
        <Radio style={radioStyle} value="1">
          {/* localeMap[type]  秒/分/时/日/月 */}
          每一{localeMap[type]}
        </Radio>
        {(type === 'day' || type === 'week') && (
          <Radio style={radioStyle} value="5">
            不指定
          </Radio>
        )}
        {type === 'week' && (
          <>
            <Radio style={radioStyle} value="6">
              <span className='right5'>按周期 周期从 星期</span>
              <span
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Select
                  disabled={radiochecked !== '6'}
                  value={defaultInputData.weekRanges[0] || ''}
                  size="small"
                  onChange={val => inputChange(val, 'weekRanges', 0, '-')}
                  style={{ width: 100 }}
                >
                  {options.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </span>
              <Divider type="vertical" className='divider' />
              <span
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Select
                  disabled={radiochecked !== '6'}
                  value={defaultInputData.weekRanges[1] || ''}
                  size="small"
                  onChange={val => inputChange(val, 'weekRanges', 1, '-')}
                  style={{ width: 100 }}
                >
                  {options.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </span>
            </Radio>
            <Radio style={radioStyle} value="7">
              <span className='right5'>本月第</span>
              <InputNumber
                disabled={radiochecked !== '7'}
                min={1}
                max={5}
                value={defaultInputData.weekSeveral[1] || ''}
                size="small"
                onChange={val => inputChange(val, 'weekSeveral', 1, '#')}
                style={{ width: 100 }}
              />
              <span className='lr5'>周 的星期</span>
              <span
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Select
                  disabled={radiochecked !== '7'}
                  value={defaultInputData.weekSeveral[0] || ''}
                  size="small"
                  onChange={val => inputChange(val, 'weekSeveral', 0, '#')}
                  style={{ width: 100 }}
                >
                  {options.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </span>
            </Radio>
            <Radio style={radioStyle} value="8">
              <span className='right5'>本月的最后一个星期</span>
              <span
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Select
                  disabled={radiochecked !== '8'}
                  value={defaultInputData.weekl || ''}
                  size="small"
                  onChange={val => inputChange(val, 'weekl')}
                  style={{ width: 100 }}
                >
                  {options.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </span>
            </Radio>
          </>
        )}
        {type !== 'week' && (
          <>
            <Radio style={radioStyle} value="2">
              <span className='right5'>按周期 周期从</span>
              <InputNumber
                disabled={radiochecked !== '2'}
                min={0}
                max={59}
                value={defaultInputData.cycles[0] || ''}
                size="small"
                onChange={val => inputChange(val, 'cycles', 0, '-')}
                style={{ width: 100 }}
              />
              <Divider type="vertical" className='divider' />
              <InputNumber
                disabled={radiochecked !== '2'}
                min={0}
                max={59}
                value={defaultInputData.cycles[1] || ''}
                size="small"
                onChange={val => inputChange(val, 'cycles', 1, '-')}
                style={{ width: 100 }}
              />
              <span className='left5'>{localeMap[type]}</span>
            </Radio>
            <Radio style={radioStyle} value="3">
              <span className='right5'>周期从</span>
              <InputNumber
                disabled={radiochecked !== '3'}
                min={0}
                max={59}
                value={defaultInputData.ranges[0] || ''}
                size="small"
                onChange={val => inputChange(val, 'ranges', 0, '/')}
                style={{ width: 100 }}
              />

              <span className='lr5'>{localeMap[type]}开始， 每</span>
              <InputNumber
                disabled={radiochecked !== '3'}
                min={0}
                max={59}
                value={defaultInputData.ranges[1] || ''}
                size="small"
                onChange={val => inputChange(val, 'ranges', 1, '/')}
                style={{ width: 100 }}
              />
              <span className='left5'>{localeMap[type]} 执行一次</span>
            </Radio>
          </>
        )}
        <Radio value="4">
          <span className='right5'>指定</span>
          <br />
          <CheckboxGroup
            defaultValue={defaultInputData.checks}
            style={{ width: '100%' }}
            onChange={onCheckboxChange}
          >
            <Row> {createChecks(type, radiochecked, '4')} </Row>
          </CheckboxGroup>
        </Radio>
      </RadioGroup>
    </>
  );
};

export default CronPane;
