import React from 'react';
import PropTypes from 'prop-types';
import Header from './fixed/header';
import StickyHeader from './sticky/header';
import { statics } from './util';
import { StickyContext } from './context';

export const stickyStaticProps = {
    StickyHeader: StickyHeader,
};

export default function sticky(BaseComponent) {
    /** Table */
    class StickyTable extends React.Component {
        static StickyHeader = StickyHeader;
        static propTypes = {
            /**
             * 表头是否是sticky
             */
            stickyHeader: PropTypes.bool,
            /**
             * 距离窗口顶部达到指定偏移量后触发
             */
            offsetTop: PropTypes.number,
            /**
             * affix组件的的属性
             */
            affixProps: PropTypes.object,
            components: PropTypes.object,
            ...BaseComponent.propTypes,
        };

        static defaultProps = {
            components: {},
            ...BaseComponent.defaultProps,
        };

        state = {};

        constructor(props) {
            super(props);
            // 缓存 context value
            this._stickyContextValue = null;
            this._lastHeader = null;
            this._lastOffsetTop = null;
            this._lastAffixProps = null;
        }

        // 缓存 StickyContext value
        getStickyContextValue = () => {
            const { components, offsetTop, affixProps } = this.props;
            const HeaderComp = components.Header || Header;
            
            if (
                this._stickyContextValue === null ||
                this._lastHeader !== HeaderComp ||
                this._lastOffsetTop !== offsetTop ||
                this._lastAffixProps !== affixProps
            ) {
                this._lastHeader = HeaderComp;
                this._lastOffsetTop = offsetTop;
                this._lastAffixProps = affixProps;
                this._stickyContextValue = {
                    Header: HeaderComp,
                    offsetTop,
                    affixProps,
                };
            }
            return this._stickyContextValue;
        };

        render() {
            /* eslint-disable no-unused-vars */
            const { stickyHeader, offsetTop, affixProps, ...others } = this.props;
            let { components, maxBodyHeight, fixedHeader } = this.props;
            if (stickyHeader) {
                components = { ...components };
                components.Header = StickyHeader;
                fixedHeader = true;
                maxBodyHeight = Math.max(maxBodyHeight, 10000);
            }
            return (
                <StickyContext.Provider value={this.getStickyContextValue()}>
                    <BaseComponent
                        {...others}
                        components={components}
                        fixedHeader={fixedHeader}
                        maxBodyHeight={maxBodyHeight}
                    />
                </StickyContext.Provider>
            );
        }
    }
    statics(StickyTable, BaseComponent);
    return StickyTable;
}
