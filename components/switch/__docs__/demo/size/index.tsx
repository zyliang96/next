import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="Switch开关大小设置的Demo"
        regionId="switch-size-demo"
        regionDesc="Switch开关大小设置的Demo"
        isRegiserChildren
    >
        <div>
            <Switch autoWidth />
            <br />
            <Switch autoWidth size="small" />
        </div>
    </APAConfigProvider>,
    mountNode
);
