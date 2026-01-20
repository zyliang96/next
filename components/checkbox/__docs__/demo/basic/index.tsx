import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="基本"
        regionId="Checkbox-basic-demo"
        regionDesc="Checkbox基本使用示例"
        isRegisterChildren
    >
        <Checkbox>Checkbox</Checkbox>
    </APAConfigProvider>,
    mountNode
);
