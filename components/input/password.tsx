import React, { type MouseEvent, type UIEvent } from 'react';
import PropTypes from 'prop-types';
import { APAConfigProvider, APAStateEnabled, APAActionEnabled, APAState } from '@alifd/apa-sdk';

import { Input } from './input';
import Icon from '../icon/index';
import type { PasswordProps } from './types';

function preventDefault(e: UIEvent) {
    e.preventDefault();
}

@APAActionEnabled
@APAStateEnabled
class Password extends Input<PasswordProps> {
    @APAState([
        { name: 'value', desc: '密码输入框当前的值' },
        { name: 'hint', desc: '密码可见性图标状态' },
        { name: 'htmlType', desc: '输入框HTML类型' },
    ])
    state = {
        value: '',
        hint: 'eye-close',
        htmlType: 'password',
    };

    static displayName = 'Password';

    static getDerivedStateFromProps = Input.getDerivedStateFromProps;

    static propTypes = {
        ...Input.propTypes,
        showToggle: PropTypes.bool,
    };
    static defaultProps = {
        ...Input.defaultProps,
        showToggle: true,
    };

    toggleEye = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (this.props.disabled) return;
        const eyeClose = this.state.hint === 'eye';

        this.setState({
            hint: eyeClose ? 'eye-close' : 'eye',
            htmlType: eyeClose || !this.props.showToggle ? 'password' : 'text',
        });
    };

    render() {
        const { showToggle, ...others } = this.props;
        const { hint, htmlType } = this.state;

        const extra = showToggle ? (
            <Icon type={hint} onClick={this.toggleEye} onMouseDown={preventDefault} />
        ) : null;

        return <Input {...others} extra={extra} htmlType={htmlType} />;
    }
}

export default APAConfigProvider.config(Password, {
    isRegisterChildren: false,
    desc: '密码输入框组件',
    props: [
        { key: 'value', name: 'value', desc: '密码输入框当前的值' },
        { key: 'disabled', name: 'disabled', desc: '是否禁用密码输入框' },
        { key: 'showToggle', name: 'showToggle', desc: '是否显示密码可见性切换按钮' },
    ],
});
