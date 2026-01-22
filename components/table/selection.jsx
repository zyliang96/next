import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import { APAActionEnabled, APAActionDisabled, APAAction } from '@alifd/apa-sdk';
import { z } from 'zod';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { func, log } from '../util';
import zhCN from '../locale/zh-cn';
import SelectionRow from './selection/row';
import Col from './column';
import { statics } from './util';
import { SelectionContext, ListContext } from './context';

const { makeChain } = func;

const unique = (arr, key = 'this') => {
    const temp = {},
        ret = [];
    arr.forEach(item => {
        let value;
        if (key === 'this') {
            value = item;
        } else {
            value = item[key];
        }
        if (!temp[value]) {
            ret.push(item);
            temp[value] = true;
        }
    });
    return ret;
};

export const selectionStaticProps = {
    SelectionRow: SelectionRow,
};

export default function selection(BaseComponent) {
    /** Table */
    @APAActionEnabled
    class SelectionTable extends React.Component {
        static SelectionRow = SelectionRow;
        static propTypes = {
            /**
             * 是否启用选择模式
             * @property {Function} getProps `Function(record, index)=>Object` 获取selection的默认属性
             * @property {Function} onChange `Function(selectedRowKeys:Array, records:Array)` 选择改变的时候触发的事件，**注意:** 其中records只会包含当前dataSource的数据，很可能会小于selectedRowKeys的长度。
             * @property {Function} onSelect `Function(selected:Boolean, record:Object, records:Array)` 用户手动选择/取消选择某行的回调
             * @property {Function} onSelectAll `Function(selected:Boolean, records:Array)` 用户手动选择/取消选择所有行的回调
             * @property {Array} selectedRowKeys 设置了此属性,将rowSelection变为受控状态,接收值为该行数据的primaryKey的值
             * @property {String} mode 选择selection的模式, 可选值为`single`, `multiple`，默认为`multiple`
             * @property {Function} columnProps `Function()=>Object` 选择列 的props，例如锁列、对齐等，可使用`Table.Column` 的所有参数
             * @property {Function} titleProps `Function()=>Object` 选择列 表头的props，仅在 `multiple` 模式下生效
             */
            rowSelection: PropTypes.object,
            primaryKey: PropTypes.oneOfType([PropTypes.symbol, PropTypes.string]),
            dataSource: PropTypes.array,
            entireDataSource: PropTypes.array,
            ...BaseComponent.propTypes,
        };

        static defaultProps = {
            ...BaseComponent.defaultProps,
            locale: zhCN.Table,
            primaryKey: 'id',
            prefix: 'next-',
        };

        constructor(props) {
            super(props);
            this.state = {
                selectedRowKeys:
                    props.rowSelection && 'selectedRowKeys' in props.rowSelection
                        ? props.rowSelection.selectedRowKeys || []
                        : [],
            };
            // 缓存 context value
            this._selectionContextValue = null;
            this._lastRowSelection = null;
            this._lastSelectedRowKeys = null;
        }

        // 缓存 SelectionContext value
        getSelectionContextValue = () => {
            const { rowSelection } = this.props;
            const { selectedRowKeys } = this.state;

            if (
                this._selectionContextValue === null ||
                this._lastRowSelection !== rowSelection ||
                this._lastSelectedRowKeys !== selectedRowKeys
            ) {
                this._lastRowSelection = rowSelection;
                this._lastSelectedRowKeys = selectedRowKeys;
                this._selectionContextValue = {
                    rowSelection,
                    selectedRowKeys,
                };
            }
            return this._selectionContextValue;
        };

        static getDerivedStateFromProps(nextProps) {
            if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
                const selectedRowKeys = nextProps.rowSelection.selectedRowKeys || [];
                return {
                    selectedRowKeys,
                };
            }

            return null;
        }

        normalizeChildren(children) {
            const { prefix, rowSelection, size } = this.props;
            if (rowSelection) {
                children = Children.map(children, (child, index) =>
                    React.cloneElement(child, {
                        key: index,
                    })
                );

                const attrs = (rowSelection.columnProps && rowSelection.columnProps()) || {};

                children.unshift(
                    <Col
                        key="selection"
                        title={this.renderSelectionHeader.bind(this)}
                        cell={this.renderSelectionBody.bind(this)}
                        width={size === 'small' ? 34 : 50}
                        className={`${prefix}table-selection ${prefix}table-prerow`}
                        __normalized
                        {...attrs}
                    />
                );
                return children;
            }
            return children;
        }

        addSelection = columns => {
            const { prefix, rowSelection, size } = this.props;
            const attrs = (rowSelection.columnProps && rowSelection.columnProps()) || {};

            if (!columns.find(record => record.key === 'selection')) {
                columns.unshift({
                    key: 'selection',
                    title: this.renderSelectionHeader.bind(this),
                    cell: this.renderSelectionBody.bind(this),
                    width: size === 'small' ? 34 : 50,
                    className: `${prefix}table-selection ${prefix}table-prerow`,
                    __normalized: true,
                    ...attrs,
                });
            }
        };

        renderSelectionHeader = () => {
            const onChange = this.selectAllRow,
                attrs = {},
                { rowSelection, primaryKey, dataSource, entireDataSource, locale } = this.props,
                { selectedRowKeys } = this.state,
                mode = rowSelection.mode ? rowSelection.mode : 'multiple';

            let checked = !!selectedRowKeys.length;
            let indeterminate = false;

            const source = entireDataSource || dataSource;

            this.flatDataSource(source)
                .filter((record, index) => {
                    if (!rowSelection.getProps) {
                        return true;
                    } else {
                        return !(rowSelection.getProps(record, index) || {}).disabled;
                    }
                })
                .map(record => record[primaryKey])
                .forEach(id => {
                    if (selectedRowKeys.indexOf(id) === -1) {
                        checked = false;
                    } else {
                        indeterminate = true;
                    }
                });
            attrs.onClick = makeChain(e => {
                e.stopPropagation();
            }, attrs.onClick);

            const userAttrs = (rowSelection.titleProps && rowSelection.titleProps()) || {};

            if (checked) {
                indeterminate = false;
            }
            return [
                mode === 'multiple' ? (
                    <Checkbox
                        key="_total"
                        indeterminate={indeterminate}
                        aria-label={locale.selectAll}
                        checked={checked}
                        onChange={onChange}
                        {...attrs}
                        {...userAttrs}
                    />
                ) : null,
                rowSelection.titleAddons && rowSelection.titleAddons(),
            ];
        };

        renderSelectionBody = (value, index, record) => {
            const { rowSelection, primaryKey } = this.props;
            const { selectedRowKeys } = this.state;
            const mode = rowSelection.mode ? rowSelection.mode : 'multiple';
            const checked = selectedRowKeys.indexOf(record[primaryKey]) > -1;
            const onChange = this.selectOneRow.bind(this, index, record);
            const attrs = rowSelection.getProps ? rowSelection.getProps(record, index) || {} : {};

            attrs.onClick = makeChain(e => {
                e.stopPropagation();
            }, attrs.onClick);
            return mode === 'multiple' ? (
                <Checkbox checked={checked} onChange={onChange} {...attrs} />
            ) : (
                <Radio checked={checked} onChange={onChange} {...attrs} />
            );
        };

        @APAActionDisabled({ actionName: ['selectAllRow', 'selectOneRow'], defaultDisabled: false })
        get apaSelectAllRowDisabled() {
            return this.props.rowSelection;
        }

        @APAAction({
            name: 'selectAllRow',
            desc: '全选',
            params: z.tuple([z.boolean().describe('是否选中')]),
        })
        selectAllRow = (checked, e) => {
            const ret = [...this.state.selectedRowKeys],
                { rowSelection, primaryKey, dataSource, entireDataSource } = this.props,
                { selectedRowKeys } = this.state,
                getProps = rowSelection.getProps;
            let attrs = {},
                records = [];

            const source = entireDataSource ? entireDataSource : dataSource;

            this.flatDataSource(source).forEach((record, index) => {
                const id = record[primaryKey];
                if (getProps) {
                    attrs = getProps(record, index) || {};
                }
                // 反选和全选的时候不要丢弃禁用项的选中状态
                if (checked && (!attrs.disabled || selectedRowKeys.indexOf(id) > -1)) {
                    ret.push(id);
                    records.push(record);
                } else if (attrs.disabled && selectedRowKeys.indexOf(id) > -1) {
                    ret.push(id);
                    records.push(record);
                } else {
                    const i = ret.indexOf(id);
                    i > -1 && ret.splice(i, 1);
                }
            });

            records = unique(records, primaryKey);
            if (typeof rowSelection.onSelectAll === 'function') {
                rowSelection.onSelectAll(checked, records);
            }
            this.triggerSelection(rowSelection, unique(ret), records);
            e && e.stopPropagation();
        };

        @APAAction({
            name: 'selectOneRow',
            desc: '选择一行',
            params: z.tuple([z.number().describe('行索引'), z.boolean().describe('是否选中')]),
        })
        apaSelectOneRow(index, checked) {
            const { rowSelection, dataSource, entireDataSource, primaryKey } = this.props;
            const { selectedRowKeys } = this.state;
            const getProps = rowSelection.getProps;

            const source = entireDataSource ? entireDataSource : dataSource;
            const flatDataSourceList = this.flatDataSource(source);
            const targetRecord = flatDataSourceList[index];
            const attrs = getProps ? getProps(record, index) || {} : {};
            const id = targetRecord[primaryKey];
            // 如果不可勾选，则不论是否选中都保持原状
            if (attrs.disabled) {
                return;
            }
            // 如果可以勾选，要选中，且已经在选中列表里，则保持原状
            if (checked && selectedRowKeys.indexOf(id) > -1) {
                return;
            }
            // 如果可以勾选，不要选中，且未在选中列表里，则保持原状
            if (!checked && !selectedRowKeys.indexOf(id) > -1) {
                return;
            }
            // 如果可以勾选，不要选中，且在选中列表里，则触发 selectOneRow
            // 如果可以勾选，要选中，且不在选中列表里，则触发 selectOneRow
            return this.selectOneRow(index, record, checked);
        }

        selectOneRow(index, record, checked, e) {
            let selectedRowKeys = [...this.state.selectedRowKeys],
                i;
            const { primaryKey, rowSelection, dataSource, entireDataSource } = this.props,
                mode = rowSelection.mode ? rowSelection.mode : 'multiple',
                id = record[primaryKey];
            if (id === null || id === undefined) {
                log.warning(`Can't get value from record using given ${primaryKey} as primaryKey.`);
            }
            if (mode === 'multiple') {
                if (checked) {
                    selectedRowKeys.push(id);
                } else {
                    i = selectedRowKeys.indexOf(id);
                    selectedRowKeys.splice(i, 1);
                }
            } else if (checked) {
                selectedRowKeys = [id];
            }
            let totalDS = dataSource;
            if (Array.isArray(entireDataSource) && entireDataSource.length > dataSource.length) {
                totalDS = entireDataSource;
            }
            const records = unique(
                totalDS.filter(item => selectedRowKeys.indexOf(item[primaryKey]) > -1),
                primaryKey
            );
            if (typeof rowSelection.onSelect === 'function') {
                rowSelection.onSelect(checked, record, records);
            }

            this.triggerSelection(rowSelection, selectedRowKeys, records);

            e && e.stopPropagation();
        }
        triggerSelection(rowSelection, selectedRowKeys, records) {
            if (!('selectedRowKeys' in rowSelection)) {
                this.setState({
                    selectedRowKeys,
                });
            }
            if (typeof rowSelection.onChange === 'function') {
                rowSelection.onChange(selectedRowKeys, records);
            }
        }

        flatDataSource(dataSource) {
            let ret = dataSource;
            const listHeader = this._listContext && this._listContext.listHeader;

            if (listHeader) {
                ret = [];
                const { hasChildrenSelection, hasSelection } = listHeader;
                dataSource.forEach(item => {
                    const children = item.children;
                    // 如果需要渲染selection才将这条记录插入到dataSource
                    // 或者没有孩子节点
                    if (hasSelection) {
                        ret.push(item);
                    }
                    if (children && hasChildrenSelection) {
                        ret = ret.concat(children);
                    }
                });
            }
            return ret;
        }

        render() {
            return (
                <ListContext.Consumer>
                    {listContext => {
                        // 保存 listContext 供方法使用
                        this._listContext = listContext;
                        /* eslint-disable prefer-const */
                        let { rowSelection, components, children, columns, ...others } = this.props;
                        let useColumns = columns && !children;

                        if (rowSelection) {
                            if (useColumns) {
                                this.addSelection(columns);
                            } else {
                                children = this.normalizeChildren(children || []);
                            }
                            components = { ...components };
                            components.Row = components.Row || SelectionRow;
                        }
                        return (
                            <SelectionContext.Provider value={this.getSelectionContextValue()}>
                                <BaseComponent
                                    {...others}
                                    columns={columns}
                                    components={components}
                                    children={children}
                                />
                            </SelectionContext.Provider>
                        );
                    }}
                </ListContext.Consumer>
            );
        }
    }
    statics(SelectionTable, BaseComponent);
    return polyfill(SelectionTable);
}
