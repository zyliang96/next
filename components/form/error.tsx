import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ConfigProvider from '../config-provider';
import type { ErrorProps } from './types';
import type NextField from '../field';
import { FormContextConsumer, type FormContextValue } from './context';

class Error extends Component<ErrorProps> {
    static displayName = 'Error';
    static propTypes = {
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        field: PropTypes.object,
        style: PropTypes.object,
        className: PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        prefix: PropTypes.string,
        preferMarginToDisplayHelp: PropTypes.bool,
    };

    static defaultProps = {
        prefix: 'next-',
        preferMarginToDisplayHelp: false,
    };

    static _typeMark = 'form_error';

    /**
     * 表单上下文
     */
    formContext: FormContextValue | null = null;

    itemRender = (errors: unknown[]) => {
        return errors.length ? errors : null;
    };

    render() {
        return (
            <FormContextConsumer>
                {(value: FormContextValue) => {
                    this.formContext = value;

                    const {
                        children,
                        name,
                        prefix,
                        style,
                        className,
                        field: _field,
                        preferMarginToDisplayHelp,
                        ...others
                    } = this.props;

                    if (children && typeof children !== 'function') {
                        return (
                            <div className={`${prefix}form-item-help`}>
                                {children}
                                {!!preferMarginToDisplayHelp && (
                                    <div className={`${prefix}form-item-help-margin-offset`} />
                                )}
                            </div>
                        );
                    }

                    const field: NextField = this.formContext._formField || (_field as NextField);

                    if (!field || !name) {
                        return null;
                    }

                    const isSingle = typeof name === 'string';

                    const names = isSingle ? [name] : name;
                    const errorArr: unknown[] = [];

                    if (names.length) {
                        const errors = field.getErrors(names);
                        Object.keys(errors).forEach(key => {
                            if (errors[key]) {
                                errorArr.push(errors[key]);
                            }
                        });
                    }

                    let result = null;
                    if (typeof children === 'function') {
                        result = children(errorArr, isSingle ? field.getState(name) : undefined);
                    } else {
                        result = this.itemRender(errorArr);
                    }

                    if (!result) {
                        return null;
                    }

                    const cls = classNames({
                        [`${prefix}form-item-help`]: true,
                        [className!]: className,
                    });
                    return (
                        <div {...others} className={cls} style={style} role="alert">
                            {result}
                            {!!preferMarginToDisplayHelp && (
                                <div className={`${prefix}form-item-help-margin-offset`} />
                            )}
                        </div>
                    );
                }}
            </FormContextConsumer>
        );
    }
}

export default ConfigProvider.config(Error);
