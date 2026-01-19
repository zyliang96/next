import React from 'react';
import ReactDOM from 'react-dom';
import { Loading } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="自定义提示语及其位置"
        regionId="Loading-tipAlign-demo"
        regionDesc="Loading自定义提示语及其位置示例"
        isRegiserChildren
    >
        <div>
            <Loading tip={<span>default=bottom</span>}>
                <div className="demo-tip">default</div>
            </Loading>
            <Loading tip="right" tipAlign="right">
                <div className="demo-tip">right</div>
            </Loading>
            <Loading tip="bottom" tipAlign="bottom">
                <div className="demo-tip">bottom</div>
            </Loading>
        </div>
    </APAConfigProvider>,
    mountNode
);
