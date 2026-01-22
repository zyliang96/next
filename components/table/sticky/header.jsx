import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Affix from '../../affix';
import { StickyContext } from '../context';

const defaultApaMergeConfig = {
    mergeToParent: true,
    mergeToParentAction: false,
    mergeToParentState: false,
    mergeToParentMemo: false,
    mergeToParentShowState: false,
};

/* eslint-disable react/prefer-stateless-function*/
export default class StickHeader extends React.Component {
    static propTypes = {
        prefix: PropTypes.string,
    };

    getAffixRef = ref => {
        this.props.affixRef && this.props.affixRef(ref);
    };

    render() {
        return (
            <StickyContext.Consumer>
                {stickyContext => {
                    const { prefix } = this.props;
                    const { Header, offsetTop, affixProps } = stickyContext;

                    const newAffixProps = affixProps || {};
                    const { className, ...others } = newAffixProps;
                    const cls = classnames({
                        [`${prefix}table-affix`]: true,
                        className,
                    });

                    return (
                        <Affix
                            ref={this.getAffixRef}
                            {...others}
                            className={cls}
                            offsetTop={offsetTop}
                            __apaConfig={defaultApaMergeConfig}
                        >
                            <Header {...this.props} />
                        </Affix>
                    );
                }}
            </StickyContext.Consumer>
        );
    }
}
