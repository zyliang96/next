import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from '@alifd/next';
import { type SelectProps } from '@alifd/next/types/select';
import { APAConfigProvider } from '@alifd/apa-sdk';

const dataSource = [
    { label: '1', value: 1 },
    { label: '10', value: 10 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
];

const handleChange: SelectProps['onChange'] = value => {
    console.log('handleChange: ', value);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="前后缀"
        regionId="Select-select-label-demo"
        regionDesc="Select增加前后缀"
        isRegisterChildren
    >
        <Select
            label="size:"
            innerAfter={<span style={{ color: '#999', marginRight: 4 }}>GB</span>}
            dataSource={dataSource}
            onChange={handleChange}
        />
    </APAConfigProvider>,
    mountNode
);
