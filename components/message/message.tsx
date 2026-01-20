import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import {
    APAActionEnabled,
    APAStateEnabled,
    APAState,
    APAAction,
    APAConfigProvider,
} from '@alifd/apa-sdk';
import { z } from 'zod';
import nextLocale from '../locale/zh-cn';
import Icon from '../icon';
import Animate from '../animate';
import ConfigProvider from '../config-provider';
import { obj } from '../util';
import type { MessageProps } from './types';
import type * as toast2 from './toast2';

type Toast2 = typeof toast2.default;

const noop = () => {};

/**
 * Message
 */
@APAActionEnabled
@APAStateEnabled
class Message extends Component<MessageProps> {
    static propTypes = {
        prefix: PropTypes.string,
        pure: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        type: PropTypes.oneOf(['success', 'warning', 'error', 'notice', 'help', 'loading']),
        shape: PropTypes.oneOf(['inline', 'addon', 'toast']),
        size: PropTypes.oneOf(['medium', 'large']),
        title: PropTypes.node,
        children: PropTypes.node,
        defaultVisible: PropTypes.bool,
        visible: PropTypes.bool,
        iconType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        closeable: PropTypes.bool,
        onClose: PropTypes.func,
        afterClose: PropTypes.func,
        animation: PropTypes.bool,
        locale: PropTypes.object,
        rtl: PropTypes.bool,
    };
    static displayName = 'Message';
    // config 方法被调用后，Message 组件才会挂上 open、close、destory 方法
    static config: (config: toast2.MessageConfig) => void;
    static open: Toast2['open'];
    static close: Toast2['close'];
    static destory: Toast2['destory'];

    static defaultProps = {
        prefix: 'next-',
        pure: false,
        type: 'success',
        shape: 'inline',
        size: 'medium',
        defaultVisible: true,
        closeable: false,
        onClose: noop,
        afterClose: noop,
        animation: true,
        locale: nextLocale.Message,
    };

    @APAState([{ name: 'visible', desc: '消息是否显示' }])
    state = {
        visible:
            typeof this.props.visible === 'undefined'
                ? this.props.defaultVisible
                : this.props.visible,
    };

    static getDerivedStateFromProps(props: MessageProps) {
        if ('visible' in props) {
            return {
                visible: props.visible,
            };
        }

        return {};
    }

    @APAAction({
        name: 'onClose',
        desc: '关闭消息',
        params: z.tuple([]),
    })
    onClose = () => {
        if (!('visible' in this.props)) {
            this.setState({
                visible: false,
            });
        }
        this.props.onClose!();
    };

    render() {
        const {
            prefix,
            className,
            style,
            type,
            shape,
            size,
            title,
            children,
            iconType: icon,
            closeable,
            afterClose,
            animation,
            rtl,
            locale,
        } = this.props;
        const others = {
            ...obj.pickOthers(Object.keys(Message.propTypes), this.props),
        };
        const { visible } = this.state;
        const messagePrefix = `${prefix}message`;

        const classes = classNames({
            [messagePrefix]: true,
            [`${prefix}message-${type}`]: type,
            [`${prefix}${shape}`]: shape,
            [`${prefix}${size}`]: size,
            [`${prefix}title-content`]: !!title,
            [`${prefix}only-content`]: !title && !!children,
            [className!]: className,
        });

        const newChildren = visible ? (
            <div
                role="alert"
                style={style}
                {...others}
                className={classes}
                dir={rtl ? 'rtl' : undefined}
            >
                {closeable ? (
                    <a
                        role="button"
                        aria-label={locale!.closeAriaLabel}
                        className={`${messagePrefix}-close`}
                        onClick={this.onClose}
                    >
                        <Icon type="close" />
                    </a>
                ) : null}
                {icon !== false ? (
                    <Icon
                        className={`${messagePrefix}-symbol ${
                            !icon && `${messagePrefix}-symbol-icon`
                        }`}
                        type={icon}
                    />
                ) : null}
                {title ? <div className={`${messagePrefix}-title`}>{title}</div> : null}
                {children ? <div className={`${messagePrefix}-content`}>{children}</div> : null}
            </div>
        ) : null;

        if (animation) {
            return (
                <Animate.Expand animationAppear={false} afterLeave={afterClose}>
                    {newChildren}
                </Animate.Expand>
            );
        }

        return newChildren;
    }
}

const MessageWithPolyfill = polyfill(Message);

export default APAConfigProvider.config(MessageWithPolyfill, {
    isRegisterChildren: false,
    desc: '消息提示组件',
    props: [
        { key: 'visible', name: 'visible', desc: '消息是否显示' },
        { key: 'type', name: 'type', desc: '消息类型 (success/warning/error/notice/help/loading)' },
        { key: 'title', name: 'title', desc: '消息标题' },
        { key: 'closeable', name: 'closeable', desc: '是否可关闭' },
        { key: 'size', name: 'size', desc: '消息尺寸' },
        { key: 'shape', name: 'shape', desc: '消息形状' },
    ],
});
