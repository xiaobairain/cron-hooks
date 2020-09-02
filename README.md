<!--
 * @Descripttion: 
 * @Author: Bean
 * @Date: 2020-08-31 18:22:59
 * @LastEditors: Bean
 * @LastEditTime: 2020-09-01 09:54:52
-->
# cron-hooks



## Usage
    

```sh

demo:https://chensongtao.github.io/react-cron/src-index

组件依赖
    "react": "16.x",
    "antd": "^4.x",




yarn add cron-hooks   npm install cron-hooks --save


import CronHooks, { InputCron } from 'cron-hooks'



Cron
    onChange
    value
    style // 内容的style
    type={['second', 'minute', 'hour', 'day', 'month', 'week', 'year']}


InputCron
    onChange
    value
    style // 内容的style
    width // input 的宽度
    type={['second', 'minute', 'hour', 'day', 'month', 'week', 'year']}

```

## 1.带Input and Dropdown的cron表达式

```sh
<InputCron 
    onChange 
    value
    type={['second', 'minute', 'hour', 'day', 'month', 'week', 'year']}
/>
```
## 2.cron表达式

```sh
<CronHooks 
    onChange 
    value
    className
    type={['second', 'minute', 'hour', 'day', 'month', 'week', 'year']}
/>
```

## 3. TODO

- [ ] 增加年支持


## LICENSE

MIT
