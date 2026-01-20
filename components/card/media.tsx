import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APAConfigProvider } from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import { log } from '../util';
import type { CardMediaProps } from './types';

const { warning } = log;

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

class CardMedia extends Component<CardMediaProps> {
    static displayName = 'CardMedia';
    static propTypes = {
        prefix: PropTypes.string,
        /**
         * 设置标签类型
         */
        component: PropTypes.elementType,
        /**
         * 背景图片地址
         */
        image: PropTypes.string,
        /**
         * 媒体源文件地址
         */
        src: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
    };

    static defaultProps = {
        prefix: 'next-',
        component: 'div',
        style: {},
    };

    render() {
        const { prefix, style, className, component, image, src, ...others } = this.props;
        const Component = component as React.ElementType;
        if (!('children' in others || Boolean(image || src))) {
            warning('either `children`, `image` or `src` prop must be specified.');
        }

        const isMediaComponent = MEDIA_COMPONENTS.indexOf(component as string) !== -1;
        const composedStyle =
            !isMediaComponent && image ? { backgroundImage: `url("${image}")`, ...style } : style;

        return (
            <Component
                {...others}
                style={composedStyle}
                className={classNames(`${prefix}card-media`, className)}
                src={isMediaComponent ? image || src : undefined}
            />
        );
    }
}

const APACardMedia = APAConfigProvider.config(CardMedia, {
    isRegisterChildren: true,
    desc: '卡片媒体组件',
    props: [
        {
            key: 'image',
            name: '背景图片地址',
            desc: '背景图片地址',
        },
        {
            key: 'src',
            name: '媒体源文件地址',
            desc: '媒体源文件地址',
        },
    ],
});

export default ConfigProvider.config(APACardMedia);
