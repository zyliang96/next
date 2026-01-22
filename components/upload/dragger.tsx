import React, { type DragEvent, Component, type ComponentRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import { func } from '../util';
import zhCN from '../locale/zh-cn';
import Upload from './upload';
import type { DraggerProps } from './types';

/**
 * Upload.Dragger
 * IE10+ 支持。继承 Upload 的 API，除非特别说明
 */
class Dragger extends Component<DraggerProps> {
    static propTypes = {
        prefix: PropTypes.string,
        locale: PropTypes.object,
        shape: PropTypes.string,
        onDragOver: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDrop: PropTypes.func,
        limit: PropTypes.number,
        className: PropTypes.string,
        style: PropTypes.object,
        defaultValue: PropTypes.array,
        children: PropTypes.node,
        listType: PropTypes.string,
        timeout: PropTypes.number,
    };

    static defaultProps = {
        prefix: 'next-',
        onDragOver: func.noop,
        onDragLeave: func.noop,
        onDrop: func.noop,
        locale: zhCN.Upload,
    };

    uploaderRef: ComponentRef<typeof Upload>;

    state = {
        dragOver: false,
    };

    onDragOver = (e: DragEvent<HTMLElement>) => {
        if (!this.state.dragOver) {
            this.setState({
                dragOver: true,
            });
        }

        this.props.onDragOver!(e);
    };

    onDragLeave = (e: DragEvent<HTMLElement>) => {
        this.setState({
            dragOver: false,
        });
        this.props.onDragLeave!(e);
    };

    onDrop = (e: File[]) => {
        this.setState({
            dragOver: false,
        });
        this.props.onDrop!(e);
    };

    abort(file: File) {
        this.uploaderRef.abort(file);
    }

    startUpload() {
        this.uploaderRef.startUpload();
    }

    saveUploaderRef = (
        ref: ComponentRef<typeof Upload> | { getInstance: () => ComponentRef<typeof Upload> } | null
    ) => {
        if (
            ref &&
            typeof (ref as { getInstance: () => ComponentRef<typeof Upload> }).getInstance ===
                'function'
        ) {
            this.uploaderRef = (
                ref as { getInstance: () => ComponentRef<typeof Upload> }
            ).getInstance();
        } else {
            this.uploaderRef = ref as ComponentRef<typeof Upload>;
        }
    };

    render() {
        const { className, style, shape, locale, prefix, listType, ...others } = this.props;
        const prefixCls = `${prefix}upload-drag`;
        const cls = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-over`]: this.state.dragOver,
            [className!]: !!className,
        });

        const children = this.props.children || (
            <div className={cls}>
                <p className={`${prefixCls}-icon`}>
                    <Icon size="large" className={`${prefixCls}-upload-icon`} />
                </p>
                <p className={`${prefixCls}-text`}>{locale!.drag!.text}</p>
                <p className={`${prefixCls}-hint`}>{locale!.drag!.hint}</p>
            </div>
        );

        return (
            <Upload
                {...others}
                prefix={prefix}
                shape={shape}
                listType={listType}
                dragable
                style={style}
                // TODO 后续看类型怎么修改
                // @ts-expect-error Upload 被 APAConfigProvider.config 包裹后 props 类型丢失
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                ref={this.saveUploaderRef}
            >
                {children}
            </Upload>
        );
    }
}

export default Dragger;
