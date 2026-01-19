import React, { Component } from 'react';
import { APAConfigProvider } from '@alifd/apa-sdk';
import Tag from './tag';
import type { CloseableProps } from './types';

class Closeable extends Component<CloseableProps> {
    static defaultProps = {
        disabled: false,
        type: 'normal',
    };

    render() {
        const {
            disabled,
            className,
            closeArea,
            onClose,
            afterClose,
            onClick,
            type,
            size,
            children,
            rtl,
            ...others
        } = this.props;

        return (
            <Tag
                {...others}
                rtl={rtl}
                disabled={disabled}
                className={className}
                closeArea={closeArea}
                onClose={onClose}
                afterClose={afterClose}
                onClick={onClick}
                type={type}
                size={size}
                closable
            >
                {children}
            </Tag>
        );
    }
}

export default APAConfigProvider.config(Closeable, {
    desc: '可关闭标签组件',
    props: [
        { key: 'disabled', name: '标签是否被禁用', desc: '标签是否被禁用' },
        {
            key: 'closeArea',
            name: 'closeable 标签的 onClose 响应区域',
            desc: 'closeable 标签的 onClose 响应区域',
        },
    ],
});
