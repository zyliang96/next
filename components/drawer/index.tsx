import React from 'react';

import ConfigProvider from '../config-provider';
import { APAConfigProvider } from '@alifd/apa-sdk';
import Drawer1 from './drawer';
import Drawer2 from './drawer-v2';

import Inner from './inner';

import { show, withContext } from './show';
import type { DrawerV2Props, DrawerV1Props } from './types';

export interface QuickShowRet {
    hide: () => void;
}

export type DrawerProps = DrawerV2Props | DrawerV1Props;

class Drawer extends React.Component<DrawerProps> {
    static Inner: typeof Inner;
    static show: (config?: DrawerProps) => QuickShowRet;
    static withContext: <P extends object>(
        WrappedComponent: React.ComponentType<P>
    ) => React.ComponentType<P>;

    render() {
        const { v2, ...others } = this.props;
        if (v2) {
            return <Drawer2 {...others} />;
        } else {
            return <Drawer1 {...others} />;
        }
    }
}

Drawer.Inner = Inner;
Drawer.show = show;
Drawer.withContext = withContext;

const DrawerWithConfig = ConfigProvider.config(
    APAConfigProvider.config(Drawer, {
        isRegiserChildren: true,
        desc: '抽屉组件',
        props: [
            { key: 'visible', name: 'visible', desc: '抽屉是否显示' },
            { key: 'placement', name: 'placement', desc: '抽屉弹出位置' },
            { key: 'width', name: 'width', desc: '抽屉宽度' },
            { key: 'height', name: 'height', desc: '抽屉高度' },
            { key: 'title', name: 'title', desc: '抽屉标题' },
            { key: 'closeable', name: 'closeable', desc: '是否显示关闭按钮' },
            { key: 'closeMode', name: 'closeMode', desc: '关闭方式' },
            { key: 'hasMask', name: 'hasMask', desc: '是否显示遮罩' },
        ],
    })
);

// 将静态方法复制到包裹后的组件上
(DrawerWithConfig as unknown as typeof Drawer).Inner = Inner;
(DrawerWithConfig as unknown as typeof Drawer).show = show;
(DrawerWithConfig as unknown as typeof Drawer).withContext = withContext;

export default DrawerWithConfig as unknown as typeof Drawer;
