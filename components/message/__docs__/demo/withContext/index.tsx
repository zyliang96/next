import React from 'react';
import ReactDOM from 'react-dom';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="上下文"
        regionId="Message-withContext-demo"
        regionDesc="展示在Context中使用Message"
        isRegiserChildren
    >
        <a target="_blank" rel="noopener noreferrer" href="https://codepen.io/acejerry/pen/ZEOQjzr">
            点击查看 Message.withContext Demo
        </a>
    </APAConfigProvider>,
    mountNode
);
