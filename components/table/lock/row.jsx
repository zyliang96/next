import React from 'react';
import PropTypes from 'prop-types';
import Row from '../base/row';
import { LockContext } from '../context';

export default class LockRow extends React.Component {
    static propTypes = {
        ...Row.propTypes,
    };

    static defaultProps = {
        ...Row.defaultProps,
    };

    onMouseEnter = (record, index, e) => {
        const { onRowMouseEnter } = this._lockContext || {};
        const { onMouseEnter } = this.props;
        onRowMouseEnter && onRowMouseEnter(record, index, e);
        onMouseEnter(record, index, e);
    };

    onMouseLeave = (record, index, e) => {
        const { onRowMouseLeave } = this._lockContext || {};
        const { onMouseLeave } = this.props;
        onRowMouseLeave && onRowMouseLeave(record, index, e);
        onMouseLeave(record, index, e);
    };

    render() {
        return (
            <LockContext.Consumer>
                {lockContext => {
                    this._lockContext = lockContext;
                    /* eslint-disable no-unused-vars*/
                    return (
                        <Row
                            {...this.props}
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                        />
                    );
                }}
            </LockContext.Consumer>
        );
    }
}
