import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import FixedBody from '../fixed/body';
import { LockContext, BaseContext } from '../context';

/* eslint-disable react/prefer-stateless-function */
export default class LockBody extends React.Component {
    static propTypes = {
        ...FixedBody.propTypes,
    };

    componentDidMount() {
        this._lockContext && this._lockContext.getLockNode('body', findDOMNode(this), this._baseContext && this._baseContext.lockType);
    }

    onBodyScroll = event => {
        this._lockContext && this._lockContext.onLockBodyScroll(event);
    };

    render() {
        const event = {
            onLockScroll: this.onBodyScroll,
        };
        return (
            <LockContext.Consumer>
                {lockContext => {
                    this._lockContext = lockContext;
                    return (
                        <BaseContext.Consumer>
                            {baseContext => {
                                this._baseContext = baseContext;
                                return <FixedBody {...this.props} {...event} />;
                            }}
                        </BaseContext.Consumer>
                    );
                }}
            </LockContext.Consumer>
        );
    }
}
