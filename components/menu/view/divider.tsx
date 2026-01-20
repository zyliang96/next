import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { APAConfigProvider } from '@alifd/apa-sdk';
import type { DividerProps, ChildItemPropsInMenu } from '../types';

class Divider extends Component<DividerProps> {
    static menuChildType = 'divider';

    static propTypes = {
        root: PropTypes.object,
        className: PropTypes.string,
    };

    render() {
        const { root, className, parentMode, parent, ...others } = this
            .props as ChildItemPropsInMenu<DividerProps>;
        const { prefix } = root.props;

        const newClassName = cx(`${prefix}menu-divider`, className);

        return <li role="separator" className={newClassName} {...others} />;
    }
}

export default APAConfigProvider.config(Divider, {
    desc: '分割线项组件',
    props: [
        {
            key: 'selectable',
            name: '是否选中状态',
            desc: '是否选中状态，true表示选中，false表示未选中',
        },
    ],
});
