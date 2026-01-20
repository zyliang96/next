import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    APAConfigProvider,
    APANodeShowStatus,
    APAShowStateEnabled,
    APAShowStateSource,
} from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import type { CardBulletHeaderProps } from './types';

@APAShowStateEnabled
class CardBulletHeader extends Component<CardBulletHeaderProps> {
    static displayName = 'CardBulletHeader';
    static propTypes = {
        prefix: PropTypes.string,
        title: PropTypes.node,
        subTitle: PropTypes.node,
        showTitleBullet: PropTypes.bool,
        extra: PropTypes.node,
    };

    static defaultProps = {
        prefix: 'next-',
        showTitleBullet: true,
    };

    @APAShowStateSource({ initialShowState: false })
    get showBulletHeaderState() {
        return !!this.props.title;
    }

    render() {
        const { prefix, title, subTitle, extra, showTitleBullet } = this.props;

        if (!title) return null;

        const headCls = classNames({
            [`${prefix}card-head`]: true,
            [`${prefix}card-head-show-bullet`]: showTitleBullet,
        });

        const headExtra = extra ? <div className={`${prefix}card-extra`}>{extra}</div> : null;

        return (
            <div className={headCls}>
                <div className={`${prefix}card-head-main`}>
                    <div className={`${prefix}card-title`}>
                        {title}
                        {subTitle ? (
                            <span className={`${prefix}card-subtitle`}>{subTitle}</span>
                        ) : null}
                    </div>
                    {headExtra}
                </div>
            </div>
        );
    }
}

const APACardBulletHeader = APAConfigProvider.config(CardBulletHeader, {
    isRegisterChildren: true,
    desc: '卡片标题组件',
    props: [
        {
            key: 'title',
            name: '标题',
            desc: '卡片标题',
        },
        {
            key: 'subTitle',
            name: '副标题',
            desc: '卡片副标题',
        },
    ],
});

export default ConfigProvider.config(APACardBulletHeader, {
    componentName: 'Card',
});
