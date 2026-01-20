import React, { Component, Children } from 'react';
import * as PropTypes from 'prop-types';
import Overlay from '../overlay';
import { func } from '../util';
import {
    APAActionEnabled,
    APAStateEnabled,
    APAState,
    APAAction,
    APAConfigProvider,
} from '@alifd/apa-sdk';
import { z } from 'zod';
import type { DropdownProps, DropdownState } from './types';

const { noop, makeChain, bindCtx } = func;
const Popup = Overlay.Popup;

@APAActionEnabled
@APAStateEnabled
class Dropdown extends Component<DropdownProps, DropdownState> {
    static propTypes = {
        prefix: PropTypes.string,
        pure: PropTypes.bool,
        rtl: PropTypes.bool,
        className: PropTypes.string,
        children: PropTypes.node,
        visible: PropTypes.bool,
        defaultVisible: PropTypes.bool,
        onVisibleChange: PropTypes.func,
        trigger: PropTypes.node,
        triggerType: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        disabled: PropTypes.bool,
        align: PropTypes.string,
        offset: PropTypes.array,
        delay: PropTypes.number,
        autoFocus: PropTypes.bool,
        hasMask: PropTypes.bool,
        autoClose: PropTypes.bool,
        cache: PropTypes.bool,
        animation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    };
    static defaultProps = {
        prefix: 'next-',
        pure: false,
        defaultVisible: false,
        autoClose: false,
        onVisibleChange: noop,
        triggerType: 'hover',
        disabled: false,
        align: 'tl bl',
        offset: [0, 0],
        delay: 200,
        hasMask: false,
        cache: false,
        onPosition: noop,
    };
    static displayName = 'Dropdown';

    @APAState([
        { name: 'visible', desc: '下拉菜单是否显示' },
        { name: 'autoFocus', desc: '是否自动聚焦' },
    ])
    state = {
        visible: 'visible' in this.props ? this.props.visible : this.props.defaultVisible || false,
        autoFocus: 'autoFocus' in this.props ? this.props.autoFocus : false,
    };

    constructor(props: DropdownProps) {
        super(props);

        bindCtx(this, ['onTriggerKeyDown', 'onMenuClick', 'onVisibleChange']);
    }

    static getDerivedStateFromProps(nextProps: DropdownProps) {
        const state: Partial<DropdownState> = {};

        if ('visible' in nextProps) {
            state.visible = nextProps.visible;
        }

        return Object.keys(state).length > 0 ? state : null;
    }

    getVisible(props = this.props) {
        return 'visible' in props ? props.visible : this.state.visible;
    }

    onMenuClick() {
        const { autoClose } = this.props;

        if (!('visible' in this.props) && autoClose) {
            this.setState({
                visible: false,
            });
        }
        this.onVisibleChange(false, 'fromContent');
    }

    @APAAction({
        name: 'setVisible',
        desc: '设置下拉菜单显示或隐藏',
        params: z.tuple([z.boolean().describe('是否显示')]),
    })
    onVisibleChange(visible: boolean, from: string = 'apa') {
        this.setState({ visible });

        this.props.onVisibleChange!(visible, from);
    }

    @APAAction({
        name: 'open',
        desc: '打开下拉菜单',
        params: z.tuple([]),
    })
    openDropdown() {
        if (this.props.disabled) return;
        this.onVisibleChange(true, 'apa');
    }

    @APAAction({
        name: 'close',
        desc: '关闭下拉菜单',
        params: z.tuple([]),
    })
    closeDropdown() {
        this.onVisibleChange(false, 'apa');
    }

    onTriggerKeyDown() {
        let autoFocus: boolean | undefined = true;

        if ('autoFocus' in this.props) {
            autoFocus = this.props.autoFocus;
        }

        this.setState({
            autoFocus,
        });
    }

    render() {
        const { rtl, autoClose, trigger } = this.props;

        const child = Children.only(this.props.children);
        let content = child;
        if (
            typeof child.type === 'function' &&
            (child.type as typeof child.type & { isNextMenu: boolean }).isNextMenu
        ) {
            content = React.cloneElement(child, {
                onItemClick: makeChain(this.onMenuClick, child.props.onItemClick),
            });
        } else if (autoClose) {
            content = React.cloneElement(child, {
                onClick: makeChain(this.onMenuClick, child.props.onClick),
            });
        }

        const newTrigger = React.cloneElement(trigger!, {
            onKeyDown: makeChain(this.onTriggerKeyDown, trigger!.props.onKeyDown),
        });

        return (
            <Popup
                {...this.props}
                rtl={rtl}
                autoFocus={this.state.autoFocus}
                trigger={newTrigger}
                visible={this.getVisible()}
                onVisibleChange={this.onVisibleChange}
                canCloseByOutSideClick
            >
                {content}
            </Popup>
        );
    }
}

export default APAConfigProvider.config(Dropdown, {
    isRegisterChildren: true,
    desc: '下拉菜单组件',
    props: [
        { key: 'visible', name: 'visible', desc: '下拉菜单是否显示' },
        { key: 'disabled', name: 'disabled', desc: '是否禁用' },
        { key: 'triggerType', name: 'triggerType', desc: '触发类型' },
        { key: 'align', name: 'align', desc: '对齐方式' },
        { key: 'autoClose', name: 'autoClose', desc: '点击后自动关闭' },
    ],
});
