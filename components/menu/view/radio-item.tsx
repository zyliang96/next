import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { APAConfigProvider } from '@alifd/apa-sdk';
import CheckableItem from './checkable-item';
import type { RadioItemProps } from '../types';

class RadioItem extends Component<RadioItemProps> {
    static menuChildType = 'item';

    static propTypes = {
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        helper: PropTypes.node,
        children: PropTypes.node,
    };

    static defaultProps = {
        checked: false,
        disabled: false,
        onChange: () => {},
    };

    render() {
        return <CheckableItem role="menuitemradio" checkType="radio" {...this.props} />;
    }
}

export default APAConfigProvider.config(RadioItem, {
    desc: '单选框项组件',
    props: [
        { key: 'checked', name: '是否选中', desc: '是否选中，true表示选中，false表示未选中' },
        { key: 'disabled', name: '是否禁用', desc: '是否禁用，true表示禁用，false表示启用' },
        { key: 'children', name: '标签内容', desc: '标签内容' },
    ],
    staticProps: {
        menuChildType: 'item',
    },
});
