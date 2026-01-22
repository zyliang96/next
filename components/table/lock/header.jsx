import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import HeaderComponent from '../base/header';
import { FixedContext, LockContext, BaseContext } from '../context';

export default class LockHeader extends React.Component {
    static propTypes = {
        children: PropTypes.any,
        prefix: PropTypes.string,
        className: PropTypes.string,
        colGroup: PropTypes.any,
        tableWidth: PropTypes.number,
    };

    componentDidMount() {
        const node = findDOMNode(this);
        this._fixedContext && this._fixedContext.getNode('header', node, this._baseContext && this._baseContext.lockType);
        this._lockContext && this._lockContext.getLockNode('header', node, this._baseContext && this._baseContext.lockType);
    }

    render() {
        

        return (
            <FixedContext.Consumer>
                {fixedContext => {
                    this._fixedContext = fixedContext;
                    return (
                        <LockContext.Consumer>
                            {lockContext => {
                                this._lockContext = lockContext;
                                return (
                                    <BaseContext.Consumer>
                                        {baseContext => {
                                            this._baseContext = baseContext;
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
                        </LockContext.Consumer>
                    );
                }}
            </FixedContext.Consumer>
        );
    }
}
