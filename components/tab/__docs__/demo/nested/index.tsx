import React from 'react';
import ReactDOM from 'react-dom';
import { Tab } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

function callback(key: string) {
    console.log(key);
}

ReactDOM.render(
    <APAConfigProvider
        regionName="选项卡嵌套"
        regionId="Tab-nested-demo"
        regionDesc="Tab选项卡嵌套示例"
        isRegisterChildren
    >
        <Tab onChange={callback} shape="wrapped">
            <Tab.Item title="Tab 1" key="1">
                <Tab shape="wrapped">
                    <Tab.Item title="1-1" key="11">
                        1-1
                    </Tab.Item>
                    <Tab.Item title="1-2" key="12">
                        1-2
                    </Tab.Item>
                    <Tab.Item title="1-3" key="13">
                        1-3
                    </Tab.Item>
                </Tab>
            </Tab.Item>
            <Tab.Item title="Tab 2" key="2">
                <Tab shape="pure">
                    <Tab.Item title="2-1" key="21">
                        2-1
                    </Tab.Item>
                    <Tab.Item title="2-2" key="22">
                        2-2
                    </Tab.Item>
                    <Tab.Item title="3-3" key="23">
                        2-3
                    </Tab.Item>
                </Tab>
            </Tab.Item>
            <Tab.Item title="Tab 3" key="3">
                <Tab shape="capsule">
                    <Tab.Item title="3-1" key="31">
                        3-1
                    </Tab.Item>
                    <Tab.Item title="3-2" key="32">
                        3-2
                    </Tab.Item>
                    <Tab.Item title="3-3" key="33">
                        3-3
                    </Tab.Item>
                </Tab>
            </Tab.Item>
            <Tab.Item title="Tab 4" key="4">
                <Tab shape="text">
                    <Tab.Item title="4-1" key="41">
                        4-1
                    </Tab.Item>
                    <Tab.Item title="4-2" key="42">
                        4-2
                    </Tab.Item>
                    <Tab.Item title="4-3" key="43">
                        4-3
                    </Tab.Item>
                </Tab>
            </Tab.Item>
        </Tab>
    </APAConfigProvider>,
    mountNode
);
