import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APAConfigProvider } from '@alifd/apa-sdk';
import { GroupProps } from '../types';
import ConfigProvider from '../../config-provider';

/**
 * Button.Group
 */
class ButtonGroup extends Component<GroupProps> {
    static displayName = 'ButtonGroup';
    static propTypes = {
        ...ConfigProvider.propTypes,
        rtl: PropTypes.bool,
        prefix: PropTypes.string,
        size: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
    };

    static defaultProps = {
        prefix: 'next-',
        size: 'medium',
    };

    render() {
        const { prefix, className, size, children, rtl, ...others } = this.props;

        const groupCls = classNames({
            [`${prefix}btn-group`]: true,
            [className!]: className,
        });

        const cloneChildren = Children.map(children, child => {
            if (child) {
                // fixme: child may not be cloned
                return React.cloneElement(child as React.ReactElement, {
                    size: size,
                });
            }
        });

        if (rtl) {
            others.dir = 'rtl';
        }

        return (
            <div {...others} className={groupCls}>
                {cloneChildren}
            </div>
        );
    }
}

export type { ButtonGroup };

export default ConfigProvider.config(
    APAConfigProvider.config(ButtonGroup, {
        isRegisterChildren: true,
        desc: '按钮组组件',
        props: [
            {
                key: 'size',
                name: '尺寸',
                desc: '按钮组尺寸',
            },
        ],
    })
);
