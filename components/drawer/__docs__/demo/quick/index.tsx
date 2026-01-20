import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Drawer } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';
import type { QuickShowRet } from '@alifd/next/types/drawer';

let instance: QuickShowRet | null = null;
const show = () => {
    instance && instance.hide();
    instance = Drawer.show({
        title: 'quick',
        hasMask: false,
        content: <span>hello world</span>,
    });
};
const hide = () => {
    instance && instance.hide();
    instance = null;
};

ReactDOM.render(
    <APAConfigProvider
        regionName="快捷调用"
        regionId="Drawer-quick-demo"
        regionDesc="快捷调用"
        isRegisterChildren
    >
        <div>
            <Button type="primary" onClick={show}>
                {' '}
                open{' '}
            </Button>
            <Button onClick={hide} style={{ marginLeft: 8 }}>
                {' '}
                close{' '}
            </Button>
        </div>
    </APAConfigProvider>,
    mountNode
);
