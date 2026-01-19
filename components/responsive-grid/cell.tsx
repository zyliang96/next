import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { APAConfigProvider } from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import { obj } from '../util';
import type { CellProps } from './types';

const { pickOthers } = obj;

/**
 * ResponsiveGrid.Cell
 */
class Cell extends Component<CellProps> {
    static _typeMark = 'responsive_grid_cell';
    static propTypes = {
        device: PropTypes.oneOf(['phone', 'tablet', 'desktop']),
        colSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        rowSpan: PropTypes.number,
        component: PropTypes.elementType,
    };

    static defaultProps = {
        component: 'div',
        device: 'desktop',
    };

    static displayName = 'Cell';

    render() {
        const { component, children } = this.props;
        const View = component!;

        const others = pickOthers(Object.keys(Cell.propTypes), this.props);

        return <View {...others}>{children}</View>;
    }
}

export default ConfigProvider.config(
    APAConfigProvider.config(Cell, {
        desc: '响应式网格单元组件',
        props: [
            {
                key: 'colSpan',
                name: '横向占据几列',
                desc: '横向占据几列，可选值为 number 或 object',
            },
            {
                key: 'rowSpan',
                name: '纵向占据几行',
                desc: '纵向占据几行，可选值为 number',
            },
        ],
    })
);
