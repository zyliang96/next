import React from 'react';
import PropTypes from 'prop-types';
import { APAAction, APAActionEnabled, APAConfigProvider, APAActionDiabled } from '@alifd/apa-sdk';
import Button from '../button';
import { func, obj } from '../util';
import type { SubmitProps } from './types';
import { FormContextConsumer, type FormContextValue } from './context';
import type { ValidateErrorGroup } from '../field/types';

@APAActionEnabled
class Submit extends React.Component<SubmitProps> {
    static displayName = 'Submit';
    static propTypes = {
        onClick: PropTypes.func,
        validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
        field: PropTypes.object,
        children: PropTypes.node,
    };

    static defaultProps = {
        onClick: func.noop,
    };

    formContext: FormContextValue;

    @APAActionDiabled({ actionName: 'onClick', defaultDisabled: false })
    get handleClickActionDisabled() {
        return this.props.disabled || this.props.loading;
    }

    @APAAction({ name: 'onClick', desc: '提交表单' })
    handleClick = () => {
        const { onClick, validate } = this.props;
        const field = this.formContext._formField || this.props.field;
        if (!field) {
            onClick!();
            return;
        }

        if (validate === true) {
            field.validate((errors: ValidateErrorGroup | null) => {
                onClick!(field.getValues(), errors, field);
            });
        } else if (Array.isArray(validate)) {
            field.validate(validate, (errors: ValidateErrorGroup | null) => {
                onClick!(field.getValues(), errors, field);
            });
        } else {
            onClick!(field.getValues(), null, field);
        }
    };

    render() {
        return (
            <FormContextConsumer>
                {(value: FormContextValue) => {
                    this.formContext = value;
                    const { children } = this.props;
                    return (
                        <Button
                            {...obj.pickOthers(Submit.propTypes, this.props)}
                            onClick={this.handleClick}
                        >
                            {children}
                        </Button>
                    );
                }}
            </FormContextConsumer>
        );
    }
}

export default APAConfigProvider.config(Submit, {
    isRegiserChildren: false,
    desc: '表单提交按钮组件',
    props: [
        {
            key: 'disabled',
            name: '禁用状态',
            desc: '是否禁用按钮，true 表示禁用，false 表示启用，禁用状态不能触发点击事件',
        },
        {
            key: 'loading',
            name: '加载状态',
            desc: '是否处于加载状态，true 表示加载中，不可点击，false 表示正常状态，可点击',
        },
    ],
});
