import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const { RangePicker, MonthPicker, YearPicker, WeekPicker } = DatePicker;
const onChange = (val: unknown) => console.log(val);

ReactDOM.render(
    <APAConfigProvider
        regionName="日期选择器基本使用示例"
        regionId="date-picker-basic-demo"
        regionDesc="日期选择器基本使用示例"
        isRegisterChildren
    >
        <div>
            <DatePicker onChange={onChange} /> <br />
            <br />
            <WeekPicker onChange={onChange} /> <br />
            <br />
            <MonthPicker onChange={onChange} /> <br />
            <br />
            <YearPicker onChange={onChange} /> <br />
            <br />
            <RangePicker onChange={onChange} />
            <br />
            <br />
            <RangePicker type="month" onChange={onChange} />
            <br />
            <br />
            <RangePicker type="year" onChange={onChange} />
        </div>
    </APAConfigProvider>,
    mountNode
);
