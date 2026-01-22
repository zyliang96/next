import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import BodyComponent from '../base/body';
import { FixedContext } from '../context';

/* eslint-disable react/prefer-stateless-function */
export default class FixedBody extends React.Component {
    static propTypes = {
        children: PropTypes.any,
        prefix: PropTypes.string,
        className: PropTypes.string,
        colGroup: PropTypes.any,
        onLockScroll: PropTypes.func,
        tableWidth: PropTypes.number,
    };

    componentDidMount() {
        this._fixedContext && this._fixedContext.getNode('body', findDOMNode(this));
    }

    onBodyScroll = event => {
        // sync scroll left to header
        this._fixedContext && this._fixedContext.onFixedScrollSync(event);

        // sync scroll top/left to lock columns
        if ('onLockScroll' in this.props && typeof this.props.onLockScroll === 'function') {
            this.props.onLockScroll(event);
        }
    };

    render() {
        return (
            <FixedContext.Consumer>
                {fixedContext => {
                    this._fixedContext = fixedContext;
                    /*eslint-disable no-unused-vars */
                    const { className, colGroup, onLockScroll, tableWidth, ...others } = this.props;
                    const { maxBodyHeight, fixedHeader } = fixedContext;
                    const style = {};
                    if (fixedHeader) {
                        style.maxHeight = maxBodyHeight;
                        style.position = 'relative';
                    }
                    return (
                        <div style={style} className={className} onScroll={this.onBodyScroll}>
                            <table style={{ width: tableWidth }}>
                                {colGroup}
                                <BodyComponent {...others} colGroup={colGroup} />
                            </table>
                        </div>
                    );
                }}
            </FixedContext.Consumer>
        );
    }
}
