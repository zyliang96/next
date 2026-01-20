import React from 'react';
import PropTypes from 'prop-types';
import { APAAction, APAActionDisabled, APAConfigProvider, APAActionEnabled } from '@alifd/apa-sdk';
import Button from '../button';
import { func, obj } from '../util';
import type { ResetProps } from './types';
import { FormContextConsumer, type FormContextValue } from './context';

@APAActionEnabled
class Reset extends React.Component<ResetProps> {
    static displayName = 'Reset';
    static propTypes = {
        names: PropTypes.array,
        onClick: PropTypes.func,
        toDefault: PropTypes.bool,
        field: PropTypes.object,
        children: PropTypes.node,
    };

    static defaultProps = {
        onClick: func.noop,
    };

    formContext: FormContextValue;

    @APAActionDisabled({ actionName: 'onClick', defaultDisabled: false })
    get handleClickActionDisabled() {
        return this.props.disabled || this.props.loading;
    }

    @APAAction({ name: 'onClick', desc: '重置表单' })
    handleClick = () => {
        const { names, toDefault, onClick } = this.props;
        const field = this.formContext._formField || this.props.field;
        if (!field) {
            onClick!();
            return;
        }

        if (toDefault) {
            field.resetToDefault(names);
        } else {
            field.reset(names);
        }

        onClick!();
    };

    render() {
        return (
            <FormContextConsumer>
                {(value: FormContextValue) => {
                    this.formContext = value;
                    const { children } = this.props;
                    return (
                        <Button
                            {...obj.pickOthers(Reset.propTypes, this.props)}
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

export default APAConfigProvider.config(Reset, {
    isRegisterChildren: false,
    desc: '表单重置按钮组件',
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
