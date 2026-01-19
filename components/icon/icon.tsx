import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { Component } from 'react';
import { APAConfigProvider } from '@alifd/apa-sdk';
import { obj } from '../util';
import type { IconProps } from './types';
import ConfigProvider from '../config-provider';

/**
 * Icon
 */
class Icon extends Component<IconProps> {
    static propTypes = {
        ...ConfigProvider.propTypes,
        type: PropTypes.string,
        children: PropTypes.node,
        size: PropTypes.oneOfType([
            PropTypes.oneOf([
                'xxs',
                'xs',
                'small',
                'medium',
                'large',
                'xl',
                'xxl',
                'xxxl',
                'inherit',
            ]),
            PropTypes.number,
        ]),
        className: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {
        prefix: 'next-',
        size: 'medium',
    };

    static displayName = 'Icon';

    static _typeMark = 'icon';

    render() {
        const { prefix, type, size, className, rtl, style, children } = this.props;
        const others = obj.pickOthers(Object.assign({}, Icon.propTypes), this.props);

        const classes = cx({
            [`${prefix}icon`]: true,
            [`${prefix}icon-${type}`]: !!type,
            [`${prefix}${size}`]: !!size && typeof size === 'string',
            [className!]: !!className,
        });

        if (
            rtl &&
            type &&
            [
                'arrow-left',
                'arrow-right',
                'arrow-double-left',
                'arrow-double-right',
                'switch',
                'sorting',
                'descending',
                'ascending',
            ].indexOf(type) !== -1
        ) {
            others.dir = 'rtl';
        }

        const sizeStyle =
            typeof size === 'number'
                ? {
                      width: size,
                      height: size,
                      lineHeight: `${size}px`,
                      fontSize: size,
                  }
                : {};

        return (
            <i {...others} style={{ ...sizeStyle, ...style }} className={classes}>
                {children}
            </i>
        );
    }
}

export default APAConfigProvider.config(Icon, {
    isRegiserChildren: false,
    desc: '图标组件',
    props: [
        {
            key: 'type',
            name: '图标类型',
            desc: '指定显示哪种图标',
        },
        {
            key: 'size',
            name: '图标大小',
            desc: '指定图标大小，如 xxs, xs, small, medium, large, xl, xxl, xxxl, inherit',
        },
    ],
});
