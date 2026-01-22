import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Row from '../selection/row';
import { TreeContext, ExpandedContext } from '../context';

/* eslint-disable react/prefer-stateless-function */
export default class TreeRow extends React.Component {
    static propTypes = {
        ...Row.propTypes,
    };

    static defaultProps = {
        ...Row.defaultProps,
    };

    render() {
        return (
            <TreeContext.Consumer>
                {treeContext => (
                    <ExpandedContext.Consumer>
                        {expandedContext => {
                            const { treeStatus = [] } = treeContext;
                            const { openRowKeys = [] } = expandedContext;
                            /* eslint-disable no-unused-vars*/
                            const { className, record, primaryKey, prefix, ...others } = this.props;
                            const cls = classnames({
                                hidden:
                                    !(treeStatus.indexOf(record[primaryKey]) > -1) &&
                                    record.__level !== 0,
                                [`${prefix}table-row-level-${record.__level}`]: true,
                                opened: openRowKeys.indexOf(record[primaryKey]) > -1,
                                [className]: className,
                            });
                            return (
                                <Row
                                    {...others}
                                    record={record}
                                    className={cls}
                                    primaryKey={primaryKey}
                                    prefix={prefix}
                                />
                            );
                        }}
                    </ExpandedContext.Consumer>
                )}
            </TreeContext.Consumer>
        );
    }
}
