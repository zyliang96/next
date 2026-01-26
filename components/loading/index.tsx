import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Overlay from '../overlay';
import ConfigProvider from '../config-provider';
import { obj, func } from '../util';
import {
    APAActionEnabled,
    APAStateEnabled,
    APAState,
    APAAction,
    APAConfigProvider,
    APAActionAnimate,
} from '@alifd/apa-sdk';
import { z } from 'zod';
import type { LoadingProps } from './types';

/** Loading */
@APAActionEnabled
@APAStateEnabled
class Loading extends React.Component<LoadingProps> {
    static displayName = 'Loading';

    static propTypes = {
        ...ConfigProvider.propTypes,
        prefix: PropTypes.string,
        tip: PropTypes.any,
        tipAlign: PropTypes.oneOf(['right', 'bottom']),
        visible: PropTypes.bool,
        onVisibleChange: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        size: PropTypes.oneOf(['large', 'medium']),
        indicator: PropTypes.any,
        color: PropTypes.string,
        fullScreen: PropTypes.bool,
        disableScroll: PropTypes.bool,
        safeNode: PropTypes.any,
        children: PropTypes.any,
        inline: PropTypes.bool,
        rtl: PropTypes.bool,
    };

    static defaultProps = {
        prefix: 'next-',
        visible: true,
        onVisibleChange: func.noop,
        animate: null,
        tipAlign: 'bottom',
        size: 'large',
        inline: true,
        disableScroll: false,
    };

    apaAnimateRef: APAActionAnimate | null = null;

    @APAState([{ name: 'visible', desc: '加载状态是否可见' }])
    state = {
        visible: this.props.visible !== undefined ? this.props.visible : true,
    };

    static getDerivedStateFromProps(nextProps: LoadingProps) {
        if ('visible' in nextProps) {
            return {
                visible: nextProps.visible,
            };
        }
        return null;
    }

    @APAAction({
        name: 'setVisible',
        desc: '设置加载状态的可见性',
        params: z.tuple([z.boolean().describe('是否显示加载状态')]),
    })
    setVisible(visible: boolean) {
        this.apaAnimateRef?.triggerAnimate();
        if (!('visible' in this.props)) {
            // 非受控模式
            this.setState({ visible });
        }
        // 触发回调
        if (this.props.onVisibleChange) {
            this.props.onVisibleChange('setVisible', {} as React.MouseEvent);
        }
    }

    render() {
        const {
            tip,
            visible,
            children,
            className,
            style,
            indicator,
            color,
            prefix,
            fullScreen,
            disableScroll,
            onVisibleChange,
            tipAlign,
            size,
            inline,
            rtl,
            safeNode,
        } = this.props;

        let indicatorDom: React.ReactNode = null;
        const dotCls = `${prefix}loading-dot`;

        if (indicator) {
            indicatorDom = indicator;
        } else {
            const backgroundColor = color;
            const fusionReactorCls = classNames({
                [`${prefix}loading-fusion-reactor`]: true,
                [`${prefix}loading-medium-fusion-reactor`]: size === 'medium',
            });
            indicatorDom = (
                <div className={fusionReactorCls} dir={rtl ? 'rtl' : undefined}>
                    <span className={dotCls} style={{ backgroundColor }} />
                    <span className={dotCls} style={{ backgroundColor }} />
                    <span className={dotCls} style={{ backgroundColor }} />
                    <span className={dotCls} style={{ backgroundColor }} />
                </div>
            );
        }

        const loadingCls = classNames({
            [`${prefix}loading`]: true,
            [`${prefix}open`]: visible,
            [`${prefix}loading-inline`]: inline,
            [className!]: className,
        });

        const tipCls = classNames({
            [`${prefix}loading-tip`]: true,
            [`${prefix}loading-tip-fullscreen`]: fullScreen,
            // 默认非 right就是 bottom
            [`${prefix}loading-right-tip`]: tipAlign === 'right',
        });

        const others = obj.pickOthers(Loading.propTypes, this.props);

        const contentCls = classNames({
            [`${prefix}loading-component`]: visible,
            [`${prefix}loading-wrap`]: true,
        });

        return fullScreen ? (
            [
                children,
                <Overlay
                    key="overlay"
                    hasMask
                    align="cc cc"
                    safeNode={safeNode}
                    disableScroll={disableScroll}
                    {...others}
                    className={className}
                    style={style}
                    visible={visible}
                    onRequestClose={onVisibleChange}
                >
                    <div className={tipCls}>
                        <div className={`${prefix}loading-indicator`}>{indicatorDom}</div>
                        <div className={`${prefix}loading-tip-content`}>{tip}</div>
                        {/* 由于撑开问题 使用同样的两个DOM */}
                        <div className={`${prefix}loading-tip-placeholder`}>{tip}</div>
                    </div>
                </Overlay>,
            ]
        ) : (
            <APAActionAnimate ref={ref => (this.apaAnimateRef = ref)}>
                <div className={loadingCls} style={style} {...others}>
                    {visible ? (
                        <div className={tipCls}>
                            <div className={`${prefix}loading-indicator`}>{indicatorDom}</div>
                            <div className={`${prefix}loading-tip-content`}>{tip}</div>
                            <div className={`${prefix}loading-tip-placeholder`}>{tip}</div>
                        </div>
                    ) : null}
                    <div className={contentCls}>
                        {visible ? <div className={`${prefix}loading-masker`} /> : null}
                        {children}
                    </div>
                </div>
            </APAActionAnimate>
        );
    }
}

export type { LoadingProps };
export default ConfigProvider.config(
    APAConfigProvider.config(Loading, {
        isRegisterChildren: false,
        desc: '加载组件',
        props: [
            { key: 'visible', name: 'visible', desc: '加载状态是否可见' },
            { key: 'tip', name: 'tip', desc: '加载提示文本' },
            { key: 'size', name: 'size', desc: '加载动画尺寸' },
            { key: 'fullScreen', name: 'fullScreen', desc: '是否全屏展示' },
            { key: 'color', name: 'color', desc: '动画颜色' },
            { key: 'tipAlign', name: 'tipAlign', desc: '提示文本位置' },
        ],
    })
);
