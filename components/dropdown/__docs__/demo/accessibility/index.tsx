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
        regionName="无障碍支持"
        regionId="Dropdown-accessibility-demo"
        regionDesc="展示 Dropdown 的无障碍支持"
        isRegisterChildren={true}
    >
        <div>
            <Dropdown
                trigger={<button>Hello dropdown</button>}
                triggerType={['click', 'hover']}
                afterOpen={() => console.log('after open')}
            >
                {menu}
            </Dropdown>
        </div>
    </APAConfigProvider>,
    mountNode
);
