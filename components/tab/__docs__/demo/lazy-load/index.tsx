import React from 'react';
import ReactDOM from 'react-dom';
import { Tab } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const tabs = [
    { tab: 'Home', key: 0, content: 'This is home page' },
    { tab: 'Document', key: 1, content: 'This is document page' },
    { tab: 'API', key: 2, content: 'This is api page' },
];

ReactDOM.render(
    <APAConfigProvider
        regionName="按需加载和自动卸载"
        regionId="Tab-lazy-load-demo"
        regionDesc="Tab按需加载和自动卸载示例"
        isRegiserChildren
    >
        <div>
            <div>use lazyLoad=false to render all tab items</div>
            <Tab lazyLoad={false}>
                {tabs.map(item => (
                    <Tab.Item key={item.key} title={item.tab}>
                        {item.content}
                    </Tab.Item>
                ))}
            </Tab>
            <br />
            <div>Unmount other items while switch tab</div>
            <Tab unmountInactiveTabs>
                {tabs.map(item => (
                    <Tab.Item key={item.key} title={item.tab}>
                        {item.content}
                    </Tab.Item>
                ))}
            </Tab>
        </div>
    </APAConfigProvider>,
    mountNode
);
