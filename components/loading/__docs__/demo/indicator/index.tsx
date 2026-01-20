import React from 'react';
import ReactDOM from 'react-dom';
import { Loading } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const indicator1 = (
    <div className="load-container load1">
        <div className="loader">loading...</div>
    </div>
);
const indicator7 = (
    <div className="load-container load7">
        <div className="loader">loading...</div>
    </div>
);

ReactDOM.render(
    <APAConfigProvider
        regionName="自定义动画指示符"
        regionId="Loading-indicator-demo"
        regionDesc="Loading自定义动画指示符示例"
        isRegisterChildren
    >
        <div>
            <Loading tip="default">
                <div className="demo">test</div>
            </Loading>
            <Loading indicator={indicator1}>
                <div className="demo">test</div>
            </Loading>
            <Loading indicator={indicator7}>
                <div className="demo">test</div>
            </Loading>
        </div>
    </APAConfigProvider>,
    mountNode
);
