import React from 'react';
import ReactDOM from 'react-dom';
import { Calendar } from '@alifd/next';
import moment from 'moment';
import { type CalendarProps } from '@alifd/next/lib/calendar';
import { APAConfigProvider } from '@alifd/apa-sdk';

const currentDate = moment();
const disabledDate: CalendarProps['disabledDate'] = function (date) {
    return date.valueOf() > currentDate.valueOf();
};

ReactDOM.render(
    <APAConfigProvider
        regionName="Calendar不可选择的日期设置的Demo"
        regionId="calendar-disabled-date-demo"
        regionDesc="Calendar不可选择的日期设置的Demo"
        isRegisterChildren
    >
        <div className="wrapped-calendar">
            <Calendar disabledDate={disabledDate} shape="card" />
        </div>
    </APAConfigProvider>,
    mountNode
);
