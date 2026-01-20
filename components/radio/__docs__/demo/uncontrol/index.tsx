import React from 'react';
import ReactDOM from 'react-dom';
import { Radio } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const RadioGroup = Radio.Group;

const list = [
    {
        value: 'apple',
        label: 'Apple',
        disabled: false,
    },
    {
        value: 'pear',
        label: 'Pear',
        disabled: true,
    },
    {
        value: 'orange',
        label: 'Orange',
    },
];

const UnControlApp = () => {
    return (
        <div>
            <RadioGroup dataSource={list} defaultValue={'apple'} />
        </div>
    );
};

ReactDOM.render(
    <APAConfigProvider
        regionName="非受控组件"
        regionId="Radio-uncontrol-demo"
        regionDesc="使用RadioGroup渲染的组，通过设置defaultValue属性让组件变成非受控组件"
        isRegisterChildren
    >
        <UnControlApp />
    </APAConfigProvider>,
    mountNode
);
