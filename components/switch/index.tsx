import React, { type HTMLAttributes, type KeyboardEvent, type MouseEvent } from 'react';
import {
    APAAction,
    APAActionEnabled,
    APAConfigProvider,
    APAState,
    APAStateEnabled,
} from '@alifd/apa-sdk';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import { KEYCODE } from '../util';
import Icon from '../icon';
import ConfigProvider from '../config-provider';
import zhCN from '../locale/zh-cn';
import type { SwitchProps, SwitchState } from './types';

@APAActionEnabled
@APAStateEnabled
class Switch extends React.Component<SwitchProps, SwitchState> {
    @APAState([{ name: 'checked', desc: '开关是否打开' }])
    state: SwitchState;

    static displayName = 'Switch';
    static propTypes = {
        ...ConfigProvider.propTypes,
        name: PropTypes.string,
        prefix: PropTypes.string,
        rtl: PropTypes.bool,
        pure: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        checkedChildren: PropTypes.any,
        unCheckedChildren: PropTypes.any,
        onChange: PropTypes.func,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        size: PropTypes.oneOf(['medium', 'small']),
        onClick: PropTypes.func,
        onKeyDown: PropTypes.func,
        isPreview: PropTypes.bool,
        renderPreview: PropTypes.func,
        autoWidth: PropTypes.bool,
        locale: PropTypes.object,
    };
    static defaultProps = {
        prefix: 'next-',
        size: 'medium',
        disabled: false,
        defaultChecked: false,
        isPreview: false,
        loading: false,
        readOnly: false,
        autoWidth: false,
        onChange: () => {},
        locale: zhCN.Switch,
    };

    static getDerivedStateFromProps(props: SwitchProps, state: SwitchState) {
        if ('checked' in props && props.checked !== state.checked) {
            return {
                checked: !!props.checked,
            };
        }

        return null;
    }

    readonly props: SwitchProps & Required<Pick<SwitchProps, keyof typeof Switch.defaultProps>>;

    constructor(props: SwitchProps) {
        super(props);

        const checked = props.checked || props.defaultChecked!;
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.state = {
            checked,
        };
    }

    @APAAction({ name: 'onChange', desc: '开关状态改变事件' })
    onChange(ev: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) {
        const checked = !this.state.checked;

        if (!('checked' in this.props)) {
            this.setState({
                checked,
            });
        }
        this.props.onChange(checked, ev);
        this.props.onClick && this.props.onClick(ev);
    }

    onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (e.keyCode === KEYCODE.ENTER || e.keyCode === KEYCODE.SPACE) {
            this.onChange(e);
        }
        this.props.onKeyDown && this.props.onKeyDown(e);
    }

    render() {
        const {
            prefix,
            className,
            disabled,
            readOnly,
            size,
            loading,
            autoWidth,
            checkedChildren,
            unCheckedChildren,
            rtl,
            isPreview,
            renderPreview,
            locale,
            onChange,
            ...others
        } = this.props;
        const { checked } = this.state;
        const status = checked ? 'on' : 'off';
        const children = checked ? checkedChildren : unCheckedChildren;

        let _size = size;
        if (_size !== 'small' && _size !== 'medium') {
            _size = 'medium';
        }

        const classes = classNames(
            {
                [`${prefix}switch`]: true,
                [`${prefix}switch-loading`]: loading,
                [`${prefix}switch-${status}`]: true,
                [`${prefix}switch-${_size}`]: true,
                [`${prefix}switch-auto-width`]: autoWidth,
            },
            className
        );
        let attrs: HTMLAttributes<HTMLDivElement> & { disabled: boolean };
        const isDisabled = disabled || readOnly;

        if (!isDisabled) {
            attrs = {
                onClick: this.onChange,
                tabIndex: 0,
                onKeyDown: this.onKeyDown,
                disabled: false,
            };
        } else {
            attrs = {
                disabled: true,
                onClick: undefined,
            };
        }

        if (isPreview) {
            const previewCls = classNames(className, {
                [`${prefix}form-preview`]: true,
            });

            if (typeof renderPreview === 'function') {
                return (
                    <div className={previewCls} {...others}>
                        {renderPreview(checked, this.props)}
                    </div>
                );
            }

            return (
                <p className={previewCls} {...others}>
                    {children || locale[status]}
                </p>
            );
        }

        return (
            <div
                role="switch"
                dir={rtl ? 'rtl' : undefined}
                tabIndex={0}
                {...others}
                className={classes}
                {...attrs}
                aria-checked={checked}
            >
                <div className={`${prefix}switch-btn`}>
                    {loading && <Icon type="loading" className={`${prefix}switch-inner-icon`} />}
                </div>
                <div className={`${prefix}switch-children`}>{children}</div>
            </div>
        );
    }
}

export type { SwitchProps, SwitchLocale } from './types';

export default ConfigProvider.config(
    APAConfigProvider.config(polyfill(Switch), {
        desc: '开关组件',
        props: [
            {
                key: 'checked',
                name: '开关是否打开',
                desc: '开关是否打开，true 表示打开，false 表示关闭',
            },
            {
                key: 'disabled',
                name: '禁用状态',
                desc: '是否禁用开关，true 表示禁用，false 表示启用，禁用状态不能触发开关状态改变事件',
            },
            {
                key: 'loading',
                name: '加载状态',
                desc: '是否加载中，true 表示加载中，false 表示未加载',
            },
            {
                key: 'readOnly',
                name: '只读状态',
                desc: '是否只读，true 表示只读，false 表示可读',
            },
        ],
    })
);
