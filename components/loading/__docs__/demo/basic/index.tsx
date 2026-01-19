import React from 'react';
import ReactDOM from 'react-dom';
import { Loading } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="基本"
        regionId="Loading-basic-demo"
        regionDesc="Loading基本使用示例"
        isRegiserChildren
    >
        <div>
            <Loading tip="加载中...">
                <div className="demo-basic">basic usage</div>
            </Loading>
        </div>
    </APAConfigProvider>,
    mountNode
);
