import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import HeaderComponent from '../base/header';
import { FixedContext, BaseContext } from '../context';
/* eslint-disable react/prefer-stateless-function */
class FixedHeader extends React.Component {
    static propTypes = {
        children: PropTypes.any,
        prefix: PropTypes.string,
        className: PropTypes.string,
        colGroup: PropTypes.any,
        tableWidth: PropTypes.number,
    };

    componentDidMount() {
        this._fixedContext && this._fixedContext.getNode('header', findDOMNode(this));
    }

    // 这里的 style={{overflow: 'unset'}} 可以删掉，只是为了解决用户js升级但是样式没升级的情况
    // 这里的 style={{position: 'absolute', right: 0}} 也可以删掉，是为了兼容用户js升级但是样式没升级的情况
    render() {


        return (
            <FixedContext.Consumer>
                {fixedContext => {
                    this._fixedContext = fixedContext;
                    return (
                        <BaseContext.Consumer>
                            {baseContext => {
                                const { onFixedScrollSync } = fixedContext;
                                const { lockType } = baseContext;
                                const { prefix, className, colGroup, tableWidth, ...others } = this.props;

                                return (
                                    <div className={className} onScroll={onFixedScrollSync}>
                                        <div className={`${prefix}table-header-inner`} style={{ overflow: 'unset' }}>
                                            <table style={{ width: tableWidth }}>
                                                {colGroup}
                                                <HeaderComponent {...others} prefix={prefix} />
                                            </table>
                                        </div>
                                        {!lockType && (
                                            <div
                                                className={`${prefix}table-header-fixer`}
                                                style={{ position: 'absolute', right: 0 }}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        </BaseContext.Consumer>
                    );
                }}
            </FixedContext.Consumer>
        );
    }
}

export default FixedHeader;