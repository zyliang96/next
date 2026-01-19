import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APAConfigProvider } from '@alifd/apa-sdk';
import { type ProgressWithDefaultProps } from './progress';

type ProgressLineProps = Omit<ProgressWithDefaultProps, 'shape'>;
class Line extends React.PureComponent<ProgressLineProps> {
    static propTypes = {
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        percent: PropTypes.number,
        state: PropTypes.oneOf(['normal', 'success', 'error']),
        progressive: PropTypes.bool,
        hasBorder: PropTypes.bool,
        textRender: PropTypes.func,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        rtl: PropTypes.bool,
        prefix: PropTypes.string,
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    };

    render() {
        const {
            prefix,
            size,
            state,
            color,
            percent,
            progressive,
            hasBorder,
            textRender,
            className,
            rtl,
            backgroundColor,
            ...others
        } = this.props;

        const suffixText = textRender(percent, { rtl });

        const wrapCls = classNames({
            [`${prefix}progress-line`]: true,
            [`${prefix}progress-line-show-info`]: suffixText,
            [`${prefix}progress-line-show-border`]: hasBorder,
            [`${prefix + size}`]: size,
            [className!]: className,
        });
        const lineCls = classNames({
            [`${prefix}progress-line-overlay`]: true,
            [`${prefix}progress-line-overlay-${state}`]: !color && !progressive && state,
            [`${prefix}progress-line-overlay-started`]: !color && progressive && percent <= 30,
            [`${prefix}progress-line-overlay-middle`]:
                !color && progressive && percent > 30 && percent < 80,
            [`${prefix}progress-line-overlay-finishing`]: !color && progressive && percent >= 80,
        });

        const lineStyle = {
            width: `${percent > 100 ? 100 : percent < 0 ? 0 : percent}%`,
            backgroundColor: color,
        };
        const underlayStyle = { backgroundColor: backgroundColor };

        return (
            <div
                dir={rtl ? 'rtl' : undefined}
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                className={wrapCls}
                {...others}
            >
                <div className={`${prefix}progress-line-container`}>
                    <div className={`${prefix}progress-line-underlay`} style={underlayStyle}>
                        <div className={lineCls} style={lineStyle} />
                    </div>
                </div>
                {suffixText ? (
                    <div className={`${prefix}progress-line-text`}>{suffixText}</div>
                ) : null}
            </div>
        );
    }
}

export default APAConfigProvider.config(Line, {
    desc: '进度条直线组件',
    props: [
        {
            key: 'size',
            name: '进度条尺寸',
            desc: '进度条尺寸，可选值为 small, medium, large',
        },
        {
            key: 'percent',
            name: '进度百分比',
            desc: '进度百分比，当前进度所占的百分比，取值范围为 0-100',
        },
        {
            key: 'state',
            name: '进度状态',
            desc: '进度状态，可选值为 normal, success, error',
        },
    ],
});
