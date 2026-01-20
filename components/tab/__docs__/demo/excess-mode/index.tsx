import React from 'react';
import ReactDOM from 'react-dom';
import { Tab } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const tabs = [
    { tab: 'Home', key: 1 },
    { tab: 'Documnet', key: 2 },
    { tab: 'Setting', key: 3 },
    { tab: 'Help', key: 4 },
    { tab: 'Admin', key: 5 },
    { tab: 'More 1', key: 6 },
    { tab: 'More 2', key: 7 },
    { tab: 'More 3', key: 8 },
    { tab: 'More 4', key: 9 },
    { tab: 'More 5', key: 10 },
    { tab: 'More 6', key: 11 },
    { tab: 'More 7', key: 12 },
    { tab: 'More 8', key: 13 },
    { tab: 'More 9', key: 14 },
    { tab: 'More 10', key: 15 },
    { tab: 'More 11', key: 16 },
];

function onClick(key: string) {
    console.log(key);
}

ReactDOM.render(
    <APAConfigProvider
        regionName="超出时滑动"
        regionId="Tab-excess-mode-demo"
        regionDesc="Tab超出时滑动示例"
        isRegisterChildren
    >
        <div className="fusion-demo" style={{ maxWidth: '520px' }}>
            <Tab excessMode="dropdown">
                {tabs.map(item => (
                    <Tab.Item key={item.key} title={item.tab} onClick={onClick}>
                        {item.tab} content, content, content
                    </Tab.Item>
                ))}
            </Tab>

            <br />
            <Tab excessMode="slide">
                {tabs.map(item => (
                    <Tab.Item key={item.key} title={item.tab} onClick={onClick}>
                        {item.tab} content, content, content
                    </Tab.Item>
                ))}
            </Tab>
        </div>
    </APAConfigProvider>,
    mountNode
);
