import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListHeader from './list-header';
import ListFooter from './list-footer';
import RowComponent from './list/row';
import BodyComponent from './list/body';
import HeaderComponent from './fixed/header';
import WrapperComponent from './fixed/wrapper';
import { statics } from './util';
import { ListContext } from './context';

export const listStaticProps = {
    ListHeader: ListHeader,
    ListFooter: ListFooter,
    ListRow: RowComponent,
    ListBody: BodyComponent,
};

export default function list(BaseComponent) {
    class ListTable extends React.Component {
        static ListHeader = ListHeader;
        static ListFooter = ListFooter;
        static ListRow = RowComponent;
        static ListBody = BodyComponent;
        static propTypes = {
            ...BaseComponent.propTypes,
        };
        static defaultProps = {
            ...BaseComponent.defaultProps,
        };

        state = {};

        constructor(props) {
            super(props);
            // 缓存 context value
            this._listContextValue = null;
            this._lastListHeader = null;
            this._lastListFooter = null;
        }

        // 缓存 ListContext value
        getListContextValue = () => {
            // listHeader 和 listFooter 在 render 中设置
            if (
                this._listContextValue === null ||
                this._lastListHeader !== this.listHeader ||
                this._lastListFooter !== this.listFooter
            ) {
                this._lastListHeader = this.listHeader;
                this._lastListFooter = this.listFooter;
                this._listContextValue = {
                    listHeader: this.listHeader,
                    listFooter: this.listFooter,
                };
            }
            return this._listContextValue;
        };

        normalizeDataSource(dataSource) {
            const ret = [];
            const loop = function(dataSource, level) {
                dataSource.forEach(item => {
                    const itemCopy = { ...item };
                    itemCopy.__level = level;
                    ret.push(itemCopy);
                    if (itemCopy.children) {
                        loop(itemCopy.children, level + 1);
                    }
                });
            };
            loop(dataSource, 0);
            this.ds = ret;
            return ret;
        }

        render() {
            /* eslint-disable prefer-const */
            let { components, children, className, prefix, ...others } = this.props;
            let isList = false,
                ret = [];
            Children.forEach(children, child => {
                if (child) {
                    if (['function', 'object'].indexOf(typeof child.type) > -1) {
                        if (child.type._typeMark === 'listHeader') {
                            this.listHeader = child.props;
                            isList = true;
                        } else if (child.type._typeMark === 'listFooter') {
                            this.listFooter = child.props;
                        } else {
                            ret.push(child);
                        }
                    } else {
                        ret.push(child);
                    }
                }
            });
            this.rowSelection = this.props.rowSelection;
            if (isList) {
                components = { ...components };
                components.Row = components.Row || RowComponent;
                components.Body = components.Body || BodyComponent;
                components.Header = components.Header || HeaderComponent;
                components.Wrapper = components.Wrapper || WrapperComponent;
                className = classnames({
                    [`${prefix}table-group`]: true,
                    [className]: className,
                });
            }
            return (
                <ListContext.Provider value={this.getListContextValue()}>
                    <BaseComponent
                        {...others}
                        components={components}
                        children={ret.length > 0 ? ret : undefined}
                        className={className}
                        prefix={prefix}
                    />
                </ListContext.Provider>
            );
        }
    }
    statics(ListTable, BaseComponent);
    return ListTable;
}
