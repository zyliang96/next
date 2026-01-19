import React, { Children, Component, type ReactElement, type ReactNode, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APAActionEnabled, APAConfigProvider } from '@alifd/apa-sdk';
import { obj, func, type ClassPropsWithDefault } from '../util';
import NextField, { type FieldOption } from '../field';
import RGrid from '../responsive-grid';
import type { ChildExtraProperties, FormProps, RemoveUndefined } from './types';
import { FormContextProvider, type FormContextValue } from './context';

export type FormWithDefaultProps = ClassPropsWithDefault<FormProps, typeof Form.defaultProps>;

function pickerDefined(obj: Record<string, unknown>) {
    const newObj: RemoveUndefined<typeof obj> = {};
    Object.keys(obj).forEach(i => {
        if (typeof obj[i] !== 'undefined') {
            newObj[i] = obj[i];
        }
    });
    return newObj;
}

function preventDefault(e: Event) {
    e.preventDefault();
}

const getNewChildren: (children: ReactNode, props: FormProps) => ReactNode = (
    children: ReactNode,
    props: FormProps
) => {
    const { size, device, labelAlign, labelTextAlign, labelCol, wrapperCol, responsive, colon } =
        props;

    return Children.map(children, (child: ReactElement & ChildExtraProperties) => {
        if (obj.isReactFragmentElement(child)) {
            return getNewChildren(child.props.children, props);
        }

        if (
            child &&
            ['function', 'object'].indexOf(typeof child.type) > -1 &&
            child.type._typeMark === 'form_item'
        ) {
            const childrenProps = {
                labelCol: child.props.labelCol ? child.props.labelCol : labelCol,
                wrapperCol: child.props.wrapperCol ? child.props.wrapperCol : wrapperCol,
                labelAlign: child.props.labelAlign
                    ? child.props.labelAlign
                    : device === 'phone'
                      ? 'top'
                      : labelAlign,
                labelTextAlign: child.props.labelTextAlign
                    ? child.props.labelTextAlign
                    : labelTextAlign,
                colon: 'colon' in child.props ? child.props.colon : colon,
                size: child.props.size ? child.props.size : size,
                responsive: responsive,
            };
            return cloneElement(child, pickerDefined(childrenProps));
        }
        return child;
    });
};

/** Form */
@APAActionEnabled<typeof Form>({ fields: ['_formField'] })
class Form extends Component<FormProps> {
    static displayName = 'Form';
    static propTypes = {
        prefix: PropTypes.string,
        inline: PropTypes.bool,
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        fullWidth: PropTypes.bool,
        labelAlign: PropTypes.oneOf(['top', 'left', 'inset']),
        labelTextAlign: PropTypes.oneOf(['left', 'right']),
        field: PropTypes.any,
        saveField: PropTypes.func,
        labelCol: PropTypes.object,
        wrapperCol: PropTypes.object,
        onSubmit: PropTypes.func,
        children: PropTypes.any,
        className: PropTypes.string,
        style: PropTypes.object,
        value: PropTypes.object,
        onChange: PropTypes.func,
        component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        fieldOptions: PropTypes.object,
        rtl: PropTypes.bool,
        device: PropTypes.oneOf(['phone', 'tablet', 'desktop']),
        responsive: PropTypes.bool,
        isPreview: PropTypes.bool,
        useLabelForErrorMessage: PropTypes.bool,
        preferMarginToDisplayHelp: PropTypes.bool,
        colon: PropTypes.bool,
        disabled: PropTypes.bool,
        // 在 responsive 模式下，透传给 ResponsiveGrid 的，表示 每个 cell 之间的间距， [bottom&top, right&left]
        gap: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    };

    static defaultProps = {
        prefix: 'next-',
        onSubmit: preventDefault,
        size: 'medium',
        labelAlign: 'left',
        onChange: func.noop,
        component: 'form',
        saveField: func.noop,
        device: 'desktop',
        colon: false,
        disabled: false,
        preferMarginToDisplayHelp: false,
    };

    readonly props: FormWithDefaultProps;

