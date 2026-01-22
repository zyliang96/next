import React from 'react';

// 通用类型定义
type RecordType = Record<string, unknown>;
type PrimaryKeyType = string | number | symbol;

// ============================================================================
// 1. BaseContext - 基础配置（低频变化）
// Provider: base.jsx
// Consumers: base/row.jsx, list/row.jsx, expanded/row.jsx
// ============================================================================
export interface BaseContextValue {
    notRenderCellIndex?: number[];
    lockType?: 'left' | 'right';
}
export const BaseContext = React.createContext<BaseContextValue>({});

// ============================================================================
// 2. FixedContext - 固定表头相关（低频变化）
// Provider: fixed.jsx
// Consumers: fixed/header.jsx, fixed/body.jsx, virtual/body.jsx, list/body.jsx
// ============================================================================
export interface FixedContextValue {
    fixedHeader?: boolean;
    maxBodyHeight?: number | string;
    getNode?: (type: string, node: HTMLElement | null, lockType?: string) => void;
    onFixedScrollSync?: (event?: React.UIEvent) => void;
    getTableInstanceForFixed?: (type: string, instance: unknown) => void;
}
export const FixedContext = React.createContext<FixedContextValue>({});

// ============================================================================
// 3. LockContext - 锁列相关（低频变化）
// Provider: lock.jsx, new-lock.jsx
// Consumers: lock/header.jsx, lock/body.jsx, lock/row.jsx, virtual/body.jsx
// ============================================================================
export interface LockContextValue {
    getTableInstance?: (lockType: string, instance: unknown) => void;
    getLockNode?: (type: string, node: HTMLElement | null, lockType?: string) => void;
    onLockBodyScroll?: (event?: React.UIEvent) => void;
    onRowMouseEnter?: (record: RecordType, index: number, e: React.MouseEvent) => void;
    onRowMouseLeave?: (record: RecordType, index: number, e: React.MouseEvent) => void;
}
export const LockContext = React.createContext<LockContextValue>({});

// ============================================================================
// 4. SelectionContext - 选择相关（⚠️ 高频变化）
// Provider: selection.jsx
// Consumers: selection/row.jsx, tree/cell.jsx, list/row.jsx
// ============================================================================
export interface RowSelectionConfig {
    mode?: 'single' | 'multiple';
    selectedRowKeys?: PrimaryKeyType[];
    getProps?: (record: RecordType, index: number) => object;
    onChange?: (selectedRowKeys: PrimaryKeyType[], records: RecordType[]) => void;
    onSelect?: (selected: boolean, record: RecordType, records: RecordType[]) => void;
    onSelectAll?: (selected: boolean, records: RecordType[]) => void;
    columnProps?: () => object;
    titleProps?: () => object;
    titleAddons?: () => React.ReactNode;
}

export interface SelectionContextValue {
    rowSelection?: RowSelectionConfig;
    selectedRowKeys?: PrimaryKeyType[];
}
export const SelectionContext = React.createContext<SelectionContextValue>({});

// ============================================================================
// 5. ExpandedContext - 展开行相关（中频变化）
// Provider: expanded.jsx
// Consumers: expanded/row.jsx, tree/row.jsx
// ============================================================================
export interface ExpandedContextValue {
    openRowKeys?: PrimaryKeyType[];
    expandedRowRender?: (record: RecordType, index: number) => React.ReactNode;
    expandedRowIndent?: number[];
    expandedIndexSimulate?: boolean;
    expandedRowWidthEquals2Table?: boolean;
    getExpandedRowRef?: (index: PrimaryKeyType, ref: HTMLElement | null) => void;
    getTableInstanceForExpand?: (instance: unknown) => void;
}
export const ExpandedContext = React.createContext<ExpandedContextValue>({});

// ============================================================================
// 6. VirtualContext - 虚拟滚动相关（⚠️ 高频变化）
// Provider: virtual.jsx
// Consumers: virtual/body.jsx
// ============================================================================
export interface VirtualContextValue {
    onVirtualScroll?: (event?: React.UIEvent) => void;
    bodyHeight?: number;
    innerTop?: number;
    getBodyNode?: (node: HTMLElement | null, lockType?: string) => void;
    getTableInstanceForVirtual?: (lockType: string, instance: unknown) => void;
    rowSelection?: RowSelectionConfig;
}
export const VirtualContext = React.createContext<VirtualContextValue>({});

// ============================================================================
// 7. TreeContext - 树形相关（中频变化）
// Provider: tree.jsx
// Consumers: tree/row.jsx, tree/cell.jsx
// ============================================================================
export interface TreeContextValue {
    openTreeRowKeys?: PrimaryKeyType[];
    indent?: number;
    treeStatus?: PrimaryKeyType[];
    onTreeNodeClick?: (record: RecordType) => void;
    isTree?: boolean;
}
export const TreeContext = React.createContext<TreeContextValue>({});

// ============================================================================
// 8. ListContext - 列表模式相关（低频变化）
// Provider: list.jsx
// Consumers: list/row.jsx, selection.jsx
// ============================================================================
export interface ListHeaderConfig {
    cell?: React.ReactElement | ((record: RecordType, index: number) => React.ReactNode);
    hasSelection?: boolean;
    hasChildrenSelection?: boolean;
    useFirstLevelDataWhenNoChildren?: boolean;
}

export interface ListContextValue {
    listHeader?: ListHeaderConfig;
    listFooter?: ListHeaderConfig;
}
export const ListContext = React.createContext<ListContextValue>({});

// ============================================================================
// 9. StickyContext - 吸顶相关（低频变化）
// Provider: sticky.jsx
// Consumers: sticky/header.jsx
// ============================================================================
export interface StickyContextValue {
    Header?: React.ComponentType<unknown>;
    offsetTop?: number;
    affixProps?: object;
}
export const StickyContext = React.createContext<StickyContextValue>({});

// ============================================================================
// 10. ColumnContext - 列相关（低频变化）
// Provider: column-group.jsx
// Consumers: column.jsx
// ============================================================================
export interface ColumnContextValue {
    parent?: React.Component;
}
export const ColumnContext = React.createContext<ColumnContextValue>({});
