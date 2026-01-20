import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from '@alifd/next';
import { type SelectProps } from '@alifd/next/types/select';
import { APAConfigProvider } from '@alifd/apa-sdk';

const dataSource = [
    { value: '10001', label: 'Lucy King' },
    { value: 10002, label: 'Lily King' },
    { value: 10003, label: 'Tom Cat', disabled: true },
];

const handleChange: SelectProps['onChange'] = value => {
    console.log(value);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="对象数据"
        regionId="Select-use-detail-value-demo"
        regionDesc="useDetailValue把value onChange第一个参数从字符串变成对象"
        isRegisterChildren
    >
        <Select
            useDetailValue
            defaultValue={{ value: '10001', label: 'Lucy King' }}
            onChange={handleChange}
            dataSource={dataSource}
            style={{ width: 150 }}
        />
    </APAConfigProvider>,
    mountNode
);