    _formField: NextField | null;
    constructor(props: FormProps) {
        super(props);

        this._formField = null;
        if (props.field !== false) {
            const options: FieldOption = {
                ...props.fieldOptions,
                onChange: this.onChange,
            };

            if (props.field) {
                this._formField = props.field;
                const onChange = this._formField.options.onChange;
                options.onChange = func.makeChain(onChange, this.onChange);
                this._formField!.setOptions && this._formField.setOptions(options);
            } else {
                if ('value' in props) {
                    options.values = props.value;
                }

                this._formField = new NextField(this, options);
            }

            if (props.locale && props.locale.Validate) {
                this._formField.setOptions({ messages: props.locale.Validate });
            }
            props.saveField!(this._formField);
        }
    }

    componentDidUpdate(prevProps: FormProps) {
        const props = this.props;

        if (this._formField) {
            if ('value' in props && props.value !== prevProps.value) {
                this._formField.setValues(props.value);
            }
            if ('error' in props && props.error !== prevProps.error) {
                this._formField.setValues(props.error);
            }
        }
    }

    /**
     * 获取 Form Context 的值
     */
    getFormContextValue(): FormContextValue {
        return {
            _formField: this.props.field ? this.props.field : this._formField,
            _formSize: this.props.size,
            _formDisabled: this.props.disabled,
            _formPreview: this.props.isPreview,
            _formFullWidth: this.props.fullWidth,
            _formLabelForErrorMessage: this.props.useLabelForErrorMessage,
            _formMarginToDisplayHelp: this.props.preferMarginToDisplayHelp,
        };
    }

    onChange = (name: string, value: string) => {
        this.props.onChange!(this._formField!.getValues(), {
            name,
            value,
            field: this._formField,
        });
    };

    render() {
        const {
            className,
            inline,
            size,
            device,
            onSubmit,
            children,
            style,
            prefix,
            rtl,
            isPreview,
            component: Tag,
            responsive,
            gap,
        } = this.props;

        const formClassName = classNames({
            [`${prefix}form`]: true,
            [`${prefix}inline`]: inline, // 内联
            [`${prefix}${size}`]: size,
            [`${prefix}form-responsive-grid`]: responsive,
            [`${prefix}form-preview`]: isPreview,
            [className!]: !!className,
        });

        const newChildren = getNewChildren(children, this.props);

        return (
            <FormContextProvider value={this.getFormContextValue()}>
                <Tag
                    role="form"
                    {...obj.pickOthers(Form.propTypes, this.props)}
                    className={formClassName}
                    style={style}
                    dir={rtl ? 'rtl' : undefined}
                    onSubmit={onSubmit}
                >
                    {responsive ? (
                        <RGrid gap={gap} device={device}>
                            {newChildren}
                        </RGrid>
                    ) : (
                        newChildren
                    )}
                </Tag>
            </FormContextProvider>
        );
    }
}

// 先应用 APAActionEnabled，再应用 APAConfigProvider.config

export default APAConfigProvider.config(Form, {
    isRegiserChildren: true,
    desc: '表单组件',
    props: [
        {
            key: 'disabled',
            name: '禁用状态',
            desc: '是否禁用表单，true 表示禁用，false 表示启用，禁用状态不能触发提交事件',
        },
        {
            key: 'isPreview',
            name: '预览态',
            desc: '是否开启预览态，true 表示开启，false 表示关闭',
        },
        {
            key: 'inline',
            name: '内联',
            desc: '是否开启内联，true 表示开启，false 表示关闭',
        },
        {
            key: 'labelAlign',
            name: '标签位置',
            desc: '标签位置，top 表示在上，left 表示在左，inset 表示在右',
        },
        {
            key: 'labelTextAlign',
            name: '标签对齐方式',
            desc: '标签对齐方式，left 表示左对齐，right 表示右对齐',
        },
        {
            key: 'rtl',
            name: '从右到左 布局',
            desc: '是否开启 从右到左 布局，true 表示开启，false 表示默认从左到右布局',
        },
    ],
});
