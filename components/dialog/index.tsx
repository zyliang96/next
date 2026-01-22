import React from 'react';
import { APAConfigProvider, getNodeProps } from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import { log } from '../util';
import Dialog1 from './dialog';
import Dialog2 from './dialog-v2';

import Inner from './inner';
import { show, alert, confirm, withContext, success, error, notice, warning, help } from './show';
import type { DialogProps, InnerProps, ShowConfig, ShowConfigV1, ShowConfigV2 } from './types';
import { type ButtonProps, ApaButtonProps } from '../button';

export type { DialogProps, ShowConfig, InnerProps, ShowConfigV1, ShowConfigV2 };

function processProps(props: Record<string, unknown>, deprecated: typeof log.deprecated) {
    if ('closable' in props) {
        deprecated('closable', 'closeable', 'Dialog');
        const { closable, ...others } = props;
        props = { closeable: closable, ...others };
    }

    if ('v2' in props) {
        const nProps = { ...props };
        if ('align' in props) {
            delete nProps.align;
            deprecated('align', 'centered', '<Dialog v2 />');
        }
        if ('shouldUpdatePosition' in props) {
            delete nProps.shouldUpdatePosition;
            log.warning(`Warning: [ shouldUpdatePosition ] is deprecated at [ <Dialog v2 /> ]`);
        }
        if ('minMargin' in props) {
            // delete nProps.minMargin;
            deprecated('minMargin', 'top/bottom', '<Dialog v2 />');
        }
        if ('isFullScreen' in props) {
            props.overFlowScroll = !props.isFullScreen;
            delete nProps.isFullScreen;
            deprecated('isFullScreen', 'overFlowScroll', '<Dialog v2 />');
        }

        return nProps;
    }

    const overlayPropNames = [
        'target',
        'offset',
        'beforeOpen',
        'onOpen',
        'afterOpen',
        'beforePosition',
        'onPosition',
        'cache',
        'safeNode',
        'wrapperClassName',
        'container',
    ];
    overlayPropNames.forEach(name => {
        if (name in props) {
            deprecated(name, `overlayProps.${name}`, 'Dialog');
            const { overlayProps, ...others } = props;
            const newOverlayProps = {
                [name]: props[name],
                ...(overlayProps || {}),
            };
            delete others[name];
            props = { overlayProps: newOverlayProps, ...others };
        }
    });

    return props;
}

class Dialog extends React.Component<DialogProps> {
    static displayName = 'Dialog';
    static Inner = Inner;
    static withContext = withContext;
    static show = (config: ShowConfig) => {
        const { warning } = ConfigProvider.getContextProps(config, 'Dialog');
        if (warning !== false) {
            config = processProps(config as Record<string, unknown>, log.deprecated);
        }
        return show(config);
    };
    static alert = (config: ShowConfig) => {
        const { warning } = ConfigProvider.getContextProps(config, 'Dialog');
        if (warning !== false) {
            config = processProps(config as Record<string, unknown>, log.deprecated);
        }
        return alert(config);
    };
    static confirm = (config: ShowConfig) => {
        const { warning } = ConfigProvider.getContextProps(config, 'Dialog');
        if (warning !== false) {
            config = processProps(config as Record<string, unknown>, log.deprecated);
        }
        return confirm(config);
    };
    static success = (config: ShowConfig) => success(config);
    static error = (config: ShowConfig) => error(config);
    static notice = (config: ShowConfig) => notice(config);
    static warning = (config: ShowConfig) => warning(config);
    static help = (config: ShowConfig) => help(config);

    render() {
        const { v2, ...others } = this.props;
        if (v2) {
            return <Dialog2 {...others} />;
        } else {
            return <Dialog1 {...others} />;
        }
    }
}

const APADialog = APAConfigProvider.config(Dialog, {
    isRegisterChildren: true,
    desc: '对话框组件',
    props: [
        {
            key: 'visible',
            name: '是否显示',
            desc: '是否显示',
        },
        {
            key: 'title',
            name: '标题',
            desc: '标题',
        },
        {
            key: 'footerActions',
            name: '底部按钮',
            desc: '底部按钮',
        },
        {
            key: 'hasMask',
            name: '是否显示遮罩',
            desc: '是否显示遮罩, 默认显示, 有遮罩层且弹窗展示的时候，只能操作当前弹窗下的内容，不能操作其他内容',
        },
        {
            key: 'okProps',
            name: '确定按钮属性',
            desc: '确定按钮属性',
            format: (props: ButtonProps) => {
                return getNodeProps(ApaButtonProps, props);
            },
        },
        {
            key: 'cancelProps',
            name: '取消按钮属性',
            desc: '取消按钮属性',
            format: (props: ButtonProps) => {
                return getNodeProps(ApaButtonProps, props);
            },
        },
        // TODO 后续补充弹层属性相关的内容
        // {
        //     key: 'overlayProps',
        //     name: '弹层属性',
        //     desc: '弹层属性',
        //     format: (props: ButtonProps) => {
        //         return getNodeProps(ApaButtonProps, props);
        //     }
        // },
    ],
    staticProps: {
        displayName: 'Dialog',
        withContext,
        show: Dialog.show,
        alert: Dialog.alert,
        confirm: Dialog.confirm,
        success: Dialog.success,
        error: Dialog.error,
        notice: Dialog.notice,
        warning: Dialog.warning,
        help: Dialog.help,
        Inner: Dialog.Inner,
    },
}) as unknown as React.ComponentType<DialogProps> & {
    Inner: typeof Inner;
    withContext: typeof withContext;
    show: typeof show;
    alert: typeof alert;
    confirm: typeof confirm;
    success: typeof success;
    error: typeof error;
    notice: typeof notice;
    warning: typeof warning;
    help: typeof help;
};

export default ConfigProvider.config(APADialog, {
    transform: (props, deprecated) => {
        return processProps(props, deprecated);
    },
});
