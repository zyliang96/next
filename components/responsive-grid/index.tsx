import React, {
    Component,
    type CSSProperties,
    type JSXElementConstructor,
    type ReactNodeArray,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APAConfigProvider } from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import Box from '../box';
import { obj, env } from '../util';
import createStyle, { getGridChildProps } from './create-style';
import Cell from './cell';
import type { ResponsiveGridProps, CellProps } from './types';

const { ieVersion } = env;
const { pickOthers, isReactFragmentElement } = obj;

type WithTypeMarkComponent = JSXElementConstructor<unknown> & { _typeMark: string };

const createChildren = (
    children: React.ReactNode,
    device: ResponsiveGridProps['device'],
    gap: ResponsiveGridProps['gap']
): ReactNodeArray | null => {
    const array = React.Children.toArray(children);
    if (!children) {
        return null;
    }

    return array.map(child => {
        if (isReactFragmentElement(child)) {
            return createChildren((child as React.ReactElement).props.children, device, gap);
        }

        if (
            React.isValidElement<{ style?: CSSProperties }>(child) &&
            ['function', 'object'].indexOf(typeof child.type) > -1 &&
            ['form_item', 'responsive_grid_cell'].indexOf(
                (child.type as WithTypeMarkComponent)._typeMark
            ) > -1
        ) {
            return React.cloneElement(child, {
                style: {
                    ...getGridChildProps(child.props, device, gap),
                    ...(child.props.style || {}),
                },
            });
        }

        return child;
    });
};

const getStyle = (style = {}, props: ResponsiveGridProps) => {
    return {
        ...createStyle({ display: 'grid', ...props }),
        ...style,
    };
};

/**
 * ResponsiveGrid
 */
class ResponsiveGrid extends Component<ResponsiveGridProps> {
    static _typeMark = 'responsive_grid';
    static Cell = Cell;
    static propTypes = {
        prefix: PropTypes.string,
        className: PropTypes.any,
        device: PropTypes.oneOf(['phone', 'tablet', 'desktop']),
        rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        gap: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
        component: PropTypes.elementType,
        dense: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        prefix: 'next-',
        component: 'div',
        device: 'desktop',
        dense: false,
    };

    static displayName = 'ResponsiveGrid';

    render() {
        const {
            prefix,
            style,
            className,
            children,
            device,
            rows,
            columns,
            gap,
            rowSpan,
            colSpan,
            component,
            dense,
        } = this.props;
        const styleProps = {
            rows,
            columns,
            gap,
            device,
            rowSpan,
            colSpan,
            component,
            dense,
        };
        const View = component!;

        const others = pickOthers(Object.keys(ResponsiveGrid.propTypes), this.props);

        const styleSheet = getStyle(style, styleProps);

        const cls = classNames(
            {
                [`${prefix}responsive-grid`]: true,
                [`${prefix}responsive-grid-ie`]: ieVersion,
            },
            className
        );

        return ieVersion ? (
            <Box
                {...this.props}
                direction="row"
                wrap
                spacing={gap}
                children={createChildren(children, device, gap)}
            />
        ) : (
            <View style={styleSheet} className={cls} {...others}>
                {createChildren(children, device, gap)}
            </View>
        );
    }
}

ResponsiveGrid.Cell = Cell;

export type { ResponsiveGridProps, CellProps };

export default ConfigProvider.config(
    APAConfigProvider.config(ResponsiveGrid, {
        desc: '响应式网格组件',
        props: [
            {
                key: 'device',
                name: '设备类型',
                desc: '设备类型，用来做自适应，可选值为 phone、tablet、desktop',
            },
            {
                key: 'columns',
                name: '列数',
                desc: '列数，分为几列， 默认是 12 列',
            },
            {
                key: 'gap',
                name: '间距',
                desc: '间距，每个 cell 之间的间距， [bottom&top, right&left]',
            },
            {
                key: 'component',
                name: '设置标签类型',
                desc: '设置标签类型',
            },
            {
                key: 'dense',
                name: '紧密模式',
                desc: '是否开启紧密模式，开启后尽可能能紧密填满，尽量不出现空格，true 表示开启，false 表示关闭',
            },
        ],
    })
);
