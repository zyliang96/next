import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from '@alifd/next';
import { type SelectProps } from '@alifd/next/types/select';
import { APAConfigProvider } from '@alifd/apa-sdk';

const dataSource: SelectProps['dataSource'] = [
    'Lucy King',
    'Lily King',
    'Jim Green',
    {
        label: 'Chinese',
        children: [
            { value: 'Hang Meimei', label: 'Hang Meimei' },
            'Li Lei',
            { value: 'Gao Hui', label: 'Gao Hui', disabled: true },
            'Zhang San',
            'Li Si',
            'Wang Wu',
            { value: 'Zhao Benshan', label: 'Zhao Benshan', disabled: true },
            'Sun Yang',
            'Song Shuying',
        ],
    },
    {
        label: 'Pets',
        children: ['Poly', 'Kitty'],
    },
];

const onChange: SelectProps['onChange'] = v => {
    console.log(v);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="输入框辅助完成"
        regionId="Select-combobox-demo"
        regionDesc="AutoComplete继承了Input的能力，并在其基础上增加了autoComplete的功能"
        isRegiserChildren
    >
        <Select.AutoComplete
            autoHighlightFirstItem={false}
            style={{ width: 300 }}
            onChange={onChange}
            dataSource={dataSource}
        />
    </APAConfigProvider>,
    mountNode
);
