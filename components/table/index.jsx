import { APAConfigProvider } from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import Base, { staticProps } from './base';
import tree, { treeStaticProps } from './tree';
import fixed, { fixedStaticProps } from './fixed';
import selection, { selectionStaticProps } from './selection';
import expanded, { expandedStaticProps } from './expanded';
import virtual, { virtualStaticProps } from './virtual';
import lock, { lockStaticProps } from './lock';
import stickyLock, { newLockStaticProps } from './new-lock';
import list, { listStaticProps } from './list';
import sticky, { stickyStaticProps } from './sticky';
import ListHeader from './list-header';
import ListFooter from './list-footer';
import { env } from '../util';

const { ieVersion } = env;

const ORDER_LIST = [fixed, lock, selection, expanded, virtual, tree, list, sticky];
const Table = ORDER_LIST.reduce((ret, current) => {
    ret = current(ret);
    return ret;
}, Base);

lock._typeMark = 'lock';
expanded._typeMark = 'expanded';
fixed._typeMark = 'fixed';

Table.displayName = 'Table';
const apaProprsConfig = [
    {
        key: 'hasHeader',
        name: '是否显示头部',
        desc: '是否显示头部',
    },
    {
        key: 'columns',
        name: '列配置',
        desc: '列配置',
    },
    {
        key: 'loading',
        name: '加载状态',
        desc: '加载状态',
    },
    {
        key: 'useVirtual',
        name: '是否使用虚拟滚动',
        desc: '是否使用虚拟滚动',
    },
    {
        key: 'isTree',
        name: '是否树形结构',
        desc: '是否树形结构',
    },
    {
        key: 'isTree',
        name: '是否树形结构',
        desc: '是否树形结构',
    },
    {
        key: 'hasExpandedRowCtrl',
        name: '是否启用展开行控制',
        desc: '是否启用展开行控制',
    },
    {
        key: 'sort',
        name: '排序',
        desc: '排序',
    },
    {
        key: 'filterParams',
        name: '过滤参数',
        desc: '过滤参数',
    },
];

const APATable = APAConfigProvider.config(Table, {
    isRegisterChildren: true,
    desc: '表格组件',
    props: apaProprsConfig,
    staticProps: {
        ...staticProps,
        ...fixedStaticProps,
        ...selectionStaticProps,
        ...expandedStaticProps,
        ...virtualStaticProps,
        ...lockStaticProps,
        ...listStaticProps,
        ...stickyStaticProps,
        ...treeStaticProps,
    },
});

const StickyLockTable = ORDER_LIST.reduce((ret, current) => {
    const newLock = !ieVersion;
    if (current._typeMark === 'lock') {
        ret = newLock ? stickyLock(ret) : lock(ret);
    } else if (current._typeMark === 'expanded') {
        ret = newLock ? expanded(ret, true) : expanded(ret);
    } else if (current._typeMark === 'fixed') {
        ret = newLock ? fixed(ret, true) : fixed(ret);
    } else {
        ret = current(ret);
    }
    return ret;
}, Base);
StickyLockTable.displayName = 'Table';
const ApaStickyLockTable = APAConfigProvider.config(StickyLockTable, {
    isRegisterChildren: false,
    desc: '粘性锁定的表格组件',
    props: apaProprsConfig,
    staticProps: {
        ...staticProps,
        ...fixedStaticProps,
        ...selectionStaticProps,
        ...expandedStaticProps,
        ...virtualStaticProps,
        ...lockStaticProps,
        ...listStaticProps,
        ...stickyStaticProps,
        ...treeStaticProps,
        ...newLockStaticProps,
    },
});

APATable.Base = Base;
APATable.fixed = fixed;
APATable.lock = lock;
APATable.selection = selection;
APATable.expanded = expanded;
APATable.tree = tree;
APATable.virtual = virtual;
APATable.list = list;
APATable.sticky = sticky;

APATable.GroupHeader = ListHeader;
APATable.GroupFooter = ListFooter;

APATable.StickyLock = ConfigProvider.config(ApaStickyLockTable, {
    componentName: 'Table',
});

export default ConfigProvider.config(APATable, {
    componentName: 'Table',
    transform: /* istanbul ignore next */ (props, deprecated) => {
        // fix https://github.com/alibaba-fusion/next/issues/4062
        if ('columns' in props && typeof props.columns !== 'undefined') {
            const { columns, ...others } = props;
            const newColumns = [...columns];

            props = {
                columns: newColumns,
                ...others,
            };
        }

        if ('expandedRowKeys' in props) {
            deprecated('expandedRowKeys', 'openRowKeys', 'Table');

            const { expandedRowKeys, ...others } = props;
            props = { openRowKeys: expandedRowKeys, ...others };
        }
        if ('onExpandedChange' in props) {
            deprecated('onExpandedChange', 'onRowOpen', 'Table');

            const { onExpandedChange, ...others } = props;
            props = { onRowOpen: onExpandedChange, ...others };
        }
        if ('isLoading' in props) {
            deprecated('isLoading', 'loading', 'Table');

            const { isLoading, ...others } = props;
            props = { loading: isLoading, ...others };
        }
        if ('indentSize' in props) {
            deprecated('indentSize', 'indent', 'Table');

            const { indentSize, ...others } = props;
            props = { indent: indentSize, ...others };
        }
        if ('optimization' in props) {
            deprecated('optimization', 'pure', 'Table');

            const { optimization, ...others } = props;
            props = { pure: optimization, ...others };
        }

        if ('getRowClassName' in props) {
            deprecated('getRowClassName', 'getRowProps', 'Table');

            const { getRowClassName, getRowProps, ...others } = props;
            if (getRowClassName) {
                const newGetRowProps = (...args) => {
                    return {
                        className: getRowClassName(...args),
                        ...(getRowProps ? getRowProps(...args) : {}),
                    };
                };

                props = { getRowProps: newGetRowProps, ...others };
            } else {
                props = { getRowProps, ...others };
            }
        }

        if ('getRowProps' in props) {
            deprecated('getRowProps', 'rowProps', 'Table in 1.15.0');

            const { getRowProps, ...others } = props;
            props = { rowProps: getRowProps, ...others };
        }

        if ('getCellProps' in props) {
            deprecated('getCellProps', 'cellProps', 'Table in 1.15.0');

            const { getCellProps, ...others } = props;
            props = { cellProps: getCellProps, ...others };
        }

        return props;
    },
});
