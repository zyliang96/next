import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, Menu } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const menu = (
    <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
    </Menu>
);

ReactDOM.render(
    <APAConfigProvider
        regionName="触发的事件类型"
        regionId="Dropdown-trigger-type-demo"
        regionDesc="展示如何使用 triggerType 设置触发的事件类型"
        isRegisterChildren={true}
    >
        <Dropdown trigger={<a>Click me</a>} triggerType="click">
            {menu}
        </Dropdown>
    </APAConfigProvider>,
    mountNode
);
