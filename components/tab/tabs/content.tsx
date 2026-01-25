import React, { PureComponent, type ReactNode, type ReactElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { APAComponentConfigContext, type APAComponentConfigContextInfo } from '@alifd/apa-sdk';
import type { TabContentProps } from '../types';

class TabContent extends PureComponent<TabContentProps> {
    static displayName = 'TabContent';
    static propTypes = {
        prefix: PropTypes.string,
        activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        lazyLoad: PropTypes.bool,
        children: PropTypes.any,
    };

    __apaContext: APAComponentConfigContextInfo | null = null;

    render() {
        return (
            <APAComponentConfigContext.Consumer>
                {context => {
                    this.__apaContext = context;
                    const {
                        prefix,
                        activeKey,
                        lazyLoad,
                        unmountInactiveTabs,
                        children,
                        className,
                        ...others
                    } = this.props;
                    const { apaNode } = this.__apaContext || {};
                    const formatChildren: ReactNode[] = [];
                    const keys: (string | null)[] = [];

                    React.Children.forEach(children, child => {
                        const active = activeKey === (child as ReactElement).key;
                        formatChildren.push(
                            React.cloneElement(child as ReactElement, {
                                prefix,
                                active,
                                lazyLoad,
                                unmountInactiveTabs,
                            })
                        );
                        keys.push((child as ReactElement).key);
                    });

                    // 更新父组件 Tab 的 APA 状态
                    if (apaNode) {
                        apaNode.updateState({
                            keys,
                        });
                    }

                    const classNames = classnames(
                        {
                            [`${prefix}tabs-content`]: true,
                        },
                        className
                    );

                    return (
                        <div {...others} className={classNames}>
                            {formatChildren}
                        </div>
                    );
                }}
            </APAComponentConfigContext.Consumer>
        );
    }
}

export default TabContent;
