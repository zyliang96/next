import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, Box } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="DatePicker日期选择器大小设置的Demo"
        regionId="date-picker-size-demo"
        regionDesc="DatePicker日期选择器大小设置的Demo"
        isRegisterChildren
    >
        <Box direction="row" spacing={20}>
            <DatePicker size="large" />
            <DatePicker />
            <DatePicker size="small" />
        </Box>
    </APAConfigProvider>,
    mountNode
);
