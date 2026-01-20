/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import ConfigProvider from '../config-provider';
import { APAConfigProvider } from '@alifd/apa-sdk';
import { assignSubComponent } from '../util/component';

import Overlay1 from './overlay';
import Overlay2 from './overlay-v2';

import Gateway from './gateway';
import Position from './position';

import Popup1 from './popup';
import Popup2 from './popup-v2';
import { log } from '../util';
import type { GatewayProps, OverlayProps, PopupProps, PositionProps } from './types';

class Overlay extends Component<OverlayProps> {
    static displayName = 'Overlay';

    overlayRef: InstanceType<typeof Overlay1> | null;

    constructor(props: OverlayProps) {
        super(props);
        this.overlayRef = null;
        this.saveRef = this.saveRef.bind(this);
    }
    saveRef(ref: InstanceType<typeof Overlay1> | null) {
        this.overlayRef = ref;
    }
    /**
     * 兼容 1.x API, will be removed in 2.1.0
     */
    getContent() {
        if (this.overlayRef) {
            return this.overlayRef.getContent();
        }
        return null;
    }
    /**
     * 兼容 1.x API, will be removed in 2.1.0
     */
    getContentNode() {
        if (this.overlayRef) {
            return this.overlayRef.getContentNode();
        }
        return null;
    }
    render() {
        const { v2, align, animation, ...others } = this.props;
        if (v2) {
            if ('needAdjust' in others) {
                log.deprecated('needAdjust', 'autoAdjust', 'Overlay v2');
                others.autoAdjust = others.needAdjust;
                delete others.needAdjust;
            }
            return <Overlay2 animation={animation} align={align} {...others} />;
        } else {
            return <Overlay1 animation={animation} align={align} {...others} ref={this.saveRef} />;
        }
    }
}

class Popup extends Component<PopupProps> {
    static displayName = 'Popup';
    overlay: InstanceType<typeof Overlay1> | null;
    constructor(props: PopupProps) {
        super(props);
        this.overlay = null;
        this.saveRef = this.saveRef.bind(this);
    }
    saveRef(ref: InstanceType<typeof Popup1> | null) {
        if (ref) {
            this.overlay = ref.overlay;
        }
    }
    render() {
        const { v2, ...others } = this.props;
        if (v2) {
            if ('needAdjust' in others) {
                log.deprecated('needAdjust', 'needAdjust', 'Popup v2');
                others.autoAdjust = others.needAdjust;
                delete others.needAdjust;
            }

            if ('shouldUpdatePosition' in others) {
                delete others.shouldUpdatePosition;
            }

            return <Popup2 {...others} />;
        } else {
            return <Popup1 {...others} ref={this.saveRef} />;
        }
    }
}

// 先用 APAConfigProvider 包装 Popup
const PopupWithAPA = APAConfigProvider.config(Popup, {
    isRegisterChildren: true,
    desc: '弹出层组件',
    props: [
        { key: 'visible', name: 'visible', desc: '弹层是否显示' },
        { key: 'trigger', name: 'trigger', desc: '触发元素' },
        { key: 'triggerType', name: 'triggerType', desc: '触发类型' },
        { key: 'disabled', name: 'disabled', desc: '是否禁用' },
    ],
});

// 再用 ConfigProvider 包装 Popup
const PopupConfigured = ConfigProvider.config(PopupWithAPA, {
    exportNames: ['overlay'],
});

// 先用 APAConfigProvider 包装 Overlay
const OverlayWithAPA = APAConfigProvider.config(Overlay, {
    isRegisterChildren: false,
    desc: '浮层组件',
    props: [
        { key: 'visible', name: 'visible', desc: '是否显示浮层' },
        { key: 'align', name: 'align', desc: '浮层对齐方式' },
        { key: 'hasMask', name: 'hasMask', desc: '是否显示遮罩' },
        { key: 'canCloseByEsc', name: 'canCloseByEsc', desc: '是否可通过ESC键关闭' },
        {
            key: 'canCloseByOutSideClick',
            name: 'canCloseByOutSideClick',
            desc: '是否可通过点击外部关闭',
        },
        { key: 'canCloseByMask', name: 'canCloseByMask', desc: '是否可通过点击遮罩关闭' },
    ],
});

const WithSubOverlay = assignSubComponent(OverlayWithAPA, {
    Gateway: Gateway,
    Position: Position,
    Popup: PopupConfigured,
});

export default ConfigProvider.config(WithSubOverlay, {
    exportNames: ['getContent', 'getContentNode'],
});

export type { OverlayProps, PopupProps, GatewayProps, PositionProps };
