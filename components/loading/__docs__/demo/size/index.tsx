import React from 'react';
import ReactDOM from 'react-dom';
import { Loading } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="动画尺寸"
        regionId="Loading-size-demo"
        regionDesc="Loading动画尺寸示例"
        isRegisterChildren
    >
        <div>
            <Loading tip={<span>default = large</span>}>
                <div className="demo-size">test</div>
            </Loading>
            <Loading tip="large" size="large">
                <div className="demo-size">test</div>
            </Loading>
            <Loading tip="medium" size="medium">
                <div className="demo-size">test</div>
            </Loading>
        </div>
    </APAConfigProvider>,
    mountNode
);
