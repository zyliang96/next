import React, {
    type CSSProperties,
    type ChangeEvent,
    type CompositionEvent,
    type FocusEvent,
    type KeyboardEvent,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { z } from 'zod';
import { APAActionEnabled, APAAction, APAStateEnabled } from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import { func } from '../util';
import zhCN from '../locale/zh-cn';
import type { BaseProps, BaseState, GeneralHTMLInputElement } from './types';

@APAActionEnabled
@APAStateEnabled
class Base<
    P extends BaseProps = BaseProps,
    S extends BaseState = BaseState,
> extends React.Component<P, S> {
    static propTypes = {
        ...ConfigProvider.propTypes,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        disabled: PropTypes.bool,
        maxLength: PropTypes.number,
        showLimitHint: PropTypes.bool,
        cutString: PropTypes.bool,
        readOnly: PropTypes.bool,
        trim: PropTypes.bool,
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        getValueLength: PropTypes.func,
        inputStyle: PropTypes.object,
        className: PropTypes.string,
        style: PropTypes.object,
        htmlType: PropTypes.string,
        name: PropTypes.string,
        rtl: PropTypes.bool,
        state: PropTypes.oneOf(['error', 'loading', 'success', 'warning']),
        locale: PropTypes.object,
        isPreview: PropTypes.bool,
        renderPreview: PropTypes.func,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        composition: PropTypes.bool,
        onCompositionStart: PropTypes.func,
        onCompositionEnd: PropTypes.func,
    };

    static defaultProps: Omit<BaseProps, 'state'> = {
        disabled: false,
        prefix: 'next-',
        size: 'medium' as const,
        maxLength: undefined,
        showLimitHint: false,
        cutString: true,
        readOnly: false,
        isPreview: false,
        trim: false,
        composition: false,
        onFocus: func.noop,
        onBlur: func.noop,
        onChange: func.noop,
        onKeyDown: func.noop,
        getValueLength: func.noop,
        onCompositionStart: func.noop,
        onCompositionEnd: func.noop,
        locale: zhCN.Input,
    };
    inputRef: HTMLInputElement | HTMLTextAreaElement;

    static getDerivedStateFromProps(nextProps: BaseProps, prevState: BaseState) {
        if ('value' in nextProps && nextProps.value !== prevState.value && !prevState.composition) {
            const value = nextProps.value;
            return {
                value: value === undefined || value === null ? '' : value,
            };
        }

        return null;
    }

    ieHack(value: number | string): number | string {
        return value;
    }

    handleCompositionStart = (e: CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            composition: true,
        });
        this.props.onCompositionStart!(e);
    };

    handleCompositionEnd = (e: CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            composition: false,
        });
        this.props.onCompositionEnd!(e);

        const value = (e.target as HTMLInputElement).value;
        this.props.onChange!(value, e);
    };

    /**
     * APA Action: 设置输入框的值（包裹层）
     * 优先使用 ref.dispatchEvent()，无 ref 时创建事件对象
     */
    @APAAction({
        name: 'setValue',
        desc: '设置输入框的值',
        params: z.tuple([z.union([z.string(), z.number()]).describe('要设置的值')]),
    })
    apaSetValue(value: string | number) {
        // 优先使用 ref.dispatchEvent()
        if (this.inputRef) {
            this.inputRef.value = String(value);
            const event = new Event('input', { bubbles: true });
            this.inputRef.dispatchEvent(event);
        } else {
            // 无 ref 时，创建事件对象并调用内部方法
            const event = new Event('input', { bubbles: true }) as any;
            Object.defineProperty(event, 'target', {
                writable: false,
                value: { value: String(value) },
            });
            this.onChange(event);
        }
    }

    /**
     * 内部方法：处理 change 事件
     * 保持原有逻辑不变
     */
    onChange(e: ChangeEvent<HTMLInputElement>) {
        if ('stopPropagation' in e) {
            e.stopPropagation();
        } else if ('cancelBubble' in e) {
            // @ts-expect-error 兼容 IE
            e.cancelBubble();
        }

        let value: string | number = e.target.value;

        if (this.props.trim) {
            value = value.trim();
        }

        value = this.ieHack(value);

        // not controlled
        if (!('value' in this.props) || this.state.composition) {
            this.setState({
                value,
            });
        }

        if (this.state.composition) {
            return;
        }

        // Number('') = 0
        if (value && this.props.htmlType === 'number') {
            value = Number(value);
        }

        this.props.onChange!(value, e);
    }

    /**
     * abstract
     */
    getValueLength(value: string | number | null) {
        return 0;
    }

    onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        const { maxLength } = this.props;
        const len = maxLength! > 0 && value ? this.getValueLength(value) : 0;
        const opts: { beTrimed?: boolean; overMaxLength?: boolean } = {};

        // has enable trim and has input whitespace
        if (this.props.trim && e.keyCode === 32) {
            opts.beTrimed = true;
        }

        // has defined maxLength and has over max length and has not input backspace and delete
        if (
            maxLength! > 0 &&
            (len > maxLength! + 1 ||
                ((len === maxLength || len === maxLength! + 1) &&
                    e.keyCode !== 8 &&
                    e.keyCode !== 46))
        ) {
            opts.overMaxLength = true;
        }

        this.props.onKeyDown!(e, opts);
    }

    onFocus(e: FocusEvent<HTMLInputElement>) {
        this.setState({
            focus: true,
        });
        this.props.onFocus!(e);
    }

    onBlur(e: FocusEvent<HTMLInputElement>) {
        this.setState({
            focus: false,
        });
        this.props.onBlur!(e);
    }

    handleKeyDownFromClear = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            this.onClear(e);
        }
    };

    /**
     * APA Action: 清空输入框（包裹层）
     */
    @APAAction({
        name: 'clear',
        desc: '清空输入框的值',
    })
    apaClear() {
        // 优先使用 ref.dispatchEvent()
        if (this.inputRef) {
            this.inputRef.value = '';
            const event = new Event('input', { bubbles: true });
            this.inputRef.dispatchEvent(event);
            this.focus();
        } else {
            // 无 ref 时，创建事件对象并调用内部方法
            const event = new KeyboardEvent('keydown', { bubbles: true }) as any;
            this.onClear(event);
        }
    }

    /**
     * 内部方法：清空输入框
     * 保持原有逻辑不变
     */
    onClear(e: KeyboardEvent<HTMLInputElement>) {
        if (this.props.disabled) {
            return;
        }
        // 非受控模式清空内部数据
        if (!('value' in this.props)) {
            this.setState({
                value: '',
            });
        }
        this.props.onChange!('', e, 'clear');
        this.focus();
    }
    renderLength() {
        const { maxLength, showLimitHint, prefix, rtl } = this.props;
        const len = maxLength! > 0 && this.state.value ? this.getValueLength(this.state.value) : 0;

        const classesLenWrap = classNames({
            [`${prefix}input-len`]: true,
            [`${prefix}error`]: len > maxLength!,
        });

        const content = rtl ? `${maxLength}/${len}` : `${len}/${maxLength}`;

        return maxLength && showLimitHint ? (
            <span className={classesLenWrap}>{content}</span>
        ) : null;
    }

    getClass() {
        const { disabled, state, prefix } = this.props;

        return classNames({
            [`${prefix}input`]: true,
            [`${prefix}disabled`]: !!disabled,
            [`${prefix}error`]: state === 'error',
            [`${prefix}warning`]: state === 'warning',
            [`${prefix}focus`]: this.state.focus,
        });
    }

    getProps() {
        const {
            placeholder,
            inputStyle,
            disabled,
            readOnly,
            cutString,
            maxLength,
            name,
            onCompositionStart,
            onCompositionEnd,
        } = this.props;
        const props: {
            style?: CSSProperties;
            onChange?: (e: ChangeEvent<GeneralHTMLInputElement>) => void;
            onBlur?: (e: FocusEvent<GeneralHTMLInputElement>) => void;
            onFocus?: (e: FocusEvent<GeneralHTMLInputElement>) => void;
            ['aria-disabled']?: boolean;
        } & Pick<
            BaseProps,
            | 'placeholder'
            | 'disabled'
            | 'readOnly'
            | 'name'
            | 'maxLength'
            | 'onCompositionStart'
            | 'onCompositionEnd'
        > &
            Pick<BaseState, 'value'> = {
            style: inputStyle,
            placeholder,
            disabled,
            readOnly,
            name,
            maxLength: cutString ? maxLength : undefined,
            value: this.state.value,
            onChange: this.onChange.bind(this),
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
            onCompositionStart,
            onCompositionEnd,
        };

        // fix accessibility：auto process status of aria disabled
        if (disabled) {
            props['aria-disabled'] = disabled;
        }

        return props;
    }

    saveRef = (input: HTMLInputElement) => {
        this.inputRef = input;
    };

    getInputNode() {
        return this.inputRef;
    }

    /**
     * APA Action: 聚焦输入框（包裹层）
     */
    @APAAction({
        name: 'focus',
        desc: '聚焦到输入框',
    })
    apaFocus() {
        this.focus();
    }

    /**
     * APA Action: 失焦输入框（包裹层）
     */
    @APAAction({
        name: 'blur',
        desc: '输入框失去焦点',
    })
    apaBlur() {
        if (this.inputRef) {
            this.inputRef.blur();
        }
    }

    /**
     * 内部方法：聚焦输入框
     * 保持原有逻辑不变
     */
    focus(start?: number, end?: number, preventScroll = false) {
        this.inputRef.focus({ preventScroll });
        if (typeof start === 'number') {
            this.inputRef.selectionStart = start;
        }
        if (typeof end === 'number') {
            this.inputRef.selectionEnd = end;
        }
    }
}

export default polyfill(Base);
