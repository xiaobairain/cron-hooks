/*
 * @Descripttion:
 * @Author: Bean
 * @Date: 2020-08-28 14:39:29
 * @LastEditors: Bean
 * @LastEditTime: 2020-08-31 16:02:43
 */

// CRON组件对应的默认数据

const second = {
  '1': '*',
  '2': '1-1',
  '3': '1/1',
  '4': '0',
};

const minute = {
  ...second,
};

const hour = {
  ...second,
};

const day = {
  ...second,
  '4': '1',
  '5': '?',
};

const month = {
  ...second,
  '4': '1',
};

const week = {
  '1': '*',
  '4': 'MON',
  '5': '?',
  '6': 'SUN-FRI',
  '7': 'SUN#1',
  '8': 'MONL',
};

const year = {
  '1': '*',
  '2': '1-1',
  '3': '1/1',
  '4': '1',
};

export const localeMap = {
  second: '秒',
  minute: '分',
  hour: '时',
  day: '日',
  month: '月',
  week: '周',
  year: '年',
};

export default {
  second,
  minute,
  hour,
  day,
  month,
  week,
  year,
};
