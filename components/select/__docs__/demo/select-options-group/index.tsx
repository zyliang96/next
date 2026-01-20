import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const { Option, OptionGroup } = Select;

const dataSource = [
    {
        label: 'label1',
        children: [
            {
                label: 'label1-1',
                value: 'text1-1',
            },
        ],
    },
    {
        label: 'label2',
        children: [
            {
                label: 'label2-1',
                value: 'text2-1',
            },
        ],
    },
];

ReactDOM.render(
    <APAConfigProvider
        regionName="分组"
        regionId="Select-select-options-group-demo"
        regionDesc="使用OptionGroup针对选项进行分组"
        isRegiserChildren
    >
        <div>
            <Select placeholder="OptionGroup" style={{ marginRight: 8 }}>
                <OptionGroup label="group1">
                    <Option value="small">Small</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="large">Large</Option>
                </OptionGroup>
                <OptionGroup label="group2">
                    <Option value="small2">Small2</Option>
                    <Option value="medium2">Medium2</Option>
                    <Option value="large2">Large2</Option>
                </OptionGroup>
            </Select>
            <Select placeholder="use dataSource" dataSource={dataSource} />
        </div>
    </APAConfigProvider>,
    mountNode
);
