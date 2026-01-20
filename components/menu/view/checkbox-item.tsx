import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { APAConfigProvider } from '@alifd/apa-sdk';
import CheckableItem from './checkable-item';
import type { CheckboxItemProps } from '../types';

class CheckboxItem extends Component<CheckboxItemProps> {
    static menuChildType = 'item';

    static displayName = 'CheckboxItem';
    static propTypes = {
        checked: PropTypes.bool,
        indeterminate: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        helper: PropTypes.node,
        children: PropTypes.node,
        checkboxDisabled: PropTypes.bool,
    };

    static defaultProps = {
        checked: false,
        indeterminate: false,
        disabled: false,
        onChange: () => {},
        checkboxDisabled: false,
    };

    render() {
        const { checkboxDisabled, ...others } = this.props;
        return (
            <CheckableItem
                role="menuitemcheckbox"
                checkType="checkbox"
                checkDisabled={checkboxDisabled}
                {...others}
            />
        );
    }
}

export default APAConfigProvider.config(CheckboxItem, {
    desc: '复选框项组件',
    props: [
        { key: 'checked', name: '是否选中', desc: '是否选中，true表示选中，false表示未选中' },
        {
            key: 'indeterminate',
            name: '是否半选中',
            desc: '是否半选中，true表示半选中，false表示未半选中',
        },
        { key: 'disabled', name: '是否禁用', desc: '是否禁用，true表示禁用，false表示启用' },
        { key: 'children', name: '标签内容', desc: '标签内容' },
    ],
    staticProps: {
        menuChildType: 'item',
    },
});
