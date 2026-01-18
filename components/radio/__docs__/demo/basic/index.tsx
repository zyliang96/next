import React from 'react';
import ReactDOM from 'react-dom';
import { Radio } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="基本"
        regionId="Radio-basic-demo"
        regionDesc="使用Radio渲染的基本组件"
        isRegiserChildren
    >
        <Radio>Fusion Radio</Radio>
    </APAConfigProvider>,
    mountNode
);
