# cron-hooks

## Usage
    

```sh


yarn add cron-hooks  
npm install cron-hooks --save


import {Cron, InputCron} from 'react-crons'



Cron
    onChange
    value
    style // 内容的style
    className
    lang // 支持zh_CN/zh-CN/zh-Hans-CN/en_US/en-US
    type={['second', 'minute', 'hour', 'day', 'month', 'week']}


InputCron
    onChange
    value
    style // 内容的style
    width // input 的宽度
    lang // 支持zh_CN/zh-CN/zh-Hans-CN/en_US/en-US
    type={['second', 'minute', 'hour', 'day', 'month', 'week']}

```

## 1.带Input and Dropdown的cron表达式
```sh
<InputCron 
    onChange 
    value
    style={{ width: 576 }}
    lang='zh_CN'
    type={['second', 'minute', 'hour', 'day', 'month', 'week']}
/>
```
## 2.cron表达式
```sh
<Cron 
    onChange 
    value
    className
    style={{ width: 576 }}
    lang='zh_CN'
    type={['second', 'minute', 'hour', 'day', 'month', 'week']}
/>
```
## LICENSE

MIT
