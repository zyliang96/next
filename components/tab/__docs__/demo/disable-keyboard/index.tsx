import React from 'react';
import ReactDOM from 'react-dom';
import { Tab } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="禁止键盘事件"
        regionId="Tab-disable-keyboard-demo"
        regionDesc="Tab禁止键盘事件示例"
        isRegisterChildren
    >
        <Tab disableKeyboard>
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
