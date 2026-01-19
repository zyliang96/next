import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

function handleChange(key: string) {
    console.log(key);
}

function handleClick() {
    console.log('hello world');
}

const extraContent = (
    <Button type="primary" onClick={handleClick}>
        Hello world
    </Button>
);

ReactDOM.render(
    <APAConfigProvider
        regionName="附加额外内容"
        regionId="Tab-extra-demo"
        regionDesc="Tab附加额外内容示例"
        isRegiserChildren
    >
        <div className="fusion-demo">
            <div className="demo-item-title">Extra in Horizontal</div>
            <Tab shape="wrapped" onChange={handleChange} extra={extraContent}>
                <Tab.Item title="Tab 1" key="1">
                    Tab 1 Content
                </Tab.Item>
                <Tab.Item title="Tab 2" key="2">
                    Tab 2 Content
                </Tab.Item>
                <Tab.Item title="Tab 3" key="3">
                    Tab 3 Content
                </Tab.Item>
            </Tab>

            <div className="demo-item-title">Extra in Vertical</div>
            <Tab
                shape="wrapped"
                tabPosition="left"
                onChange={handleChange}
                extra={extraContent}
                contentClassName="custom-tab-content"
            >
                <Tab.Item title="Tab 1" key="1">
                    Tab 1 Content
                </Tab.Item>
                <Tab.Item title="Tab 2" key="2">
                    Tab 2 Content
                </Tab.Item>
                <Tab.Item title="Tab 3" key="3">
                    Tab 3 Content
                </Tab.Item>
            </Tab>
        </div>
    </APAConfigProvider>,
    mountNode
);
