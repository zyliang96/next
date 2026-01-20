import React from 'react';
import ReactDOM from 'react-dom';
import { Tab } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="简单用法"
        regionId="Tab-basic-demo"
        regionDesc="Tab简单用法示例"
        isRegisterChildren
    >
        <Tab>
            <Tab.Item title="Home" key="1">
                Home content
            </Tab.Item>
            <Tab.Item title="Documentation" key="2">
                Doc content
            </Tab.Item>
            <Tab.Item title="Help" key="3">
                Help Content
            </Tab.Item>
        </Tab>
    </APAConfigProvider>,
    mountNode
);
