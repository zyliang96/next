import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APAConfigProvider, type APAConfigOptions } from '@alifd/apa-sdk';

import ConfigProvider from '../config-provider';
import BulletHeader from './bullet-header';
import CollapseContent from './collapse-content';
import CardMedia from './media';
import CardActions from './actions';
import { obj } from '../util';
import type { CardProps } from './types';

const { pickOthers } = obj;

class Card extends Component<CardProps> {
    static displayName = 'Card';

    static propTypes = {
        ...ConfigProvider.propTypes,
        prefix: PropTypes.string,
        rtl: PropTypes.bool,
        media: PropTypes.node,
        title: PropTypes.node,
        subTitle: PropTypes.node,
        actions: PropTypes.node,
        showTitleBullet: PropTypes.bool,
        showHeadDivider: PropTypes.bool,
        contentHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        extra: PropTypes.node,
        free: PropTypes.bool,
        hasBorder: PropTypes.bool,
        className: PropTypes.string,
        children: PropTypes.node,
    };

    static defaultProps = {
        prefix: 'next-',
        free: false,
        showTitleBullet: true,
        showHeadDivider: true,
        hasBorder: true,
        contentHeight: 120,
    };

    /**
     * 卡片标题组件的APA配置
     */
    bulletHeaderApaConfig: APAConfigOptions = {
        mergeToParent: false,
        mergeToParentAction: false,
        mergeToParentState: false,
    };

    componentDidMount(): void {
        this.bulletHeaderApaConfig.mergeToParent = !this.props.title;
    }

    componentDidUpdate(prevProps: Readonly<CardProps>): void {
        if (this.props.title !== prevProps.title) {
            this.bulletHeaderApaConfig.mergeToParent = !this.props.title;
        }
    }

    render() {
        const {
            prefix,
            className,
            title,
            subTitle,
            extra,
            showTitleBullet,
            showHeadDivider,
            children,
            rtl,
            contentHeight,
            free,
            actions,
            hasBorder,
            media,
        } = this.props;

        const cardCls = classNames(
            {
                [`${prefix}card`]: true,
                [`${prefix}card-free`]: free,
                [`${prefix}card-noborder`]: !hasBorder,
                [`${prefix}card-show-divider`]: showHeadDivider,
                [`${prefix}card-hide-divider`]: !showHeadDivider,
            },
            className
        );

        const others = pickOthers(Card.propTypes, this.props);

        others.dir = rtl ? 'rtl' : undefined;

        return (
            <div {...others} className={cardCls}>
                {media && <CardMedia>{media}</CardMedia>}
                <BulletHeader
                    title={title}
                    subTitle={subTitle}
                    extra={extra}
                    showTitleBullet={showTitleBullet}
                    __apaConfig={this.bulletHeaderApaConfig}
                />
                {free ? (
                    children
                ) : (
                    <CollapseContent contentHeight={contentHeight}>{children}</CollapseContent>
                )}
                {actions && <CardActions>{actions}</CardActions>}
            </div>
        );
    }
}

export default APAConfigProvider.config(Card, {
    isRegisterChildren: true,
    desc: '按钮组件',
    props: [],
});
