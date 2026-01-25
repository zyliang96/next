import React from 'react';

/**
 * 提取文本
 * @param children - 子元素
 * @returns 文本
 */
export function extractText(children: React.ReactNode | React.ReactNode[]) {
    let text = '';

    try {
        React.Children.forEach(children, child => {
            if (child === null || typeof child === 'boolean') {
                return;
            }

            if (typeof child === 'string' || typeof child === 'number') {
                text += String(child);
            } else if (React.isValidElement(child)) {
                // 忽略纯图标组件
                if (child.props.children) {
                    text += extractText(child.props.children);
                }
            } else if (Array.isArray(child)) {
                text += extractText(child);
            }
        });
    } catch (error) {
        text = '';
    }
    return text.trim();
}

/**
 * 获取子元素的文本
 * @param children - 子元素
 * @returns 文本
 */
export function getChildrenText(children: React.ReactNode | React.ReactNode[]) {
    let text = '';
    if (typeof children === 'string' || typeof children === 'number') {
        text = String(children);
    } else if (React.isValidElement(children)) {
        // 忽略纯图标组件
        if (children.props.children) {
            text = extractText(children.props.children);
        }
    } else {
        text = extractText(children);
    }
    return text.trim();
}
