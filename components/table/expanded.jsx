import React, { Children } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { APAActionEnabled, APAActionDisabled, APAAction } from '@alifd/apa-sdk';
import { z } from 'zod';
import { polyfill } from 'react-lifecycles-compat';
import Icon from '../icon';
import { KEYCODE, dom, events } from '../util';
import RowComponent from './expanded/row';
import Col from './column';
import { statics } from './util';
import { ExpandedContext } from './context';

const noop = () => {};

export const expandedStaticProps = {
    ExpandedRow: RowComponent,
};

export default function expanded(BaseComponent, stickyLock) {
    /** Table */
    @APAActionEnabled
    class ExpandedTable extends React.Component {
        static ExpandedRow = RowComponent;
        static propTypes = {
            /**
             * 额外渲染行的渲染函数
             * @param {Object} record 该行所对应的数据
             * @param {Number} index 该行所对应的序列
             * @returns {Element}
             */
            expandedRowRender: PropTypes.func,
            /**
             * 设置行是否可展开，设置 false 为不可展开
             * @param {Object} record 该行所对应的数据
             * @param {Number} index 该行所对应的序列
             * @returns {Boolean} 是否可展开
             * @version 1.21
             */
            rowExpandable: PropTypes.func,
            /**
             * 额外渲染行的缩进
             */
            expandedRowIndent: PropTypes.array,
            /**
             * 默认情况下展开的渲染行或者Tree, 传入此属性为受控状态
             */
            openRowKeys: PropTypes.array,
            /**
             * 默认情况下展开的 Expand行 或者 Tree行，非受控模式
             * @version 1.23.22
             */
            defaultOpenRowKeys: PropTypes.array,
            /**
             * 是否显示点击展开额外渲染行的+号按钮
             */
            hasExpandedRowCtrl: PropTypes.bool,
            /**
             * 设置额外渲染行的属性
             */
            getExpandedColProps: PropTypes.func,
            /**
             * 在额外渲染行或者Tree展开或者收起的时候触发的事件
             * @param {Array} openRowKeys 展开的渲染行的key
             * @param {String} currentRowKey 当前点击的渲染行的key
             * @param {Boolean} expanded 当前点击是展开还是收起
             * @param {Object} currentRecord 当前点击额外渲染行的记录
             */
            onRowOpen: PropTypes.func,
            onExpandedRowClick: PropTypes.func,
            locale: PropTypes.object,
            ...BaseComponent.propTypes,
        };

        static defaultProps = {
            ...BaseComponent.defaultProps,
            getExpandedColProps: noop,
            onRowOpen: noop,
            hasExpandedRowCtrl: true,
            components: {},
            expandedRowIndent: stickyLock ? [0, 0] : [1, 0],
            prefix: 'next-',
        };

        state = {
            openRowKeys: this.props.openRowKeys || this.props.defaultOpenRowKeys || [],
        };

        constructor(props) {
            super(props);
            // 缓存 context value
            this._expandedContextValue = null;
            this._lastOpenRowKeys = null;
            this._lastExpandedRowRender = null;
            this._lastExpandedIndexSimulate = null;
            this._lastExpandedRowIndent = null;
        }

        // 缓存 ExpandedContext value
        getExpandedContextValue = () => {
            const { openRowKeys } = this.state;
            const { expandedRowRender, expandedIndexSimulate, expandedRowIndent } = this.props;
            
            if (
                this._expandedContextValue === null ||
                this._lastOpenRowKeys !== openRowKeys ||
                this._lastExpandedRowRender !== expandedRowRender ||
                this._lastExpandedIndexSimulate !== expandedIndexSimulate ||
                this._lastExpandedRowIndent !== expandedRowIndent
            ) {
                this._lastOpenRowKeys = openRowKeys;
                this._lastExpandedRowRender = expandedRowRender;
                this._lastExpandedIndexSimulate = expandedIndexSimulate;
                this._lastExpandedRowIndent = expandedRowIndent;
                this._expandedContextValue = {
                    openRowKeys,
                    expandedRowRender,
                    expandedIndexSimulate,
                    expandedRowWidthEquals2Table: stickyLock,
                    getExpandedRowRef: this.saveExpandedRowRef,
                    getTableInstanceForExpand: this.getTableInstance,
                    expandedRowIndent: stickyLock ? [0, 0] : expandedRowIndent,
                };
            }
            return this._expandedContextValue;
        };

        static getDerivedStateFromProps(nextProps) {
            if ('openRowKeys' in nextProps) {
                return {
                    openRowKeys: nextProps.openRowKeys || [],
                };
            }

            return null;
        }

        componentDidMount() {
            this.setExpandedWidth();
            events.on(window, 'resize', this.setExpandedWidth);
        }

        componentDidUpdate() {
            this.setExpandedWidth();
        }

        componentWillUnmount() {
            events.off(window, 'resize', this.setExpandedWidth);
        }

        saveExpandedRowRef = (key, rowRef) => {
            if (!this.expandedRowRefs) {
                this.expandedRowRefs = {};
            }
            this.expandedRowRefs[key] = rowRef;
        };

        setExpandedWidth = () => {
            const { prefix } = this.props;
            const tableEl = this.getTableNode();
            const totalWidth = +(tableEl && tableEl.clientWidth) - 1 || '100%';
            const bodyNode = tableEl && tableEl.querySelector(`.${prefix}table-body`);

            Object.keys(this.expandedRowRefs || {}).forEach(key => {
                dom.setStyle(this.expandedRowRefs[key], {
                    width: (bodyNode && bodyNode.clientWidth) || totalWidth,
                });
            });
        };

        getTableInstance = instance => {
            this.tableInc = instance;
        };

        getTableNode() {
            const table = this.tableInc;
            try {
                // in case of finding an unmounted component due to cached data
                // need to clear refs of table when dataSource Changed
                // use try catch for temporary
                return findDOMNode(table.tableEl);
            } catch (error) {
                return null;
            }
        }

        expandedKeydown = (value, record, index, e) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.keyCode === KEYCODE.ENTER) {
                this.onExpandedClick(value, record, index, e);
            }
        };

        renderExpandedCell = (value, index, record) => {
            const { getExpandedColProps, prefix, locale, rowExpandable } = this.props;

            if (typeof rowExpandable === 'function' && !rowExpandable(record, index)) {
                return '';
            }

            const { openRowKeys } = this.state,
                { primaryKey } = this.props,
                hasExpanded = openRowKeys.indexOf(record[primaryKey]) > -1,
                switchNode = hasExpanded ? (
                    <Icon type="minus" size="xs" className={`${prefix}table-expand-unfold`} />
                ) : (
                    <Icon type="add" size="xs" className={`${prefix}table-expand-fold`} />
                ),
                attrs = getExpandedColProps(record, index) || {};
            const cls = classnames({
                [`${prefix}table-expanded-ctrl`]: true,
                disabled: attrs.disabled,
                [attrs.className]: attrs.className,
            });

            if (!attrs.disabled) {
                attrs.onClick = this.onExpandedClick.bind(this, value, record, index);
            }
            return (
                <span
                    {...attrs}
                    role="button"
                    tabIndex="0"
                    onKeyDown={this.expandedKeydown.bind(this, value, record, index)}
                    aria-label={hasExpanded ? locale.expanded : locale.folded}
                    aria-expanded={hasExpanded}
                    className={cls}
                >
                    {switchNode}
                </span>
            );
        };

        @APAActionDisabled({ actionName: 'onExpandedClick', defaultDisabled: false })
        get apaOnExpandedClickDisabled() {
            const { expandedRowRender, components, hasExpandedRowCtrl } = this.props;
            return !expandedRowRender || components.Row || !hasExpandedRowCtrl;
        }

        @APAAction({
            name: 'onExpandedClick',
            desc: '点击展开额外渲染行',
            params: z.tuple([z.number().describe('行索引'), z.boolean().describe('是否展开')]),
        })
        apaOnExpandedClick(index, expanded) {
            const { dataSource, primaryKey } = this.props;
            const openRowKeys = [...this.state.openRowKeys];
            const targetRecord = dataSource[index];
            const id = targetRecord[primaryKey];
            const idx = openRowKeys.indexOf(id);
            const canExpand =
                typeof rowExpandable === 'function' ? rowExpandable(targetRecord, index) : false;
            // 如果不可展开，则保持原状
            if (!canExpand) {
                return;
            }
            // 如果可展开，要展开，且已经在展开列表里，则保持原状
            if (expanded && idx > -1) {
                return;
            }
            // 如果可展开，不要展开，且未在展开列表里，则保持原状
            if (!expanded && !(idx > -1)) {
                return;
            }
            return this.onExpandedClick(id, targetRecord, index);
        }

        onExpandedClick(value, record, i, e) {
            const openRowKeys = [...this.state.openRowKeys],
                { primaryKey } = this.props,
                id = record[primaryKey],
                index = openRowKeys.indexOf(id);
            if (index > -1) {
                openRowKeys.splice(index, 1);
            } else {
                openRowKeys.push(id);
            }
            if (!('openRowKeys' in this.props)) {
                this.setState({
                    openRowKeys: openRowKeys,
                });
            }
            this.props.onRowOpen(openRowKeys, id, index === -1, record);
            e && e.stopPropagation();
        }

        addExpandCtrl = columns => {
            const { prefix, size } = this.props;

            if (!columns.find(record => record.key === 'expanded')) {
                columns.unshift({
                    key: 'expanded',
                    title: '',
                    cell: this.renderExpandedCell.bind(this),
                    width: size === 'small' ? 34 : 50,
                    className: `${prefix}table-expanded ${prefix}table-prerow`,
                    __normalized: true,
                });
            }
        };

        normalizeChildren(children) {
            const { prefix, size } = this.props;
            const toArrayChildren = Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    key: index,
                })
            );
            toArrayChildren.unshift(
                <Col
                    title=""
                    key="expanded"
                    cell={this.renderExpandedCell.bind(this)}
                    width={size === 'small' ? 34 : 50}
                    className={`${prefix}table-expanded ${prefix}table-prerow`}
                    __normalized
                />
            );
            return toArrayChildren;
        }

        normalizeDataSource(ds) {
            const ret = [];
            ds.forEach(item => {
                const itemCopy = { ...item };
                itemCopy.__expanded = true;
                ret.push(item, itemCopy);
            });
            return ret;
        }

        render() {
            /* eslint-disable no-unused-vars, prefer-const */
            let {
                components,
                openRowKeys,
                expandedRowRender,
                rowExpandable,
                hasExpandedRowCtrl,
                children,
                columns,
                dataSource,
                entireDataSource,
                getExpandedColProps,
                expandedRowIndent,
                onRowOpen,
                onExpandedRowClick,
                ...others
            } = this.props;

            if (expandedRowRender && !components.Row) {
                components = { ...components };
                components.Row = RowComponent;
                dataSource = this.normalizeDataSource(dataSource);
                entireDataSource = this.normalizeDataSource(entireDataSource);
            }
            if (expandedRowRender && hasExpandedRowCtrl) {
                let useColumns = columns && !children;

                if (useColumns) {
                    this.addExpandCtrl(columns);
                } else {
                    children = this.normalizeChildren(children || []);
                }
            }

            return (
                <ExpandedContext.Provider value={this.getExpandedContextValue()}>
                    <BaseComponent
                        {...others}
                        columns={columns}
                        dataSource={dataSource}
                        entireDataSource={entireDataSource}
                        components={components}
                    >
                        {children}
                    </BaseComponent>
                </ExpandedContext.Provider>
            );
        }
    }
    statics(ExpandedTable, BaseComponent);
    return polyfill(ExpandedTable);
}
