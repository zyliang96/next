import React, { Component, type ElementType } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APAConfigProvider } from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import type { CardActionsProps } from './types';

class CardActions extends Component<CardActionsProps> {
    static displayName = 'CardActions';
    static propTypes = {
        prefix: PropTypes.string,
        component: PropTypes.elementType,
        className: PropTypes.string,
    };

    static defaultProps = {
        prefix: 'next-',
        component: 'div',
    };

    render() {
        const { prefix, component, className, ...others } = this.props;
        const Component = component as ElementType;
        return <Component {...others} className={classNames(`${prefix}card-actions`, className)} />;
    }
}

const APACardActions = APAConfigProvider.config(CardActions, {
    isRegisterChildren: true,
    desc: '卡片操作组件',
    props: [],
});

export default ConfigProvider.config(APACardActions);
