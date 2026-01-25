import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { obj } from '../util';
import Checkbox from './checkbox';
import type { CheckboxData, GroupProps, GroupState, ValueItem } from './types';
import { APAActionEnabled, APAAction, APAStateEnabled, APAState } from '@alifd/apa-sdk';
import { z } from 'zod';

const { pickOthers } = obj;

/** Checkbox.Group */
@APAActionEnabled
@APAStateEnabled
class CheckboxGroup extends React.Component<GroupProps, GroupState> {
    static displayName = 'CheckboxGroup';

    @APAState([{ name: 'value', desc: '当前选中的值列表' }])
    state!: GroupState;

    static propTypes = {
        prefix: PropTypes.string,
        rtl: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        dataSource: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.arrayOf(PropTypes.object),
        ]),
        value: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]),
        defaultValue: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]),
        children: PropTypes.arrayOf(PropTypes.element),
        onChange: PropTypes.func,
        direction: PropTypes.oneOf(['hoz', 'ver']),
        isPreview: PropTypes.bool,
        renderPreview: PropTypes.func,
    };

    static defaultProps = {
        dataSource: [],
        onChange: () => {},
        prefix: 'next-',
        direction: 'hoz',
        isPreview: false,
    };

    static childContextTypes = {
        onChange: PropTypes.func,
        __group__: PropTypes.bool,
        selectedValue: PropTypes.array,
        disabled: PropTypes.bool,
    };

    constructor(props: GroupProps) {
        super(props);

        let value: GroupProps['value'] = [];
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        if (!Array.isArray(value)) {
            if (value === null || value === undefined) {
                value = [];
            } else {
                value = [value];
            }
        }
        this.state = {
            value: [...value],
        };

        this.onChange = this.onChange.bind(this);
    }

    getChildContext() {
        return {
            __group__: true,
            onChange: this.onChange,
            selectedValue: this.state.value,
            disabled: this.props.disabled,
        };
    }

    static getDerivedStateFromProps(nextProps: GroupProps) {
        if ('value' in nextProps) {
            let { value } = nextProps;
            if (!Array.isArray(value)) {
                if (value === null || value === undefined) {
                    value = [];
                } else {
                    value = [value];
                }
            }
            return { value };
        }

        return null;
    }

    @APAAction({
        name: 'setValue',
        desc: '设置选中的值列表',
        params: z.tuple([
            z.array(z.union([z.string(), z.number(), z.boolean()])).describe('要选中的值列表'),
        ]),
    })
    setValue(newValue: ValueItem[]) {
        if (!('value' in this.props)) {
            this.setState({ value: newValue });
        }
        // 创建一个合适的事件对象
        const event = new Event('change', { bubbles: true }) as any;
        Object.defineProperty(event, 'target', {
            writable: false,
            value: { value: newValue },
        });
        this.props.onChange?.(newValue, event);
    }

    @APAAction({
        name: 'selectAll',
        desc: '选中所有未禁用的复选框',
        params: z.tuple([]),
    })
    selectAll() {
        const allValues: ValueItem[] = [];

        // 如果使用 dataSource
        if (this.props.dataSource && this.props.dataSource.length > 0) {
            (this.props.dataSource as Array<string | CheckboxData>).forEach(item => {
                if (typeof item === 'string') {
                    allValues.push(item);
                } else if (item && typeof item === 'object' && !item.disabled) {
                    allValues.push(item.value);
                }
            });
        }
        // 如果使用 children
        else if (this.props.children) {
            React.Children.forEach(this.props.children, child => {
                if (React.isValidElement(child)) {
                    const childProps = child.props as any;
                    if (!childProps.disabled && childProps.value !== undefined) {
                        allValues.push(childProps.value);
                    }
                }
            });
        }

        this.setValue(allValues);
    }

    @APAAction({
        name: 'clearAll',
        desc: '清空所有选中的复选框',
        params: z.tuple([]),
    })
    clearAll() {
        this.setValue([]);
    }

    @APAAction({
        name: 'toggleValue',
        desc: '切换指定值的选中状态',
        params: z.tuple([z.union([z.string(), z.number(), z.boolean()]).describe('要切换的值')]),
    })
    toggleValue(value: ValueItem) {
        const currentValues = [...this.state.value];
        const index = currentValues.indexOf(value);

        if (index === -1) {
            currentValues.push(value);
        } else {
            currentValues.splice(index, 1);
        }

        this.setValue(currentValues);
    }

    @APAAction({
        name: 'selectByIndex',
        desc: '通过索引选中复选框（可传入多个索引）',
        params: z.tuple([
            z.union([z.number(), z.array(z.number())]).describe('要选中的复选框索引或索引数组'),
        ]),
    })
    selectByIndex(indexes: number | number[]) {
        const indexArray = Array.isArray(indexes) ? indexes : [indexes];
        const values: ValueItem[] = [];
        const enabledItems: ValueItem[] = [];

        // 如果使用 dataSource
        if (this.props.dataSource && this.props.dataSource.length > 0) {
            (this.props.dataSource as Array<string | CheckboxData>).forEach(item => {
                if (typeof item === 'string') {
                    enabledItems.push(item);
                } else if (item && typeof item === 'object' && !item.disabled) {
                    enabledItems.push(item.value);
                }
            });
        }
        // 如果使用 children
        else if (this.props.children) {
            React.Children.forEach(this.props.children, child => {
                if (React.isValidElement(child)) {
                    const childProps = child.props as any;
                    if (!childProps.disabled && childProps.value !== undefined) {
                        enabledItems.push(childProps.value);
                    }
                }
            });
        }

        indexArray.forEach(idx => {
            if (idx >= 0 && idx < enabledItems.length) {
                values.push(enabledItems[idx]);
            } else {
                console.warn(
                    `[CheckboxGroup] index ${idx} is out of range (0-${enabledItems.length - 1})`
                );
            }
        });

        if (values.length > 0) {
            this.setValue(values);
        }
    }

    onChange(currentValue: ValueItem, event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = this.state;
        const index = value.indexOf(currentValue);
        const valTemp = [...value];

        if (index === -1) {
            valTemp.push(currentValue);
        } else {
            valTemp.splice(index, 1);
        }

        if (!('value' in this.props)) {
            this.setState({ value: valTemp });
        }
        this.props.onChange?.(valTemp, event);
    }

    render() {
        const { className, style, prefix, disabled, direction, rtl, isPreview, renderPreview } =
            this.props;
        const others = pickOthers(CheckboxGroup.propTypes, this.props);

        // 如果内嵌标签跟 dataSource 同时存在，以内嵌标签为主
        let children;
        const previewed: {
            label: string | React.ReactNode;
            value: string | React.ReactNode;
        }[] = [];
        if (this.props.children) {
            children = React.Children.map(this.props.children, child => {
                if (
                    !React.isValidElement<{
                        value: ValueItem;
                        children?: string;
                        rtl?: boolean;
                    }>(child)
                ) {
                    return child;
                }
                const checked =
                    this.state.value && this.state.value.indexOf(child.props?.value) > -1;

                if (checked) {
                    previewed.push({
                        label: child.props?.children,
                        value: child.props?.value,
                    });
                }

                return React.cloneElement(child, child.props?.rtl === undefined ? { rtl } : {});
            });
        } else {
            children = this.props.dataSource?.map((item, index) => {
                let option: CheckboxData;
                if (typeof item !== 'object') {
                    option = {
                        label: item,
                        value: item,
                        disabled,
                    };
                } else {
                    option = item;
                }
                const checked = this.state.value && this.state.value.indexOf(option.value) > -1;

                if (checked) {
                    previewed.push({
                        label: option.label,
                        value: option.value,
                    });
                }

                return (
                    <Checkbox
                        key={index}
                        value={option.value}
                        checked={checked}
                        rtl={rtl}
                        disabled={disabled || option.disabled}
                        label={option.label}
                    />
                );
            });
        }

        if (isPreview) {
            const previewCls = classnames(className, `${prefix}form-preview`);

            if ('renderPreview' in this.props) {
                return (
                    <div {...others} dir={rtl ? 'rtl' : undefined} className={previewCls}>
                        {renderPreview?.(previewed, this.props)}
                    </div>
                );
            }

            return (
                <p {...others} dir={rtl ? 'rtl' : undefined} className={previewCls}>
                    {previewed.map(item => item.label).join(', ')}
                </p>
            );
        }

        const cls = classnames(className, {
            [`${prefix}checkbox-group`]: true,
            [`${prefix}checkbox-group-${direction}`]: true,
            disabled,
        });

        return (
            <span dir={rtl ? 'rtl' : undefined} {...others} className={cls} style={style}>
                {children}
            </span>
        );
    }
}

export default polyfill(CheckboxGroup);
