import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import BodyComponent from '../base/body';
import { FixedContext } from '../context';

export default class ListBody extends React.Component {
    componentDidMount() {
        this._fixedContext && this._fixedContext.getNode('body', findDOMNode(this));
    }

    onScroll = e => {
        this._fixedContext && this._fixedContext.onFixedScrollSync(e);
    };

    render() {
        return (
            <FixedContext.Consumer>
                {fixedContext => {
                    this._fixedContext = fixedContext;
                    return (
                        <BodyComponent
                            component="div"
                            onScroll={this.onScroll}
                            {...this.props}
                        />
                    );
                }}
            </FixedContext.Consumer>
        );
    }
}
