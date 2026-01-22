import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import BodyComponent from '../base/body';
import { VirtualContext, FixedContext, LockContext, BaseContext } from '../context';

/* eslint-disable react/prefer-stateless-function */
export default class VirtualBody extends React.Component {
    static propTypes = {
        children: PropTypes.any,
        prefix: PropTypes.string,
        className: PropTypes.string,
        colGroup: PropTypes.any,
        tableWidth: PropTypes.number,
    };

    componentDidMount() {
        const bodyNode = findDOMNode(this);
        const lockType = this._baseContext && this._baseContext.lockType;
        // for fixed
        this._fixedContext && this._fixedContext.getNode('body', bodyNode);
        // for virtual
        this._virtualContext && this._virtualContext.getBodyNode(bodyNode, lockType);
        // for lock
        this._lockContext && this._lockContext.getLockNode('body', bodyNode, lockType);
    }

    tableRef = table => {
        this.tableNode = table;
    };

    virtualScrollRef = virtualScroll => {
        this.virtualScrollNode = virtualScroll;
    };

    onScroll = current => {
        // for fixed
        this._fixedContext && this._fixedContext.onFixedScrollSync(current);
        // for lock
        this._lockContext && this._lockContext.onLockBodyScroll(current);
        // for virtual
        this._virtualContext && this._virtualContext.onVirtualScroll();
    };

    render() {


        return (
            <VirtualContext.Consumer>
                {virtualContext => {
                    this._virtualContext = virtualContext;
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
                                                        const { maxBodyHeight, bodyHeight, innerTop } = virtualContext;
                                                        const { prefix, className, colGroup, tableWidth, ...others } = this.props;
                                                        const style = {
                                                            width: tableWidth,
                                                        };
                                                        const wrapperStyle = {
                                                            position: 'relative',
                                                        };
                                                        // todo 2.0 ，这里最好自己画滚动条
                                                        if (bodyHeight > maxBodyHeight) {
                                                            wrapperStyle.height = bodyHeight;
                                                        }
                                                        return (
                                                            <div style={{ maxHeight: maxBodyHeight }} className={className} onScroll={this.onScroll}>
                                                                <div style={wrapperStyle} ref={this.virtualScrollRef}>
                                                                    <div
                                                                        style={{
                                                                            position: 'relative',
                                                                            transform: `translateY(${innerTop}px)`,
                                                                            willChange: 'transform',
                                                                        }}
                                                                    >
                                                                        <table ref={this.tableRef} style={style}>
                                                                            {colGroup}
                                                                            <BodyComponent {...others} prefix={prefix} />
                                                                        </table>
                                                                    </div>
                                                                </div>
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
                }}
            </VirtualContext.Consumer>
        );
    }
}
